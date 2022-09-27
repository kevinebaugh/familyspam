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
    unless params[:password] == params[:password_confirmation]
      return render json: {errors: ["passwords must match"]}, status: :unprocessable_entity
    end

    group = Group.create!(
      name: "#{params[:email_address]}'s group",
      email_alias: SecureRandom.hex
    )

    group_admin = GroupAdmin.create!(
      email_address: params[:email_address],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      group_id: group.id
    )

    session[:group_admin_id] = group_admin.id

    render json: group_admin, include: :group, status: :created
  rescue => e
    render json: {error: e}, status: :unprocessable_entity
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
