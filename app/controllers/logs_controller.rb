class LogsController < ApplicationController

  def create
    puts params

    @log = Log.create(params[:log])

    if @log.save
      respond_to do |format|
        format.json { render json: @log }
      end
    else
      respond_to do |format|
        format.json { render text: "Error" }
      end
    end
  end

  def edit
  end

  def destroy
  end
end
