class Parent < ActiveRecord::Base
	# has_many :incentives
	has_many :patients
	belongs_to :user
  has_many :incentives
end
