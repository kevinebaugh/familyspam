class MessageSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :created_at_friendly, :from, :subject, :body_plain

  def created_at_friendly
    time_ago_in_words( object.created_at ) + " ago"
  end
end
