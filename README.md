<img width="1400" alt="Screenshot 2024-04-25 at 11 00 19 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/279b84b0-f866-4a31-8f9b-efec038a9471">

</br>

# Welcome to Breezebnb

[Breezebnb](https://breezebnb-oxhj.onrender.com) is a accommodation booking website inspired by Airbnb!

---
 
 ## What is Breezebnb ?
 Breezebnb enables travelers to book unique accommodations and cool places all over the world, from apartments and houses to villas, directly from the property owners or hosts. Users can search for properties by specific categories. Plus, users can share their thoughts about their stay by leaving reviews and ratings.

- **Easy Access:** Browse room listings and view detailed information including pricing, location, and amenities before reserving.
- **Seamless Experience:** Host, reserve, and review rooms hassle-free by simply logging in.
- **Empowered Users:** Enjoy full control and convenience in managing your accommodation needs.

---

## Service Architecture

![service-architecture](https://github.com/shjang1025/breezebnb/assets/26673070/7cfbcbab-943d-4ce1-b38b-d20b90799cdc)
---

## Hightlights

### Category Search Functionality
- Easily discover rooms by category with intuitive category icons
- Streamline your search process and find accommodations tailored to your preferences effortlessly

![category-search](https://github.com/shjang1025/breezebnb/assets/26673070/ebd7296d-20ab-4f4a-b53e-70b98c3becc4)

### User-Friendly Guidance

- Offer error messages, helping users understand why the error occurred and how to resolve it
- Provide clear, descriptive error messages during login and sign up process

<div style="display: flex;">
  <img width="300" style="padding-right:10px" alt="Screenshot 2024-04-30 at 8 36 49 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/6a9f0056-8e3b-461b-ac5d-4ee3ac718c03">
  <img width="300" style="padding-right:10px" alt="Screenshot 2024-04-30 at 8 36 56 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/48f23091-4086-49cc-8cd2-3a662a4eec2d">
  <img width="300" style="padding-right:10px" alt="Screenshot 2024-04-30 at 8 36 42 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/de12f5a4-bfa9-4287-96f4-175931ce8367">
</div>

### Seamless Reservation Experience
- Ensure a seamless reservation process by logging in to access booking functionality. 
- Receive instant notifications and alternative options if your desired date is already reserved, ensuring a smooth booking process.

```ruby
def overlap
        Reservation.where('reserved_room_id = ? AND ((checkin < ? AND checkout > ?) 
                          OR (checkin < ? AND checkout > ?) OR (checkin >= ? AND checkout <= ?))',
                      reserved_room_id, checkout, checkout, checkin, checkin, checkin, checkout)
  end
```
```ruby
def create 
        @reservation = Reservation.new(reservation_params)
        room = Room.find_by(id: params[:reservation][:reserved_room_id])

        if room 
            @reservation.room = room
            if @reservation.overlap.exists?
                render json: {error: 'Room is already booked for the requested dates'}, status: 422
        
            elsif @reservation.save
                render :show
            else 
                render json: {errors: @reservation.errors}, status: 422

            end
        else

            render json: {error: "Room not found" }, status: 404
        end
    end

```
<div style="display: flex;">
    <img width="390" alt="Screenshot 2024-04-30 at 8 22 16 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/b038cf7a-f91b-4d45-9d95-296450e308ba">
    <img width="390" alt="Screenshot 2024-04-30 at 8 22 02 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/8ef93317-c976-41d0-a2b6-bcf5841d3eff">
    <img width="390" alt="vid" src="https://github.com/shjang1025/breezebnb/assets/26673070/63bb4d5b-a2e3-4c5c-b917-3d3fe81c133b">
</div>

---

### Interactive Location Mapping
- Explore room locations with precision using the integrated Google Maps API
- Click on map markers to instantly access detailed room information, making it easier to choose the perfect accommodation.

<img width="440" alt="Screenshot 2024-04-25 at 10 30 06 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/0272b7b2-742b-4edd-9f25-0fd798495e05">
<img width="440" alt="Screenshot 2024-04-25 at 10 30 17 PM" src="https://github.com/shjang1025/breezebnb/assets/26673070/618dbb6d-da38-46d4-8c73-301cb33a181f">

---
### Interactive Review and Ratings:
 - Provide feedback effortlessly by clicking on star ratings to fill them with color, ensuring a user-friendly and engaging review experience.

![make a review gif](https://github.com/shjang1025/breezebnb/assets/26673070/15381331-349e-4757-92ea-ec3871253318)

---

## Technology Stacks
**Front End**
- ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

**Back end**

- ![Ruby](https://img.shields.io/badge/ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white)
![Ruby on Rails](https://img.shields.io/badge/Rails-D30001?style=for-the-badge&logo=rubyonrails&logoColor=white)

**Database**
- ![postgresql](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

**Cloud**
- <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="React Badge"/>