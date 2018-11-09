class Room < ApplicationRecord
  belongs_to :hotel
  has_many :reservations

  validates :number, :floor, :places, presence: true, numericality: { greater_than: 0 }
  validates_uniqueness_of :number, scope: :hotel_id

  accepts_nested_attributes_for :reservations

  scope :in_floor, -> (floor) {where(floor: floor)}
end