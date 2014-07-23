class PatientsController < ApplicationController
	# before_action :get_patient

	# def get_patient
	# 	@thispatient = User.find(Patient.find(params[:patient_id]).user_id)
	# end

	def show
    @incentives = Incentive.all.where(patient_id: params[:id])
	# @thispatient = User.find(Patient.find(params[:patient_id]).user_id)
  	@doctor = Doctor.find(params[:doctor_id])
  	@patient = @doctor.patients.find(params[:id])
	end
end
