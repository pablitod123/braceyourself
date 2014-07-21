def progress_bar(format, patient_id)
require 'csv'

    file = format.to_s + patient_id.to_s+'.csv'

    length = CSV.read(file).length

    data = CSV.read(file)[1..length]

    #Position

    #position reference
    pos_ref = 500
    position_sum = 0

    # Brace is tight if (aveposition > PosRef)
    (0..length-2).each do |n|
      if data[n][1].to_f > pos_ref
        position_sum += 1
      end
    end

    @position_percentage = (position_sum / 7200.to_f)*100

    if @position_percentage>60 && @position_percentage<80
      @position_message = '<h3>Getting there, keep going!</h3>'.html_safe
    elsif @position_percentage>80 && @position_percentage<100
      @position_message = '<h3>So close, almost there!</h3>'.html_safe
    end

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

    @force_percentage = (force_sum / 7200.to_f)*100

    if @force_percentage>60 && @force_percentage<80
      @force_message = '<h3>Getting there, keep going!</h3>'.html_safe
    elsif @force_percentage>80 && @force_percentage<100
      @force_message = '<h3>So close, almost there!</h3>'.html_safe
    end
end
