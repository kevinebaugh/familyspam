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
    puts "In create_outgoing_from_incoming"
    puts "\n\n\n\n\n\n\n\n#{id}\n\n\n\n\n\n\n\n"
    puts "\n\n\n\n\n\n\n\ngroup: #{group.id}\n\n\n\n\n\n\n\n"
  end
end
