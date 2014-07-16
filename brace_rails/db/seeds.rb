# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
 
3.times do |i|
	user = User.create(email: "doctor#{i}@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Doctor", fname: "Steve#{i}", lname: "Smith#{i}")
	Doctor.create(user_id: user.id)
end 

15.times do |i|
	user = User.create(email: "parent#{i}@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Carl#{i}", lname: "Davis#{i}")
	Parent.create(user_id: user.id)
end 

5.times do |i|
	user = User.create(email: "patient#{i}@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Kelly#{i}", lname: "Davis#{i}")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: i + 1 )
end 

5.times do |i|
	user = User.create(email: "patient#{i}@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Kelly#{i}", lname: "Davis#{i}")
	Patient.create(user_id: user.id, doctor_id: 2, parent_id: i + 6 )
end 

5.times do |i|
	user = User.create(email: "patient#{i}@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Kelly#{i}", lname: "Davis#{i}")
	Patient.create(user_id: user.id, doctor_id: 3, parent_id: i + 11 )
end 






