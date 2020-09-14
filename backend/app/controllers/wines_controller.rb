class WinesController < ApplicationController
    before_action :set_wine, only: [:show]

    def index
        wines = Wine.all
        render json: wines, include [:reviews]
    end

    def show

    end

    def create
        wine = Wine.new(wine_params)

        if wine.save
            render json: wine
        else
            render json: wine.errors
        end
    end

    private

    def set_wine
        wine = Wine.find_by_id(params[:id])
    end

    def wine_params
        params.require(:wine).permit(:label, :varietal, :region, :price)
    end
end
