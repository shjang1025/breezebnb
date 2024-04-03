# == Schema Information
#
# Table name: rooms
#
#  id              :bigint           not null, primary key
#  title           :string           not null
#  description     :text             not null
#  price_per_night :integer          not null
#  city            :string           not null
#  state           :string           not null
#  country         :string           not null
#  category        :string           not null
#  capacity        :integer          not null
#  num_beds        :integer          not null
#  num_rooms       :integer          not null
#  num_bathrooms   :integer          not null
#  has_parking     :boolean          default(FALSE), not null
#  has_washer      :boolean          default(FALSE), not null
#  has_dryer       :boolean          default(FALSE), not null
#  has_tv          :boolean          default(FALSE), not null
#  has_AC          :boolean          default(FALSE), not null
#  has_heater      :boolean          default(FALSE), not null
#  has_wifi        :boolean          default(FALSE), not null
#  has_kitchen     :boolean          default(FALSE), not null
#  has_microwave   :boolean          default(FALSE), not null
#  has_fireplace   :boolean          default(FALSE), not null
#  has_pets        :boolean          default(FALSE), not null
#  host_id         :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Room < ApplicationRecord
    CATEGORIES = ['omg', 'beach_front', 'amazing_views', 'lake_front', 'amazing_pools', 'national_park','camping', 'design', 'skiing']

    validates :category, inclusion: {in: CATEGORIES}
    validates :description, :city, :state, :country, :category, presence: true
    validates :price_per_night, numericality: {greater_than: 0}
    validates :num_bathrooms, :num_beds, :num_rooms, :capacity, 
                numericality: {only_integer: true, greater_than: 0}
    validates :has_parking, :has_washer, :has_dryer, 
                :has_tv, :has_AC, :has_heater, :has_wifi, :has_kitchen,
                :has_microwave, :has_fireplace, :has_pets, inclusion: [false, true]


    belongs_to :user, 
        class_name: :User, 
        foreign_key: :host_id
    

end
