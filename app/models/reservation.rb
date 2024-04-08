# == Schema Information
#
# Table name: reservations
#
#  id                 :bigint           not null, primary key
#  reserved_person_id :bigint           not null
#  reserved_room_id   :bigint           not null
#  checkin            :date             not null
#  checkout           :date             not null
#  num_guests         :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Reservation < ApplicationRecord
    validates :checkin, presence: true
    validates :checkout, comparison: { greater_than: :start_date }
    validates :num_guests, presence: true, minimum: 1
    
    belongs_to :reserver,
        class_name: :User,
        foreign_key: :reserved_person_id

    belongs_to :room, 
        class_name: :Room, 
        foreign_key: :reserved_room_id
    


    private
    def checkin_before_checkout
        return if checkout.blank? || checkin.blank?
        errors.add(:checkin, "must be before checkout date") if checkin >= checkout
    end
end
