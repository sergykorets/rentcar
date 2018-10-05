class RemoveAvatarFromHotels < ActiveRecord::Migration[5.0]
  def change
  	remove_attachment :hotels, :avatar
  end
end
