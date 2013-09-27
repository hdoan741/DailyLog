class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :title
      t.text :desc
      t.string :color

      t.timestamps
    end
  end
end
