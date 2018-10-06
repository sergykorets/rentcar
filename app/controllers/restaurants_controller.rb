class RestaurantsController < ApplicationController
  before_action :set_hotel, only: [:show, :edit, :update, :destroy]

  def index
    @restaurants = Hotel.restaurant.map do |hotel|
      { id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        created: hotel.created_at,
        price: hotel.price,
        site: hotel.site,
        googleRating: hotel.average_rating,
        location: hotel.location,
        avatar: GooglePhoto.find_by_id(hotel.main_photo_id).try(:photo_url) || hotel.google_photos.try(:first).try(:photo_url)}
    end
  end
end
