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
        @wine = Wine.find_by_id(params[:wine_id])

        @review = @wine.reviews.build(review_params)

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
        params.require(:review).permit(:username, :content, :recommend)
    end
end
