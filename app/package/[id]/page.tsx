'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useHotelDetails } from '@/lib/api/hooks/useHotelDetails';
import { useHotelReviews } from '@/lib/api/hooks/useHotelReviews';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  ParkingCircle,
  Wind,
  Tv,
  Heart,
  Share2,
  ChevronLeft,
  Loader2,
  Check,
  Calendar,
  Users,
  Bed,
} from 'lucide-react';

export default function PackageDetailPage() {
  const params = useParams();
  const hotelId = params.id as string;

  // Fetch hotel details
  const { data: hotel, isLoading, error } = useHotelDetails({ hotelId });

  // Fetch hotel reviews
  const { data: reviews } = useHotelReviews({ hotelId, limit: 5 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
          <p className="text-neutral-600 mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const facilityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: ParkingCircle,
    restaurant: Utensils,
    cafe: Coffee,
    ac: Wind,
    tv: Tv,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-4 h-[400px]">
            <div className="col-span-2 row-span-2">
              <img
                src={hotel.main_photo || hotel.hotelImages?.[0]?.url || hotel.hotelImages?.[0]?.urlHd || 'https://via.placeholder.com/800x600'}
                alt={hotel.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {hotel.hotelImages?.slice(1, 5).map((img: any, idx: number) => (
              <div key={idx} className={idx < 2 ? 'col-span-2' : 'col-span-1'}>
                <img
                  src={img.url || img.urlHd || img}
                  alt={`${hotel.name} ${idx + 2}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {hotel.starRating && (
                        <div className="flex">
                          {[...Array(hotel.starRating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                      <Badge variant="secondary">Hotel</Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.address || `${hotel.city}, ${hotel.countryCode}`}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Hotel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 leading-relaxed">
                      {hotel.description || hotel.hotelImportantInformation || 'No description available.'}
                    </p>
                  </CardContent>
                </Card>

                {(hotel.address || hotel.location) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-700 mb-4">
                        {hotel.address || `${hotel.city}, ${hotel.country || hotel.countryCode}`}
                      </p>
                      {(hotel.location?.latitude || hotel.latitude) && (
                        <div className="bg-neutral-100 rounded-lg h-64 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                            <p className="text-sm text-neutral-500">
                              {hotel.location?.latitude || hotel.latitude}, {hotel.location?.longitude || hotel.longitude}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="rooms" className="space-y-4">
                {hotel.rooms?.length > 0 ? (
                  hotel.rooms.map((room: any, idx: number) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          {room.photos?.[0] && (
                            <img
                              src={room.photos[0].url_max}
                              alt={room.roomName}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{room.roomName}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 mb-4">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Max {room.maxAdults} Adults
                              </div>
                              <div className="flex items-center gap-2">
                                <Bed className="w-4 h-4" />
                                {room.roomSizeSquare}m²
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities?.slice(0, 5).map((amenity: any, i: number) => (
                                <Badge key={i} variant="outline">
                                  {amenity.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-neutral-600">
                      Room information not available
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hotel Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.facilities?.length > 0 ? (
                        hotel.facilities.map((facility: any, idx: number) => {
                          const facilityName = typeof facility === 'string' ? facility : facility.name || facility.id;
                          const Icon = facilityIcons[facilityName?.toLowerCase()] || Check;
                          return (
                            <div key={idx} className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-emerald-600" />
                              <span className="text-neutral-700">{facilityName}</span>
                            </div>
                          );
                        })
                      ) : hotel.amenities?.length > 0 ? (
                        hotel.amenities.map((amenity: any, idx: number) => {
                          const amenityName = typeof amenity === 'string' ? amenity : amenity.name || amenity.id;
                          return (
                            <div key={idx} className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-emerald-600" />
                              <span className="text-neutral-700">{amenityName}</span>
                            </div>
                          );
                        })
                      ) : (
                        <p className="col-span-3 text-neutral-600">No amenities listed</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {reviews?.length > 0 ? (
                  reviews.map((review: any) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.guestName || 'Anonymous'}</h4>
                            <p className="text-sm text-neutral-500">{review.reviewDate}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold">{review.rating}/10</span>
                          </div>
                        </div>
                        <p className="text-neutral-700">{review.description}</p>
                        {review.pros && (
                          <div className="mt-2 text-sm text-green-700">
                            <strong>Pros:</strong> {review.pros}
                          </div>
                        )}
                        {review.cons && (
                          <div className="mt-1 text-sm text-red-700">
                            <strong>Cons:</strong> {review.cons}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-neutral-600">
                      No reviews available yet
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book This Hotel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hotel.rating && (
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                    <div>
                      <div className="text-2xl font-bold text-emerald-700">{hotel.rating}/10</div>
                      <div className="text-sm text-neutral-600">{hotel.reviewCount || 0} reviews</div>
                    </div>
                    <Badge className="bg-emerald-600">Excellent</Badge>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <select className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Check Availability
                </Button>

                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Free cancellation available
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Best price guarantee
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
