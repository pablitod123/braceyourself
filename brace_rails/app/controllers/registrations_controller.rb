class RegistrationsController < Devise::RegistrationsController

	protected

	def after_sign_up_path_for(resource)
		if current_user.role == "Doctor"
			@doctor = Doctor.create(user_id: current_user.id)
			'/doctors/'+@doctor.id.to_s

		elsif current_user.role == "Patient"
			@patient = Patient.create(user_id: current_user.id, doctor_id: 2,  parent_id: 1)
			patient_path(id: @patient.id)

		else current_user.role == "Parent"
			@parent = Parent.create(user_id: current_user.id)
			'/parents/'+@parent.id.to_s
		end
	end
end
