class NearbyHotel < ApplicationRecord
  belongs_to :hotel

  validates_uniqueness_of :nearby_hotel_id, scope: :hotel_id
end