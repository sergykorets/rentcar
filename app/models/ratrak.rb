class Ratrak < ApplicationRecord
  belongs_to :hotel
  has_many :reservations

  validates :places, presence: true, numericality: { greater_than_or_equal_to: 0 }

  accepts_nested_attributes_for :reservations
end