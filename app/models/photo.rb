class Photo < ApplicationRecord
  belongs_to :hotel	
  has_attached_file :picture, styles: { medium: "800x300#", thumb: "320x150#" }, default_url: "missing.jpg"
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\z/
end
