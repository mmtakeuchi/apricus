class Review < ApplicationRecord
    belongs_to :wine

    validates :content, presence: true
end
