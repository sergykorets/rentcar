class Reservation < ApplicationRecord
  belongs_to :car, optional: true

  enum status: [:pending, :approved, :declined]

  validates_presence_of :name, :email, :phone, :start_date, :end_date
  validate :check_availability

  private

  def check_availability
    car = Car.find_by_id(car_id)
    if car&.reservations.where('start_date < ? AND end_date > ?', end_date, start_date).any?
      errors.add(:base, 'Нажаль ця машина на цей час недоступна')
    end
  end
end