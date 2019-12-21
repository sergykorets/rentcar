class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.integer :car_id
      t.string :name
      t.string :phone
      t.string :email
      t.text :description
    end
  end
end
