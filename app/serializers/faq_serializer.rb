class FaqSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer, :weight
end
