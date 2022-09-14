class GroupAdminsController < ApplicationController
  before_action :set_group_admin, only: [:show, :update, :destroy]

  # GET /group_admins
  def index
    @group_admins = GroupAdmin.all

    render json: @group_admins
  end

  # GET /group_admins/1
  def show
    render json: @group_admin
  end

  # POST /group_admins
  def create
    @group_admin = GroupAdmin.new(group_admin_params)

    if @group_admin.save
      render json: @group_admin, status: :created, location: @group_admin
    else
      render json: @group_admin.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /group_admins/1
  def update
    if @group_admin.update(group_admin_params)
      render json: @group_admin
    else
      render json: @group_admin.errors, status: :unprocessable_entity
    end
  end

  # DELETE /group_admins/1
  def destroy
    @group_admin.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group_admin
      @group_admin = GroupAdmin.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def group_admin_params
      params.fetch(:group_admin, {})
    end
end
