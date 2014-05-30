# rosc to send osc messages to a client application like MaxMSP, Processing, Chuck and more!
# Also add gem 'rosc' to your Gemfile and then run >bundle install at the command line
# Finally, add a method for receiving ajax commands and sending them via OSC.
# Take a look at app/controllers/nexus_overview_controller.rb#example_send

require 'osc'

OSCHost = '127.0.0.1'
OSCReceivePort = 7474
OSCSendPort = 7475

@@osc_ip = OSCHost
@@osc_port = OSCSendPort


puts "  Starting the OSC Server..."
# @oscReceiver = OSC::UDPServer.new
# @oscReceiver.bind @host, @receivePort
OSCSender = OSC::UDPSocket.new