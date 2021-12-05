class RoomChannel < ApplicationCable::Channel
  def subscribed
    Room.all.each do |room|
      stream_from "room:#{room.id}"
    end
    
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
