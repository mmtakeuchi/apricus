class Wine < ApplicationRecord
    has_many :reviews

    validates :label, :varietal, :region, :price, presence: true
end
