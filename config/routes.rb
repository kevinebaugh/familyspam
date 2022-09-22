Rails.application.routes.draw do
  resources :group_admins
  resources :groups
  resources :group_invitations
  resources :recipients
  resources :messages

  get 'accept/:code', to: 'group_invitations#validate'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
