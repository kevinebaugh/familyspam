class Message < ApplicationRecord

  belongs_to :group

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
      puts "Subject: #{subject}"
      puts "Body-plain: #{raw_content}"
    end
  end
end
