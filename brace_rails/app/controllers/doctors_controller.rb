class DoctorsController < ApplicationController

	def show
	# id = Doctor.find_by(user_id: current_user.id).id
	@allpatients = (Doctor.find(params[:id]).patients)
	end

	def showpatient
	@thispatient = User.find(Patient.find(params[:id]).user_id)
	end 

end
