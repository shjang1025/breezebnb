
json.extract! @reservation, :id, :checkin, :checkout, :num_guests

json.reserver_id @reservation.reserver.id
json.room_id @reservation.room.id
