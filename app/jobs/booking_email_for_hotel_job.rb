class BookingEmailForHotelJob < ApplicationJob
  queue_as :default

  def perform(reservation)
    BookingMailer.booking_email_for_hotel(reservation).deliver
    BookingMailer.booking_email_for_admin(reservation).deliver
  end
end