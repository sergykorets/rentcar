class Reservation < ApplicationRecord
  belongs_to :car, optional: true

  enum status: [:pending, :approved, :declined]

  validates_presence_of :name, :email, :phone, :start_date, :end_date
  validate :check_availability
  validate :check_dates

  scope :for_dates, -> (view_start, view_end) {where('start_date < ? AND end_date > ?', view_end, view_start)}

  private

  def check_availability
    car = Car.find_by_id(car_id)
    existed = car&.reservations.where('start_date < ? AND end_date > ?', end_date, start_date).where.not(id: id)
    if existed.any? && (car_id_changed? || start_date_changed? || end_date_changed?)
      errors.add(:base, 'Нажаль ця машина на цей час недоступна')
    end
  end

  def check_dates
    errors.add(:base, 'Дата повернення не може бути раніше дати подачі') if start_date > end_date
  end
end