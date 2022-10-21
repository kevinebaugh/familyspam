# Create groups
rand(10..20).times do
  last_name = Faker::Name.last_name

  group = Group.create!(
    name: last_name,
    email_alias: "the-#{last_name}s"
  )

  GroupAdmin.create!(
    email_address: Faker::Internet.safe_email,
    password: "hello",
    password_confirmation: "hello",
    group_id: group.id
  )
end

Group.all.each do |group|
  rand(10..50).times do
    Message.create!(
      body_plain: Faker::Lorem.sentences(number: rand(10)),
      body_html: Faker::Lorem.sentences(number: rand(10)),
      group_id: group.id,
      direction: "outgoing",
      subject: Faker::Lorem.sentence(word_count: rand(10)),
      from: Faker::Internet.safe_email
    )
  end

  rand(2..10).times do
    recipient = Recipient.create!(
      email_address: Faker::Internet.safe_email
    )

    GroupRecipient.create!(
      group_id: group.id,
      recipient_id: recipient.id
    )
  end
end

all_group_ids = Group.pluck(:id)

# Create group invitations
rand(10..20).times do
  GroupInvitation.create!(
    group_id: all_group_ids.sample,
    email_address: Faker::Internet.safe_email
  )
end

rand(10..20).times do
  Faq.create!(
    question: Faker::Lorem.question,
    answer: Faker::Lorem.paragraph(sentence_count: rand(1..5)),
    weight: rand(1000)
  )
end

puts "🌱 Created #{Recipient.count} #{"Recipient".pluralize(Recipient.count)}"
puts "🌱 Created #{Group.count} #{"Group".pluralize(Group.count)}"
puts "🌱 Created #{GroupAdmin.count} #{"GroupAdmin".pluralize(GroupAdmin.count)}"
puts "🌱 Created #{GroupRecipient.count} #{"GroupRecipient".pluralize(GroupRecipient.count)}"
puts "🌱 Created #{GroupInvitation.count} #{"GroupInvitation".pluralize(GroupInvitation.count)}"
puts "🌱 Created #{Message.count} #{"Message".pluralize(Message.count)}"
puts "🌱 Created #{Faq.count} #{"Faq".pluralize(Faq.count)}"
