class SuggestsController < ApplicationController

  def create
    suggest = Suggest.new(suggest_params)
    suggest.user_id = current_user.try(:id)
    suggest.hotel_id = params[:hotel_id]
    if suggest.save
      render json: {success: true}
    else
      render json: {success: false, error: 'Пропозиція не може бути пустою'}
    end
  end

  private

  def suggest_params
    params.require(:suggest).permit(:body, :email)
  end
end
