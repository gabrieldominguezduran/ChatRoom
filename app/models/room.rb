class Room < ApplicationRecord
  validates :name, presence: true
  belongs_to :user, optional: true

  has_many :messages
  has_one :play_ground
end
