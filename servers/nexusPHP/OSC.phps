<?php
/** Open Sound Control (OSC) Client Library for PHP
  * Author: Andy W. Schmeder <andy@a2hd.com>
  * Copyright 2003-2007
  *
  * Version 0.2
  * 
  * Requirements: PHP 4.1.0 or later.
  * For information about Open Sound Control, 
  * see http://www.opensoundcontrol.org/
  *
  * This is free software.  
  * It may contain bugs, design flaws or other unforseeable problems.
  * Please feel free to report problems (or success stories) to the author. 
  *
  * License: LGPL version 2.1 or later.
  *
  * This library is free software; you can redistribute it and/or
  * modify it under the terms of the GNU Lesser General Public
  * License as published by the Free Software Foundation; either
  * version 2.1 of the License, or (at your option) any later version.
  *
  * This library is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  * Lesser General Public License for more details.
  *
  * You should have received a copy of the GNU Lesser General Public
  * License along with this library; if not, write to the Free Software
  * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
  *
  * For questions regarding this library contact 
  * Andy W. Schmeder <andy@a2hd.com>
  */

// Test if this machine is a little endian architecture
function test_little_endian() {
    $cpu_int = pack("L", 1);  // Machine dependent
    $be_int  = pack("N", 1);  // Machine independent
    
    if($cpu_int[0] == $be_int[0]) {
        return FALSE;
    } else {
        return TRUE;
    }
}

// Test if this machine uses twos complement representation
function test_twos_complement() {
    $cpu_int = pack("i", -1);  // Machine dependent
    if(ord($cpu_int[0]) == 255) {
        return TRUE;
    } else {
        return FALSE;
    }
}

// Take note of the configuration for this machine.
$_arch_little_endian = test_little_endian();
$_arch_twos_complement = test_twos_complement();

if(! $_arch_twos_complement) {
    trigger_error("WARNING: This machine does not use twos-complement integers.  " .
                  "Negative numbers may not be represented correctly.", 
                  E_USER_NOTICE);
}

/** This is a utility function to convert from CPU byte order to network order (big endian).
  *
  * It is necessary to use this function because PHP's pack() function does not support
  * big endian encoding for most data types. (It only does big endian for unsigned ints).
  */
function host_to_network_order($str) {
    global $_arch_little_endian;
    if($_arch_little_endian) {
        $swstr = "";
        for($i = 0; $i < strlen($str); $i++) {
            $swstr .= $str[(strlen($str)-1)-$i];
        }
        return $swstr;
    } else {
        // No conversion necessary for big-endian arch
        return $str;
    }
}

/** OSCDatagram is a virtual base class for OSCMessage and OSCBundle.
  */
class OSCDatagram {
    
    // Virtual private data
    var $bin = NULL;
    var $data = NULL;
    
    // Virtual functions
    function get_binary() {}
    function clear() {}
    
    // Shared functions
    
    /** Returns a semi-human readable representation of the binary data.
      * Printable bytes will appear as "_C" where C is the printable character.
      * Non-printable bytes will appear in hex, e.g. '20' for a space (\s) character
      * Bytes are clustered in groups of 4 to show the alignment.
      */
    function get_human_readable($hex_only = FALSE) {
        $bin = $this->get_binary();
        $hex = "";
        for($i = 0; $i < strlen($bin); $i++) {
            if((! $hex_only) && ord($bin[$i]) >= 33 && ord($bin[$i]) <= 126) {  // Printable characters
                $hex .= "_" . chr(ord($bin[$i]));
            } else {
                $hex .= sprintf("%02x", ord($bin[$i]));
            }            
            if($i != 0 && $i < strlen($bin) && ($i+1) % 4 == 0) {
                $hex .= " ";
            }
        }
        return $hex . "\n";
    }
    
    /** Pack data into $this->bin as 4-byte aligned, network-byte order.
      */
    function pack_data($data, $type_hint) {
        $bin = "";
        switch($type_hint) {
            case "T":
            case "F":
            case "N":
            case "I":
            return;  // These types have no allocated space
            case "A":
                foreach($data as $arg) {
                    $this->pack_data($arg[0], $arg[1]);
                }
                break;
            case "s":
                $data .= "\0";  // The builtin \0 terminator is ignored... we must explicitly request one.
                $bin = pack("a*" . $this->get_strpad($data), $data);
                break;
            case "b":
                $this->pack_data(strlen($data->bin), "i");
                $bin = pack("a*" . $this->get_strpad($data->bin), $data->bin);
                break;
            case "i":
                $bin = host_to_network_order(pack("i", $data));  // Machine-independent size (4-bytes)
                break;
            case "f":
                $bin = host_to_network_order(pack("f", $data));  // Machine-dependent size
                if(strlen($bin) != 4) {
                    $this->error("Sorry, your machine uses an unsupported single-precision floating point size.");
                }
                break;
            case "d":
                $bin = host_to_network_order(pack("d", $data));  // Machine-dependent size
                if(strlen($bin) != 8) {
                    $this->error("Sorry, your machine uses an unsupported double-precision floating point size.");
                }
                break;
            case "t":
                if(is_null($data)) { $data = new Timetag(); }
                $bin = host_to_network_order(pack("L", $data->sec)) . 
                    host_to_network_order(pack("L", $data->frac_sec));
                break;
        }
        if(strlen($bin) % 4 != 0) {
            $this->error("$data failed to align properly, size is " . strlen($bin) . " bytes.");
        }
        $this->bin .= $bin;
    }

    /** Utility to generate padding for strings
      */
    function get_strpad($str) {
        $x = (strlen($str)) % 4;
        if($x == 0) {
            return '';
        } else {
            $x = 4 - $x;
        }
        switch($x) {
            case 1:
            return 'x';
            case 2:
            return 'xx';
            case 3:
            return 'xxx';
            default:
            $this->error("Pad calculation is screwy, x = $x");
        }
    }
    
    /** Report an error
      */
    function error($message) {
        trigger_error("OSCDatagram Error: $message", E_USER_ERROR);
    }
    
}

/** OSCMessage type
  */
class OSCMessage extends OSCDatagram {

    var $address = "/";
    var $typetags = ",";
    var $data = array();

    /** Make a new message - Optionally specify address and arguements.
      *
      * e.g. $a = new OSCMessage("/foo", array(1, 2.94, "bar"))
      * It is not possible to provide type-hinting using this initialization method.
      */
    function OSCMessage($address = NULL, $args = NULL) {
        if(! is_null($address)) {
            $this->address = $address;
        }
        if(is_array($args)) {
            foreach($args as $arg) {
                $this->add_arg($arg);
            }
        }
    }

    /** Reset internal data structures
      */
    function clear() {
        $this->address = "/";
        $this->typetags = ",";
        $this->data = array();
        $this->bin = NULL;
    }
    
    /** Set packet address
      * e.g. "/test".
      * See OSC spec for details on allowed characters in an OSC address.
      */
    function set_address($addr) {
        $this->bin = NULL;
        $this->address = $addr;
    }
    
    /** Add an arg to the OSC message.
      * $data can be an integer, float, string, boolean, NULL, or an array of those types.
      * $type-hint is optional.
      */
    function add_arg($data, $type_hint = NULL) {
        $this->bin = NULL;
        if($type_hint == NULL) {
            $type_hint = $this->get_type($data);
        }
        $data = $this->set_type($data, $type_hint);
        array_push($this->data, array($data, $type_hint));
    }
    
    /** Try to guess the type of data.
      * If this does not work for you, try using a type-hint.
      */
    function get_type($data) {
        switch(gettype($data)) {
            case "integer":
                return "i";
            case "double":
            case "float":
                return "f";
            case "string":
                return "s";
            case "boolean":
                if($data) {
                    return "T";
                } else {
                    return "F";
                }
            case "array":
                // Array type will be handled later... 'A' is not actually an OSC type.
                return "A";
            case "object":
                switch(strtolower(get_class($data))) {
                    case "infinitum":
                        return "I";
                    case "timetag":
                        return "t";
                    case "blob":
                        return "b";
                    default:
                        $this->error("Unknown or unsupported object type.");
                }
            case "NULL":
                return "N";
            default:
                $this->error("Unknown or unsupported data type.");
        }
    }
    
    /** Cast data to type, and add type info to typetags.
      */
    function set_type($data, $type_tag) {
        switch($type_tag) {
            case "i":
                $this->typetags .= "i";
                return (int)$data;
            case "f";
                $this->typetags .= "f";
                return (double)$data;
            case "d";
                $this->typetags .= "d";
                return (double)$data;
            case "s":
            case "c":
                $this->typetags .= "s";
                return (string)$data;
            case "T":
                $this->typetags .= "T";
                return TRUE;
            case "F":
                $this->typetags .= "F";
                return FALSE;
            case "N":
                $this->typetags .= "N";
                return NULL;
            case "I":
                $this->typetags .= "I";
                return $data;
            case "t":
                $this->typetags .= "t";
                return $data;
            case "b":
                $this->typetags .= "b";
                return $data;
            case "A":
                // Array is now expanded...
                $this->typetags .= "[";
                $data = (array)$data;
                for($i = 0; $i < count($data); $i++) {
                    $type_tag = $this->get_type($data[$i]);
                    $data[$i] = array($this->set_type($data[$i], $type_tag), $type_tag);
                }
                $this->typetags .= "]";
                return $data;
            default:
                trigger_error("Unrecognized type tag, '$type_tag'", E_USER_ERROR);
        }
    }
    
    function get_binary() {
        // Check for cached binary representation and reuse if found.
        if(! is_null($this->bin)) {
            return $this->bin;
        }
        // Pack address...
        $this->pack_data($this->address, "s");
        
        // Pack typetags...
        $this->pack_data($this->typetags, "s");
        
        // Pack args...
        foreach($this->data as $arg) {
            $this->pack_data($arg[0], $arg[1]);
        }
        
        return $this->bin;
    }
    
}

/** OSCBundle datagram type
  * This object can contain any number of other OSCDatagram objects.
  */
class OSCBundle extends OSCDatagram {
 
    var $data = array();
    var $timetag = NULL;
 
    /** Create a new OSCBundle datagram
      *
      * $init may be an array of OSCDatagram objects,
      * e.g. $b = new OSCBundle(new OSCMessage(...), new OSCBundle(...))
      *
      * Otherwise, add messages at runtime using OSCBundle::add_datagram.
      */
    function OSCBundle($init = NULL) {
        if(is_array($init)) {
            foreach($init as $d) {
                $this->add_datagram($d);
            }
        }
    }
    
    /** Set time tag as whole seconds since July 1, 1970, and fraction of a second.
      * This feature is not tested, but it should work if you need it.
      * 
      * If timetag is not set, it will default to "Immediate".
      */
    function set_timetag($timetag_obj) {
        $this->timetag = $timetag_obj;
    }
    
    /** Add an OSCDatagram object to a bundle.
      * This can be either an OSCMessage or an OSCBundle.
      * However, you cannot reasonably add a bundle to itself.
      */
    function add_datagram($osc_datagram) {
        $this->bin = NULL;
        array_push($this->data, $osc_datagram);
    }
    
    function clear() {
        $this->bin = NULL;
        $this->data = NULL;
    }

    function get_binary() {
        if($this->bin != NULL) {
            return $this->bin;
        }
        $this->bin = "";
        $this->pack_data("#bundle", "s");
        $this->pack_data($this->timetag, "t");
        foreach($this->data as $datagram) {
            $bin = $datagram->get_binary();
            $this->pack_data((int)strlen($bin), "i");
            $this->bin .= $bin;
        }
        return $this->bin;
    }
    
}

/** OSCClient uses a connectionless UDP socket to transmit binary to its destination.
  *
  * Example of use:
  *
  * $c = new OSCClient();
  * $c->set_destination("192.168.1.5", 3890);
  * $c->send(new OSCMessage("/foo", array(1,2,3)));
  * ... etc.
  *
  * Since it is connectionless, you can change the destination address/port at any time.
  * If you are having problems establishing communication, it may be due to a bad address,
  * improper setup of the IP routing table, or a problem on the other end.  When in doubt,
  * use tcpdump or ethereal to check that packets are indeed being transmitted.
  */
class OSCClient {

    var $sock = NULL;
    var $address = NULL;
    var $port = NULL;
        
    function OSCClient($address = NULL, $port = NULL) {
        $this->address = $address;
        $this->port = $port;
        
        if(($this->sock = socket_create(AF_INET, SOCK_DGRAM, 0)) < 0) {
            $this->error("Could not create datagram socket.");
        }
    }
    
    /** Destructor function, usually not needed, provided in case you want to free the socket.
      */
    function destroy() {
        socket_close($this->sock);
    }
    
    /* 
    // You can enable this part if you have PHP 4.3.0 or later...
    function enable_broadcast() {
        if(($ret = socket_set_option($this->sock, SOL_SOCKET, SO_BROADCAST, 1)) < 0) {
            $this->error("Failed to enable broadcast option.");
        }
    }
    
    function disable_broadcast() {
        if(($ret = socket_set_option($this->sock, SOL_SOCKET, SO_BROADCAST, 0)) < 0) {
            $this->error("Failed to disable broadcast option.");
        }
    }
    */

    /** Address is an IP address, given as a string.
      * To convert a hostname to IP, use gethostbyname('www.example.com')
      * You must also specify a port as an integer, typically $port is larger than 1024.
      */
    function set_destination($address, $port) {
        $this->address = $address;
        $this->port = $port;
    }
    
    /** send() accepts either an OSCDatagram object or a binary string
      */
    function send($message) {
        if(is_null($this->address) || is_null($this->port)) {
            $this->error("Destination is not well-defined.  Please use OSCClient::set_destination().");
        }
        if(is_object($message)) {
            $message = $message->get_binary();
        }
        if(($ret = socket_sendto($this->sock, $message, strlen($message), 0, $this->address, $this->port)) < 0) {
            $this->error("Transmission failure.");
        }
        if($ret != strlen($message)) {
            $mlen = strlen($message);
            $this->error("Could not send the entire message, only $ret bytes were sent, of $mlen total");
        }
        return $ret;
    }

    /** Report a fatal error.
      */    
    function error($message) {
        trigger_error("OSCClient Error: $message", E_USER_ERROR);
    }
    
}

/** Object to represent the OSC Infinitum type ("I")
  */
class Infinitum {
}

/** 64-bit OSC timetag type, Refer to NTP format for details.
  * $sec is integer seconds since Jan 1 1900, and $frac_sec is fractions of a second.
  * The special timetag $sec = 0, $frac_sec = 1 corresponds to "immediate" in OSC,
  * and should be used in all applications where explicit absolute timetags are not implemented.
  */
class Timetag {
    function Timetag($sec = 0, $frac_sec = 1) {
        $this->sec = $sec;
        $this->frac_sec = $frac_sec;
    }
}

/** Binary Blob datatype
  * Blob is basically a non-null-terminated string prefixed by a size indicator.
  */
class Blob {
    function Blob($bin) {
        $this->bin = $bin;
    }
}

/** Run some tests to make sure the library behaves in a sane way.
  */
function test_osc_lib() {

    $c = new OSCClient();
    $c->set_destination("192.168.1.5", 3980);

    $m1 = new OSCMessage("/test", array(new Timetag(3294967295, 5), new Infinitum(), new Blob("aoeuaoeu!")));
    $m1->add_arg(28658.93, "d");
    $m2 = new OSCMessage("/bar", array(1, 2, array(1,2,3)));
    
    $b = new OSCBundle();
    $b->add_datagram($m1);
    $b->add_datagram($m2);
    
    $b2 = new OSCBundle(array($m1, $b));
    
    echo $b2->get_human_readable();
    
    //echo $m1->get_human_readable();
    
    $c->send($m1);

}

// Uncomment to run the test
// test_osc_lib();

?>