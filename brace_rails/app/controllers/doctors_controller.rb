class DoctorsController < ApplicationController
  include ApplicationHelper
	
  def show
  	@doctor = Doctor.find(params[:id])
  	@allpatients = (Doctor.find(params[:id]).patients)
     
    if params[:search]
      @users = User.search(params[:search]).order("created_at DESC")
    else
      @users = User.all.order('created_at DESC')
    end
  end

  def loadsuggestions
    @suggestions = User.select(:fname)
    render json: @suggestions
  end


  # if params[:search]
  #     @users = User.search(params[:search]).order("created_at DESC")
  #   else
  #     @users = User.all.order('created_at DESC')
  # end

	def showpatient
    if params[:pos_ref] != nil
      update_prescription(params[:pos_ref], params[:force_zero], params[:patient_id])
    end
	 @thispatient = User.find(Patient.find(params[:patient_id]).user_id)
	end 

  def editpatient
    @doctor = Doctor.find(params[:id])
    @thispatient = User.find(Patient.find(params[:patient_id]).user_id)
  end

  def changepatient
    update_prescription(params[:pos_ref], params[:force_zero], params[:patient_id])
    redirect_to :controller=>'doctors', :action=>'showpatient', :id=>params[:id], :patient_id=>params[:patient_id]
  end


end
