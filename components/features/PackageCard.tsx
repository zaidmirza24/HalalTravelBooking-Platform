import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  IconButton,
  Box,
  Rating,
} from '@mui/material';
import {
  LocationOn,
  FavoriteBorder,
  Favorite,
  Spa,
  NightsStay,
  Groups,
  NoFood,
  AutoAwesome,
} from '@mui/icons-material';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface PackageCardProps {
  id?: string | number;
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  badges: ReadonlyArray<'halal' | 'no-alcohol' | 'prayer-room' | 'family-friendly' | 'women-only'> | Array<'halal' | 'no-alcohol' | 'prayer-room' | 'family-friendly' | 'women-only'>;
  price: number;
  priceLabel: string;
  layout?: 'horizontal' | 'vertical';
}

// Badge icon mapping
const getBadgeIcon = (type: string) => {
  switch (type) {
    case 'halal':
      return <Spa sx={{ fontSize: 16 }} />;
    case 'prayer-room':
      return <NightsStay sx={{ fontSize: 16 }} />;
    case 'family-friendly':
      return <Groups sx={{ fontSize: 16 }} />;
    case 'no-alcohol':
      return <NoFood sx={{ fontSize: 16 }} />;
    case 'women-only':
      return <AutoAwesome sx={{ fontSize: 16 }} />;
    default:
      return null;
  }
};

// Badge color mapping
const getBadgeColor = (type: string): any => {
  switch (type) {
    case 'halal':
      return { bgcolor: '#d1fae5', color: '#065f46' };
    case 'prayer-room':
      return { bgcolor: '#e0e7ff', color: '#4338ca' };
    case 'family-friendly':
      return { bgcolor: '#dbeafe', color: '#1e40af' };
    case 'no-alcohol':
      return { bgcolor: '#fce7f3', color: '#9f1239' };
    case 'women-only':
      return { bgcolor: '#fae8ff', color: '#a21caf' };
    default:
      return { bgcolor: '#f3f4f6', color: '#374151' };
  }
};

export function PackageCard({
  id,
  image,
  title,
  location,
  rating,
  reviews,
  description,
  badges,
  price,
  priceLabel,
  layout = 'horizontal'
}: PackageCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Format rating to 1 decimal place
  const formattedRating = rating ? Number(rating).toFixed(1) : '0.0';
  const hasValidRating = rating && rating > 0;
  const hasReviews = reviews && reviews > 0;

  // Vertical layout for grid view
  if (layout === 'vertical') {
    return (
      <Link href={`/package/${id || 1}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              transform: 'translateY(-4px)',
              '& .card-media img': {
                transform: 'scale(1.1)',
              },
            },
          }}
        >
          {/* Image */}
          <Box sx={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
            <CardMedia
              component="div"
              className="card-media"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease-out',
                },
              }}
            >
              <ImageWithFallback src={image} alt={title} />
            </CardMedia>

            {/* Wishlist Button */}
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s',
              }}
            >
              {isWishlisted ? (
                <Favorite sx={{ color: '#ef4444', fontSize: 20 }} />
              ) : (
                <FavoriteBorder sx={{ color: '#374151', fontSize: 20 }} />
              )}
            </IconButton>
          </Box>

          {/* Content */}
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2.5,
            }}
          >
            {/* Title & Location */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.125rem',
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: '#111827',
                transition: 'color 0.3s',
                '&:hover': { color: '#059669' },
              }}
            >
              {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
              <LocationOn sx={{ fontSize: 16, color: '#10b981' }} />
              <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500, fontSize: '0.875rem' }}>
                {location}
              </Typography>
            </Box>

            {/* Rating */}
            <Box sx={{ mb: 1.5, minHeight: 28 }}>
              {hasValidRating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={parseFloat(formattedRating)} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>
                    {formattedRating}
                  </Typography>
                  {hasReviews && (
                    <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 500 }}>
                      ({reviews.toLocaleString()})
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                mb: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
                minHeight: 40,
              }}
            >
              {description ? description.substring(0, 150) : 'Discover comfort and authentic hospitality'}
            </Typography>

            {/* Badges */}
            <Box sx={{ mb: 2, minHeight: 24, display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {badges && badges.length > 0 &&
                badges.slice(0, 3).map((badge, i) => (
                  <Chip
                    key={i}
                    icon={getBadgeIcon(badge)}
                    label={badge.replace(/-/g, ' ')}
                    size="small"
                    sx={{
                      ...getBadgeColor(badge),
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                      textTransform: 'capitalize',
                      '& .MuiChip-icon': {
                        ml: 0.5,
                      },
                    }}
                  />
                ))}
            </Box>

            {/* Price & CTA */}
            <Box
              sx={{
                mt: 'auto',
                pt: 2,
                borderTop: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {price > 0 ? (
                  <>
                    <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 500, display: 'block', mb: 0.25 }}>
                      From
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#059669' }}>
                        ${price}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 500 }}>
                        {priceLabel}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#6b7280' }}>
                    Price on request
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: '#d1fae5',
                  color: '#065f46',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  '&:hover': {
                    bgcolor: '#059669',
                    color: 'white',
                  },
                  transition: 'all 0.3s',
                }}
              >
                View Deal
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Horizontal layout for list view
  return (
    <Link href={`/package/${id || 1}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            transform: 'translateY(-4px)',
            '& .card-media img': {
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: 320 },
            paddingTop: { xs: '75%', sm: 0 },
            height: { xs: 'auto', sm: 'auto' },
            aspectRatio: { sm: '4/3' },
            flexShrink: 0,
            overflow: 'hidden',
            bgcolor: '#f5f5f5',
          }}
        >
          <CardMedia
            component="div"
            className="card-media"
            sx={{
              position: { xs: 'absolute', sm: 'static' },
              top: { xs: 0, sm: 'auto' },
              left: { xs: 0, sm: 'auto' },
              width: '100%',
              height: '100%',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.7s ease-out',
              },
            }}
          >
            <ImageWithFallback src={image} alt={title} />
          </CardMedia>

          {/* Wishlist Button */}
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                bgcolor: 'white',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s',
            }}
          >
            {isWishlisted ? (
              <Favorite sx={{ color: '#ef4444', fontSize: 20 }} />
            ) : (
              <FavoriteBorder sx={{ color: '#374151', fontSize: 20 }} />
            )}
          </IconButton>
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            minWidth: 0,
          }}
        >
          {/* Title & Location */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: '#111827',
              transition: 'color 0.3s',
              '&:hover': { color: '#059669' },
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
            <LocationOn sx={{ fontSize: 18, color: '#10b981' }} />
            <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
              {location}
            </Typography>
          </Box>

          {/* Rating */}
          {hasValidRating && (
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={parseFloat(formattedRating)} precision={0.1} size="small" readOnly />
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>
                {formattedRating}
              </Typography>
              {hasReviews && (
                <Typography variant="body2" sx={{ color: '#9ca3af', fontWeight: 500 }}>
                  ({reviews.toLocaleString()} reviews)
                </Typography>
              )}
            </Box>
          )}

          {/* Description */}
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
              }}
            >
              {description.replace(/<[^>]*>/g, '').substring(0, 200)}
            </Typography>
          )}

          {/* Badges */}
          {badges && badges.length > 0 && (
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {badges.slice(0, 4).map((badge, i) => (
                <Chip
                  key={i}
                  icon={getBadgeIcon(badge)}
                  label={badge.replace(/-/g, ' ')}
                  size="small"
                  sx={{
                    ...getBadgeColor(badge),
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-icon': {
                      ml: 0.5,
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Price & CTA */}
          <Box
            sx={{
              mt: 'auto',
              pt: 2,
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              {price > 0 ? (
                <>
                  <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 500, display: 'block', mb: 0.5 }}>
                    From
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669' }}>
                      ${price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af', fontWeight: 500 }}>
                      {priceLabel}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#6b7280' }}>
                  Price on request
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#d1fae5',
                color: '#065f46',
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.25,
                borderRadius: 2,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                '&:hover': {
                  bgcolor: '#059669',
                  color: 'white',
                },
                transition: 'all 0.3s',
              }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
