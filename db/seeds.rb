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
  email_address: "admin@kevin.org",
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
  email_address: "admin@ebaugh.org",
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
  email_address: "kevinebaugh+invitation-#{SecureRandom.hex}@gmail.com}"
)

puts "🌱 Created #{Recipient.count} Recipients, #{Group.count} Groups, #{GroupAdmin.count} GroupAdmins, #{GroupRecipient.count} GroupRecipients, and #{GroupInvitation.count} GroupInvitation."
