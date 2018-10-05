class CreatePhones < ActiveRecord::Migration[5.0]
  def change
    create_table :phones do |t|
      t.integer :hotel_id, index: true
      t.string :phone

      t.timestamps
    end
  end
end
