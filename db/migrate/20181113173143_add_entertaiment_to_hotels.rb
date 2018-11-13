class AddEntertaimentToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :sauna, :boolean, default: false
    add_column :hotels, :chan, :boolean, default: false
    add_column :hotels, :disco, :boolean, default: false
  end
end