class Api::RoomsController < ApplicationController
    before_action :required_logged_in, only: [:create, :edit, :show, :destroy]
    before_action :find_room, only: [:edit, :show, :destroy]

    def index
        @rooms = Room.all
        render :index
    end

    def create 
        @room = Room.new(rooms_params)
        @room.host_id = @current_user.id; 
        if @room.save
            render :show
        else
            render json: @room.errors.full_messages, status: 422
        end
    end

    def update
        if @room.update(rooms_params)
            render :show
        else
            render json: @room.errors.full_messages, status: 422
        end
    end

    def show
        if @room 
            render :show
        else
            render json: {errors: @room.errors}, status: 422
        end
    end

    def destroy
       @room.destroy
        head :no_content
    end

    #find rooms by categories
    def categories
        category = params[:category]
        @rooms = Room.where(category: category)

    end

    private
    def rooms_params
        params
        .require(:room)
        .permit(:title, :description, :price, :city, :state, :country, :category,:capacity, 
                :num_beds, :num_rooms, :has_parking, :has_washer, :has_dryer, :has_tv, :has_AC, 
                :has_heater, :has_wifi, :has_kitchen, :has_microwave, :has_fireplace, :has_pets)
    end

    def find_room
        @room = Room.find_by(params[:id])
    rescue
        render json: ['Post not found'], status: :not_found
    end
end
