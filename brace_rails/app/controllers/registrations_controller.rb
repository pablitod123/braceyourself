class RegistrationsController < Devise::RegistrationsController
	

	protected

	def after_sign_up_path_for(resource)
		if current_user.role == "Doctor"
			@doctor = Doctor.create(user_id: current_user.id)
			'/doctors/'+@doctor.id.to_s
		end
	end
end
