class Log < ActiveRecord::Base
  attr_accessible :content, :date, :end_time, :extra, :main_tag, :start_time
end
