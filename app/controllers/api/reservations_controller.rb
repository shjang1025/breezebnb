class Api::ReservationsController < ApplicationController
    before_action :find_reservation, only: [:show, :update, :destroy]

    def index
        if @user
            @reservations = @user.reservations
        else
            @reservations = Reservation.all
        end
        render :index
    end

    def show
        if @reservation 
            render :show
        else
            render json: { errors: ['Reservation Not Found']}, status: 422
        end

    end

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

    def update
        if(@reservation)
            if @reservation.update(reservation_params)
                render :show
            else
                render json: @reservation.errors.full_messages, status: 422
            end
        else
            render json: ['Reservation not found'], status: :not_found
        end
    end

    def destroy
        @reservation.destroy
        head :no_content
        # if (@current_user.id === @reservation.reserved_person_id) 
        #     @reservation.destroy
        #     head :no_content
        # else
        #     render json: {error: 'You are not authorized to delete this reservation'}, status: :unauthorized
        # end
    end

    private 
    def find_reservation 
        @reservation = Reservation.find_by(id: params[:id])
    rescue
        render json: ['Reservation not found'], status: :not_found
    end

    def reservation_params
        params.require(:reservation).permit(:checkin, :checkout, :num_guests, :reserved_person_id, :reserved_room_id)
    end

end
