'use client';

import { useState } from 'react';
import { useHotels } from '@/lib/api/hooks/useHotels';
import { useCities } from '@/lib/api/hooks/useCities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Building2, Loader2 } from 'lucide-react';

export default function TestIndiaHotelsPage() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchEnabled, setSearchEnabled] = useState(false);

  // Fetch Indian cities
  const { data: citiesData, isLoading: citiesLoading } = useCities({
    countryCode: 'IN',
    limit: 20,
  });

  // Fetch hotels in selected city
  const { data: hotels, isLoading: hotelsLoading, error: hotelsError } = useHotels(
    {
      countryCode: 'IN',
      cityName: selectedCity,
      limit: 10,
    },
    {
      enabled: searchEnabled && !!selectedCity,
    }
  );

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setSearchEnabled(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">India Hotels API Test</h1>
          <p className="text-neutral-600">
            Testing LiteAPI integration for hotels in India
          </p>
        </div>

        {/* City Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 1: Select an Indian City</CardTitle>
            <CardDescription>
              Choose a city to fetch available hotels
            </CardDescription>
          </CardHeader>
          <CardContent>
            {citiesLoading ? (
              <div className="flex items-center gap-2 text-neutral-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading Indian cities...
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {citiesData?.data?.map((city: any) => (
                  <Button
                    key={city.id}
                    variant={selectedCity === city.name ? 'default' : 'outline'}
                    onClick={() => handleCitySelect(city.name)}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    {city.name}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hotels Results */}
        {selectedCity && (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Hotels in {selectedCity}</CardTitle>
              <CardDescription>
                {hotelsLoading
                  ? 'Fetching hotels...'
                  : hotels
                  ? `Found ${hotels.length} hotels`
                  : 'No hotels found'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hotelsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
              ) : hotelsError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-medium">Error fetching hotels</p>
                  <p className="text-red-600 text-sm mt-1">
                    {(hotelsError as any).message || 'Unknown error'}
                  </p>
                </div>
              ) : hotels && hotels.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {hotels.map((hotel: any) => (
                    <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-neutral-200">
                        {hotel.main_photo ? (
                          <img
                            src={hotel.main_photo}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-12 h-12 text-neutral-400" />
                          </div>
                        )}
                        {hotel.starRating && (
                          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{hotel.starRating}</span>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{hotel.name}</CardTitle>
                        <CardDescription className="flex items-start gap-1">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{hotel.address || hotel.city}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-600">Hotel ID:</span>
                            <Badge variant="secondary">{hotel.id}</Badge>
                          </div>
                          {hotel.rating && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neutral-600">Rating:</span>
                              <span className="font-medium">{hotel.rating}/10</span>
                            </div>
                          )}
                          {hotel.chain && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neutral-600">Chain:</span>
                              <span className="font-medium">{hotel.chain}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-600">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                  <p>No hotels found in {selectedCity}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* API Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>API Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Implemented Endpoints:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                <li><code>/api/data/cities</code> - Fetch cities (with countryCode filter)</li>
                <li><code>/api/data/countries</code> - Fetch all countries</li>
                <li><code>/api/hotels</code> - Fetch hotels list (with countryCode and cityName filters)</li>
                <li><code>/api/hotels/[id]</code> - Fetch hotel details</li>
                <li><code>/api/hotels/[id]/reviews</code> - Fetch hotel reviews</li>
                <li><code>/api/search</code> - Search hotels with rates (POST)</li>
                <li><code>/api/data/facilities</code> - Fetch facilities list</li>
                <li><code>/api/booking/prebook</code> - Pre-validate booking (POST)</li>
                <li><code>/api/booking/book</code> - Create booking (POST)</li>
                <li><code>/api/booking</code> - Get bookings list</li>
                <li><code>/api/booking/[id]</code> - Get/Cancel booking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">India-Specific Usage:</h4>
              <p className="text-sm text-neutral-600">
                The API supports India through the <code className="bg-neutral-100 px-1 py-0.5 rounded">countryCode='IN'</code> parameter.
                All endpoints use LiteAPI as the backend, which provides data for hotels across all countries including India.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
