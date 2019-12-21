class Review < ApplicationRecord
	belongs_to :car
	belongs_to :user

	validates_presence_of :rating, :user_id, :car_id
	validates_uniqueness_of :user_id, scope: :car_id
end