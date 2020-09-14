class CreateWines < ActiveRecord::Migration[6.0]
  def change
    create_table :wines do |t|
      t.string :label
      t.string :varietal
      t.string :region
      t.string :price

      t.timestamps
    end
  end
end
