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
    belongs_to :reserver,
        class_name: :User,
        foreign_key: :reserved_person_id

    belongs_to :room, 
        class_name: :Room, 
        foreign_key: :reserved_room_id
    validates :checkin, presence: true
    validates :checkout, comparison: { greater_than: :checkin }
    validates :num_guests, presence: true, numericality: {greater_than_or_equal_to: 1}
    
    # validate :checkin_uniqueness
    # validate :checkout_uniqueness
    # validate checkin_before_checkout

    # validates :num_guests, presence: true, numericality: {greater_than_or_equal_to: 1}

    def overlap
        Reservation.where('reserved_room_id = ? AND ((checkin < ? AND checkout > ?) OR (checkin < ? AND checkout > ?) OR (checkin >= ? AND checkout <= ?))',
                        reserved_room_id, checkout, checkout, checkin, checkin, checkin, checkout)
    end
  
    private
    def checkin_before_checkout
        return if checkout.blank? || checkin.blank?
        errors.add(:checkin, "must be before checkout date") if checkin >= checkout
    end

    
end
