class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.string :title, null: false, index: true
      t.text :description, null: false
      t.integer :price_per_night , null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.string :category, null: false
      t.integer :capacity, null: false
      t.integer :num_beds, null: false
      t.integer :num_rooms, null: false
      t.integer :num_bathrooms, null: false
      t.boolean :has_parking, null: false, default: false
      t.boolean :has_washer, null: false, default: false
      t.boolean :has_dryer, null: false, default: false
      t.boolean :has_tv, null: false, default: false
      t.boolean :has_AC, null: false, default: false
      t.boolean :has_heater, null: false, default: false
      t.boolean :has_wifi, null: false, default: false
      t.boolean :has_kitchen, null: false, default: false
      t.boolean :has_microwave, null: false, default: false
      t.boolean :has_fireplace, null: false, default: false
      t.boolean :has_pets, null: false, default: false
      t.references :host, null: false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
