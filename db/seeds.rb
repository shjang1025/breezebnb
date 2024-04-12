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
require 'faker'
ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('rooms')
ActiveRecord::Base.connection.reset_pk_sequence!('reservations')
ActiveRecord::Base.connection.reset_pk_sequence!('reviews')


User.destroy_all
user1 = User.create!(username: "Maria", email: 'aaaa@test.com', password: "password", gender: "Female")
user2 = User.create!(username: "Angela", email: 'bbbb@test.com', password: "password", gender: "Female")
user3 = User.create!(username: "Jonathan", email: 'cccc@test.com', password: "password", gender: "Male")
user4 = User.create!(username: "Suzy", email: 'dddd@test.com', password: "password", gender: "Male")
user5 = User.create!(username: "Hailey", email: 'eeee@test.com', password: "password", gender: "Female")
user6 = User.create!(username: "Jake", email: 'ffff@test.com', password: "password", gender: "Male")
user7 = User.create!(username: "Eva", email: 'gggg@test.com', password: "password", gender: "Female")
user8 = User.create!(username: "Joseph", email: 'hhhh@test.com', password: "password", gender: "Male")
user9 = User.create!(username: "Jennie", email: 'iiii@test.com', password: "password", gender: "Female")
user10 = User.create!(username: "David", email: 'jjjj@test.com', password: "password", gender: "Male")
user11 = User.create!(username: "Peter", email: 'kkkk@test.com', password: "password", gender: "Male")
user12 = User.create!(username: "Mike", email: 'tttt@test.com', password: "password", gender: "Male")
user13 = User.create!(username: "Celine", email: 'llll@test.com', password: "password", gender: "Female")
user14 = User.create!(username: "Jay", email: 'mmmm@test.com', password: "password", gender: "Male")
user15 = User.create!(username: "Grace", email: 'nnnn@test.com', password: "password", gender: "Female")
user16 = User.create!(username: "Erin", email: 'oooo@test.com', password: "password", gender: "Female")
user17 = User.create!(username: "Chris", email: 'pppp@test.com', password: "password", gender: "Male")
user18 = User.create!(username: "Sarah", email: 'qqqq@test.com', password: "password", gender: "Female")
user19 = User.create!(username: "Jin", email: 'rrrr@test.com', password: "password", gender: "Female")
user20 = User.create!(username: "Jacob", email: 'ssss@test.com', password: "password", gender: "Male")

Room.destroy_all
rooms = []
room1 = Room.create!(title: "Massive Downtown Seattle Condo",
                    description: "Welcome to a one-of-a-kind, expansive condominium nestled in downtown Seattle, boasting unparalleled luxury and convenience. This centrally located gem offers a modern loft design, upscale amenities, towering windows and gourmet kitchen. Immerse yourself in the vibrant culture of Seattle, with top attractions just steps away. Experience urban living at its finest in this extraordinary Airbnb sanctuary.",
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
    price: 661, address: '25142 Pacific Coast Hwy', city: 'Malibu', state: 'CA', country: 'USA', category: 'beach_front',
    capacity: 6, beds: 3, rooms: 3, baths: 3, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 3)

file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/malibu.jpg")
room3.photo.attach(io: file, filename: 'malibu.jpg')

room4 = Room.create!(title: "Take a Break at Wye Lake - 2 BR Lakefront Cabin",
    description: "Come take a break at Wye Lake! Sitting directly on the lake, this home is fully remodeled and waiting for you to grab a drink and come relax on its huge private dock or take a spin around the lake in the provided pedal boat or kayaks! This home is stocked with all the needed essentials; from its fully stocked kitchen and bathrooms, to the comfy beds with quality linens and throws to keep you cozy. Come enjoy swimming, fishing, boating, and so much more at this tranquil property!",
    price: 138, address: '13858 Wye Lake Blvd', city: 'Port Orchard', state: 'WA', country: 'USA', category: 'lake_front',
    capacity: 5, beds: 3, rooms: 2, baths: 1, parking: true,
    washer: false, dryer: false, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: true, host_id: 4)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/lake.jpg")
room4.photo.attach(io: file, filename: 'lake.jpg')

room5 = Room.create!(title: "Après Cabin | Designer Lake Cabin",
    description: "Modern lakefront retreat for design-minded, adventure-seeking families, group getaways and remote work. Designed in partnership with Henrybuilt, Blu Dot and Parachute, Après Cabin adds luxury amenities to a fun, kid-friendly environment. EV Charger. Starlink Wi-Fi. Ski-in / ski-out on MCT trails. Access Hot tub, Pool, Restaurants, Heli-skiing, more. ",
    price: 613, address: '17833 State Rte', city: 'Mazama', state: 'WA', country: 'USA', category: 'lake_front',
    capacity: 12, beds: 7, rooms: 4, baths: 4, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: false, pets: false, host_id: 5)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/lake2.jpg")
room5.photo.attach(io: file, filename: 'lake2.jpg')

room6 = Room.create!(title: "Luxurious 3BR Ocean Front Villa | Chateau La Mer |",
    description: "Welcome to Chateau La Mer, your perfect beach retreat nestled along the picturesque shores of West Seattle. This charming beach house offers a tranquil escape with breathtaking views of the water and Olympic mountains. Whether you're seeking a romantic getaway, a family vacation, or a weekend of relaxation with friends, this coastal haven promises an unforgettable experience.",
    price: 383, address: 'Angeline St Beach Dr SW', city: 'Seattle', state: 'WA', country: 'USA', category: 'amazing_views',
    capacity: 8, beds: 3, rooms: 3, baths: 3, parking: false,
    washer: false, dryer: false, heater: true, ac: false, tv: false, wifi: true,
    kitchen: false, microwave: false, fireplace: true, pets: false, host_id: 6)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/av.jpg")
room6.photo.attach(io: file, filename: 'av.jpg')

room7 = Room.create!(title: "Clark Farm Silos #2 - Incredible Mountain Views",
    description: "Reset and rejuvenate at the Clark Farm Silos! Our thoughtfully designed, unique metal structures are equipped with a fully functional kitchenette, private bathroom and spacious loft bedroom with gorgeous mountain views. Start your days sipping coffee while drinking in the fresh mountain air. Relax after a day of adventure under the starry sky next to the crackling sounds of your personal campfire. Centrally located so you can enjoy all that the Flathead Valley has to offer.",
    price: 186, address: 'Creston Hatchery Rd', city: 'Kalispell', state: 'MT', country: 'USA', category: 'national_park',
    capacity: 3, beds: 2, rooms: 1, baths: 1, parking: false,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 7)

file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/np.jpg")
room7.photo.attach(io: file, filename: 'np.jpg')

room8 = Room.create!(title: "Mountain View Haven | HOT TUB on 9 Acres!",
    description: "Welcome to our Sun-Kissed Haven on 9 Acres! Enjoy breathtaking mountain views from the hot tub or while roasting marshmallows by the fire pit. Pick fresh fruit from our apple, cherry, grape, and blackberry trees. This luxury Cabin boasts a game room with pool, poker, darts and a music room. Work remotely with Starlink High-Speed internet. Take a short walk to the river or nature center. Explore Olympic National Forest and Hurricane Ridge hiking trails. Perfect for a private and peaceful getaway!",
    price: 284, address: 'Williamson Rd', city: 'Sequim', state: 'WA', country: 'USA', category: 'national_park',
    capacity: 10, beds: 5, rooms: 4, baths: 3, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 8)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/np2.jpg")
room8.photo.attach(io: file, filename: 'np2.jpg')
    

room9 = Room.create!(title: "East Sister Rock Island - Your Own Private island",
    description: "Welcome to our Sun-Kissed Haven on 9 Acres! Enjoy breathtaking mountain views from the hot tub or while roasting marshmallows by the fire pit. Pick fresh fruit from our apple, cherry, grape, and blackberry trees. This luxury Cabin boasts a game room with pool, poker, darts and a music room. Work remotely with Starlink High-Speed internet. Take a short walk to the river or nature center. Explore Olympic National Forest and Hurricane Ridge hiking trails. Perfect for a private and peaceful getaway!",
    price: 1988, address: 'Williamson Rd', city: 'Sequim', state: 'WA', country: 'USA', category: 'beach_front',
    capacity: 8, beds: 4, rooms: 3, baths: 2, parking: true,
    washer: true, dryer: true, heater: true, ac: true, tv: true, wifi: true,
    kitchen: true, microwave: true, fireplace: true, pets: false, host_id: 10)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/island.jpg")
room9.photo.attach(io: file, filename: 'island.jpg')

room10 = Room.create!(title: "Villa de Lago The Lake House Max Nite occupancy 8",
    description: "VIlladeLago, The Lake House, is located in a secluded enclave in historic Cave Rock Nevada. Nestled in pines that sweep down through the riparian shrubbery from the home to the property’s private pier and buoy. Whether by day or night the lighted staircase will carry you to the magic of the bouldered shoreline where you can spend your time relaxing to the sound of the waves and Tahoe’s ever-changing panorama or take a dip from off the pier and swim in waters as clear and brilliant as our skies.",
    price: 1500, address: '1321 Hwy 50', city: 'Glenbrook', state: 'NV', country: 'USA', category: 'beach_front',
    capacity: 8, beds:4 , rooms: 4, baths: 3, parking: true,
    washer: true, dryer: true, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: false, fireplace: true, pets: false, host_id: 13)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/good.jpg")
room10.photo.attach(io: file, filename: 'good.jpg')

room11 = Room.create!(title: "Spacious Family Cabin at Cedar Mountain w/HOT TUB",
    description: "Welcome to the ultimate family-friendly wilderness escape! This gorgeous, unique A-frame cabin with soaring ceilings and ample rooms inside sits on the edge of Pike National Forest with ATV trails and over a million acres of exploration literally out the back gate. Located a mere 8-minutes from downtown Divide, this lovingly remodeled 5 bedroom, 3 bath home is the ideal destination and base-camp cabin for families and anyone needing a peaceful retreat in the Colorado mountains.",
    price: 407, address: '835 Lerida St', city: 'St. Louis', state: 'MO', country: 'USA', category: 'skiing',
    capacity: 14, beds:8 , rooms: 5, baths: 3, parking: true,
    washer: false, dryer: true, heater: true, ac: false, tv: true, wifi: true,
    kitchen: true, microwave: false, fireplace: true, pets: false, host_id: 11)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/winter.jpg")
room11.photo.attach(io: file, filename: 'winter.jpg')

room12 = Room.create!(title: "Starlight Tent Near Petrified Forest",
    description: "This is a rare chance to sleep in a comfortable tent in the middle of wide open space and to feel the essence of the surrounding desert. It's like you are stepping back in time: there are even old abandoned Pony Express buildings from the 1800's nearby that you can walk to.",
    price: 64, address: '7707 Sandhill Rd', city: 'Holbrook', state: 'AZ', country: 'USA', category: 'beach_front',
    capacity: 2, beds:1 , rooms: 1, baths: 1, parking: false,
    washer: false, dryer: false, heater: true, ac: true, tv: true, wifi: true,
    kitchen: false, microwave: false, fireplace: false, pets: false, host_id: 17)
file = URI.open("https://breeze-bnb-seeds.s3.us-west-1.amazonaws.com/camping.jpg")
room12.photo.attach(io: file, filename: 'camping.jpg')
rooms << room1
rooms << room2
rooms << room3
rooms << room4
rooms << room5
rooms << room6
rooms << room7
rooms << room8
rooms << room9
rooms << room10
rooms << room11
rooms << room12

Reservation.destroy_all
reservation1 = Reservation.create!(
    checkin: "2024-04-11", 
    checkout: "2024-04-13",
    num_guests: 4,
    reserved_person_id: user1.id,
    reserved_room_id: room4.id)
reservation2 = Reservation.create!(
    checkin: "2024-03-25", 
    checkout: "2024-03-28",
    num_guests: 7,
    reserved_person_id: user3.id,
    reserved_room_id: room2.id)
reservation3 = Reservation.create!(
    checkin: "2024-05-03", 
    checkout: "2024-05-05",
    num_guests: 11,
    reserved_person_id: user5.id,
    reserved_room_id: room5.id)
reservation4 = Reservation.create!(
    checkin: "2024-04-22", 
    checkout: "2024-04-29",
    num_guests: 3,
    reserved_person_id: user6.id,
    reserved_room_id: room7.id)
reservation5 = Reservation.create!(
    checkin: "2024-02-14", 
    checkout: "2024-02-16",
    num_guests: 3,
    reserved_person_id: user8.id,
    reserved_room_id: room4.id)
reservation6 = Reservation.create!(
    checkin: "2023-01-14", 
    checkout: "2023-01-20",
    num_guests: 3,
    reserved_person_id: user12.id,
    reserved_room_id: room1.id)
reservation7 = Reservation.create!(
    checkin: "2024-10-25", 
    checkout: "2024-10-27",
    num_guests: 3,
    reserved_person_id: user18.id,
    reserved_room_id: room3.id)
reservation8 = Reservation.create!(
    checkin: "2024-09-20", 
    checkout: "2024-09-23",
    num_guests: 3,
    reserved_person_id: user17.id,
    reserved_room_id: room6.id)

long_review_sentences = [
"The room exceeded all my expectations and provided a luxurious experience throughout my stay.",
"I was impressed by the attention to detail in the room decor, creating a cozy and inviting atmosphere.",
"Staying in this room was the highlight of my trip, thanks to its stunning views and impeccable service.",
"The spacious layout of the room made it perfect for relaxing after a long day of exploring the city.",
"I couldn't have asked for a better room during my vacation; it truly felt like a home away from home.",
"The amenities provided in the room were top-notch, making my stay both comfortable and convenient.",
"From the moment I walked into the room, I knew I was in for a wonderful experience.",
"The room's location was ideal, with easy access to all the attractions and restaurants in the area.",
"Every aspect of the room, from the decor to the furnishings, was carefully thought out and beautifully executed.",
"I would highly recommend this room to anyone looking for a luxurious and unforgettable stay."
]
Review.destroy_all

(0..11).each do |idx|
    7.times do 
        Review.create!(
            title: Faker::Lorem.words(number: 3).join(" "),
            description: long_review_sentences.sample,
            cleanliness: Faker::Number.between(from: 1, to: 5),
            communication: Faker::Number.between(from: 1, to: 5),
            accuracy: Faker::Number.between(from: 1, to: 5),
            location: Faker::Number.between(from: 1, to: 5),
            value: Faker::Number.between(from: 1, to: 5),
            reviewer_id: Faker::Number.between(from: 1, to: 20),
            review_room_id: Faker::Number.between(from: 1, to: 8)
        )
    end
end