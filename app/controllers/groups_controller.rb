class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :update, :destroy, :recent_messages]

  # GET /groups
  def index
    @groups = Group.all

    render json: @groups
  end

  # GET /groups/1
  def show
    render json: @group
  end

  # POST /groups
  def create
    @group = Group.new(group_params)

    if @group.save
      render json: @group, status: :created, location: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /groups/1
  def update

    if @group.update(group_params)
      render json: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  # DELETE /groups/1
  def destroy
    @group.destroy
  end

  def recent_messages
    limit = params[:limit] || 10
    messages = Message.for_group_id(@group.id)

    render json: messages.take(limit)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = GroupAdmin.find(session[:group_admin_id]).group
    end

    # Only allow a list of trusted parameters through.
    def group_params
      params.permit(:id, :name, :email_alias)
    end
end
