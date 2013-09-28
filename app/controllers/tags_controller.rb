class TagsController < ApplicationController
  def index
    @tags = Tag.all
  end

  def create
    @tag = Tag.create(params[:tag])
    if @tag.save
      respond_to do |format|
        format.json { render json: {
          status: "OK",
          tag: @tag,
          html_str: render_to_string(partial: "tag_row.html.erb", locals: { tag: @tag })
        } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: "error" } }
      end
    end
  end

  def edit
  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag.destroy
      respond_to do |format|
        format.json { render json: { status: "OK" } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: "error" } }
      end
    end
  end
end
