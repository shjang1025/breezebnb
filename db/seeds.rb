# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# ActiveRecord::Base.connection.tables.each do |t|
#     ActiveRecord::Base.connection.reset_pk_sequence!(t)
    

# end

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('rooms')

ActiveRecord::Base.connection.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE rooms_id_seq RESTART WITH 1;")

User.destroy_all
user1 = User.create!(username: "aaaa", email: 'aaaa@test.com', password: "password", gender: "Female")
user2 = User.create!(username: "bbbb", email: 'bbbb@test.com', password: "password", gender: "Female")
user3 = User.create!(username: "cccc", email: 'cccc@test.com', password: "password", gender: "Male")
user4 = User.create!(username: "dddd", email: 'dddd@test.com', password: "password", gender: "Male")
