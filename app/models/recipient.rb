class Recipient < ApplicationRecord
  has_many :group_recipients
  has_many :groups, through: :group_recipients

  validates :email_address, presence: true, uniqueness: { case_sensitive: false }
end
