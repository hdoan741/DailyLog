class LogsController < ApplicationController

  def create
    puts params

    @log = Log.create(params[:log])

    if @log.save
      respond_to do |format|
        format.json { render json: {
          log: @log,
          html_str: render_to_string(partial: "log_li.html.erb", locals: { log: @log })
        } }
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
