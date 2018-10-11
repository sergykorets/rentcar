# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181011181412) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "google_photos", id: :serial, force: :cascade do |t|
    t.integer "hotel_id"
    t.string "photo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hotel_id"], name: "index_google_photos_on_hotel_id"
  end

  create_table "google_reviews", id: :serial, force: :cascade do |t|
    t.integer "hotel_id"
    t.string "author_name"
    t.string "profile_photo_url"
    t.integer "rating"
    t.string "relative_time_description"
    t.text "text"
    t.integer "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hotels", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "google_id"
    t.string "site"
    t.string "reference"
    t.string "google_rating"
    t.string "location"
    t.string "site_rating"
    t.string "average_rating"
    t.integer "user_id"
    t.integer "main_photo_id"
    t.integer "hotel_type", default: 0
    t.string "main_photo_type"
    t.string "booking_link"
    t.decimal "latitude"
    t.decimal "longitude"
    t.index ["user_id"], name: "index_hotels_on_user_id"
  end

  create_table "nearby_hotels", force: :cascade do |t|
    t.integer "hotel_id"
    t.integer "nearby_hotel_id"
  end

  create_table "phones", id: :serial, force: :cascade do |t|
    t.integer "hotel_id"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hotel_id"], name: "index_phones_on_hotel_id"
  end

  create_table "photos", id: :serial, force: :cascade do |t|
    t.integer "hotel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "picture_file_name"
    t.string "picture_content_type"
    t.integer "picture_file_size"
    t.datetime "picture_updated_at"
    t.string "photo_url"
  end

  create_table "places", id: :serial, force: :cascade do |t|
    t.integer "number"
    t.integer "user_id"
  end

  create_table "reviews", id: :serial, force: :cascade do |t|
    t.integer "rating"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "hotel_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string "provider"
    t.string "uid"
    t.string "remote_avatar_url"
    t.boolean "admin", default: false
    t.datetime "deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
