class EditHotelsColumns < ActiveRecord::Migration[5.0]
  def change
  	rename_column :hotels, :rating, :google_rating
  	add_column :hotels, :site_rating, :string
  	add_column :hotels, :average_rating, :string
  end
end
