json.array! @users do |user|
  json.extract! user, :id, :email, :username, :created_at
end