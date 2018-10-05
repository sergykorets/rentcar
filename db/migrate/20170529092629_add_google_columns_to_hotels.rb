class AddGoogleColumnsToHotels < ActiveRecord::Migration[5.0]
  def change
    add_column :hotels, :reference, :string
    add_column :hotels, :rating, :string
    add_column :hotels, :location, :string
  end
end
