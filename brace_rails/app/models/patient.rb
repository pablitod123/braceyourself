class Patient < ActiveRecord::Base
	belongs_to :doctor
	belongs_to :parent 
	# has_many :incentives
	# has_one :data
end
