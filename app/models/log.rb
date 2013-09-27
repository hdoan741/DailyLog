class Log < ActiveRecord::Base
  default_scope { order('start_time') }
  attr_accessible :content, :date, :end_time, :extra, :main_tag, :start_time
end
