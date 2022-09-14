class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :email_alias
      t.timestamps
    end

    add_reference :groups, :group_admin

  end
end
