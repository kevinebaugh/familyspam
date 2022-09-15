class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  # GET /messages
  def index
    @messages = Message.all

    render json: @messages
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    render json: "Nobody found", status: :not_found and return unless group_ids_from_aliases&.any?

    @message = Message.new(
      group_id: group_ids_from_aliases,
      raw_content: nil
    )

    if @message.save
      render json: @message, status: :created, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.fetch(:message, {})
    end

    def group_ids_from_aliases
      # params["recipient"] sometimes has multiple email addresses, so split it just in case.
      # So far, haven't seen a name attached to params["recipient"] so not worrying about that for now.
      # Examples:
      # • anything@sandboxc07be1039bd545938ea0cc91b46bfe65.mailgun.org
      # • anything@sandboxc07be1039bd545938ea0cc91b46bfe65.mailgun.org,anything-bcc@sandboxc07be1039bd545938ea0cc91b46bfe65.mailgun.org,anything-to@sandboxc07be1039bd545938ea0cc91b46bfe65.mailgun.org

      incoming_aliases = params["recipient"].split(",").map{ |address| address.split("@")[0] }

      group_ids_to_message = incoming_aliases.map do |incoming_alias|
        Group.find_by(email_alias: incoming_alias)&.id
      end&.compact&.uniq

      group_ids_to_message
    end
end
