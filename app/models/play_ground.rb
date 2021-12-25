class PlayGround < ApplicationRecord
  belongs_to :room, optional: true
end
