class TimelineController < ApplicationController

  def day
    @current_date = params[:current_date] ? Date.strptime(params[:current_date], '%Y-%m-%d') : Date.today
    @logs = Log.where(date: @current_date)
    @tags = Tag.all

    # setting the time-segment
    @segment_bg = color_segments(@logs)
    @time_segments = []
    @segment_bg.each do |val|
      @time_segments << (val.empty? ? "time-avail-segment" : "time-disabled-segment")
    end
  end

  def week
    @today = Date.today
    @current_date = params[:current_date] ? Date.strptime(params[:current_date], '%Y-%m-%d') : Date.today
    @tags = Tag.all

    # finding the week that this date belongs to
    @week = []
    7.times.each do |day_num|
      @week << @current_date + day_num - @current_date.wday
    end

    # getting the logs for each day
    # for each log, color the segments
    @segment_bgs = []
    @week.each do |day|
      logs = Log.where(date: day)
      @segment_bgs << color_segments(logs)
    end
  end

  def month
    @today = Date.today
    @current_date = params[:current_date] ? Date.strptime(params[:current_date], '%Y-%m-%d') : Date.today
    @tags = Tag.all

    # finding the month this date belongs to
    first_of_the_month = @current_date - @current_date.mday
    start_sunday = first_of_the_month - first_of_the_month.wday
    @month = []
    curr_sunday = start_sunday
    begin
      @month << Array(curr_sunday..(curr_sunday + 6))
      curr_sunday += 7
    end while curr_sunday.month == @current_date.month

    # finding the color of the segments
    @segment_month = []
    @month.each do |week|
      @segment_week = []
      week.each do |day|
        logs = Log.where(date: day)
        @segment_week << color_segments(logs)
      end
      @segment_month << @segment_week
    end
  end

  def year
  end

  def color_segments(logs)
    segment_bg = []
    48.times.each { segment_bg << "" }
    logs.each do |log|
      if log.start_time && log.end_time
        # identify the segments this log covers
        start_slot = time_to_slot(log.start_time)
        slot_count = slot_count(log.end_time - log.start_time)
        (start_slot..(start_slot + slot_count - 1)).each do |slot|
          segment_bg[slot] = log.main_tag.color
        end
      end
    end

    return segment_bg
  end
end
