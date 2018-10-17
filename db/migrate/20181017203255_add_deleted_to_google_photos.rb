class AddDeletedToGooglePhotos < ActiveRecord::Migration[5.1]
  def change
    add_column :google_photos, :deleted, :boolean, default: false
  end
end