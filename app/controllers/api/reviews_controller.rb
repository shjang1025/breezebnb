class Api::ReviewsController < ApplicationController
    before_action :find_review, only: [:update, :destroy]
    before_action :required_logged_in, only: [:create, :update, :destroy]
    def index
        @reviews = Review.all
        render :index
    end
    def show
        render :show
    end

    def create
        @review = Review.new(review_params)
        room = Room.find_by(id: params[:review][:review_room_id])
        if room 
            @review.room = room
            # @review.reserver = reserver 
            if @review.save
                render :show
            else 
                render json: @review.errors.full_messages, status: 422
            end
        else

            render json: {error: "Room not found" }, status: 404
        end
    end

    def destroy
        if (@current_user.id === @review.reviewer_id)
            @review.destroy
            head :no_content
        else
            render json: {error: 'You are not authorized to delete this reservation'}, status: :unauthorized
        end
    end

    def update
        if @review.update(review_params) 
            render :show
        else 
            render json: @review.errors.full_messages, status: 422
        end
    end

    private
    def review_params
        params.require(:review).permit(:title, :description, :cleanliness, :communication,:accuracy, :location, :value, :reviewer_id, :review_room_id)
    end

    def find_review
        @review = Review.find(params[:id])
    rescue
        render json: ['Review not found'], status: :not_found
    end

end
