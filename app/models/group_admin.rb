class GroupAdmin < ApplicationRecord
  has_secure_password
  belongs_to :group

  validates :email_address, presence: true, uniqueness: { case_sensitive: false }

  after_create :add_group_admin_as_recipient_of_own_group

  def add_group_admin_as_recipient_of_own_group
    existing_recipient = Recipient.find_by(email_address: email_address)
    recipient = existing_recipient || Recipient.create(email_address: email_address)

    GroupRecipient.create!(
      group_id: group.id,
      recipient_id: recipient.id
    )
  end
end
