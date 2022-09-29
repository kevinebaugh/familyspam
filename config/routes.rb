Rails.application.routes.draw do
  resources :faqs
  resources :group_admins
  resources :groups
  resources :group_invitations
  resources :recipients
  resources :messages

  get 'accept/:code', to: 'group_invitations#accept'

  get 'me', to: 'group_admins#me'

  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
