class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.string :title, null: false, index: true
      t.text :description, null: false
      t.integer :price , null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.string :category, null: false
      t.integer :capacity, null: false
      t.integer :beds, null: false
      t.integer :rooms, null: false
      t.integer :baths, null: false
      t.boolean :parking, null: false, default: false
      t.boolean :washer, null: false, default: false
      t.boolean :dryer, null: false, default: false
      t.boolean :tv, null: false, default: false
      t.boolean :ac, null: false, default: false
      t.boolean :heater, null: false, default: false
      t.boolean :wifi, null: false, default: false
      t.boolean :kitchen, null: false, default: false
      t.boolean :microwave, null: false, default: false
      t.boolean :fireplace, null: false, default: false
      t.boolean :pets, null: false, default: false
      t.references :host, null: false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
