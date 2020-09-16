# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Wine.create(label: "Chandon", varietal: "sparkling", region: "California", price: "$$")
Review.create(username: "Tanner", content: "Good brut sparkling wine. Slightly sweet with a hint of apple and pear.", recommend: true, wine_id: 25)