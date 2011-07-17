require "ipaddress"
  
class NexusOverviewController < ApplicationController
  
  def overview
    @osc_ip = @@osc_ip;
    @osc_port = @@osc_port;
  end
  
  def example_send
    send_osc_message(params[:osc_name], params[:id], params[:data].to_f)
    render :nothing => true
  end
  
  def set_osc
    @osc_ip = params[:osc_ip]
    @osc_port = params[:osc_port]
    
    if !IPAddress::valid? @osc_ip
      @osc_ip = @@osc_ip
    else
      @@osc_ip = @osc_ip
    end
    reg = /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3})$/
    if reg.match(@osc_port) == nil
      @osc_port = 7475
    else
      @@osc_port = @osc_port
    end
    #render :action => :overview
    redirect_to :root
  end
  
private

  def send_osc_message(command, id, data)
    if(id)
      m = OSC::Message.new("/#{command}.#{id}", nil, data )
    else
      m = OSC::Message.new("/#{command}", nil, data )
    end
		OSCSender.send(m, 0, @@osc_ip, @@osc_port)
  end

end
