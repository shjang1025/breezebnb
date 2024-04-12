class Review < ApplicationRecord
    validates :title, :description, presence: true
    validates :cleanliness, :accuracy, 
                :communication, :location, :value,
                numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
    
    belongs_to :reviewer,
        class_name: :User, 
        foreign_key: :reviewer_id
    
    belongs_to :room, 
    class_name: :Room, 
    foreign_key: :review_room_id

end
