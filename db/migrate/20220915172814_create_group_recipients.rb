class CreateGroupRecipients < ActiveRecord::Migration[6.1]
  def change
    create_table :group_recipients, :id => false do |t|
      t.references :group
      t.references :recipient

      t.timestamps
    end
  end
end
