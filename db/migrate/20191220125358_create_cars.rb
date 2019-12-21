class CreateCars < ActiveRecord::Migration[5.1]
  def change
    create_table :cars do |t|
      t.string :name
      t.text :description
      t.integer :kind
      t.string :color
      t.integer :places
      t.integer :gearbox
      t.integer :body_type
      t.integer :year
      t.integer :fuel
      t.float :engine
    end
  end
end
