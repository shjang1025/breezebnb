# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  gender          :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :username, uniqueness: true, 
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, 
        uniqueness: true, 
        length: { in: 3..100 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    # validates :gender, inclusion: ['Female', 'Male']
    validates :gender, presence: true
    validates :password, length: {minimum: 6} , allow_nil: true
    
    has_many :rooms,
        class_name: :Room, 
        foreign_key: :host_id,
        dependent: :destroy
        
    has_many :reservations, 
        class_name: :Reservation,
        foreign_key: :reserved_person_id,
        dependent: :destroy
        
    has_many :reviews,
        class_name: :Review,
        foreign_key: :reviewer_id,
        dependent: :destroy
    
    has_many :reservation,
        through: :rooms
    def self.find_by_credential(email, password) 
        @user = User.find_by(email: email)
        if @user && @user.authenticate(password) 
            @user
        else
            nil
        end
    end

    def reset_session_token! 
        self.session_token = generate_unique_token
        save!
        session_token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_token
    end 
    
    private
    def generate_unique_token
        loop do
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
