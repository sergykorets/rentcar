class Phone < ApplicationRecord
	belongs_to :hotel

	validates_presence_of :phone
end