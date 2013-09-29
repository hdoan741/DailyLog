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
    start_slot = time_to_slot(@log.start_time)
    if @log.update_attributes(params[:log])
      respond_to do |format|
        format.json { render json: {
          status: "OK",
          log: @log,
          start_slot: start_slot,
          end_slot: start_slot + slot_count(@log.end_time - @log.start_time)
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
    start_slot = time_to_slot(@log.start_time)
    if @log.destroy
      respond_to do |format|
        format.json { render json: {
          status: "OK",
          log: @log,
          start_slot: start_slot,
          end_slot: start_slot + slot_count(@log.end_time - @log.start_time)
        } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: "ERROR" } }
      end
    end
  end
end
