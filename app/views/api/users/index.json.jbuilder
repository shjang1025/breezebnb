@users.each do |user|
  json.set! user.id do #set key
    json.extract! user, :id, :email, :username,:created_at
    json.room_id user.rooms.pluck(:id) if user.rooms.present? 
  end
end