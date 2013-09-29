class TimelineController < ApplicationController
  def day
    @current_date = params[:current_date] ? Date.strptime(params[:current_date], '%Y-%m-%d') : Date.today
    @logs = Log.where(date: @current_date)
    @tags = Tag.all

    # setting the time-segment
    @time_segments = []
    48.times.each { @time_segments << "time-avail-segment" }
    @segment_bg = []
    48.times.each { @segment_bg << "" }
    @logs.each do |log|
      if log.start_time && log.end_time
        # identify the segments this log covers
        start_slot = time_to_slot(log.start_time)
        end_slot = time_to_slot(log.end_time)
        puts start_slot, end_slot
        (start_slot..(end_slot-1)).each do |slot|
          @time_segments[slot] = "time-disabled-segment"
          @segment_bg[slot] = log.main_tag.color
        end
      end
    end
  end

  def week
  end

  def month
  end

  def year
  end
end
