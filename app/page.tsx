'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/features/Hero';
import { DestinationCard } from '@/components/features/DestinationCard';
import { PackageCard } from '@/components/features/PackageCard';
import { FeatureCard } from '@/components/features/FeatureCard';
import { ReviewCard } from '@/components/features/ReviewCard';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Check, Shield, Headphones, Award, Loader2 } from 'lucide-react';
import { destinations, packages, reviews } from '@/data/mockData';
import { useHotels } from '@/lib/api/hooks/useHotels';
import { mapHotelToPackage, mapHotelToDestination } from '@/data/mockAdapters';

interface Tab {
  id: string;
  label: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs: Tab[] = [
    { id: 'all', label: 'All Packages' },
    { id: 'family', label: 'Family' },
    { id: 'umrah', label: 'Umrah' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'honeymoon', label: 'Honeymoon' }
  ];

  // Fetch hotels from India (Mumbai) for featured packages
  const { data: hotelsData, isLoading: hotelsLoading } = useHotels({
    countryCode: 'IN',
    cityName: 'Mumbai',
    limit: 6,
  });

  // Fetch hotels from India (Delhi) for destinations
  const { data: destinationsData, isLoading: destinationsLoading } = useHotels({
    countryCode: 'IN',
    cityName: 'Delhi',
    limit: 4,
  });

  // Map API data to display format, fallback to mock data if no API data
  const displayHotels = hotelsData?.length
    ? hotelsData.map(mapHotelToPackage)
    : packages;
  const displayDestinations = destinationsData?.length
    ? destinationsData.map(mapHotelToDestination)
    : destinations;

  return (
    <>
      <Navigation />
      {/* Hero Section */}
      <Hero />

      {/* Popular Destinations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="mb-2">Popular Destinations</h2>
              <p className="text-neutral-600">
                Explore the world's most beautiful halal-friendly destinations
                {<span className="ml-2 text-xs text-emerald-600 font-medium">• Live from LiteAPI</span>}
              </p>
            </div>
            <Link href="/search" className="hidden md:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {destinationsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <span className="ml-3 text-neutral-600">Loading destinations from LiteAPI...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayDestinations.slice(0, 4).map((destination) => (
                <DestinationCard
                  key={destination.id}
                  image={destination.image}
                  name={destination.name}
                  country={destination.country}
                  badge={destination.badge}
                />
              ))}
            </div>
          )}

          <div className="mt-6 text-center md:hidden">
            <Link href="/search" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              View all destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Curated Packages */}
      <section className="section-padding bg-gradient-to-br from-emerald-50/30 to-teal-50/30">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="mb-2">Curated Travel Packages</h2>
            <p className="text-neutral-600">
              Hand-picked experiences designed for Muslim travelers
              {<span className="ml-2 text-xs text-emerald-600 font-medium">• Live from LiteAPI</span>}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Package Grid */}
          {hotelsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <span className="ml-3 text-neutral-600">Loading packages from LiteAPI...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayHotels.slice(0, 6).map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  id={pkg.id}
                  image={pkg.image}
                  title={pkg.title}
                  location={pkg.location}
                  rating={pkg.rating}
                  reviews={pkg.reviews}
                  description={pkg.description}
                  badges={pkg.badges}
                  price={pkg.price}
                  priceLabel={pkg.priceLabel}
                  layout="vertical"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-emerald-50/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-2">Why Choose HalalTravel</h2>
            <p className="text-neutral-600">Your trusted partner for halal-conscious travel experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Check className="w-8 h-8" />}
              title="100% Halal Certified"
              description="Every hotel, restaurant, and activity is carefully verified to meet halal standards"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Safe & Secure"
              description="Bank-level encryption and secure payment processing for your peace of mind"
            />
            <FeatureCard
              icon={<Headphones className="w-8 h-8" />}
              title="24/7 Support"
              description="Our dedicated team is always available to assist you in multiple languages"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Best Price Guarantee"
              description="Find a lower price? We'll match it and give you an additional 5% off"
            />
          </div>
        </div>
      </section>

      {/* Prayer Time Widget - Special Feature */}
      <section className="section-padding bg-gradient-to-br from-teal-600 to-emerald-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C11.5 7 7 11.5 2 12c5 .5 9.5 5 10 10 .5-5 5-9.5 10-10-5-.5-9.5-5-10-10z"/>
                  </svg>
                  <span className="text-sm font-medium">Islamic Features</span>
                </div>
                <h2 className="mb-4">Never Miss Your Prayer</h2>
                <p className="text-white/90 text-lg mb-6">
                  Access prayer times for any destination, Qibla compass, and nearby mosque locations wherever you travel
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">5x Daily</div>
                    <div className="text-sm text-white/80">Prayer Alerts</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">Qibla</div>
                    <div className="text-sm text-white/80">Direction Finder</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">10,000+</div>
                    <div className="text-sm text-white/80">Mosques Listed</div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center relative">
                  <div className="absolute inset-8 rounded-full border-2 border-white/30" />
                  <div className="absolute inset-16 rounded-full border-2 border-white/40" />
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">3:45 PM</div>
                    <div className="text-lg mb-1">Asr Prayer</div>
                    <div className="text-sm text-white/80">In 15 minutes</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-emerald-300 origin-bottom -translate-x-1/2 -translate-y-full rotate-45" style={{transformOrigin: 'bottom center'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-2">What Our Travelers Say</h2>
            <p className="text-neutral-600">Real experiences from Muslim travelers around the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                date={review.date}
                rating={review.rating}
                text={review.text}
                helpfulCount={review.helpfulCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Ready to Start Your Halal Journey?</h2>
            <p className="text-body-large text-white/90 mb-8">
              Join thousands of satisfied Muslim travelers who have discovered the world while staying true to their values
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/search">
                <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105">
                  Browse Destinations
                </button>
              </Link>
              <Link href="/search">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-all">
                  Plan Custom Trip
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
