class CreateSuggest < ActiveRecord::Migration[5.1]
  def change
    create_table :suggests do |t|
      t.text :body
      t.string :email
      t.integer :user_id
      t.integer :hotel_id
    end
  end
end
