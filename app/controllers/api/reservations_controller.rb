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

        reserver = User.find_by(id: params[:reserved_person_id])
        room = Room.find_by(id: params[:reserved_room_id])

        if reserver && room 
            @reservation.room = room
            @reservation.reserver = reserver 

            if @reservation.save! 
                render :show
            else 
                render json: @reservation.errors.full_messages, status: 422
            end
        else 
            render json: "Reserver or Room not found", status: 404
        end
    end

    def update
        if(@reservation && @reservation.update(reservation_params)) 
            render :show
        else
            render json: @reservation.errors.full_messages, status: 422
        end
    end

    def destroy
        if (current_user.id === @reservation.reserved_person_id) 
            @reservation.destroy
            head :no_content
        else
            render json: {error: 'You are not authorized to delete this reservation'}, status: :unauthorized
        end
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
