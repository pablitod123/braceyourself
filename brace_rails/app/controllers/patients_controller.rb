class PatientsController < ApplicationController
	def show
    progress_bar(params[:id])
  end
end
