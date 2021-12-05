Rails.application.routes.draw do
  devise_for :users, path: '/', path_names: {sign_in: 'login', sign_out: 'logout'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

authenticated :user do
  root :to => "welcome#index"
end
  get '/' => "home#index"
  get '/about' => 'home#about'
  get '/profile' => 'welcome#load_profile'
  get '/rooms' => 'welcome#load_rooms'
  post '/update_profile' => 'welcome#update_profile'
  post '/create_room' => 'welcome#create_room'
  post '/create_msg' => 'welcome#create_msg'

  mount ActionCable.server => '/cable'
end
