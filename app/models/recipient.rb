class Recipient < ApplicationRecord
  has_many :group_recipients
  has_many :groups, through: :group_recipients
end
