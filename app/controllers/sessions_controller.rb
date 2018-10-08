class SessionsController < Devise::SessionsController
  before_action :set_session, only: :new

  def new
    super
  end

  private

  def set_session
    session[:review_url] = "/hotels/#{params[:hotel]}?comment=#{params[:comment]}"
  end
end