class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :body_plain
      t.text :body_html
      t.timestamps
    end

    add_reference :messages, :group

  end
end
