class CreateLogTags < ActiveRecord::Migration
  def change
    create_table :log_tags do |t|
      t.integer :log_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
