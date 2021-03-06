class WinesController < ApplicationController
    before_action :set_wine, only: [:show, :update, :destroy]

    def index
        @wines = Wine.all
        @wines = @wines.sort_by{ |wine| wine.label }
        render json: @wines, except: [:created_at, :updated_at]
    end

    def show
        if @wine
            render json: @wine, include: [:reviews]
        else
            render json: { message: 'Wine not found' }
        end
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

        render json: @wine
    end

    private

    def set_wine
        @wine = Wine.find_by_id(params[:id])
    end

    def wine_params
        params.require(:wine).permit(:label, :varietal, :region, :price)
    end
end
