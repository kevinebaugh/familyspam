class GroupInvitationsController < ApplicationController
  before_action :set_group_invitation, only: [:show, :update, :destroy]

  # GET /group_invitations
  def index
    @group_invitations = GroupInvitation.all

    render json: @group_invitations
  end

  # GET /group_invitations/1
  def show
    render json: @group_invitation
  end

  # POST /group_invitations
  def create
    @group_invitation = GroupInvitation.new(group_invitation_params)

    if @group_invitation.save
      render json: @group_invitation, status: :created, location: @group_invitation
    else
      render json: @group_invitation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /group_invitations/1
  def update
    if @group_invitation.update(group_invitation_params)
      render json: @group_invitation
    else
      render json: @group_invitation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /group_invitations/1
  def destroy
    @group_invitation.destroy
  end

  def validate
    errors = []

    valid_code = GroupInvitation.validate_code(params[:code])

    if valid_code
      group_invitation = GroupInvitation.find_by(code: params[:code])
      email_address = group_invitation.email_address

      existing_recipient = Recipient.find_by(email_address: email_address)
      recipient = existing_recipient || Recipient.create(email_address: email_address)

      group_recipient = GroupRecipient.new(
        group_id: group_invitation.group_id,
        recipient_id: recipient.id
      )

      if group_recipient.save
        GroupInvitation.send_welcome(
          group_id: group_invitation.group_id,
          email_address: email_address
        )
      else
        errors.push("Error creating group recipient")
      end

    else
      errors.push("Invalid code!")
    end


    render json: { errors: errors }, status: errors.present? ? :unprocessable_entity : :created
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group_invitation
      @group_invitation = GroupInvitation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def group_invitation_params
      params.fetch(:group_invitation, {})
    end
end
