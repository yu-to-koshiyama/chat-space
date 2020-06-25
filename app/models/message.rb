class Message < ApplicationRecord
  belongs to :user
  belongs to :group

  validates :body, presence: true, unless: :image?
end
