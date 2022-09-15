class CreateRecipients < ActiveRecord::Migration[6.1]
  def change
    create_table :recipients do |t|
      t.text :email_address
      t.timestamps
    end
  end
end
