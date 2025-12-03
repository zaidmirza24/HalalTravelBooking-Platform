import React from 'react';
import { Card, CardMedia, Typography, Chip, Box } from '@mui/material';
import { LocationOn, ArrowForward, Star, FiberNew } from '@mui/icons-material';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface DestinationCardProps {
  image: string;
  name: string;
  country: string;
  badge?: 'featured' | 'new';
}

export function DestinationCard({ image, name, country, badge }: DestinationCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          transform: 'translateY(-8px)',
          '& .card-media img': {
            transform: 'scale(1.1)',
          },
          '& .gradient-overlay': {
            opacity: 1,
          },
          '& .explore-button': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '& .arrow-icon': {
            transform: 'translateX(4px)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
        {/* Image */}
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
          <ImageWithFallback src={image} alt={name} />
        </CardMedia>

        {/* Base gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />

        {/* Animated emerald overlay on hover */}
        <Box
          className="gradient-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(5,150,105,0.6) 0%, rgba(16,185,129,0.2) 50%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.5s',
          }}
        />

        {/* Badge */}
        {badge && (
          <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
            <Chip
              icon={badge === 'featured' ? <Star sx={{ fontSize: 16 }} /> : <FiberNew sx={{ fontSize: 16 }} />}
              label={badge}
              size="small"
              sx={{
                bgcolor: badge === 'featured' ? '#fef3c7' : '#dbeafe',
                color: badge === 'featured' ? '#92400e' : '#1e40af',
                fontWeight: 600,
                textTransform: 'capitalize',
                '& .MuiChip-icon': {
                  ml: 0.5,
                },
              }}
            />
          </Box>
        )}

        {/* Content */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            zIndex: 10,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                mb: 1,
                color: 'white',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <LocationOn sx={{ fontSize: 16, color: 'rgba(255,255,255,0.9)' }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {country}
              </Typography>
            </Box>
          </Box>

          {/* Explore button - appears on hover */}
          <Box
            className="explore-button"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              opacity: 0,
              transform: 'translateY(8px)',
              transition: 'all 0.3s',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Explore destination
            </Typography>
            <ArrowForward
              className="arrow-icon"
              sx={{
                fontSize: 16,
                color: 'white',
                transition: 'transform 0.3s',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
