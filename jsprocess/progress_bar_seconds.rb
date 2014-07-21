require 'csv'

data = CSV.read('seconds.csv')[1..7201]

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

puts position_percentage = position_sum / 7200.to_f


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

puts force_percentage = force_sum / 7200.to_f


