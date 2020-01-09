class CarsController < ApplicationController
  before_action :set_car, only: [:show]

  def index
    # set_meta_tags title: "Драгобрат, готелі на карті 3D, ціни, відгуки, схема підйомників, веб камери"
    @admin = Rails.env.development? || current_user&.admin
    @categories = Category.active.map do |c|
      { name: c.name,
        description: c.description,
        slug: c.slug,
        photo: c.photo}
    end
    respond_to do |format|
      format.html { render :index }
    end
  end

  def show
    set_meta_tags title: "#{@car.name}",
                  description: "#{@car.name}",
                  keywords: "#{@car.name}"
    @admin = Rails.env.development? || current_user&.admin
    @auto = {
      id: @car.id,
      name: @car.name,
      description: @car.description,
      slug: @car.slug,
      gearbox: @car.gearbox,
      places: @car.places,
      fuel: @car.fuel,
      color: @car.color,
      body_type: @car.body_type,
      year: @car.year,
      engine: @car.engine,
      gps: @car.gps,
      wifi: @car.wifi,
      conditioner: @car.conditioner,
      bluetooth: @car.bluetooth,
      abs: @car.abs,
      parktronic: @car.parktronic,
      photos: @car.photos.map(&:picture)}
    respond_to do |format|
      format.html { render :show }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_car
    @car = Car.friendly.find(params[:id])
  end
end
