class ReservationsController < ApplicationController
  before_action :define_car, only: :update
  def index
    @hotel = current_user.hotels.friendly.find(params[:hotel_id]) if !current_user.admin
    @floors = @hotel.rooms.map {|room| room.floor}.max
    @hotel_id = @hotel.id
    @rooms = @hotel.rooms.order(:number).each_with_object({}) {|room, hash|
      reservations = room.reservations.approved.for_dates(room, Date.today.to_date, Date.tomorrow.to_date)
      hash[room.id] = {
        id: room.id,
        number: room.number,
        floor: room.floor,
        places: room.places,
        booked: reservations.pluck(:places).sum,
        reservations: reservations.each_with_object({}) {|reservation, hash| hash[reservation.id] = {
          id: reservation.id,
          name: reservation.name,
          phone: reservation.phone,
          places: reservation.places,
          description: reservation.description,
          startDate: reservation.start_date.strftime('%d.%m.%Y'),
          endDate: reservation.end_date.strftime('%d.%m.%Y')}
        }
    }}
    respond_to do |format|
      format.html { render :index }
      format.json {{rooms: @rooms }}
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
    reservation = {
      id: @reservation.id,
      carId: @reservation.car_id,
      name: @reservation.name,
      phone: @reservation.phone,
      email: @reservation.email,
      description: @reservation.description,
      startDate: @reservation.start_date.strftime('%d.%m.%Y %H:%M'),
      endDate: @reservation.end_date.strftime('%d.%m.%Y %H:%M')}
    render json: {reservation: reservation}
  end

  def create
    if car = Car.find_by_id(params[:reservation][:car_id])
      c = car.reservations.create(reservation_params)
      if c.persisted?
        if params[:from_chess]
          render json: {
              success: true,
              reservations: Reservation.all.map { |reservation|
                { id: reservation.id,
                  group: reservation.car_id,
                  title: reservation.name,
                  start_time: reservation.start_date.to_datetime.strftime('%Y-%m-%d %H:%M'),
                  end_time: reservation.end_date.to_datetime.strftime('%Y-%m-%d %H:%M')}
              }}
        else
          render json: { success: true }
        end
      else
        render json: {success: false, error: c.errors.full_messages.first}
      end
    else
      render json: {success: false, error: 'Перезавантажте сторінку'}
    end
  end

  def update
    reservation = Reservation.find_by_id(params[:id])
    if reservation.update(reservation_params)
      render json: {
        success: true,
        reservations: Reservation.for_dates(Time.now, Time.now + 40.days).map { |reservation|
          { id: reservation.id,
            group: reservation.car_id,
            title: reservation.name,
            start_time: reservation.start_date.to_datetime.strftime('%Y-%m-%d %H:%M'),
            end_time: reservation.end_date.to_datetime.strftime('%Y-%m-%d %H:%M')}
        }}
    else
      render json: {success: false, error: reservation.errors.full_messages.first}
    end
  end

  def destroy
    reservation = Reservation.find_by_id(params[:id])
    reservation.destroy
    render json: {
      success: true,
      reservations: Reservation.for_dates(Time.now, Time.now + 40.days).map { |reservation|
        { id: reservation.id,
          group: reservation.car_id,
          title: reservation.name,
          start_time: reservation.start_date.to_datetime.strftime('%Y-%m-%d %H:%M'),
          end_time: reservation.end_date.to_datetime.strftime('%Y-%m-%d %H:%M')}
      }}
  end

  def dates
    rooms = params[:floor] != 'all' ? @hotel.rooms.order(:number).in_floor(params[:floor]) : @hotel.rooms.order(:number)
    render json: {
      success: true,
      rooms: rooms.each_with_object({}) {|room, hash|
        reservations = room.reservations.approved.for_dates(room, params[:start_date].to_date, params[:end_date].to_date)
        hash[room.id] = {
          id: room.id,
          number: room.number,
          floor: room.floor,
          places: room.places,
          booked: reservations.pluck(:places).sum,
          reservations: reservations.each_with_object({}) {|reservation, hash| hash[reservation.id] = {
            id: reservation.id,
            name: reservation.name,
            phone: reservation.phone,
            places: reservation.places,
            description: reservation.description,
            deposit: reservation.deposit,
            startDate: reservation.start_date.strftime('%d.%m.%Y'),
            endDate: reservation.end_date.strftime('%d.%m.%Y')}
          }
      }
      }}
  end

  def user_reservations
    @reservations = current_user.reservations.each_with_object({}) {|reservation, hash| hash[reservation.id] = {
      id: reservation.id,
      name: reservation.name,
      phone: reservation.phone,
      places: reservation.places,
      description: reservation.description,
      deposit: reservation.deposit,
      status: reservation.status,
      startDate: reservation.start_date.strftime('%d.%m.%Y'),
      endDate: reservation.end_date.strftime('%d.%m.%Y'),
      hotel: {
        name: reservation.hotel.name
      },
      room: {
        number: reservation.room.number,
        floor: reservation.room.floor,
        bigBed: reservation.room.big_bed
      }}
    }
  end

  private

    def check_rooms
      redirect_to hotel_rooms_path(reason: 'Спершу потрібно створити номери в готелі') if @hotel.rooms.empty?
    end

    def reservation_params
      params.require(:reservation).permit(:name, :email, :phone, :description, :start_date, :end_date, :car_id)
    end

    def define_car
      @car = Car.friendly.find(params[:car_id])
    end
end