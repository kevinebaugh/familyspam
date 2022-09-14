class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :raw_content
      t.timestamps
    end

    add_reference :messages, :group

  end
end
