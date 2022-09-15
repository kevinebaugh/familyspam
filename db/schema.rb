# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_15_171209) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "group_admins", force: :cascade do |t|
    t.string "email_address"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "group_id"
    t.index ["group_id"], name: "index_group_admins_on_group_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.string "email_alias"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "group_admin_id"
    t.index ["group_admin_id"], name: "index_groups_on_group_admin_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "raw_content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "group_id"
    t.string "direction"
    t.index ["group_id"], name: "index_messages_on_group_id"
  end

  create_table "recipients", force: :cascade do |t|
    t.text "email_address"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "group_id"
    t.index ["group_id"], name: "index_recipients_on_group_id"
  end

end
