class PatientsController < ApplicationController
	def show
    @incentives = Incentive.all.where(patient_id: params[:id])
  end
end
