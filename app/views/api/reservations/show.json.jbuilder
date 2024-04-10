json.reservation do
    json.set! @reservation.id  do #set key
    json.extract! @reservation, :id, :checkin, :checkout, :num_guests

        json.reserver_id @reservation.reserver.id #json.blah => key name(blah)
        json.room_id @reservation.room.id
    end
ends