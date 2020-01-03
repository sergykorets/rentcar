class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.text :description
      t.string :slug
      t.boolean :active, default: false
      t.attachment :photo
    end
  end
end
