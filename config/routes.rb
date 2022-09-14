Rails.application.routes.draw do
  resources :group_admins
  resources :groups
  resources :recipients
  resources :messages
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
