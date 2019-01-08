class CreateRatrak < ActiveRecord::Migration[5.1]
  def change
    create_table :ratraks do |t|
      t.integer :places
      t.integer :hotel_id
    end
  end
end
