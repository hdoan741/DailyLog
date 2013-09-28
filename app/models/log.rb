class Log < ActiveRecord::Base
  default_scope { order('start_time') }
  attr_accessible :content, :date, :end_time, :extra, :main_tag_id, :start_time

  belongs_to :main_tag, class_name: "Tag"
end
