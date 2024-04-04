# == Schema Information
#
# Table name: rooms
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text             not null
#  price       :integer          not null
#  address     :string           not null
#  city        :string           not null
#  state       :string           not null
#  country     :string           not null
#  category    :string           not null
#  capacity    :integer          not null
#  beds        :integer          not null
#  rooms       :integer          not null
#  baths       :integer          not null
#  parking     :boolean          default(FALSE), not null
#  washer      :boolean          default(FALSE), not null
#  dryer       :boolean          default(FALSE), not null
#  tv          :boolean          default(FALSE), not null
#  ac          :boolean          default(FALSE), not null
#  heater      :boolean          default(FALSE), not null
#  wifi        :boolean          default(FALSE), not null
#  kitchen     :boolean          default(FALSE), not null
#  microwave   :boolean          default(FALSE), not null
#  fireplace   :boolean          default(FALSE), not null
#  pets        :boolean          default(FALSE), not null
#  host_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Room < ApplicationRecord
    CATEGORIES = ['omg', 'beach_front', 'amazing_views', 'lake_front', 'amazing_pools', 'national_park','camping', 'design', 'skiing']

    validates :category, inclusion: {in: CATEGORIES}
    validates :description, :address,:city, :state, :country, :category, presence: true
    validates :price, numericality: {greater_than: 0}
    validates :baths, :beds, :rooms, :capacity, 
                numericality: {only_integer: true, greater_than: 0}
    validates :parking, :washer, :dryer, 
                :tv, :ac, :heater, :wifi, :kitchen,
                :microwave, :fireplace, :pets, inclusion: [false, true]


    belongs_to :user, 
        class_name: :User, 
        foreign_key: :host_id
    

end
