class LogsController < ApplicationController

  def create
    puts params

    @log = Log.create(params[:log])

    if @log.save
      respond_to do |format|
        format.json { render json: {
          status: "OK",
          log: @log,
          html_str: render_to_string(partial: "log_li.html.erb", locals: { log: @log })
        } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: "ERROR" } }
      end
    end
  end

  def update
    @log = Log.find(params[:id])
    if @log.update_attributes(params[:log])
      respond_to do |format|
        format.json { render json: {
          status: "OK",
          log: @log,
          start_slot: time_to_slot(@log.start_time),
          end_slot: time_to_slot(@log.end_time)
        } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: "ERROR" } }
      end
    end
  end

  def destroy
    @log = Log.find(params[:id])
    if @log.destroy
      respond_to do |format|
        format.json { render json: {
          status: "OK",
          log: @log,
          start_slot: time_to_slot(@log.start_time),
          end_slot: time_to_slot(@log.end_time)
        } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: "ERROR" } }
      end
    end
  end
end
