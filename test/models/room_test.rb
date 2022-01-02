# test/models/toom_test.rb
require 'test_helper'

class RoomTest < ActiveSupport::TestCase
  test 'should not save room without name' do
    room = Room.new
    assert_not room.save, "Saved the room without a name"
  end

end