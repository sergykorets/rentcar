class CreatePhotos < ActiveRecord::Migration[5.0]
  def up
    create_table :photos do |t|
      t.integer :hotel_id
      t.timestamps
    end
    add_attachment :photos, :picture
  end

  def down
  	drop_table :photos
  	remove_attachment :photos, :picture
  end
end
