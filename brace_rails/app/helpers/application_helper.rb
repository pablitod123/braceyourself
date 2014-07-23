module ApplicationHelper
  def progress_bar(format, patient_id)
    require 'csv'

    file = 'public/'+ format.to_s + patient_id.to_s+'.csv'

    whole_file_length = CSV.read(file).length

    data = CSV.read(file)[1..whole_file_length]
    data_length = data.length

    #References
    info_file = 'public/info' + patient_id.to_s+'.csv'
    info = CSV.read(info_file)
    pos_ref = info[1][3].to_f #position reference
    force_zero = info[1][1].to_f
    
    #Compliance Total

    compliance_sum = 0
    (0..data_length-1).each do |n|
      if data[n][1].to_f > pos_ref && data[n][0].to_f > force_zero
        compliance_sum += 1
      end
    end

    @length_stuff = ((data_length).to_f)*100
    @compliance_sum = compliance_sum
    @compliance_percentage = ((compliance_sum / (data_length).to_f)*100).round(2)

    if @compliance_percentage>60 && @compliance_percentage<80
      @compliance_message = '<h3>Getting there, keep going!</h3>'.html_safe
    elsif @compliance_percentage>80 && @compliance_percentage<100
      @compliance_message = '<h3>So close, almost there!</h3>'.html_safe
    end

    #Position
    
    # Brace is tight if (aveposition > PosRef)
    position_sum = 0
    (0..data_length-1).each do |n|
      if data[n][1].to_f > pos_ref
        position_sum += 1
      end
    end

    @position_percentage = (position_sum / (data_length-1).to_f)*100

    if @position_percentage>60 && @position_percentage<80
      @position_message = '<h3>Getting there, keep going!</h3>'.html_safe
    elsif @position_percentage>80 && @position_percentage<100
      @position_message = '<h3>So close, almost there!</h3>'.html_safe
    end

    #Force

    # Brace is on if (aveforce >(ForceZero))
    force_sum = 0
    (0..data_length-1).each do |n|
      if data[n][0].to_f > force_zero
        force_sum += 1
      end
    end

    @force_percentage = (force_sum / data_length.to_f)*100

    if @force_percentage>60 && @force_percentage<80
      @force_message = '<h3>Getting there, keep going!</h3>'.html_safe
    elsif @force_percentage>80 && @force_percentage<100
      @force_message = '<h3>So close, almost there!</h3>'.html_safe
    end

    @format = format
  end
end
