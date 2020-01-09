class Car < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  GOOGLE_KEY = Rails.application.secrets.google_key || ENV['google_key']
  enum gearbox: [:auto, :manual]
  enum body_type: [:sedan, :cabrio, :hatchback]
  enum fuel: [:benzin, :gas, :diesel, :electro, :gybrid]

  has_many :photos, dependent: :destroy
  has_many :reservations
  belongs_to :category

  scope :active, -> {where(active: true)}

  validates_presence_of :name

  accepts_nested_attributes_for :photos, allow_destroy: true
  accepts_nested_attributes_for :reservations, allow_destroy: true

end