class AddHotelIdToReviews < ActiveRecord::Migration[5.0]
  def change
    add_column :reviews, :hotel_id, :integer
  end
end
