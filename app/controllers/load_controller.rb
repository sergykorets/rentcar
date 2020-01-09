class LoadController < ApplicationController
  layout 'hotel_admin'
  before_action :authenticate_user!
  def index
    if !current_user.admin?
      redirect_to root_path
    else
      cars = Car.all
      @cars = cars.map {|car| {id: car.id, title: "#{car.name}"}}
      reservations = if params[:start_date]
                       Reservation.for_dates(params[:start_date].to_date - 15.days, params[:end_date].to_date + 15.days)
                     else
                       Reservation.for_dates(Time.now, Time.now + 40.days)
                     end
      @reservations = reservations.map { |reservation|
        { id: reservation.id,
          group: reservation.car_id,
          title: reservation.name,
          start_time: reservation.start_date.to_datetime.strftime('%Y-%m-%d %H:%M'),
          end_time: reservation.end_date.to_datetime.strftime('%Y-%m-%d %H:%M'),}
      }
      respond_to do |format|
        format.html { render :index }
        format.json {{reservations: @reservations}}
      end
    end
  end
end
