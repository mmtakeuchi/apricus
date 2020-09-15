class WinesController < ApplicationController
    before_action :set_wine, only: [:show, :update, :destroy]

    def index
        @wines = Wine.all
        render json: @wines, include: [:reviews], except: [:created_at, :updated_at]
    end

    def show
        render json: @wine
    end

    def create
        @wine = Wine.new(wine_params)

        if @wine.save
            render json: @wine, status: :created
        else
            render json: @wine.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        if @wine.update(wine_params)
            render json: @wine
        else
            render json: @wine.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @wine.destroy
    end

    private

    def set_wine
        @wine = Wine.find_by_id(params[:id])
    end

    def wine_params
        params.require(:wine).permit(:label, :varietal, :region, :price)
    end
end
