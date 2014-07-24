class DoctorsController < ApplicationController

	
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
	@thispatient = User.find(Patient.find(params[:patient_id]).user_id)
	end 

end
