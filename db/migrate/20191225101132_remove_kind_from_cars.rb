class RemoveKindFromCars < ActiveRecord::Migration[5.1]
  def change
    remove_column :cars, :kind, :integer
  end
end
