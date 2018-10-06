class AddUserIdToHotels < ActiveRecord::Migration[5.1]
  def change
    add_column :hotels, :user_id, :integer
    add_index :hotels, :user_id
  end
end