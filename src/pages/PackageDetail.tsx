import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ReviewCard } from '../components/ReviewCard';
import {
  MapPin, Star, Share2, Heart, Calendar, Users,
  Check, Wifi, Wind, Droplets, Coffee, Utensils,
  ChevronDown, MessageCircle, Shield, Clock, Loader2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { reviews } from '../data/mockData';
import { useHotelDetails } from '../api/hooks/useHotelDetails';
import { useApiMode } from '../contexts/ApiContext';

interface Tab {
  id: string;
  label: string;
}

interface GuestCount {
  adults: number;
  children: number;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface Facility {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Amenity {
  icon: React.ReactNode;
  label: string;
}

export function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const { mode } = useApiMode();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [selectedGuests, setSelectedGuests] = useState<GuestCount>({ adults: 2, children: 0 });

  // Fetch hotel details from API
  const { data: hotel, isLoading, error } = useHotelDetails(id || '', {
    enabled: mode !== 'mock' && !!id,
  });

  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'location', label: 'Location' },
    { id: 'reviews', label: 'Reviews' }
  ];

  // Use API data if available
  const hotelName = hotel?.name || 'Luxury Istanbul Discovery';
  const hotelCity = hotel?.city || 'Istanbul';
  const hotelCountry = hotel?.countryCode || hotel?.country || 'Turkey';
  const hotelAddress = hotel?.address || '';
  const hotelDescription = hotel?.hotelDescription || '';
  const hotelImportantInfo = hotel?.hotelImportantInformation || '';
  const hotelRating = hotel?.rating || hotel?.stars || 4.8;
  const hotelStars = hotel?.stars || hotel?.starRating || 5;
  const reviewCount = hotel?.reviewCount || 1248;
  const checkInTime = hotel?.checkinCheckoutTimes?.checkin || '';
  const checkOutTime = hotel?.checkinCheckoutTimes?.checkout || '';
  const hotelFacilities = hotel?.facilities || [];
  const hotelRooms = hotel?.rooms || [];

  // Use hotelImages if available, otherwise fallback
  const images: string[] = hotel?.hotelImages && hotel.hotelImages.length > 0
    ? hotel.hotelImages.slice(0, 20).map(img => img.url)
    : hotel?.main_photo
    ? [hotel.main_photo, hotel.thumbnail || hotel.main_photo, hotel.main_photo, hotel.main_photo]
    : [
        'https://images.unsplash.com/photo-1609518624785-dd9d1d436d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJsdWUlMjBtb3NxdWV8ZW58MXx8fHwxNzY0MDY3NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1589561454226-796a8aa89b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJvc3Bob3J1c3xlbnwxfHx8fDE3NjQwNjc2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1609518624785-dd9d1d436d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJsdWUlMjBtb3NxdWV8ZW58MXx8fHwxNzY0MDY3NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1589561454226-796a8aa89b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJvc3Bob3J1c3xlbnwxfHx8fDE3NjQwNjc2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
          <p className="text-neutral-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link to="/" className="hover:text-emerald-600">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-emerald-600">{hotelCountry}</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-emerald-600">{hotelCity}</Link>
            <span>/</span>
            <span className="text-neutral-900">{hotelName}</span>
          </div>
        </div>
      </div>
      
      {/* Image Gallery */}
      <div className="container-custom py-6">
        <div className="grid grid-cols-4 gap-2 h-[600px] rounded-2xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 md:row-span-2 relative group">
            <ImageWithFallback 
              src={images[0]}
              alt="Main view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer" />
          </div>
          {images.slice(1, 4).map((img, i) => (
            <div key={i} className="col-span-2 md:col-span-1 relative group cursor-pointer">
              <ImageWithFallback 
                src={img}
                alt={`View ${i + 2}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
          <button className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <span className="font-medium">Show all photos</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-custom pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">
            {/* Title Section */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="mb-3">{hotelName}</h1>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-5 h-5" />
                      <span>{hotelAddress || `${hotelCity}, ${hotelCountry}`}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < hotelStars ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-neutral-600">{hotelStars} Star Hotel</span>
                      </div>
                      {checkInTime && checkOutTime && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Clock className="w-4 h-4" />
                          <span>Check-in: {checkInTime} | Check-out: {checkOutTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge type="halal" />
                    <Badge type="prayer-room" />
                    <Badge type="family-friendly" />
                    <Badge type="no-alcohol" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:border-emerald-600 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="sticky top-20 bg-white z-40 border-b border-neutral-200 mb-8 -mx-4 md:mx-0">
              <div className="flex gap-8 overflow-x-auto px-4 md:px-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-600 text-emerald-600'
                        : 'border-transparent text-neutral-600 hover:text-emerald-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4">About this hotel</h3>
                  {hotelDescription ? (
                    <div
                      className="text-neutral-700 leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: hotelDescription }}
                    />
                  ) : (
                    <p className="text-neutral-700 leading-relaxed mb-4">
                      Discover the enchanting city where East meets West on this comprehensive luxury experience. Experience the rich Islamic heritage, stunning architecture, and vibrant culture while enjoying 100% halal accommodations and dining experiences.
                    </p>
                  )}
                </div>

                {hotelImportantInfo && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="mb-3 flex items-center gap-2 text-amber-900">
                      <Shield className="w-5 h-5" />
                      Important Information
                    </h4>
                    <div
                      className="text-sm text-amber-900 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: hotelImportantInfo }}
                    />
                  </div>
                )}

                {hotelRooms && hotelRooms.length > 0 && (
                  <div>
                    <h3 className="mb-4">Available Rooms</h3>
                    <div className="space-y-4">
                      {hotelRooms.slice(0, 3).map((room) => (
                        <div key={room.id} className="border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex gap-6">
                            {room.photos && room.photos.length > 0 && (
                              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                <ImageWithFallback
                                  src={room.photos[0].url}
                                  alt={room.roomName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="mb-2">{room.roomName}</h4>
                              <div className="flex flex-wrap gap-3 text-sm text-neutral-600 mb-3">
                                <span>{room.roomSizeSquare} {room.roomSizeUnit}</span>
                                <span>•</span>
                                <span>Max {room.maxAdults} adults</span>
                                {room.bedTypes && room.bedTypes.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{room.bedTypes.map(b => `${b.quantity} ${b.bedType}`).join(', ')}</span>
                                  </>
                                )}
                              </div>
                              {room.roomAmenities && room.roomAmenities.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {room.roomAmenities.slice(0, 6).map((amenity) => (
                                    <span key={amenity.amenitiesId} className="text-xs bg-neutral-100 px-2 py-1 rounded">
                                      {amenity.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="mb-4">What's included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Round-trip airport transfers',
                      '6 nights in 5-star halal hotel',
                      'Daily halal breakfast buffet',
                      'Guided Islamic heritage tours',
                      'Bosphorus cruise with lunch',
                      'All entrance fees included',
                      'Prayer time accommodations',
                      '24/7 local support'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <h3 className="mb-6">7-Day Itinerary</h3>
                {([
                  { day: 1, title: 'Arrival & Welcome', activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner at halal restaurant'] },
                  { day: 2, title: 'Historic Peninsula Tour', activities: ['Blue Mosque visit', 'Hagia Sophia', 'Topkapi Palace', 'Lunch at Sultanahmet'] },
                  { day: 3, title: 'Bosphorus & Asian Side', activities: ['Bosphorus cruise', 'Üsküdar mosques', 'Maiden\'s Tower', 'Asian side dinner'] },
                  { day: 4, title: 'Ottoman Heritage', activities: ['Süleymaniye Mosque', 'Grand Bazaar shopping', 'Turkish bath experience'] },
                  { day: 5, title: 'Modern Istanbul', activities: ['Taksim Square', 'Istiklal Street', 'Galata Tower', 'Modern art museums'] },
                  { day: 6, title: 'Free Day & Shopping', activities: ['Optional tours', 'Shopping at Egyptian Bazaar', 'Sunset cruise'] },
                  { day: 7, title: 'Departure', activities: ['Breakfast', 'Last minute shopping', 'Airport transfer'] }
                ] as ItineraryDay[]).map((day) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {day.day}
                      </div>
                      {day.day < 7 && <div className="w-0.5 h-full bg-emerald-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="mb-3">Day {day.day}: {day.title}</h4>
                      <ul className="space-y-2">
                        {day.activities.map((activity, i) => (
                          <li key={i} className="text-neutral-700 flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'facilities' && (
              <div className="space-y-8">
                {hotelFacilities && hotelFacilities.length > 0 ? (
                  <div>
                    <h3 className="mb-6">Hotel Facilities & Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {hotelFacilities.map((facility) => (
                        <div key={facility.facilityId} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-emerald-50 transition-colors">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">{facility.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="mb-6">Halal & Islamic Facilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {([
                          { icon: <Check className="w-6 h-6" />, title: '100% Halal Food', desc: 'All meals served are halal certified' },
                          { icon: <Check className="w-6 h-6" />, title: 'Prayer Rooms', desc: 'Dedicated prayer facilities available' },
                          { icon: <Check className="w-6 h-6" />, title: 'No Alcohol', desc: 'Completely alcohol-free premises' },
                          { icon: <Check className="w-6 h-6" />, title: 'Qibla Direction', desc: 'Clearly marked in all rooms' }
                        ] as Facility[]).map((facility, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                              {facility.icon}
                            </div>
                            <div>
                              <h4 className="mb-1">{facility.title}</h4>
                              <p className="text-sm text-neutral-600">{facility.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-6">Hotel Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {([
                          { icon: <Wifi className="w-5 h-5" />, label: 'Free WiFi' },
                          { icon: <Wind className="w-5 h-5" />, label: 'Air Conditioning' },
                          { icon: <Droplets className="w-5 h-5" />, label: 'Swimming Pool' },
                          { icon: <Coffee className="w-5 h-5" />, label: 'Coffee Maker' },
                          { icon: <Utensils className="w-5 h-5" />, label: 'Restaurant' },
                          { icon: <Shield className="w-5 h-5" />, label: '24/7 Security' },
                          { icon: <Clock className="w-5 h-5" />, label: 'Room Service' },
                          { icon: <Users className="w-5 h-5" />, label: 'Family Rooms' }
                        ] as Amenity[]).map((amenity, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-neutral-50">
                            <div className="text-emerald-600">{amenity.icon}</div>
                            <span className="text-sm text-neutral-700">{amenity.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-6">Guest Reviews</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 rounded-xl bg-neutral-50">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">{hotelRating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-sm text-neutral-600">Based on 234 reviews</div>
                    </div>
                    <div className="col-span-2 space-y-3">
                      {['Cleanliness', 'Location', 'Halal Facilities', 'Staff'].map((category, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neutral-700">{category}</span>
                            <span className="text-sm font-medium">4.{9 - i}</span>
                          </div>
                          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${(4.9 - i * 0.1) * 20}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Booking Card */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-dropdown p-6 border border-neutral-200">
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <h2 className="text-emerald-600">$1,299</h2>
                  <span className="text-neutral-600 pb-1">per person</span>
                </div>
                <p className="text-sm text-neutral-600">7 days, 6 nights</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Select Dates
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-neutral-300 rounded-lg p-3 cursor-pointer hover:border-emerald-600 transition-colors">
                      <div className="text-xs text-neutral-500 mb-1">Check-in</div>
                      <div className="font-medium">Dec 15</div>
                    </div>
                    <div className="border border-neutral-300 rounded-lg p-3 cursor-pointer hover:border-emerald-600 transition-colors">
                      <div className="text-xs text-neutral-500 mb-1">Check-out</div>
                      <div className="font-medium">Dec 22</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Guests
                  </label>
                  <div className="border border-neutral-300 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-xs text-neutral-500">Age 13+</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedGuests({...selectedGuests, adults: Math.max(1, selectedGuests.adults - 1)})}
                          className="w-8 h-8 rounded-full border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{selectedGuests.adults}</span>
                        <button 
                          onClick={() => setSelectedGuests({...selectedGuests, adults: selectedGuests.adults + 1})}
                          className="w-8 h-8 rounded-full border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Children</div>
                        <div className="text-xs text-neutral-500">Age 2-12</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedGuests({...selectedGuests, children: Math.max(0, selectedGuests.children - 1)})}
                          className="w-8 h-8 rounded-full border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{selectedGuests.children}</span>
                        <button 
                          onClick={() => setSelectedGuests({...selectedGuests, children: selectedGuests.children + 1})}
                          className="w-8 h-8 rounded-full border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 mb-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-700">
                  <span>$1,299 × {selectedGuests.adults} adults</span>
                  <span>${1299 * selectedGuests.adults}</span>
                </div>
                {selectedGuests.children > 0 && (
                  <div className="flex items-center justify-between text-neutral-700">
                    <span>$899 × {selectedGuests.children} children</span>
                    <span>${899 * selectedGuests.children}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-neutral-700">
                  <span>Service fee</span>
                  <span>$99</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-medium">Total</span>
                  <h3 className="text-emerald-600">${1299 * selectedGuests.adults + 899 * selectedGuests.children + 99}</h3>
                </div>
              </div>
              
              <Link to="/booking" className="block">
                <Button variant="primary" className="w-full mb-4">
                  Book Now
                </Button>
              </Link>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Free cancellation up to 48 hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>100% halal certified accommodations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Secure payment processing</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium w-full justify-center">
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact us on WhatsApp</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 lg:hidden z-50 shadow-dropdown">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-neutral-600">Starting from</div>
            <h4 className="text-emerald-600">$1,299 <span className="text-base text-neutral-600">/ person</span></h4>
          </div>
          <Link to="/booking">
            <Button variant="primary" size="large">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
