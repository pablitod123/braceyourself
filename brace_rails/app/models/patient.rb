class Patient < ActiveRecord::Base
	belongs_to :doctor
	belongs_to :parent 
	belongs_to :user
  has_many :incentives
	# has_many :incentives
	# has_one :data
end
