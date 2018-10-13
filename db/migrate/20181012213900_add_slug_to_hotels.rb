class AddSlugToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :slug, :string
  end
end
