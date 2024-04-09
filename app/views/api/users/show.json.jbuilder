json.user do
  json.extract! @user, :id, :email, :username, :created_at
  json.room_id @user.rooms.pluck(:id) if @user.rooms.present?
  json.reservation_id @user.reservations.pluck(:id) if @user.reservations.present?
end