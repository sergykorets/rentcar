class RevomePhoneFromHotels < ActiveRecord::Migration[5.0]
  def change
  	remove_column :hotels, :phone
  end
end
