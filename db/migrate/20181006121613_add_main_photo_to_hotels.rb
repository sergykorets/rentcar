class AddMainPhotoToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :main_photo_id, :integer
  end
end
