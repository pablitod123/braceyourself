class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # ROLES = %i[doctor patient parent]
  has_one :doctor
  has_one :patient
  has_one :parent
  # def self.search(query)
  #   where("fname like ?", "%#{query}%")
  # end

  def self.search(query)
    return where('FALSE') if query.blank?

    conditions = []
    search_columns = [ :fname, :lname ]

    query.split(' ').each do |word|
      search_columns.each do |column|
        conditions << " lower(#{column}) LIKE lower(#{sanitize("%#{word}%")}) "
      end
    end

    conditions = conditions.join('OR')    
    self.where(conditions)
  end

  def autocomplete
    @users = User.order(:fname).where("fname ILIKE ?", "%#{params[:term]}%")
    respond_to do |format|
      format.html
      format.json { 
        render json: @users.map(&:fname)
      }
    end
  end
end
