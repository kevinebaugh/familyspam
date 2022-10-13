Rails.application.routes.draw do
  resources :faqs
  resources :group_admins
  resources :groups
  resources :group_invitations
  resources :recipients
  resources :messages

  post 'accept', to: 'group_invitations#accept'

  get 'me', to: 'group_admins#me'

  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"

  post "/create-checkout-session", to: "stripe#create_checkout_session"
  get "success", to: "stripe#success"
  get "cancel", to: "stripe#cancel"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
