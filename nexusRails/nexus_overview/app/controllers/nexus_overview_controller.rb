class NexusOverviewController < ApplicationController
  def overview
  end
  
  def example_send
    send_osc_message(params[:osc_name], params[:id], params[:data].to_f)
    render :nothing => true
  end
  
private

  def send_osc_message(command, id, data)
    if(id)
      m = OSC::Message.new("/#{command}.#{id}", nil, data )
    else
      m = OSC::Message.new("/#{command}", nil, data )
    end
		OSCSender.send(m, 0, OSCHost, OSCSendPort)
  end

end
