class Wine < ApplicationRecord
    has_many :reviews

    validates :title, :varietal, :region, :price, presence: true
end
