class Api::RoomsController < ApplicationController

    before_action :required_logged_in, except: [:index, :show]
    before_action :find_room, only: [:update, :show, :destroy]

    def index
        @rooms = Room.all
        # render json: @rooms
        render :index
    end

    def create 
        @room = Room.new(rooms_params)
        @room.host_id = @current_user.id; 
        if @room.save!
            render json: @room
            # render :show
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
        @username = @room.user.username if @room.user
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
        params.require(:room)
            .permit(:title, :description, :price, :address, :city, :state, :country, 
                :category, :capacity, :beds, :rooms, :baths,:parking, :washer, :dryer, :tv, :ac, 
                :heater, :wifi, :kitchen, :microwave, :fireplace, :pets, :photo)
    end

    def find_room
        @room = Room.find(params[:id])
    rescue
        render json: ['Post not found'], status: :not_found
    end
end
