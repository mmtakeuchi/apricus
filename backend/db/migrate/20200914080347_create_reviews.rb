class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :username
      t.string :content
      t.boolean :recommend
      t.string :wine_id

      t.timestamps
    end
  end
end
