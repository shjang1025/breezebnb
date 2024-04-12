json.set! review.id  do #set key
    json.extract! review, :id, :title, :description, :cleanliness, :accuracy, :location, :value
    json.reviewer_id review.reviewer.id #json.blah => key name(blah)
    json.review_room_id review.room.id
    
    json.cleanliness review.cleanliness
    json.accuracy review.accuracy
    json.location review.location
    json.value review.value

end