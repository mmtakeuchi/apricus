class Wine < ApplicationRecord
    has_many :reviews, dependent: :destroy

    validates :label, :varietal, :region, :price, presence: true
    validates :label, uniqueness: true
end
