class CreateGroupInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :group_invitations do |t|
      t.references :group
      t.string :email_address
      t.string :code
      t.timestamp :expiration_date

      t.timestamps
    end
  end
end
