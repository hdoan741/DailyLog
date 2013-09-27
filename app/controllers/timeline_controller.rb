class TimelineController < ApplicationController
  def day
    @current_date = params[:current_date] || Date.today
    @logs = Log.where(date: @current_date)
  end

  def week
  end

  def month
  end

  def year
  end
end
