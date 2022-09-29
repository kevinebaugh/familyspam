class StripeController < ApplicationController
  def create_checkout_session
    # Set your secret key. Remember to switch to your live secret key in production.
    # See your keys here: https://dashboard.stripe.com/apikeys
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]

    # The price ID passed from the front end.
      price_id = params['priceId']
    # price_id = '{{PRICE_ID}}'

    session = Stripe::Checkout::Session.create({
      success_url: "#{ENV["DOMAIN_WITH_SCHEME"]}/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "#{ENV["DOMAIN_WITH_SCHEME"]}/cancel",
      mode: 'subscription',
      line_items: [{
        price: price_id,
      }],
    })

    # Redirect to the URL returned on the session
      redirect_to session.url
  end

  def success
    puts "\n\n\n\n\n\n\n\n💰\n\n\n\n\n\n\n\n"
    render json: { errors: [] }, status: :created
  end

  def cancel
    puts "\n\n\n\n\n\n\n\n❌\n\n\n\n\n\n\n\n"
    render json: { errors: ["customer aborted"] }, status: :not_acceptable
  end
end
