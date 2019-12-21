class AddAttachmentToPhotos < ActiveRecord::Migration[5.1]
  def up
    add_attachment :photos, :picture
  end

  def down
    remove_attachment :photos, :picture
  end
end
