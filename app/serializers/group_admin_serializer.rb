class GroupAdminSerializer < ActiveModel::Serializer
  attributes :id, :email_address, :recipients

  belongs_to :group

  def recipients
    object.group.recipients
  end
end
