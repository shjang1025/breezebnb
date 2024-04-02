class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :price , null: false
      t.string :location, null: false
      t.string :category, null: false
      t.integer :max_person, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
