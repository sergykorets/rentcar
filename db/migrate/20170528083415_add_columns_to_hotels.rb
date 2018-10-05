class AddColumnsToHotels < ActiveRecord::Migration[5.0]
  def change
    add_column :hotels, :site, :string
    add_column :hotels, :phone, :string
  end
end
