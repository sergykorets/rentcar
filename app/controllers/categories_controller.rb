class CategoriesController < ApplicationController
  
  before_action :set_category, only: [:show]

  def show
    set_meta_tags title: "#{@topic.name}",
                  description: "#{@topic.name}",
                  keywords: "#{@topic.name}"
    @category = {
        name: @topic.name,
        description: @topic.description,
        slug: @topic.slug,
        photo: @topic.photo}
    @cars = @topic.cars.active.map do |car|
      { name: car.name,
        slug: car.slug,
        description: car.description,
        color: car.color,
        places: car.places,
        gearbox: car.gearbox,
        body_type: car.body_type,
        year: car.year,
        fuel: car.fuel,
        engine: car.engine,
        avatar: car.photos.try(:first).try(:picture)}
end
    respond_to do |format|
      format.html { render :show }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @topic = Category.friendly.find(params[:id])
  end
end
