class CreateNearbyHotels < ActiveRecord::Migration[5.1]
  def change
    create_table :nearby_hotels do |t|
      t.integer :hotel_id
      t.integer :nearby_hotel_id
    end
  end
end
