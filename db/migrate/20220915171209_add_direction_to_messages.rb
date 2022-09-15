class AddDirectionToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :direction, :string
  end
end
