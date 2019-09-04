class ApiController < ActionController::Base

  def receive
    hotel = Hotel.where("name ILIKE ?", 'Піпаш').first
    reservations = params[:reservations]
    reservations.each do |r|
      room = Hotel.rooms.where(number: r.roomId).first
      Reservation.find_or_create(hotel_id: hotel.id, room_id: room.id,
                                 name: r.name, phone: r.phone, places: r.places,
                                 description: r.description, deposit: r.deposit,
                                 start_date: r.startDate, end_date: r.endDate)
    end
  end
end
