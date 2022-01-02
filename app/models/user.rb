class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :rooms, foreign_key: "admin_id", class_name: "Room", dependent: :destroy

  has_many :messages, dependent: :destroy
end
