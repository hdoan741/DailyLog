class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.string :content
      t.text :extra
      t.date :date
      t.time :start_time
      t.time :end_time
      t.integer :main_tag

      t.timestamps
    end
  end
end
