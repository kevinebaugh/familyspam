# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

kevin = Recipient.create(
  email_address: "kevinebaugh@gmail.com"
)

kevins = Group.create(
  name: "Kevin",
  email_alias: "kevins"
)

group_admin = GroupAdmin.create(
  email_address: "kevinebaugh+kevins-admin@gmail.com",
  group_id: kevins.id,
  password_digest: "test"
)

kevins_recipients = [
  kevin,
  Recipient.create(
    email_address: "kevin@ifttt.com"
  )
]

kevins_recipients.each do |recipient|
  GroupRecipient.create(
    group_id: kevins.id,
    recipient_id: recipient.id
  )
end

ebaughs = Group.create(
  name: "Ebaugh",
  email_alias: "ebaughs"
)

group_admin = GroupAdmin.create(
  email_address: "kevinebaugh+ebaughs-admin@gmail.com",
  group_id: ebaughs.id,
  password_digest: "test"
)

ebaughs_recipients =[
  kevin,
  Recipient.create(
    email_address: "kevinebaugh+anotherebaugh@gmail.com"
  )
]

ebaughs_recipients.each do |recipient|
  GroupRecipient.create(
    group_id: ebaughs.id,
    recipient_id: recipient.id
  )
end

GroupInvitation.create(
  group_id: ebaughs.id,
  email_address: "kevinebaugh+invitation-#{SecureRandom.hex}@gmail.com"
)

# Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])

Faq.create([
  {
    question: "Who?",
    answer: "You?",
    weight: rand(1000)
  },
  {
    question: "What?",
    answer: "Did I stutter?",
    weight: rand(1000)
  },
  {
    question: "Where?",
    answer: "There!",
    weight: rand(1000)
  },
  {
    question: "When?",
    answer: "I forget.",
    weight: rand(1000)
  },
  {
    question: "Why?",
    answer: "Why not!",
    weight: rand(1000)
  }
])

puts "🌱 Created #{Recipient.count} #{"Recipient".pluralize(Recipient.count)}"
puts "🌱 Created #{Group.count} #{"Group".pluralize(Group.count)}"
puts "🌱 Created #{GroupAdmin.count} #{"GroupAdmin".pluralize(GroupAdmin.count)}"
puts "🌱 Created #{GroupRecipient.count} #{"GroupRecipient".pluralize(GroupRecipient.count)}"
puts "🌱 Created #{GroupInvitation.count} #{"GroupInvitation".pluralize(GroupInvitation.count)}"
puts "🌱 Created #{Faq.count} #{"Faq".pluralize(Faq.count)}"
