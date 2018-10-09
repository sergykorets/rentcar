class AddBookingLinkToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :booking_link, :string
  end
end
