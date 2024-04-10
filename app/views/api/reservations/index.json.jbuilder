json.reservation do 
    @reservations.each do |reservation|
        json.set! reservation.id  do #set key
            json.extract! reservation, :id, :checkin, :checkout, :num_guests

            json.reserver_id reservation.reserver.id #json.blah => key name(blah)
            json.room_id reservation.room.id
            
            address = reservation.room.address
            city = reservation.room.city
            state = reservation.room.state
            country = reservation.room.country
            
            room_price = reservation.room.price
            checkin_date = reservation.checkin.to_date
            checkout_date = reservation.checkout.to_date

            duration_of_stay = (checkout_date - checkin_date).to_i

            total_cost = duration_of_stay * room_price
            
            json.nights duration_of_stay
            json.total_cost total_cost
            json.address address
            json.city city
            json.state state
            json.country country
        end
    end
end