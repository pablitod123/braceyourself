class AddDoctorAndParentIdToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :doctor_id, :integer
    add_column :patients, :parent_id, :integer
  end
end
