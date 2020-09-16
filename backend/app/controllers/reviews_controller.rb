class ReviewsController < ApplicationController
    before_action :set_review, only: [:show]
    def index
        @reviews = Review.all

        render json: @reviews
    end

    def show
        render json: @review
    end

    def create
        @review = Review.new(review_params)

        if @review.save
            render json: @review, status: :created
        else
            render json: @review.errors.full_messages, status: :unprocessable_entity
        end
    end

    private 

    def set_review
        @review = Review.find_by_id(params[:id])
    end

    def review_params
        params.require(:review).permit(:username, :content, :recommend, :wine_id)
    end
end
