class Message < ApplicationRecord
  require 'mailgun-ruby'

  belongs_to :group, counter_cache: true

  validates :direction, inclusion: ["incoming", "outgoing"]

  after_create :create_outgoing_messages_from_incoming_message, if: :incoming?

  def incoming?
    direction == "incoming"
  end

  def outgoing?
    direction == "outgoing"
  end

  def create_outgoing_messages_from_incoming_message
    group.recipients.each do |recipient|
      puts "📤 Sending email to #{recipient.email_address}"
      puts "From: #{from}"
      puts "Subject: #{subject}"
      puts "Body-plain: #{raw_content}"

      mg_client = Mailgun::Client.new(ENV["MAILGUN_KEY"])

      # Define your message parameters
      message_params = {
        from: "#{group.email_alias}@familyspam.com",
        to: recipient.email_address,
        "h:Reply-To": "#{group.email_alias}@familyspam.com, #{from}",
        subject: subject,
        text: raw_content
      }

      mg_client.send_message 'familyspam.com', message_params
    end
  end
end
