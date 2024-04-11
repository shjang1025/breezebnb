
json.extract! @room, :id, :title, :description, :price, :address, :city, :state, :country, 
              :category, :capacity, :beds, :rooms, :baths
json.amenities do 
            json.parking @room.parking
            json.washer @room.washer
            json.dryer @room.dryer
            json.tv @room.tv
            json.ac @room.ac
            json.heater @room.heater
            json.wifi @room.wifi
            json.kitchen @room.kitchen
            json.microwave @room.microwave
            json.fireplace @room.fireplace
            json.pets @room.pets
end
json.owner_id @room.user.id

if @room.photo.attached?
  json.photoUrl url_for(@room.photo)
end

if @room.reservations.present?
    json.reservation_id @room.reservations.map{ |reservation| 
        json.id reservation.id
    } 
end
