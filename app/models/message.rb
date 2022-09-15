class Message < ApplicationRecord
  belongs_to :group

  validates :direction, inclusion: ["incoming", "outgoing"]
end
