class CarsController < ApplicationController
  before_action :set_car, only: [:show]

  def index
    # set_meta_tags title: "Драгобрат, готелі на карті 3D, ціни, відгуки, схема підйомників, веб камери"
    # @admin = Rails.env.development? || (current_user && current_user.admin)
    #@cars = Car.all
    # @max_price = hotels.pluck(:price).compact.max
    # @min_price = hotels.pluck(:price).compact.min
    @categories = Category.active.map do |c|
      { name: c.name,
        description: c.description,
        slug: c.slug,
        photo: c.photo}
    end
    # @cars = Car.all.map do |car|
    #   { id: car.id,
    #     name: car.name,
    #     slug: car.slug,
    #     description: car.description,
    #     kind: car.kind,
    #     color: car.color,
    #     places: car.places,
    #     gearbox: car.gearbox,
    #     body_type: car.body_type,
    #     year: car.year,
    #     fuel: car.fuel,
    #     engine: car.engine,
    #     avatar: car.photos.first.picture}
    # end
    respond_to do |format|
      format.html { render :index }
    end
  end

  def show
    set_meta_tags title: "#{@car.name} | Драгобрат",
                  description: "#{@car.name} драгобрат",
                  keywords: "#{@car.name} драгобрат"
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

  def new; end

  def edit
    if (current_user && current_user.admin) || (current_user && current_user.id == @hotel.user_id)
      @hotel = {
        id: @hotel.id,
        name: @hotel.name,
        description: @hotel.description || '',
        hotelType: @hotel.hotel_type,
        price: @hotel.price || '',
        site: @hotel.site || '',
        slug: @hotel.slug,
        sauna: @hotel.sauna,
        chan: @hotel.chan,
        disco: @hotel.disco,
        mainPhotoId: @hotel.main_photo_id,
        mainPhotoType: @hotel.main_photo_type,
        photosForUpload: [],
        googlePhotos: @hotel.google_photos.not_deleted.any? ? @hotel.google_photos.not_deleted.each_with_object({}) {|photo, hash| hash[photo.id] = {
          id: photo.id, photo: photo.photo_url, name: photo.name}} : {},
        photos: @hotel.photos.any? ? @hotel.photos.each_with_object({}) {|photo, hash| hash[photo.id] = {
          id: photo.id, name: photo.name, photo: photo.picture(:large)}} : {},
        phones: @hotel.phones.any? ? @hotel.phones.each_with_object({}) {|phone, hash| hash[phone.id] = {
          id: phone.id, phone: phone.phone}} : {}
      }
    else
      redirect_to hotel_path(@hotel)
    end
  end

  def create
    @hotel = current_user.hotels.new(hotel_params)
    if @hotel.save
      render json: { success: true, slug: @hotel.slug }
    else
      render json: { success: false, errors: @hotel.errors.full_messages }
    end
  end

  def update
    if current_user.admin
      @h = @hotel
    else
      @h = current_user.hotels.friendly.find(params[:id])
    end
    if @h && @h.update(hotel_params)
      render json: { success: true, slug: @hotel.slug }
    else
      render json: { success: false, errors: @hotel.errors.full_messages }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car
      @car = Car.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def car_params
      params.require(:hotel).permit(:name, :description, :hotel_type, :site, :main_photo_id, :main_photo_type, :price, :sauna, :chan, :disco,
                                    :allow_booking, :auto_booking,
                                    rooms_attributes: [:id, :number, :floor, :big_bed, :places, :_destroy], phones_attributes: [:id, :phone, :_destroy],
                                    google_photos_attributes: [:id, :name, :deleted], photos_attributes: [:id, :name, :_destroy, photo: [:picture]])
    end
end
