class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
		print "Inside sign in path for"
		
		if current_user.role == "Doctor"
			doctor_path(id: Doctor.find_by(user_id: current_user.id).id)

		elsif current_user.role == "Patient"
			patient_path(id: Patient.find_by(user_id: current_user.id).id)
		
		else current_user.role == "Parent"
			parent_path(id: Parent.find_by(user_id: current_user.id).id)
		end
  end

  

  protected

  def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :role, :fname, :lname) }
  end
end
