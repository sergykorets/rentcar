class AddNameToGooglePhotos < ActiveRecord::Migration[5.1]
  def change
    add_column :google_photos, :name, :string
  end
end
