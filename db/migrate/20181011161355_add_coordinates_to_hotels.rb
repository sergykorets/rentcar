class AddCoordinatesToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :latitude, :decimal
    add_column :hotels, :longitude, :decimal
  end
end
