class AddUserIdToSubclasses < ActiveRecord::Migration
  def change
  	add_column :doctors, :user_id, :integer
  	add_column :patients, :user_id, :integer
  	add_column :parents, :user_id, :integer
  end
end
