<?php

	$data = array(
	  'userID'      => 'a7664093-502e-4d2b-bf30-25a2b26d6021',
	  'itemKind'    => 0,
	  'value'       => 1,
	  'description' => 'Boa saudaÁ„o.',
	  'itemID'      => '03e76d0a-8bab-11e0-8250-000c29b481aa'
	);
	
	echo $data

	$options = array(
	  'http' => array(
	    'method'  => 'POST',
	    'content' => json_encode( $data ),
	    'header'=>  "Content-Type: application/json\r\n" .
	                "Accept: application/json\r\n"
	    )
	);

	$context  = stream_context_create( $options );
	$result = file_get_contents( "http://nexus.cct.lsu.edu:8000/", false, $context );
	$response = json_decode( $result );

	echo $response



?>
