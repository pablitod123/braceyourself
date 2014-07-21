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

  def progress_bar(patient_id)
    require 'csv'

    file = 'public/seconds'+patient_id.to_s+'.csv'

    data = CSV.read(file)[1..7201]

    #Position

    #position reference
    pos_ref = 500
    position_sum = 0

    # Brace is tight if (aveposition > PosRef)
    (0..7199).each do |n|
      if data[n][1].to_f > pos_ref
        position_sum += 1
      end
    end

    @position_percentage = (position_sum / 7200.to_f)*100


    #Force

    #position reference

    # Brace is on if (aveforce >(ForceZero)) 

    #force zero
    force_zero = 400
    force_sum = 0

    (0..7199).each do |n|
      if data[n][0].to_f > force_zero
        force_sum += 1
      end
    end

    @force_percentage = (force_sum / 7200.to_f)*100
  end


  protected

  def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :role, :fname, :lname) }
  end
end
