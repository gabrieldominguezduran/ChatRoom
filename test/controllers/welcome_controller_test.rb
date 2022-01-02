# test/controllers/welcome_controller/test_routes.rb
require 'test_helper'

class WelcomeController::RoutesTest < ActionController::TestCase
  def test_route
    assert_routing '/profile', controller: "welcome", action: "load_profile"
    assert_routing '/rooms', controller: "welcome", action: "load_rooms"
    assert_routing '/room/1', controller: "welcome", action: "load_single_room", id: "1"
  end
end