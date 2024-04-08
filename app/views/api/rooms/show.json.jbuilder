json.extract! @room, :id, :title, :description, :price, :address, :city, :state, :country, 
              :category, :capacity, :beds, :rooms, :baths, :parking, :washer, :dryer, :tv, :ac, 
              :heater, :wifi, :kitchen, :microwave, :fireplace, :pets
json.owner_id @room.user.id

if @room.photo.attached?
  json.photoUrl url_for(@room.photo)
end