class Message < ApplicationRecord
  require 'mailgun-ruby'

  belongs_to :group

  validates :direction, inclusion: ["incoming", "outgoing"]

  after_create :send_outgoing_messages_after_incoming_message, if: :incoming?

  def incoming?
    direction == "incoming"
  end

  def outgoing?
    direction == "outgoing"
  end

  def send_outgoing_messages_after_incoming_message
    group.recipients.each do |recipient|
      puts "📤 Sending email to #{recipient.email_address}"
      puts "From: #{from}"
      puts "Subject: #{subject}"

      mg_client = Mailgun::Client.new(ENV["MAILGUN_KEY"])

      # Define your message parameters
      message_params = {
        from: "#{group.email_alias}@familyspam.com",
        to: recipient.email_address,
        "h:Reply-To": "#{group.email_alias}@familyspam.com, #{from}",
        subject: subject,
        text: body_plain,
        html: body_html
      }

      mg_client.send_message 'familyspam.com', message_params
    end
  end
end
