class Car < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  GOOGLE_KEY = Rails.application.secrets.google_key || ENV['google_key']
  enum kind: [:sport, :economy, :comfort, :business]
  enum gearbox: [:auto, :manual]
  enum body_type: [:sedan, :cabrio, :hatchback]
  enum fuel: [:benzin, :gas, :diesel, :electro]

  has_many :reviews, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :reservations

  validates_presence_of :name

  accepts_nested_attributes_for :photos, allow_destroy: true

end