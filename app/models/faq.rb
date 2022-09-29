class Faq < ApplicationRecord
  validates :question, presence: true
  validates :answer, presence: true
  validates :weight, presence: true, uniqueness: { message: "weight %{value} is already taken by another FAQ" }

  default_scope { order(weight: :asc) }
end
