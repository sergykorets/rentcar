class CreateGoogleReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :google_reviews do |t|
      t.integer :hotel_id
      t.string :author_name
      t.string :profile_photo_url
      t.integer :rating
      t.string :relative_time_description
      t.text :text
      t.integer :time

      t.timestamps
    end
  end
end
