class ApiController < ActionController::Base

  def receive
    if params[:email] == 'vasilpipash@gmail.com'
      hotel = Hotel.where("name ILIKE ?", params[:hotel]).first
      reservations = JSON.parse(params[:reservations].to_json)
      reservations.each do |reservation|
        r = reservation.last
        room = hotel.rooms.where(number: r['roomId']).first
        hotel.reservations.create(room_id: room.id,
                                   name: r['name'], phone: r['phone'], places: r['places'],
                                   description: r['description'], deposit: r['deposit'],
                                   start_date: r['startDate'], end_date: r['endDate'], status: r['status'])
      end
      render json: {message: "Update for hotel #{params[:hotel]} done"}
    else
      render json: {message: 'That`s not good'}, status: 403
    end
  end

  def request_reservations
    if params[:email] == 'vasilpipash@gmail.com'
      hotel = Hotel.where("name ILIKE ?", params[:hotel]).first
      reservations = hotel.reservations.map do |r|
        { roomId: r.room.number,
          name: r.name,
          phone: r.phone,
          places: r.places,
          description: r.description,
          deposit: r.deposit,
          status: r.status,
          startDate: r.start_date.strftime('%d.%m.%Y'),
          endDate: r.end_date.strftime('%d.%m.%Y')}
      end
      render json: {reservations: reservations}
    else
      render json: {message: 'That`s not good'}, status: 403
    end
  end
end
