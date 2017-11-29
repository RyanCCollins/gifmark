class CreateGifmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :gifmarks do |t|
      t.string :url

      t.timestamps
    end
  end
end
