class AddComplectationToCars < ActiveRecord::Migration[5.1]
  def change
    add_column :cars, :gps, :boolean, default: false
    add_column :cars, :wifi, :boolean, default: false
    add_column :cars, :conditioner, :boolean, default: false
    add_column :cars, :bluetooth, :boolean, default: false
    add_column :cars, :abs, :boolean, default: false
    add_column :cars, :parktronic, :boolean, default: false
  end
end
