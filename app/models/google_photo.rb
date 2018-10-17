class GooglePhoto < ApplicationRecord
	belongs_to :hotel
	scope :not_deleted, -> {where(deleted: false)}
end
