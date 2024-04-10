class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :reserved_person, null: false, foreign_key: {to_table: :users}
      t.references :reserved_room, null: false, foreign_key: {to_table: :rooms}
      t.date :checkin, null: false
      t.date :checkout, null: false
      t.integer :num_guests, null: false

      t.timestamps
    end
  end
end
