class GroupInvitation < ApplicationRecord
  require 'mailgun-ruby'

  belongs_to :group

  validates_presence_of :email_address
  validate :unique_invitation, on: :create

  before_create :set_expiration_date
  before_create :create_code

  after_create :send_invitation

  INVITATION_EXPIRATION_IN_SECONDS = 86400

  def active?
    (Time.now.to_i - created_at.to_i) < INVITATION_EXPIRATION_IN_SECONDS
  end

  def unique_invitation
    receiving_group = Group.find(group_id)

    if receiving_group.recipients.find_by(email_address: email_address).present?
      errors.add(:base, "#{email_address} is already a member of this group")
    end

    if GroupInvitation.where(group_id: group_id, email_address: email_address).any?(&:active?)
      errors.add(:base, "#{email_address} already has an active invitation to this group")
    end
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
      subject: "👋 You're invited to the #{group.name} family on FamilySpam.com",
      text: "Quick, you only have 24 hours to accept this invitation: http://#{ENV["DOMAIN"]}/accept/#{code}"
    }

    mg_client.send_message 'familyspam.com', message_params
  end

  def self.send_welcome(group_id:, email_address:)
    group = Group.find(group_id)

    mg_client = Mailgun::Client.new(ENV["MAILGUN_KEY"])

    message_params = {
      from: group.group_admin.email_address,
      to: email_address,
      "h:Reply-To": group.group_admin.email_address,
      subject: "✅ You're now a member of the #{group.name} family on FamilySpam.com",
      text: "Welcome!\n\nEmails sent to #{group.email_alias}@familyspam.com are forwarded to all members of the #{group.name} family (#{group.recipients.pluck(:email_address).join(", ")})\n\nReach out to #{group.group_admin.email_address} (or respond to this email) with any questions or issues."
    }

    mg_client.send_message 'familyspam.com', message_params
  end

  def self.notify_group_admin_of_accepted_invitation(group_id:, email_address:)
    group = Group.find(group_id)

    mg_client = Mailgun::Client.new(ENV["MAILGUN_KEY"])

    message_params = {
      from: email_address,
      to: group.group_admin.email_address,
      "h:Reply-To": email_address,
      subject: "➕ #{email_address} is now a member of the #{group.name} family on FamilySpam.com",
      text: "Emails sent to #{group.email_alias}@familyspam.com are forwarded to all members of the #{group.name} family (#{group.recipients.pluck(:email_address).join(", ")})."
    }

    mg_client.send_message 'familyspam.com', message_params
  end

  def self.validate_code(code)
    invitation = self.find_by(code: code)
    if invitation&.active? && invitation.group.recipients.find_by(email_address: invitation.email_address).blank?
      true
    else
      false
    end
  end

end
