class CreateGroupAdmins < ActiveRecord::Migration[6.1]
  def change
    create_table :group_admins do |t|
      t.string :email_address
      t.string :password_digest
      t.timestamps
    end

    add_reference :group_admins, :group

  end
end
