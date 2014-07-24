# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
 
# create 3 doctors

user = User.create(email: "doctordre@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Doctor", fname: "Dre", lname: "Carter")
	Doctor.create(user_id: user.id)

user = User.create(email: "doctorsmith@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Doctor", fname: "Steve", lname: "Smith")
	Doctor.create(user_id: user.id)

user = User.create(email: "doctorjones@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Doctor", fname: "Michael", lname: "Jones")
	Doctor.create(user_id: user.id)

# create 15 parents
user = User.create(email: "coolmom@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Kelly", lname: "Scott")
	Parent.create(user_id: user.id)

user = User.create(email: "cooldad@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Clark", lname: "Kent")
	Parent.create(user_id: user.id)

user = User.create(email: "greatmother@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Sarah", lname: "Scott")
	Parent.create(user_id: user.id)

user = User.create(email: "greatfather@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Lee", lname: "Robinson")
	Parent.create(user_id: user.id)

user = User.create(email: "supermom@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Regina", lname: "Johnson")
	Parent.create(user_id: user.id)

user = User.create(email: "superdad@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Bruce", lname: "Wayne")
	Parent.create(user_id: user.id)

user = User.create(email: "imadad@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "John", lname: "Reams")
	Parent.create(user_id: user.id)

user = User.create(email: "imamom@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Mary", lname: "Lankford")
	Parent.create(user_id: user.id)

user = User.create(email: "imaparent@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Theresa", lname: "Poole")
	Parent.create(user_id: user.id)

user = User.create(email: "superdad2@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Bruce", lname: "Wayne")
	Parent.create(user_id: user.id)

user = User.create(email: "imadad2@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "John", lname: "Reams")
	Parent.create(user_id: user.id)

user = User.create(email: "imamom2@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Mary", lname: "Lankford")
	Parent.create(user_id: user.id)

user = User.create(email: "imaparent2@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Parent", fname: "Theresa", lname: "Poole")
	Parent.create(user_id: user.id)


# create 15 patients
user = User.create(email: "patient1@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Sam", lname: "Davis")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 1 )

user = User.create(email: "patient2@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Beyonce", lname: "Knowles")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 2 )

user = User.create(email: "patient3@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Drew", lname: "Springer")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 3 )

user = User.create(email: "patient4@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Bruce", lname: "Springsteen")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 4 )

user = User.create(email: "patient5@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Irene", lname: "Davis")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 5 )

user = User.create(email: "patient6@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Christina", lname: "Jones")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 6 )

user = User.create(email: "patient7@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Loren", lname: "Davis")
	Patient.create(user_id: user.id, doctor_id: 1, parent_id: 7 )

user = User.create(email: "patient8@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Christine", lname: "Bleiburg")
	Patient.create(user_id: user.id, doctor_id: 2, parent_id: 8 )

user = User.create(email: "patient9@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Reese", lname: "Horton")
	Patient.create(user_id: user.id, doctor_id: 2, parent_id: 9 )

user = User.create(email: "patient10@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Cheryl", lname: "Sanders")
	Patient.create(user_id: user.id, doctor_id: 2, parent_id: 10 )

user = User.create(email: "patient11@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Courtney", lname: "Brown")
	Patient.create(user_id: user.id, doctor_id: 2, parent_id: 11 )

user = User.create(email: "patient12@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Bella", lname: "Lenn")
	Patient.create(user_id: user.id, doctor_id: 2, parent_id: 12 )

user = User.create(email: "patient13@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Isabella", lname: "Scott")
	Patient.create(user_id: user.id, doctor_id: 3, parent_id: 13 )

user = User.create(email: "patient14@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Adam", lname: "Reed")
	Patient.create(user_id: user.id, doctor_id: 3, parent_id: 14 )

user = User.create(email: "patient15@gmail.com", password: "supersecret", password_confirmation: "supersecret", role: "Patient", fname: "Reid", lname: "Parrott")
	Patient.create(user_id: user.id, doctor_id: 3, parent_id: 15 )


10.times do |i|
	freq = ['day', 'week', 'month']
	Incentive.create(title:"Incentive Title #{i+1}", description:"This is the description.", frequency:freq.sample, compliance: [*50..100].sample, reward: [*1..20].sample, parent_id: i+1, patient_id: i+1 )
end






