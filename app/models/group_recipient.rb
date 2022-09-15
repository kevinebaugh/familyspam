class GroupRecipient < ApplicationRecord
  belongs_to :group
  belongs_to :recipient
end
