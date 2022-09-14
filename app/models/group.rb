class Group < ApplicationRecord
  has_many :messages
  has_many :recipients
  has_one :group_admin
end
