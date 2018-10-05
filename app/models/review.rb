class Review < ApplicationRecord
	belongs_to :hotel
	belongs_to :user

	validates_presence_of :rating
	validates_uniqueness_of :user_id, scope: :hotel_id
end
