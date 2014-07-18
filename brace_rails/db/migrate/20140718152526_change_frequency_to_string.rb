class ChangeFrequencyToString < ActiveRecord::Migration
  def change
    change_column :incentives, :frequency, :string
  end
end
