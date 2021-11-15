Rails.application.routes.draw do
  devise_for :users, path: '/', path_names: {sign_in: 'login', sign_out: 'logout'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

authenticated :user do
  root :to => "welcome#index"
end
  get '/' => "home#index"
  get '/about' => 'home#about'
end
