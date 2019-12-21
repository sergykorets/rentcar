class Reservation < ApplicationRecord
  belongs_to :car, optional: true

  enum status: [:pending, :approved, :declined]

  validates_presence_of :name, :email, :phone

end