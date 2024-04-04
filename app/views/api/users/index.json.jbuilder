json.array! @users do |user|
  json.extract! user, :id, :email, :username,:created_at
  json.room_id user.rooms.pluck(:id) if user.rooms.present? 
end