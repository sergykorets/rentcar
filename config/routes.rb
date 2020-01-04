Rails.application.routes.draw do
  root 'cars#index'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  devise_for :users, :controllers => { registrations: 'registrations',
                                       omniauth_callbacks: 'omniauth_callbacks' }
  resources :cars do
    resources :reservations
  end
  resources :categories, only: :show
  resources :schemas, only: :index
  get 'reactivate/edit', 'reactivate#edit'
  put 'reactivate/update', 'reactivate#update'
end