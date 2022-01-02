# test/models/user_test.rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test 'should not save user without username' do
    user = User.new
    assert_not user.save, "Saved the user without a username"
  end

  test 'should not save user without email' do
    user = User.new
    assert_not user.save, "Saved the user without a email"
  end

end