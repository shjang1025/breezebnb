@reviews.each do |review|
    json.set! review.id  do 
        json.extract! review, :id, :title, :description, :cleanliness, :accuracy, :location, :value
        json.reviewer_id review.reviewer.id 
        json.review_room_id review.room.id
        
        json.cleanliness review.cleanliness
        json.accuracy review.accuracy
        json.communication review.communication
        json.location review.location
        json.value review.value
    end
end
