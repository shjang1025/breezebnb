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

ActiveRecord::Schema[7.1].define(version: 2024_04_11_225613) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "reserved_person_id", null: false
    t.bigint "reserved_room_id", null: false
    t.date "checkin", null: false
    t.date "checkout", null: false
    t.integer "num_guests", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reserved_person_id"], name: "index_reservations_on_reserved_person_id"
    t.index ["reserved_room_id"], name: "index_reservations_on_reserved_room_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "cleanliness", null: false
    t.integer "accuracy", null: false
    t.integer "communication", null: false
    t.integer "location", null: false
    t.integer "value", null: false
    t.bigint "reviewer_id", null: false
    t.bigint "review_room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["review_room_id"], name: "index_reviews_on_review_room_id"
    t.index ["reviewer_id"], name: "index_reviews_on_reviewer_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "price", null: false
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "country", null: false
    t.string "category", null: false
    t.integer "capacity", null: false
    t.integer "beds", null: false
    t.integer "rooms", null: false
    t.integer "baths", null: false
    t.boolean "parking", default: false, null: false
    t.boolean "washer", default: false, null: false
    t.boolean "dryer", default: false, null: false
    t.boolean "tv", default: false, null: false
    t.boolean "ac", default: false, null: false
    t.boolean "heater", default: false, null: false
    t.boolean "wifi", default: false, null: false
    t.boolean "kitchen", default: false, null: false
    t.boolean "microwave", default: false, null: false
    t.boolean "fireplace", default: false, null: false
    t.boolean "pets", default: false, null: false
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "reservations", "rooms", column: "reserved_room_id"
  add_foreign_key "reservations", "users", column: "reserved_person_id"
  add_foreign_key "reviews", "rooms", column: "review_room_id"
  add_foreign_key "reviews", "users", column: "reviewer_id"
  add_foreign_key "rooms", "users", column: "host_id"
end
