class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :email_alias

  has_many :messages
  has_many :group_recipients
  has_many :recipients, through: :group_recipients
  has_one :group_admin
  has_many :group_invitations
end
