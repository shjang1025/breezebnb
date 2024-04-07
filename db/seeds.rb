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
user5 = User.create!(username: "eeee", email: 'eeee@test.com', password: "password", gender: "Female")
user6 = User.create!(username: "ffff", email: 'ffff@test.com', password: "password", gender: "Male")
user7 = User.create!(username: "gggg", email: 'gggg@test.com', password: "password", gender: "Female")
user8 = User.create!(username: "hhhh", email: 'hhhh@test.com', password: "password", gender: "Male")
user9 = User.create!(username: "iiii", email: 'iiii@test.com', password: "password", gender: "Female")
user10 = User.create!(username: "jjjj", email: 'jjjj@test.com', password: "password", gender: "Male")
user11 = User.create!(username: "kkkk", email: 'kkkk@test.com', password: "password", gender: "Male")

Room.destroy_all
room1 = Room.create!(title: "Massive Downtown Seattle Condo",
                    description: "Welcome to a one-of-a-kind, expansive condominium nestled in downtown Seattle, 
                    boasting unparalleled luxury and convenience. This centrally located gem offers a modern loft design, upscale amenities, 
                    towering windows and gourmet kitchen. Immerse yourself in the vibrant culture of Seattle, 
                    with top attractions just steps away. Experience urban living at its finest in this extraordinary Airbnb sanctuary.",
                    price: 180, address: '12345 Cherry St', city: 'Seattle', state: 'WA', country: 'USA', category: 'design',
                    capacity: 5, beds: 4, rooms: 3, baths: 2, parking: true,
                    washer: false, dryer: false, heater: true, ac: true, tv: true, wifi: true,
                    kitchen: true, microwave: true, fireplace: false, pets: true, host_id: 1)

# file = File.open('app/assets/images/seattle-apt.jpeg')
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/seattle-apt.jpg")
room1.photo.attach(io: file, filename: 'seattle-apt.jpeg')

room2 = Room.create!(
    title: "Beautiful Fully Renovated 3-Bedroom Apartment.",
    description: "Located right in Heart of West New York, Full of restaurants,  Small Comercial Stores.  Easy transportation to Times Square. 15-20 minutes to Manhattan.",
    price: 269, address: '63rd Madison St', city: 'West New York', state: 'NJ', country: 'USA', category: 'amazing_views',
    capacity: 8, beds: 4, rooms: 3, baths: 2, parking: true,
    washer: true, dryer: true, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: false, pets: false, host_id: 2)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/ny.jpg")
room2.photo.attach(io: file, filename: 'ny.jpg')

room3 = Room.create!(title: "Oceanfront Malibu Townhouse On Quiet Road",
    description: "This contemporary oceanfront townhouse on quiet and star-studded Malibu Road has amazing views, granite and limestone kitchen & bathrooms, living room with fireplace, tub for two, one parking space, and lounge/recreation area. It is spacious, quiet and private with sounds of the rhythmic surf in every room.",
    price: 500, address: '25142 Pacific Coast Hwy', city: 'Malibu', state: 'CA', country: 'USA', category: 'beach_front',
    capacity: 6, beds: 3, rooms: 3, baths: 3, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 3)

file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/malibu.jpg")
room3.photo.attach(io: file, filename: 'malibu.jpg')

room4 = Room.create!(title: "Rustic Cabin Retreat in the Smoky Mountains",
    description: "Escape to this rustic cabin retreat nestled in the picturesque Smoky Mountains. Surrounded by serene forest landscapes, this cozy cabin offers a tranquil getaway from the hustle and bustle of everyday life. Spend your days hiking scenic trails, fishing in nearby streams, or simply relaxing on the spacious deck. Experience the charm of mountain living at this enchanting Airbnb hideaway.",
    price: 120, address: '4567 Pine Ln', city: 'Gatlinburg', state: 'TN', country: 'USA', category: 'omg',
    capacity: 4, beds: 2, rooms: 1, baths: 1, parking: true,
    washer: false, dryer: false, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: true, host_id: 4)

room5 = Room.create!(title: "Modern Loft in Downtown Los Angeles",
    description: "Discover urban sophistication in this modern loft located in downtown Los Angeles. With its sleek design, open-concept layout, and skyline views, this loft offers a contemporary retreat in the heart of the city. Explore nearby entertainment venues, dine at trendy restaurants, or simply relax in style. Experience the vibrant energy of LA at this chic Airbnb oasis.",
    price: 200, address: '54321 Main St', city: 'Los Angeles', state: 'CA', country: 'USA', category: 'amazing_pools',
    capacity: 3, beds: 2, rooms: 1, baths: 1, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: false, pets: false, host_id: 5)

room6 = Room.create!(title: "Secluded Treehouse Retreat in the Redwoods",
    description: "Escape to this secluded treehouse retreat nestled among the majestic Redwoods. Tucked away in nature, this enchanting treehouse offers a unique and unforgettable experience. Disconnect from the outside world and reconnect with nature as you listen to the sounds of the forest and gaze at the star-filled sky. Experience the magic of treehouse living at this extraordinary Airbnb sanctuary.",
    price: 250, address: '1010 Forest Ave', city: 'Santa Cruz', state: 'CA', country: 'USA', category: 'amazing_pools',
    capacity: 2, beds: 1, rooms: 1, baths: 1, parking: false,
    washer: false, dryer: false, heater: true, ac: false, tv: false, wifi: true,
    kitchen: false, microwave: false, fireplace: true, pets: false, host_id: 6)

room7 = Room.create!(title: "Historic Townhouse in Boston's Beacon Hill",
    description: "Step back in time at this historic townhouse located in Boston's prestigious Beacon Hill neighborhood. Dating back to the 19th century, this elegant townhouse seamlessly blends classic charm with modern comfort. Explore cobblestone streets, visit nearby landmarks, or simply unwind in the lush courtyard garden. Experience timeless elegance at this exquisite Airbnb residence.",
    price: 300, address: '2222 Beacon St', city: 'Boston', state: 'MA', country: 'USA', category: 'camping',
    capacity: 6, beds: 3, rooms: 2, baths: 2, parking: false,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 7)

room8 = Room.create!(title: "Ski-In/Ski-Out Chalet in Aspen",
    description: "Experience the ultimate ski-in/ski-out getaway at this luxurious chalet in Aspen. Nestled in the heart of the Rocky Mountains, this chalet offers direct access to world-class skiing and snowboarding trails. After a day on the slopes, unwind in the outdoor hot tub, cozy up by the fireplace, or enjoy apres-ski cocktails on the spacious deck. Experience mountain luxury at its finest at this exquisite Airbnb retreat.",
    price: 600, address: '3333 Mountain Rd', city: 'Aspen', state: 'CO', country: 'USA', category: 'camping',
    capacity: 10, beds: 6, rooms: 4, baths: 4, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 8)

room9 = Room.create!(title: "Quaint Farmhouse in the French Countryside",
    description: "Escape to the serene beauty of the French countryside at this quaint farmhouse retreat. Surrounded by rolling hills and vineyards, this charming farmhouse offers a peaceful escape from the hustle and bustle of city life. Spend your days exploring nearby villages, savoring local cuisine, or simply relaxing in the lush garden. Experience the timeless allure of rural France at this enchanting Airbnb hideaway.",
    price: 180, address: '4444 Vineyard Ln', city: 'Provence', state: 'Provence-Alpes-Côte d\'Azur', country: 'France', category: 'amazing_views',
    capacity: 6, beds: 4, rooms: 3, baths: 2, parking: true,
    washer: true, dryer: true, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: true, host_id: 9)

room10 = Room.create!(title: "Contemporary Loft in San Francisco's SoMa District",
    description: "Immerse yourself in city living at this contemporary loft located in San Francisco's vibrant SoMa district. With its sleek design, high ceilings, and industrial-chic aesthetic, this loft offers a stylish urban retreat. Explore nearby galleries, dine at trendy eateries, or simply relax on the rooftop terrace with panoramic city views. Experience the dynamic energy of San Francisco at this chic Airbnb sanctuary.",
    price: 280, address: '5555 Market St', city: 'San Francisco', state: 'CA', country: 'USA', category: 'beach_front',
    capacity: 4, beds: 2, rooms: 1, baths: 1, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: false, pets: false, host_id: 10)

room11 = Room.create!(title: "Serenity Cabin Retreat in the Colorado Rockies",
    description: "Find peace and tranquility at this serene cabin retreat nestled in the breathtaking Colorado Rockies. Surrounded by pristine wilderness, this cozy cabin offers an idyllic escape from the stresses of modern life. Spend your days hiking scenic trails, fishing in crystal-clear streams, or simply relaxing on the wrap-around porch. Experience the beauty of nature at this enchanting Airbnb hideaway.",
    price: 150, address: '6666 Mountain View Dr', city: 'Breckenridge', state: 'CO', country: 'USA', category: 'omg',
    capacity: 4, beds: 2, rooms: 1, baths: 1, parking: true,
    washer: false, dryer: false, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: true, host_id: 11)

