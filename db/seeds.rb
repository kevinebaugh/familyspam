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
  name: "Kevins",
  email_alias: "kevins"
)

group_admin = GroupAdmin.create(
  email_address: "admin@kevin.org",
  group_id: kevins.id
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
  name: "Ebaughs",
  email_alias: "ebaughs"
)

group_admin = GroupAdmin.create(
  email_address: "admin@ebaugh.org",
  group_id: ebaughs.id
)

ebaughs_recipients =[
  kevin,
  Recipient.create(
    email_address: "lizmeg726@gmail.com"
  )
]

ebaughs_recipients.each do |recipient|
  GroupRecipient.create(
    group_id: ebaughs.id,
    recipient_id: recipient.id
  )
end

puts "🌱 Created #{Recipient.count} Recipients, #{Group.count} Groups, and #{GroupRecipient.count} GroupRecipients."
