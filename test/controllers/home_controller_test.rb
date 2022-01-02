# test/controllers/home_controller/test_routes.rb
require 'test_helper'

class HomeController::RoutesTest < ActionController::TestCase
  def test_route
    assert_routing '/about', controller: "home", action: "about"
  end
end