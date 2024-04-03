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

ActiveRecord::Schema[7.1].define(version: 2024_04_02_041107) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "rooms", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "price_per_night", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "country", null: false
    t.string "category", null: false
    t.integer "capacity", null: false
    t.integer "num_beds", null: false
    t.integer "num_rooms", null: false
    t.integer "num_bathrooms", null: false
    t.boolean "has_parking", default: false, null: false
    t.boolean "has_washer", default: false, null: false
    t.boolean "has_dryer", default: false, null: false
    t.boolean "has_tv", default: false, null: false
    t.boolean "has_AC", default: false, null: false
    t.boolean "has_heater", default: false, null: false
    t.boolean "has_wifi", default: false, null: false
    t.boolean "has_kitchen", default: false, null: false
    t.boolean "has_microwave", default: false, null: false
    t.boolean "has_fireplace", default: false, null: false
    t.boolean "has_pets", default: false, null: false
    t.bigint "host_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["host_id"], name: "index_rooms_on_host_id"
    t.index ["title"], name: "index_rooms_on_title"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "gender", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "rooms", "users", column: "host_id"
end
