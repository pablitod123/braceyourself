class AddIncentivesTable < ActiveRecord::Migration
  def change
    create_table :incentives do |t|
      t.string :title
      t.text :description
      t.integer :frequency
      t.integer :compliance
      t.integer :reward
      t.belongs_to :parent
      t.belongs_to :patient
 
      t.timestamps
    end
  end
end
