class AddPositionToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :position, :integer, default: 200
  end
end
