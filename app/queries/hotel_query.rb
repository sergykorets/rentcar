class HotelQuery
  def initialize(hotel)
    @hotel = hotel
  end

  def item_data
    { id: @hotel.id,
      name: @hotel.name,
      description: @hotel.description,
      created: @hotel.created_at,
      price: @hotel.price,
      site: @hotel.site,
      googleRating: @hotel.google_rating,
      location: @hotel.location}
  end
end
