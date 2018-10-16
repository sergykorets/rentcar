class SchemasController < ApplicationController
  def index
    @admin = Rails.env.development? || (current_user && current_user.admin)
  end

  def skipass;  end
end
