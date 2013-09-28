class LogChangeMainTagId < ActiveRecord::Migration
  def up
    rename_column :logs, :main_tag, :main_tag_id
  end

  def down
    rename_column :logs, :main_tag_id, :main_tag
  end
end
