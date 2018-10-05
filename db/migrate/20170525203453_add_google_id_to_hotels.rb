class AddGoogleIdToHotels < ActiveRecord::Migration[5.0]
  def change
    add_column :hotels, :google_id, :string
  end
end
