class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_attached_file :photo, styles: { medium: '300x300>', large: '600x600>' }, default_url: "missing.jpg"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
  has_many :cars
  scope :active, -> {where(active: true)}
end