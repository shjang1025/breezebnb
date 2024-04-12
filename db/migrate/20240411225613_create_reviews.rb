class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :cleanliness, null: false
      t.integer :accuracy, null: false
      t.integer :communication, null: false
      t.integer :location, null: false
      t.integer :value, null: false

      t.references :reviewer, null: false, foreign_key: {to_table: :users}
      t.references :review_room, null: false, foreign_key: {to_table: :rooms}
      
      t.timestamps
    end
  end
end
