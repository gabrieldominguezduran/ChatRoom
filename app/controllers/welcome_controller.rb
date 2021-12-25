class WelcomeController < ApplicationController
  skip_forgery_protection 
  before_action :authenticate_user!
  def index
  end

  def load_profile
    render json: current_user.as_json(:only => [:id, :username, :email])
  end

  def update_profile
    current_user.update!(user_params)

    render json: current_user.as_json(:only => [:id, :username, :email])    
  end

  def load_rooms
    rooms =  Room.all
    render json: rooms.as_json(:only => [:id, :admin_id, :name], :include => [messages: {include: :user}])
  end

  def load_single_room
    room =  Room.find(params[:id])
    render json: room.as_json(:only => [:id, :admin_id, :name], :include => [:play_ground, messages: {include: :user}])
  end

  def create_room

    ActiveRecord::Base.transaction do 
      room = Room.create!({
        :admin_id => current_user.id,
        :name => params[:room]
      })
  
      PlayGround.create!({
        :room_id => room.id,
        :html_code => "",
        :css_code => "",
        :js_code => ""
      })
    end    
      rooms = Room.all
      render json: rooms.as_json(:only => [:id, :admin_id, :name], :include =>[messages: {include: :user}])
  end

  def create_msg
    room = Room.find(params[:roomId])
    room.messages.create!({
      :user_id => current_user.id,
      :room_id => room.id,
      :body => params[:message]
    })
     
      ActionCable.server.broadcast "rooms", {room: Room.find(room.id).as_json(:only => [:id, :admin_id, :name], :include => [ messages: {include: :user}])}
     
      head :no_content
  end

  def update_playground
    playground = PlayGround.find(params[:play_ground][:id]) if params[:play_ground]
    if playground
      playground.update!({
        :html_code => params[:play_ground][:html_code],
        :css_code => params[:play_ground][:css_code],
        :js_code => params[:play_ground][:js_code]
      })
    end
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:username, :email)
  end


  def room_params
    params.require(:room).permit(:admin_id, :name)
  end
end
