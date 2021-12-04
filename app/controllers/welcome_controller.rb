class WelcomeController < ApplicationController
  skip_forgery_protection 
  before_action :authenticate_user!
  def index
  end

  def load_profile
    render json: current_user.as_json(:only => [:username, :email])
  end

  def update_profile
    current_user.update!(user_params)

    render json: current_user.as_json(:only => [:username, :email])    
  end

  def load_rooms
    rooms =  Room.all
    render json: rooms.as_json(:only => [:id, :admin_id, :name], :include => :messages)
  end

  def create_room
    room = Room.create!({
      :admin_id => current_user.id,
      :name => params[:room]
    })
      rooms = Room.all
      render json: rooms.as_json(:only => [:id, :admin_id, :name], :include => :messages)
  end

  private

  def user_params
    params.require(:user).permit(:username, :email)
  end

  def room_params
    params.require(:room).permit(:admin_id, :name)
  end
end
