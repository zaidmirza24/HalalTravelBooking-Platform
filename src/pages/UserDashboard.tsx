import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import {
  Briefcase, Heart, User, Settings,
  Calendar, MapPin, Download, Share2, MessageCircle,
  ChevronRight, Clock, LucideIcon
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type TabId = 'trips' | 'wishlist' | 'profile' | 'settings';

interface SidebarItem {
  id: TabId;
  icon: LucideIcon;
  label: string;
}

interface Trip {
  id: number;
  title: string;
  location: string;
  dates: string;
  status: 'upcoming' | 'completed';
  image: string;
  bookingId: string;
  travelers: string;
  totalPaid: number;
}

interface WishlistItem {
  id: number;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
}

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('trips');

  const sidebarItems: SidebarItem[] = [
    { id: 'trips', icon: Briefcase, label: 'My Trips' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const trips: Trip[] = [
    {
      id: 1,
      title: 'Luxury Istanbul Discovery',
      location: 'Istanbul, Turkey',
      dates: 'Dec 15-22, 2024',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1609518624785-dd9d1d436d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJsdWUlMjBtb3NxdWV8ZW58MXx8fHwxNzY0MDY3NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bookingId: 'HT-2024-12345',
      travelers: '2 Adults',
      totalPaid: 2846
    },
    {
      id: 2,
      title: 'Maldives Paradise Retreat',
      location: 'Maldives',
      dates: 'Jan 10-17, 2025',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2NDAzODc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bookingId: 'HT-2024-12346',
      travelers: '2 Adults, 1 Child',
      totalPaid: 4997
    },
    {
      id: 3,
      title: 'Premium Umrah Package',
      location: 'Makkah & Madinah, Saudi Arabia',
      dates: 'Sep 5-12, 2024',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGthYWJhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjQwNjc2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bookingId: 'HT-2024-12340',
      travelers: '2 Adults',
      totalPaid: 4097
    }
  ];

  const wishlistItems: WishlistItem[] = [
    {
      id: 1,
      title: 'Dubai Modern Luxury',
      location: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1606138369267-ff17948d119c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBwYWxtfGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 1799,
      rating: 4.7
    },
    {
      id: 2,
      title: 'Marrakech Cultural Adventure',
      location: 'Marrakech, Morocco',
      image: 'https://images.unsplash.com/photo-1706553397756-07063648e11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWFycmFrZWNofGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 1099,
      rating: 4.6
    }
  ];
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
              <span className="text-3xl font-bold">AS</span>
            </div>
            <div>
              <h2 className="mb-1">Welcome back, Ahmed!</h2>
              <p className="text-white/90">Manage your trips and explore new destinations</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-card p-4">
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
          
          {/* Mobile Tabs */}
          <div className="lg:hidden bg-white rounded-xl shadow-card p-2 mb-4">
            <div className="flex gap-2 overflow-x-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeTab === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1">
            {/* My Trips Tab */}
            {activeTab === 'trips' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3>My Trips</h3>
                  <Link to="/search">
                    <Button variant="secondary" size="small">
                      Browse Packages
                    </Button>
                  </Link>
                </div>
                
                {/* Upcoming Trips */}
                <div className="mb-8">
                  <h4 className="mb-4">Upcoming Trips</h4>
                  <div className="space-y-4">
                    {trips.filter(t => t.status === 'upcoming').map((trip) => (
                      <div key={trip.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
                            <ImageWithFallback 
                              src={trip.image}
                              alt={trip.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Upcoming
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6 flex-1">
                            <div className="flex flex-col h-full">
                              <div className="flex-1">
                                <h4 className="mb-2">{trip.title}</h4>
                                <div className="flex flex-col gap-2 mb-4">
                                  <div className="flex items-center gap-2 text-neutral-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{trip.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-neutral-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{trip.dates}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-neutral-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">Starting in 25 days</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <Badge type="halal" />
                                  <Badge type="prayer-room" />
                                  <Badge type="family-friendly" />
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-200">
                                <Link to={`/package/${trip.id}`}>
                                  <Button variant="primary" size="small">
                                    View Details
                                  </Button>
                                </Link>
                                <button className="flex items-center gap-2 text-sm text-neutral-700 hover:text-emerald-600 transition-colors">
                                  <Download className="w-4 h-4" />
                                  <span>Download</span>
                                </button>
                                <button className="flex items-center gap-2 text-sm text-neutral-700 hover:text-emerald-600 transition-colors">
                                  <Share2 className="w-4 h-4" />
                                  <span>Share</span>
                                </button>
                                <button className="flex items-center gap-2 text-sm text-neutral-700 hover:text-emerald-600 transition-colors ml-auto">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>Support</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Past Trips */}
                <div>
                  <h4 className="mb-4">Past Trips</h4>
                  <div className="space-y-4">
                    {trips.filter(t => t.status === 'completed').map((trip) => (
                      <div key={trip.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all opacity-90">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
                            <ImageWithFallback 
                              src={trip.image}
                              alt={trip.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <div className="bg-neutral-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Completed
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6 flex-1">
                            <div className="flex flex-col h-full">
                              <div className="flex-1">
                                <h4 className="mb-2">{trip.title}</h4>
                                <div className="flex flex-col gap-2 mb-4">
                                  <div className="flex items-center gap-2 text-neutral-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{trip.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-neutral-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{trip.dates}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-200">
                                <Button variant="secondary" size="small">
                                  Leave Review
                                </Button>
                                <Button variant="ghost" size="small">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="mb-1">My Wishlist</h3>
                    <p className="text-neutral-600">{wishlistItems.length} saved packages</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all group">
                      <div className="relative h-48">
                        <ImageWithFallback 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </button>
                      </div>
                      <div className="p-6">
                        <h4 className="mb-2">{item.title}</h4>
                        <div className="flex items-center gap-2 text-neutral-600 mb-4">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-emerald-600">${item.price}</h4>
                            <span className="text-caption text-neutral-500">per person</span>
                          </div>
                          <Link to={`/package/${item.id}`}>
                            <Button variant="secondary" size="small">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="mb-6">Profile Information</h3>
                
                <div className="bg-white rounded-xl shadow-card p-6 mb-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold">
                      AS
                    </div>
                    <div>
                      <h4 className="mb-2">Ahmed Smith</h4>
                      <p className="text-neutral-600 mb-2">ahmed.smith@email.com</p>
                      <Button variant="secondary" size="small">
                        Change Photo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        First Name
                      </label>
                      <input 
                        type="text"
                        defaultValue="Ahmed"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Last Name
                      </label>
                      <input 
                        type="text"
                        defaultValue="Smith"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email
                      </label>
                      <input 
                        type="email"
                        defaultValue="ahmed.smith@email.com"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone
                      </label>
                      <input 
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
                    <Button variant="ghost" size="medium">
                      Cancel
                    </Button>
                    <Button variant="primary" size="medium">
                      Save Changes
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h4 className="mb-4">Travel Preferences</h4>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-medium">Prayer Time Notifications</div>
                        <div className="text-sm text-neutral-600">Receive alerts for prayer times during trips</div>
                      </div>
                      <input 
                        type="checkbox" 
                        className="w-12 h-6 rounded-full appearance-none bg-neutral-300 checked:bg-emerald-600 relative transition-colors cursor-pointer"
                        defaultChecked
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-neutral-600">Receive travel deals and inspiration</div>
                      </div>
                      <input 
                        type="checkbox" 
                        className="w-12 h-6 rounded-full appearance-none bg-neutral-300 checked:bg-emerald-600 relative transition-colors cursor-pointer"
                        defaultChecked
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="mb-6">Settings</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-card p-6">
                    <h4 className="mb-4">Account Settings</h4>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-neutral-50 transition-colors">
                        <span className="font-medium">Change Password</span>
                        <ChevronRight className="w-5 h-5 text-neutral-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-neutral-50 transition-colors">
                        <span className="font-medium">Payment Methods</span>
                        <ChevronRight className="w-5 h-5 text-neutral-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-neutral-50 transition-colors">
                        <span className="font-medium">Privacy Settings</span>
                        <ChevronRight className="w-5 h-5 text-neutral-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-card p-6">
                    <h4 className="mb-4">Preferences</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Language
                        </label>
                        <select className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer">
                          <option>English</option>
                          <option>Arabic</option>
                          <option>Turkish</option>
                          <option>Malay</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Currency
                        </label>
                        <select className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer">
                          <option>USD - US Dollar</option>
                          <option>EUR - Euro</option>
                          <option>GBP - British Pound</option>
                          <option>AED - UAE Dirham</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-card p-6">
                    <h4 className="mb-2 text-red-600">Danger Zone</h4>
                    <p className="text-sm text-neutral-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <Button variant="ghost" size="medium" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
      
      <MobileBottomNav activePage="trips" />
    </div>
  );
}
