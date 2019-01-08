class AddRatrakIdToReservations < ActiveRecord::Migration[5.1]
  def change
    add_column :reservations, :ratrak_id, :integer
  end
end
