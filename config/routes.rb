Rails.application.routes.draw do
  root 'cars#index'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  devise_for :users, :controllers => { registrations: 'registrations',
                                       sessions: 'sessions',
                                       omniauth_callbacks: 'omniauth_callbacks' }
  resources :cars do
    resources :reservations
  end
  resources :categories, only: :show
  get 'reactivate/edit', 'reactivate#edit'
  put 'reactivate/update', 'reactivate#update'
end