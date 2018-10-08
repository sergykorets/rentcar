class SessionsController < Devise::SessionsController
  def new
    session[:review_url] = "/hotels/#{params[:hotel]}?comment=#{params[:comment]}"
    super
  end
end