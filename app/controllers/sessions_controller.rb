class SessionsController < ApplicationController
  def create
    group_admin = GroupAdmin.find_by(email_address: params[:email_address])

    if group_admin&.authenticate(params[:password])
      session[:group_admin_id] = group_admin.id

      render json: group_admin
    else
      render json: { errors: ["🔒"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :group_admin_id
    head :no_content
  end
end
