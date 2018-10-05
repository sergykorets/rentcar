class CreateGooglePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :google_photos do |t|
      t.integer :hotel_id, index: true
      t.string :photo_url

      t.timestamps
    end
  end
end
