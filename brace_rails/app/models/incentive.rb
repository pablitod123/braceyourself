class Incentive < ActiveRecord::Base
  belongs_to :parent
  belongs_to :patient
end
