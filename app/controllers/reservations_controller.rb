class ReservationsController < ApplicationController
  layout 'hotel_admin', except: :user_reservations
  before_action :define_hotel, except: :user_reservations
  before_action :check_rooms, only: [:index]
  before_action :authenticate_user!, only: [:index]

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
    booked_dates = @reservation.booked_dates
    reservation = {
      id: @reservation.id,
      roomId: @reservation.room_id,
      name: @reservation.name,
      phone: @reservation.phone,
      places: @reservation.places,
      description: @reservation.description,
      deposit: @reservation.deposit,
      startDate: @reservation.start_date.strftime('%d.%m.%Y'),
      endDate: @reservation.end_date.strftime('%d.%m.%Y')}
    render json: {reservation: reservation, bookedDates: booked_dates}
  end

  def create
    if room = @hotel.rooms.find_by_id(params[:reservation][:room_id])
      if params[:from_user]
        r = room.reservations.create(reservation_params.merge({places: room.places, user_id: current_user.try(:id), status: @hotel.auto_booking ? 'approved' : 'pending'}))
      else
        r = room.reservations.create(reservation_params)
      end
      if r.persisted?
        if params[:from_calendar]
          render json: {
            success: true,
            reservations: room.reservations.approved.for_dates(room, params[:date].try(:to_date).try(:at_beginning_of_month) || Date.today.at_beginning_of_month, params[:date].try(:to_date).try(:at_end_of_month) || Date.today.at_end_of_month).map do |reservation|
              {id: reservation.id,
               title: reservation.name,
               phone: reservation.phone,
               places: reservation.places,
               description: reservation.description,
               deposit: reservation.deposit,
               start: reservation.start_date,
               end: reservation.end_date,
               allDay: false}
            end
          }
        elsif params[:from_list]
          render json: {
            success: true,
            reservations: @hotel.reservations.approved.for_dates(@hotel, params[:start_date].try(:to_date), params[:end_date].try(:to_date)).map do |reservation|
              {id: reservation.id,
               name: reservation.name,
               room: Room.find_by_id(reservation.room_id).number,
               roomId: reservation.room_id,
               phone: reservation.phone,
               description: reservation.description,
               deposit: reservation.deposit,
               places: reservation.places,
               startDate: reservation.start_date.strftime('%d.%m.%Y'),
               endDate: reservation.end_date.strftime('%d.%m.%Y')}
            end
          }
        elsif params[:from_chess]
          render json: {
            success: true,
            reservations: @hotel.reservations.approved.map { |reservation|
              { id: reservation.id,
                group: reservation.room_id,
                title: reservation.name,
                start_time: (reservation.start_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
                end_time: (reservation.end_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M')}
            }}
        elsif params[:from_user]
          UserBookingEmailJob.perform_later(r) if current_user
          BookingEmailForHotelJob.perform_later(r)
          render json: { success: true }
        else
          rooms = if params[:reservation][:floor] == 'all'
            @hotel.rooms.order(:number)
          else
            @hotel.rooms.order(:number).in_floor(params[:reservation][:floor])
          end
          render json: {
            success: true,
            rooms: rooms.each_with_object({}) {|room, hash|
              reservations = room.reservations.approved.for_dates(room, params[:reservation][:start_date].to_date, params[:reservation][:end_date].to_date)
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
      else
        render json: {success: false, error: r.errors.full_messages.first}
      end
    elsif params[:from_ratrak]
      r = @hotel.reservations.create(reservation_params)
      if r.persisted?
        render json: {
          success: true,
          reservations: @hotel.ratrak.reservations.approved.where('start_date < ? AND end_date > ?', params[:date].try(:to_date).try(:at_end_of_month) || Date.today.at_end_of_month, params[:date].try(:to_date).try(:at_beginning_of_month) || Date.today.at_beginning_of_month).map do |reservation|
          {  id: reservation.id,
             name: reservation.name,
             title: "#{reservation.name} - #{reservation.places}",
             phone: reservation.phone,
             places: reservation.places,
             description: reservation.description,
             deposit: reservation.deposit,
             start: (reservation.start_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
             end: (reservation.end_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
             allDay: false}
          end
        }
      else
        render json: {success: false, error: r.errors.full_messages.first}
      end
    else
      render json: {success: false, error: 'Перезавантажте сторінку'}
    end
  end

  def update
    reservation = @hotel.reservations.find_by_id(params[:id])
    room = reservation.room
    if reservation.update(reservation_params)
      if params[:from_list]
        reservations = @hotel.reservations.approved
        render json: {
          success: true,
          totalReservationsCount: reservations.count,
          reservations: reservations.for_dates(@hotel, params[:start_date].try(:to_date), params[:end_date].try(:to_date))
                          .order(created_at: :desc).page(params[:page] || 1).per(10).each_with_object({}) {|reservation, hash| hash[reservation.id] =
            {id: reservation.id,
             name: reservation.name,
             room: Room.find_by_id(reservation.room_id).number,
             roomId: reservation.room_id,
             phone: reservation.phone,
             places: reservation.places,
             deposit: reservation.deposit,
             description: reservation.description,
             startDate: reservation.start_date.strftime('%d.%m.%Y'),
             endDate: reservation.end_date.strftime('%d.%m.%Y')}
          }
        }
      elsif params[:from_pending]
        reservations = @hotel.reservations.pending
        render json: {
          success: true,
          totalReservationsCount: reservations.count,
          reservations: reservations.order(created_at: :desc).page(params[:page] || 1).per(10).each_with_object({}) {|reservation, hash| hash[reservation.id] =
            {id: reservation.id,
             name: reservation.name,
             room: Room.find_by_id(reservation.room_id).number,
             roomId: reservation.room_id,
             phone: reservation.phone,
             places: reservation.places,
             created: reservation.created_at.in_time_zone('Kyiv').strftime('%d.%m.%Y %H:%M'),
             description: reservation.description,
             startDate: reservation.start_date.strftime('%d.%m.%Y'),
             endDate: reservation.end_date.strftime('%d.%m.%Y')}
          }
        }
      elsif params[:from_chess]
        render json: {
          success: true,
          reservations: @hotel.reservations.approved.map { |reservation|
            { id: reservation.id,
              group: reservation.room_id,
              title: reservation.name,
              start_time: (reservation.start_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
              end_time: (reservation.end_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M')}
          }}
      elsif params[:from_ratrak]
        render json: {
          success: true,
          reservations: @hotel.ratrak.reservations.approved.where('start_date < ? AND end_date > ?', params[:date].try(:to_date).try(:at_end_of_month) || Date.today.at_end_of_month, params[:date].try(:to_date).try(:at_beginning_of_month) || Date.today.at_beginning_of_month).map do |reservation|
            {id: reservation.id,
             name: reservation.name,
             title: "#{reservation.name} - #{reservation.places}",
             phone: reservation.phone,
             places: reservation.places,
             description: reservation.description,
             deposit: reservation.deposit,
             start: (reservation.start_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
             end: (reservation.end_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
             allDay: false}
          end
        }
      else
        render json: {
          success: true,
          reservations: room.reservations.approved.for_dates(room, params[:date].try(:to_date).try(:at_beginning_of_month) || Date.today.at_beginning_of_month, params[:date].try(:to_date).try(:at_end_of_month) || Date.today.at_end_of_month).map do |reservation|
            {id: reservation.id,
             title: reservation.name,
             room: Room.find_by_id(reservation.room_id).number,
             roomId: reservation.room_id,
             phone: reservation.phone,
             places: reservation.places,
             description: reservation.description,
             deposit: reservation.deposit,
             start: reservation.start_date,
             end: reservation.end_date,
             allDay: false}
          end
        }
      end
    else
      render json: {success: false, error: reservation.errors.full_messages.first}
    end
  end

  def destroy
    reservation = @hotel.reservations.find_by_id(params[:id])
    room = reservation.room
    reservation.destroy
    if params[:from_calendar]
      render json: {
        success: true,
        reservations: room.reservations.approved.for_dates(room, params[:date].try(:to_date).try(:at_beginning_of_month) || Date.today.at_beginning_of_month, params[:date].try(:to_date).try(:at_end_of_month) || Date.today.at_end_of_month).map do |reservation|
          {id: reservation.id,
           title: reservation.name,
           phone: reservation.phone,
           places: reservation.places,
           description: reservation.description,
           start: reservation.start_date,
           end: reservation.end_date,
           allDay: false}
        end
      }
    elsif params[:from_list]
      reservations = @hotel.reservations.approved
      render json: {
        success: true,
        totalReservationsCount: reservations.count,
        reservations: reservations.for_dates(@hotel, params[:start_date].try(:to_date), params[:end_date].try(:to_date))
                        .order(created_at: :desc).page(params[:page] || 1).per(10).each_with_object({}) {|reservation, hash| hash[reservation.id] =
          {id: reservation.id,
           name: reservation.name,
           room: Room.find_by_id(reservation.room_id).number,
           roomId: reservation.room_id,
           phone: reservation.phone,
           places: reservation.places,
           description: reservation.description,
           startDate: reservation.start_date.strftime('%d.%m.%Y'),
           endDate: reservation.end_date.strftime('%d.%m.%Y')}
        }
      }
    elsif params[:from_pending]
      reservations = @hotel.reservations.pending
      render json: {
        success: true,
        totalReservationsCount: reservations.count,
        reservations: reservations.order(created_at: :desc).page(params[:page] || 1).per(10).each_with_object({}) {|reservation, hash| hash[reservation.id] = {
           id: reservation.id,
           name: reservation.name,
           room: Room.find_by_id(reservation.room_id).number,
           roomId: reservation.room_id,
           phone: reservation.phone,
           places: reservation.places,
           description: reservation.description,
           startDate: reservation.start_date.strftime('%d.%m.%Y'),
           endDate: reservation.end_date.strftime('%d.%m.%Y')}
        }
      }
    elsif params[:from_chess]
      render json: {
        success: true,
        reservations: @hotel.reservations.approved.map { |reservation|
          { id: reservation.id,
            group: reservation.room_id,
            title: reservation.name,
            start_time: (reservation.start_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
            end_time: (reservation.end_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M')}
        }}
    elsif params[:from_ratrak]
      render json: {
        success: true,
        reservations: @hotel.ratrak.reservations.approved.where('start_date < ? AND end_date > ?', params[:date].try(:to_date).try(:at_end_of_month) || Date.today.at_end_of_month, params[:date].try(:to_date).try(:at_beginning_of_month) || Date.today.at_beginning_of_month).map do |reservation|
          {id: reservation.id,
           name: reservation.name,
           title: "#{reservation.name} - #{reservation.places}",
           phone: reservation.phone,
           places: reservation.places,
           description: reservation.description,
           deposit: reservation.deposit,
           start: (reservation.start_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
           end: (reservation.end_date.to_datetime + Time.parse("12:00").seconds_since_midnight.seconds).strftime('%Y-%m-%d %H:%M'),
           allDay: false}
        end
      }
    else
      rooms = if params[:floor] == 'all'
        @hotel.rooms.order(:number)
      else
        @hotel.rooms.order(:number).in_floor(params[:floor])
      end
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
              startDate: reservation.start_date.strftime('%d.%m.%Y'),
              endDate: reservation.end_date.strftime('%d.%m.%Y')}
            }
          }
        }}
    end
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
      params.require(:reservation).permit(:name, :phone, :places, :description, :status, :deposit, :start_date, :end_date, :hotel_id, :room_id, :ratrak_id)
    end

    def define_hotel
      @hotel = Hotel.friendly.find(params[:hotel_id])
    end
end