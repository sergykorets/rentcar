class RestaurantsController < ApplicationController
  before_action :set_hotel, only: [:show, :edit, :update, :destroy]

  def index
    @restaurants = Hotel.restaurant.map do |hotel|
      { id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        created: hotel.created_at,
        price: hotel.price,
        slug: hotel.slug,
        site: hotel.site,
        googleRating: hotel.average_rating,
        location: hotel.location,
        avatar: get_hotel_avatar(hotel)}
    end
  end

  private

  def get_hotel_avatar(hotel)
    if hotel.main_photo_type.present?
      if hotel.main_photo_type == 'Photos'
        Photo.find_by_id(hotel.main_photo_id).try(:picture)
      else
        GooglePhoto.find_by_id(hotel.main_photo_id).try(:photo_url)
      end
    else
      GooglePhoto.find_by_id(hotel.main_photo_id).try(:photo_url) || Photo.find_by_id(hotel.main_photo_id).try(:photo_url) ||
        hotel.google_photos.try(:first).try(:photo_url) || hotel.photos.try(:first).try(:picture)
    end
  end
end
