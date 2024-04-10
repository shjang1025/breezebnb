class Api::SessionsController < ApplicationController
    before_action :required_logged_out, only: [:create]
    before_action :required_logged_in, only: [:destroy]

    def create
        email = params[:email]
        password = params[:password]

        @user = User.find_by_credential(email, password)
        if @user 
            log_in(@user)
            render 'api/users/show'
        else 
            render json: {errors: ['Invalid credentials']}, status: 422
            # render json: {errors: @user.errors}, status: 422
        end
    end

    def show
        @user = current_user
        if @user #if somebody logged in
            # render :show <- it wouldn't work. views/api/sessions/show
            render 'api/users/show'
        else
            render json: {user: nil} #we don't have a current user right now
        end
    end

    def destroy 
        logout
        head :no_content #good idea for deleting
    end
end
