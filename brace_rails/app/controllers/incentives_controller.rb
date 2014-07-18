class IncentivesController < ApplicationController
  def new
    @incentive = Incentive.new
  end

  def create
    @incentive = Incentive.new(incentive_params)
    @incentive.save
    redirect_to parent_path(id: Parent.find_by(user_id: current_user.id).id)
  end

  def edit
    @incentive = Incentive.find(params[:id])
  end

  def update
    @incentive = Incentive.find(params[:id])
    @incentive.update_attributes(incentive_params)
    redirect_to parent_path(id: @incentive.parent_id)
  end

  def destroy
    @incentive = Incentive.find(params[:id])
    Incentive.find(params[:id]).destroy
    redirect_to parent_path(id: @incentive.parent_id)
  end

  private
    def incentive_params
      params.require(:incentive).permit(:title, :description, :frequency, :compliance, :reward, :parent_id, :patient_id)
    end
end
