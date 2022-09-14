class GroupAdmin < ApplicationRecord
  has_secure_password
  belongs_to :group

  validates :email_address, presence: true, uniqueness: { case_sensitive: false }
end
