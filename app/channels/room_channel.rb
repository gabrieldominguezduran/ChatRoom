class RoomChannel < ApplicationCable::Channel
  def subscribed
      stream_from "rooms"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
