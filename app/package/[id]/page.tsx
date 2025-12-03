'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Rating,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Divider,
  Avatar,
  Paper,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  ArrowBack,
  FavoriteBorder,
  Favorite,
  Share,
  LocationOn,
  Wifi,
  Restaurant,
  LocalParking,
  FitnessCenter,
  Pool,
  Spa as SpaIcon,
  CheckCircle,
  CalendarMonth,
  People,
  Star as StarIcon,
  NightsStay,
  Groups,
  NoFood,
  AutoAwesome,
  Hotel as HotelIcon,
  KingBed,
  PhotoLibrary,
} from '@mui/icons-material';
import { useHotelById, useHotelReviews } from '@/lib/api/hooks';
import { useRatesQuery } from '@/lib/api/hooks/useRates';
import { formatDateForAPI, getMinimumRate } from '@/lib/api/services/ratesService';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{
        minHeight: value === index ? 'auto' : 0,
        transition: 'min-height 0.3s ease',
      }}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const facilityIcons: { [key: string]: any } = {
  wifi: Wifi,
  parking: LocalParking,
  restaurant: Restaurant,
  gym: FitnessCenter,
  pool: Pool,
  spa: SpaIcon,
  cafe: Restaurant,
  ac: AutoAwesome,
};

export default function PackageDetailPage() {
  const params = useParams();
  const hotelId = params.id as string;
  const [tabValue, setTabValue] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Set default dates: tomorrow and day after tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const [checkIn, setCheckIn] = useState(formatDateForAPI(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateForAPI(dayAfter));
  const [guests, setGuests] = useState('2');
  const [reviewsLimit, setReviewsLimit] = useState(5);

  const { data: hotel, isLoading, error, refetch } = useHotelById(hotelId);
  const { data: reviews, isLoading: reviewsLoading } = useHotelReviews({
    hotelId,
    limit: reviewsLimit,
    offset: 0
  });

  // Fetch rates automatically when dates are available
  const ratesParams = checkIn && checkOut && hotelId ? {
    hotelIds: [hotelId],
    checkin: checkIn,
    checkout: checkOut,
    currency: 'USD',
    guestNationality: 'US',
    occupancies: [{
      rooms: 1,
      adults: parseInt(guests) || 2,
      children: []
    }]
  } : null;

  const { data: ratesData, isLoading: ratesLoading } = useRatesQuery(ratesParams);

  // Get minimum rate for display
  const minRate = ratesData?.[0] ? getMinimumRate(ratesData[0]) : null;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Navigation />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ color: '#059669', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Loading hotel details...
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error || !hotel) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Navigation />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              error && (
                <Button color="inherit" size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              )
            }
          >
            <Typography variant="h6" gutterBottom>
              {error ? 'Unable to Load Hotel' : 'Hotel Not Found'}
            </Typography>
            <Typography variant="body2">
              {error
                ? 'We encountered an error while loading hotel details.'
                : "The hotel you're looking for doesn't exist."}
            </Typography>
          </Alert>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" startIcon={<ArrowBack />} sx={{ bgcolor: '#059669' }}>
              Back to Home
            </Button>
          </Link>
        </Container>
      </Box>
    );
  }

  const images = [
    hotel.main_photo || hotel.hotelImages?.[0]?.url,
    ...(hotel.hotelImages?.slice(1, 5).map((img: any) => img.url || img.urlHd || img) || []),
  ].filter(Boolean);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Navigation />

      {/* Breadcrumb */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', py: 2 }}>
        <Container maxWidth="xl">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button startIcon={<ArrowBack />} sx={{ color: '#059669', textTransform: 'none' }}>
              Back to Home
            </Button>
          </Link>
        </Container>
      </Box>

      {/* Image Gallery */}
      <Box sx={{ bgcolor: 'white', py: 3 }}>
        <Container maxWidth="xl">
          <ImageList
            sx={{ width: '100%', height: 450, borderRadius: 3, overflow: 'hidden' }}
            variant="quilted"
            cols={4}
            rowHeight={225}
          >
            {images.slice(0, 5).map((img, index) => (
              <ImageListItem
                key={index}
                cols={index === 0 ? 2 : 1}
                rows={index === 0 ? 2 : 1}
                sx={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.05)' },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    bgcolor: '#f5f5f5',
                  }}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${hotel.name} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
                {index === 4 && images.length > 5 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <PhotoLibrary sx={{ mr: 1 }} />
                    <Typography variant="h6">+{images.length - 5} Photos</Typography>
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            {/* Header Card */}
            <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      {hotel.starRating && (
                        <Rating value={hotel.starRating} readOnly size="small" />
                      )}
                      <Chip
                        icon={<HotelIcon sx={{ fontSize: 16 }} />}
                        label="Hotel"
                        size="small"
                        sx={{ bgcolor: '#e0e7ff', color: '#4338ca', fontWeight: 600 }}
                      />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#111827' }}>
                      {hotel.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6b7280' }}>
                      <LocationOn sx={{ fontSize: 20, color: '#10b981' }} />
                      <Typography variant="body1">{hotel.address || `${hotel.city}, ${hotel.countryCode}`}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      sx={{
                        bgcolor: '#f3f4f6',
                        '&:hover': { bgcolor: '#e5e7eb' },
                      }}
                    >
                      {isWishlisted ? (
                        <Favorite sx={{ color: '#ef4444' }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <IconButton sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e5e7eb' } }}>
                      <Share />
                    </IconButton>
                  </Box>
                </Box>

                {hotel.rating && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: '#d1fae5',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#065f46' }}>
                        {hotel.rating}/10
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#059669' }}>
                        Excellent
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body2" sx={{ color: '#065f46', fontWeight: 500 }}>
                      {hotel.reviewCount || 0} reviews
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minHeight: 600 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0, bgcolor: 'white', zIndex: 10 }}>
                <Tabs
                  value={tabValue}
                  onChange={(_, newValue) => setTabValue(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      minWidth: { xs: 100, sm: 120 },
                      px: { xs: 2, sm: 3 },
                    },
                    '& .Mui-selected': {
                      color: '#059669',
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#059669',
                      height: 3,
                    },
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Rooms & Rates" />
                  <Tab label="Facilities" />
                  <Tab label="Location" />
                  <Tab label="Reviews" />
                </Tabs>
              </Box>

              {/* Overview Tab */}
              <TabPanel value={tabValue} index={0}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#111827' }}>
                    About This Hotel
                  </Typography>
                  <Box
                    sx={{
                      color: '#4b5563',
                      lineHeight: 1.8,
                      mb: 4,
                      '& p': { mb: 2 },
                      '& strong': { fontWeight: 600, color: '#111827' },
                      '& ul, & ol': { pl: 3, mb: 2 },
                      '& li': { mb: 1 },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hotel.hotelDescription || hotel.description || hotel.hotelImportantInformation || '<p>Experience comfort and luxury at this wonderful property.</p>',
                    }}
                  />

                  {/* Hotel Highlights */}
                  {(hotel.starRating || hotel.stars || hotel.hotelTypeId) && (
                    <>
                      <Divider sx={{ my: 4 }} />
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#111827' }}>
                        Hotel Highlights
                      </Typography>
                      <Grid container spacing={2}>
                        {(hotel.starRating || hotel.stars) && (
                          <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f9fafb' }}>
                              <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669', mb: 1 }}>
                                {hotel.starRating || hotel.stars}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Star Rating
                              </Typography>
                            </Paper>
                          </Grid>
                        )}
                        {hotel.reviewCount && (
                          <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f9fafb' }}>
                              <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669', mb: 1 }}>
                                {hotel.reviewCount.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Reviews
                              </Typography>
                            </Paper>
                          </Grid>
                        )}
                        {hotel.facilities && hotel.facilities.length > 0 && (
                          <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f9fafb' }}>
                              <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669', mb: 1 }}>
                                {hotel.facilities.length}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Facilities
                              </Typography>
                            </Paper>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )}

                  {/* Important Information */}
                  {hotel.hotelImportantInformation && hotel.hotelImportantInformation !== hotel.hotelDescription && (
                    <>
                      <Divider sx={{ my: 4 }} />
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          Important Information
                        </Typography>
                        <Box
                          sx={{
                            '& p': { mb: 1 },
                            '& ul, & ol': { pl: 2 },
                          }}
                          dangerouslySetInnerHTML={{
                            __html: hotel.hotelImportantInformation,
                          }}
                        />
                      </Alert>
                    </>
                  )}

                  {/* Check-in/Check-out Times */}
                  {hotel.checkinCheckoutTimes && (
                    <>
                      <Divider sx={{ my: 4 }} />
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#111827' }}>
                        Check-in & Check-out
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                            <CalendarMonth sx={{ fontSize: 32, color: '#059669' }} />
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Check-in from
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {hotel.checkinCheckoutTimes.checkin || 'TBD'}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                            <CalendarMonth sx={{ fontSize: 32, color: '#059669' }} />
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Check-out until
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {hotel.checkinCheckoutTimes.checkout || 'TBD'}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </CardContent>
              </TabPanel>

              {/* Rooms & Rates Tab */}
              <TabPanel value={tabValue} index={1}>
                <CardContent>
                  {hotel.rooms?.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {hotel.rooms.map((room: any, idx: number) => (
                        <Paper
                          key={idx}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            border: '1px solid #e5e7eb',
                            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
                            transition: 'all 0.3s',
                          }}
                        >
                          <Grid container spacing={3}>
                            {room.photos?.[0] && (
                              <Grid item xs={12} md={4}>
                                <Box
                                  sx={{
                                    position: 'relative',
                                    paddingTop: '75%',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    bgcolor: '#f5f5f5',
                                  }}
                                >
                                  <img
                                    src={room.photos[0].url_max}
                                    alt={room.roomName}
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                </Box>
                              </Grid>
                            )}
                            <Grid item xs={12} md={room.photos?.[0] ? 8 : 12}>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                {room.roomName}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <People sx={{ color: '#059669', fontSize: 20 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    Max {room.maxAdults} Adults
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <KingBed sx={{ color: '#059669', fontSize: 20 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {room.roomSizeSquare}m²
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {room.amenities?.slice(0, 6).map((amenity: any, i: number) => (
                                  <Chip
                                    key={i}
                                    label={amenity.name}
                                    size="small"
                                    sx={{ bgcolor: '#f3f4f6', fontWeight: 500 }}
                                  />
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <HotelIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        Room information not available
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </TabPanel>

              {/* Facilities Tab */}
              <TabPanel value={tabValue} index={2}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#111827' }}>
                    Hotel Facilities & Amenities
                  </Typography>
                  {hotel.facilities?.length > 0 || hotel.amenities?.length > 0 ? (
                    <Grid container spacing={2}>
                      {(hotel.facilities || hotel.amenities || []).map((facility: any, idx: number) => {
                        const facilityName = typeof facility === 'string' ? facility : facility.name || facility.id;
                        const Icon = facilityIcons[facilityName?.toLowerCase()] || CheckCircle;
                        return (
                          <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                                bgcolor: '#f9fafb',
                                borderRadius: 2,
                              }}
                            >
                              <Icon sx={{ color: '#059669', fontSize: 24 }} />
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {facilityName}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <SpaIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        No amenities listed
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </TabPanel>

              {/* Location Tab */}
              <TabPanel value={tabValue} index={3}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#111827' }}>
                    Location & Map
                  </Typography>

                  {/* Address Information */}
                  {(hotel.address || hotel.city) && (
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                        <LocationOn sx={{ color: '#10b981', fontSize: 32, mt: 0.5 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Address
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#111827', fontWeight: 500, mb: 0.5 }}>
                            {hotel.address || hotel.name}
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#6b7280' }}>
                            {hotel.city}{hotel.city && (hotel.country || hotel.countryCode) && ', '}{hotel.country || hotel.countryCode}
                          </Typography>
                          {hotel.zip && (
                            <Typography variant="body2" sx={{ color: '#9ca3af', mt: 0.5 }}>
                              Postal Code: {hotel.zip}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  )}

                  {/* Coordinates */}
                  {(hotel.location?.latitude || hotel.latitude) && (
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Geographic Coordinates
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 2 }}>
                              <LocationOn sx={{ color: '#059669', fontSize: 24 }} />
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Latitude
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {hotel.location?.latitude || hotel.latitude}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 2 }}>
                              <LocationOn sx={{ color: '#059669', fontSize: 24 }} />
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Longitude
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {hotel.location?.longitude || hotel.longitude}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Map Placeholder */}
                      <Box sx={{ mt: 3 }}>
                        <Paper
                          sx={{
                            height: 300,
                            bgcolor: '#e5e7eb',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 2,
                          }}
                        >
                          <LocationOn sx={{ fontSize: 64, color: '#9ca3af' }} />
                          <Typography variant="body1" color="text.secondary">
                            Map integration coming soon
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              bgcolor: '#059669',
                              '&:hover': { bgcolor: '#047857' },
                            }}
                            onClick={() => {
                              const lat = hotel.location?.latitude || hotel.latitude;
                              const lng = hotel.location?.longitude || hotel.longitude;
                              window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                            }}
                          >
                            View on Google Maps
                          </Button>
                        </Paper>
                      </Box>
                    </Paper>
                  )}

                  {/* Getting There Info */}
                  {!hotel.location?.latitude && !hotel.latitude && (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <LocationOn sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        Detailed location information not available
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </TabPanel>

              {/* Reviews Tab */}
              <TabPanel value={tabValue} index={4}>
                <CardContent>
                  {/* Review Statistics */}
                  {hotel && hotel.rating && hotel.reviewCount && (
                    <Paper
                      sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 700, color: '#059669', mb: 1 }}>
                              {hotel.rating}/10
                            </Typography>
                            <Rating
                              value={hotel.rating / 2}
                              precision={0.1}
                              readOnly
                              size="large"
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="body1" color="text.secondary">
                              Based on {hotel.reviewCount.toLocaleString()} reviews
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {[5, 4, 3, 2, 1].map((stars) => {
                              const percentage = Math.random() * 60 + 20; // Mock data - replace with real distribution
                              return (
                                <Box key={stars} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography variant="body2" sx={{ minWidth: 60, fontWeight: 600 }}>
                                    {stars} stars
                                  </Typography>
                                  <Box
                                    sx={{
                                      flex: 1,
                                      height: 8,
                                      bgcolor: '#e5e7eb',
                                      borderRadius: 1,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: `${percentage}%`,
                                        height: '100%',
                                        bgcolor: '#059669',
                                        transition: 'width 0.5s ease',
                                      }}
                                    />
                                  </Box>
                                  <Typography variant="caption" sx={{ minWidth: 40, color: '#6b7280' }}>
                                    {Math.round(percentage)}%
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  )}

                  {/* Reviews List */}
                  {reviewsLoading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {[1, 2, 3].map((i) => (
                        <Paper
                          key={i}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            border: '1px solid #e5e7eb',
                          }}
                        >
                          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                bgcolor: '#f3f4f6',
                                animation: 'pulse 1.5s ease-in-out infinite',
                                '@keyframes pulse': {
                                  '0%, 100%': { opacity: 1 },
                                  '50%': { opacity: 0.5 },
                                },
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  height: 20,
                                  width: '30%',
                                  bgcolor: '#f3f4f6',
                                  borderRadius: 1,
                                  mb: 1,
                                  animation: 'pulse 1.5s ease-in-out infinite',
                                }}
                              />
                              <Box
                                sx={{
                                  height: 80,
                                  width: '100%',
                                  bgcolor: '#f3f4f6',
                                  borderRadius: 1,
                                  animation: 'pulse 1.5s ease-in-out infinite',
                                }}
                              />
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : reviews && reviews.length > 0 ? (
                    <>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {reviews.map((review: any, index: number) => {
                          const displayScore = review.averageScore || review.rating || 0;
                          const displayName = review.name || review.guestName || 'Anonymous';
                          const displayDate = review.date || review.reviewDate;
                          const displayTitle = review.headline || review.title;
                          const reviewerType = review.type ? review.type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : null;

                          return (
                            <Paper
                              key={review.id || index}
                              sx={{
                                p: 3,
                                borderRadius: 2,
                                border: '1px solid #e5e7eb',
                                transition: 'all 0.3s',
                                '&:hover': {
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Avatar
                                    sx={{
                                      bgcolor: '#059669',
                                      width: 48,
                                      height: 48,
                                      fontWeight: 700,
                                    }}
                                  >
                                    {displayName[0].toUpperCase()}
                                  </Avatar>
                                  <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {displayName}
                                      </Typography>
                                      {review.country && (
                                        <Chip
                                          label={review.country.toUpperCase()}
                                          size="small"
                                          sx={{
                                            height: 20,
                                            fontSize: '0.7rem',
                                            bgcolor: '#f3f4f6',
                                            color: '#6b7280',
                                            fontWeight: 600,
                                          }}
                                        />
                                      )}
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                      <Typography variant="caption" color="text.secondary">
                                        {displayDate
                                          ? new Date(displayDate).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                            })
                                          : 'Date not available'}
                                      </Typography>
                                      {reviewerType && (
                                        <>
                                          <Typography variant="caption" color="text.secondary">•</Typography>
                                          <Typography variant="caption" sx={{ color: '#059669', fontWeight: 500 }}>
                                            {reviewerType}
                                          </Typography>
                                        </>
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                                <Chip
                                  icon={<StarIcon sx={{ fontSize: 16 }} />}
                                  label={`${displayScore}/10`}
                                  sx={{
                                    bgcolor: displayScore >= 8 ? '#d1fae5' : displayScore >= 6 ? '#fef3c7' : '#fee2e2',
                                    color: displayScore >= 8 ? '#065f46' : displayScore >= 6 ? '#92400e' : '#991b1b',
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                  }}
                                />
                              </Box>

                              {displayTitle && (
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: '#111827' }}>
                                  {displayTitle}
                                </Typography>
                              )}

                              {review.description && (
                                <Typography variant="body1" sx={{ color: '#4b5563', mb: 2, lineHeight: 1.7 }}>
                                  {review.description}
                                </Typography>
                              )}

                              {(review.pros || review.cons) && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                                  {review.pros && review.pros.trim() !== '' && (
                                    <Box
                                      sx={{
                                        p: 2,
                                        bgcolor: '#d1fae5',
                                        borderRadius: 2,
                                        borderLeft: '4px solid #059669',
                                      }}
                                    >
                                      <Typography variant="body2" sx={{ color: '#065f46', fontWeight: 600, mb: 0.5 }}>
                                        👍 What guests loved:
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#047857' }}>
                                        {review.pros}
                                      </Typography>
                                    </Box>
                                  )}
                                  {review.cons && review.cons.trim() !== '' && (
                                    <Box
                                      sx={{
                                        p: 2,
                                        bgcolor: '#fee2e2',
                                        borderRadius: 2,
                                        borderLeft: '4px solid #dc2626',
                                      }}
                                    >
                                      <Typography variant="body2" sx={{ color: '#991b1b', fontWeight: 600, mb: 0.5 }}>
                                        👎 Room for improvement:
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#b91c1c' }}>
                                        {review.cons}
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              )}

                              {/* Review Source */}
                              {review.source && (
                                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f3f4f6' }}>
                                  <Typography variant="caption" sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
                                    Review source: {review.source}
                                  </Typography>
                                </Box>
                              )}
                            </Paper>
                          );
                        })}
                      </Box>

                      {/* Load More Button */}
                      {reviews.length >= reviewsLimit && (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                          <Button
                            variant="outlined"
                            size="large"
                            onClick={() => setReviewsLimit((prev) => prev + 5)}
                            sx={{
                              borderColor: '#059669',
                              color: '#059669',
                              fontWeight: 600,
                              px: 4,
                              py: 1.5,
                              '&:hover': {
                                borderColor: '#047857',
                                bgcolor: '#d1fae5',
                              },
                            }}
                          >
                            Load More Reviews
                          </Button>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          bgcolor: '#f3f4f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <StarIcon sx={{ fontSize: 64, color: '#d1d5db' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#374151' }}>
                        No reviews yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Be the first to share your experience at this hotel
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </TabPanel>
            </Card>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 16 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  border: '2px solid #d1fae5',
                  transition: 'all 0.3s ease',
                }}
              >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#111827' }}>
                  Book This Hotel
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#374151' }}>
                    Check-in
                  </Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    InputProps={{
                      startAdornment: <CalendarMonth sx={{ mr: 1, color: '#9ca3af' }} />,
                    }}
                    sx={{ bgcolor: '#f9fafb' }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#374151' }}>
                    Check-out
                  </Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    InputProps={{
                      startAdornment: <CalendarMonth sx={{ mr: 1, color: '#9ca3af' }} />,
                    }}
                    sx={{ bgcolor: '#f9fafb' }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#374151' }}>
                    Guests
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    InputProps={{
                      startAdornment: <People sx={{ mr: 1, color: '#9ca3af' }} />,
                    }}
                    sx={{ bgcolor: '#f9fafb' }}
                  >
                    <MenuItem value="1">1 Adult</MenuItem>
                    <MenuItem value="2">2 Adults</MenuItem>
                    <MenuItem value="3">3 Adults</MenuItem>
                    <MenuItem value="4">4 Adults</MenuItem>
                  </TextField>
                </Box>

                {/* Price Display */}
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    bgcolor: '#f0fdf4',
                    border: '2px solid #d1fae5',
                    borderRadius: 2,
                  }}
                >
                  {ratesLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={20} sx={{ color: '#059669' }} />
                      <Typography variant="body2" color="text.secondary">
                        Checking rates...
                      </Typography>
                    </Box>
                  ) : minRate ? (
                    <>
                      <Typography variant="caption" sx={{ color: '#047857', fontWeight: 600, textTransform: 'uppercase' }}>
                        Total Price
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669' }}>
                          ${minRate.retailRate.total[0]?.amount.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {minRate.retailRate.total[0]?.currency}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mt: 0.5 }}>
                        For {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} night(s)
                      </Typography>
                      {minRate.cancellationPolicies?.refundableTag === 'RFN' && (
                        <Chip
                          label="Free Cancellation"
                          size="small"
                          sx={{
                            mt: 1.5,
                            bgcolor: '#d1fae5',
                            color: '#065f46',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {checkIn && checkOut ? 'No rates available for selected dates' : 'Select dates to see pricing'}
                    </Typography>
                  )}
                </Paper>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={ratesLoading || !minRate}
                  sx={{
                    bgcolor: '#059669',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(5,150,105,0.3)',
                    '&:hover': {
                      bgcolor: '#047857',
                      boxShadow: '0 6px 16px rgba(5,150,105,0.4)',
                    },
                    '&:disabled': {
                      bgcolor: '#d1d5db',
                      color: '#9ca3af',
                    },
                  }}
                >
                  {ratesLoading ? 'Checking...' : minRate ? 'Book Now' : 'Check Availability'}
                </Button>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      Free cancellation available
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      Best price guarantee
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      No booking fees
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
