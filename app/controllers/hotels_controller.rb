class HotelsController < ApplicationController
  before_action :set_hotel, only: [:show, :edit, :update, :destroy]
  before_action :check_session, only: :index

  def index
    @hotels = Hotel.lodging.order(created_at: :desc).map do |hotel|
      { id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        created: hotel.created_at,
        price: hotel.price,
        site: hotel.site,
        googleRating: hotel.average_rating,
        location: hotel.location,
        avatar: get_hotel_avatar(hotel)}
    end
  end

  def show
    @hotel = {
      id: @hotel.id,
      editable: (current_user && current_user.admin) || (current_user && current_user.id == @hotel.user_id),
      name: @hotel.name,
      description: @hotel.description,
      created: @hotel.created_at,
      price: @hotel.price,
      site: @hotel.site,
      hotelType: @hotel.hotel_type,
      googleRating: @hotel.average_rating,
      location: @hotel.location,
      photos: get_hotel_photos,
      sessionComment: params[:comment],
      phones: @hotel.phones.map {|phone| phone.phone},
      googleReviews: combine_reviews}
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
        mainPhotoId: @hotel.main_photo_id,
        mainPhotoType: @hotel.main_photo_type,
        photosForUpload: [],
        googlePhotos: @hotel.google_photos.any? ? @hotel.google_photos.map {|photo| {id: photo.id, photo: photo.photo_url}} : [],
        photos: @hotel.photos.any? ? @hotel.photos.map {|photo| {id: photo.id, photo: photo.picture(:large)}} : [],
        phones: @hotel.phones.any? ? @hotel.phones.map {|phone| {id: phone.id, phone: phone.phone}} : [{phone: ''}]}
    else
      redirect_to hotel_path(@hotel)
    end
  end

  def create
    @hotel = Hotel.new(hotel_params)
    if @hotel.save
      render json: { success: true, hotel: @hotel }
    else
      render json: { success: false, errors: @hotel.errors.full_messages }
    end
  end

  def update
    if @hotel.update(hotel_params)
      render json: { success: true, hotel: @hotel }
    else
      render json: { success: false, errors: @hotel.errors.full_messages }
    end
  end

  # DELETE /hotels/1
  # DELETE /hotels/1.json
  def destroy
    @hotel.destroy
    respond_to do |format|
      format.html { redirect_to hotels_url, notice: 'Hotel was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hotel
      @hotel = Hotel.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hotel_params
      params.require(:hotel).permit(:name, :description, :hotel_type, :site, :main_photo_id, :main_photo_type, :price, phones_attributes: [:id, :phone, :_destroy],
                                    google_photos_attributes: [:id, :_destroy], photos_attributes: [:id, :_destroy, photo: [:picture]])
    end

    def combine_reviews
      a = @hotel.google_reviews.order(time: :desc).map do |review|
        { author: review.author_name,
          avatar: review.profile_photo_url,
          rating: review.rating,
          text: review.text,
          created: DateTime.strptime(review.time.to_s,'%s').strftime('%d.%m.%Y')}
      end
      b = @hotel.reviews.order(created_at: :desc).map do |review|
        { id: review.id,
          author: review.user.name || review.user.email,
          avatar: review.user.remote_avatar_url || review.user.avatar,
          rating: review.rating,
          text: review.comment,
          destroyable: current_user == review.user,
          created: review.created_at.strftime('%d.%m.%Y')}
      end
      (a + b).sort_by do |item|
        item[:created].to_date
      end.reverse
    end

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

    def get_hotel_photos
      google_photos = @hotel.google_photos.map {|photo| photo.photo_url}
      photos = @hotel.photos.map {|photo| photo.picture}
      google_photos + photos
    end

    def check_session
      if session[:review_url]
        redirect_to session[:review_url]
        session[:review_url] = ''
      end
    end
end
