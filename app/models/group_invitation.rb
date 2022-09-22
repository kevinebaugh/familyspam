class GroupInvitation < ApplicationRecord
  require 'mailgun-ruby'

  belongs_to :group

  validates_presence_of :email_address

  before_create :set_expiration_date
  before_create :create_code

  after_create :send_invitation

  INVITATION_EXPIRATION_IN_SECONDS = 86400

  def active?
    (Time.now.to_i - created_at.to_i) < INVITATION_EXPIRATION_IN_SECONDS
  end

  def set_expiration_date
    self.expiration_date = Time.now + INVITATION_EXPIRATION_IN_SECONDS
  end

  def create_code
    self.code = SecureRandom.hex
  end

  def send_invitation
    mg_client = Mailgun::Client.new(ENV["MAILGUN_KEY"])

    message_params = {
      from: group.group_admin.email_address,
      to: email_address,
      "h:Reply-To": group.group_admin.email_address,
      subject: "You're invited to the #{group.name} group on OutstandingBeef.com",
      text: "Code: #{code} | Expiration date: #{expiration_date}"
    }

    mg_client.send_message 'outstandingbeef.com', message_params
  end

  def self.validate_code(code)
    invitation = self.find_by(code: code)
    if invitation&.active?
      true
    else
      false
    end
  end

end
