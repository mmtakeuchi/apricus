class Wine < ApplicationRecord
    has_many :reviews, dependent: :destroy

    validates :label, :varietal, :region, :price, presence: true
    validates :label, uniqueness: { message: "Wine is already created."}
    before_validation :capitalize_label, on: [ :create, :update ]

    private

    def capitalize_label
      self.label = label.capitalize
    end
end
