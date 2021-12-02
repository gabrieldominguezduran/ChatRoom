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

  private

  def user_params
    params.require(:user).permit(:username, :email)
  end
end
