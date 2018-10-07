module ApplicationHelper
  def user_avatar(user)
    if !user.avatar_file_name.nil?
      if controller.action_name = 'edit'
        return current_user.avatar.url(:medium)
      else
        return current_user.avatar.url(:thumb)
      end
    else
      if !current_user.remote_avatar_url.nil?
        return current_user.remote_avatar_url
      else
        return current_user.avatar.url(:thumb)
      end
    end
  end

  def user_review(review)
    User.find_by_id(review.user_id)
  end

  def update_hotel_rating(hotel)
    average = hotel.reviews.average(:rating)
    hotel.update_column(:site_rating, average)
    site_rating = hotel.site_rating.try(:to_d)
    google_rating = hotel.google_rating.try(:to_d)
    if google_rating && site_rating
      hotel.update_column(:average_rating, (google_rating + site_rating)/2)
    elsif site_rating && !google_rating
      hotel.update_column(:average_rating, site_rating)
    elsif !site_rating && google_rating
      hotel.update_column(:average_rating, google_rating)
    end
  end
end
