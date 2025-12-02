export const destinations = [
  {
    id: 1,
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1609518624785-dd9d1d436d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJsdWUlMjBtb3NxdWV8ZW58MXx8fHwxNzY0MDY3NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'featured' as const
  },
  {
    id: 2,
    name: 'Maldives',
    country: 'South Asia',
    image: 'https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2NDAzODc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'new' as const
  },
  {
    id: 3,
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1606138369267-ff17948d119c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBwYWxtfGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'featured' as const
  },
  {
    id: 4,
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1706553397756-07063648e11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWFycmFrZWNofGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 5,
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1706249085166-bc6e8a0691cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxheXNpYSUyMHBldHJvbmFzJTIwdG93ZXJzfGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 6,
    name: 'Makkah',
    country: 'Saudi Arabia',
    image: 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGthYWJhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjQwNjc2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 7,
    name: 'Bosphorus',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1589561454226-796a8aa89b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJvc3Bob3J1c3xlbnwxfHx8fDE3NjQwNjc2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 8,
    name: 'Antalya',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1609518624785-dd9d1d436d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJsdWUlMjBtb3NxdWV8ZW58MXx8fHwxNzY0MDY3NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export const packages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1609518624785-dd9d1d436d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJsdWUlMjBtb3NxdWV8ZW58MXx8fHwxNzY0MDY3NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Luxury Istanbul Discovery',
    location: 'Istanbul, Turkey',
    rating: 4.8,
    reviews: 234,
    description: 'Experience the magic of Istanbul with exclusive access to mosques, bazaars, and stunning Bosphorus views. Includes halal meals and guided Islamic heritage tours.',
    badges: ['halal', 'prayer-room', 'family-friendly', 'no-alcohol'] as const,
    price: 1299,
    priceLabel: 'per person'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2NDAzODc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Maldives Paradise Retreat',
    location: 'Maldives',
    rating: 4.9,
    reviews: 189,
    description: 'Unwind in a private island resort with pristine beaches, overwater villas, and complete halal facilities. Perfect for families and honeymooners.',
    badges: ['halal', 'prayer-room', 'family-friendly', 'women-only'] as const,
    price: 2499,
    priceLabel: 'per person'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1606138369267-ff17948d119c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBwYWxtfGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Dubai Modern Luxury',
    location: 'Dubai, UAE',
    rating: 4.7,
    reviews: 312,
    description: 'Experience world-class luxury in Dubai with desert safaris, shopping experiences, and iconic landmarks. All accommodations feature prayer rooms and halal dining.',
    badges: ['halal', 'prayer-room', 'family-friendly'] as const,
    price: 1799,
    priceLabel: 'per person'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGthYWJhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjQwNjc2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Premium Umrah Package',
    location: 'Makkah & Madinah, Saudi Arabia',
    rating: 5.0,
    reviews: 456,
    description: 'Complete your spiritual journey with our comprehensive Umrah package. Includes 5-star accommodations near the Haram, guided tours, and all necessary arrangements.',
    badges: ['halal', 'prayer-room', 'family-friendly', 'no-alcohol'] as const,
    price: 1999,
    priceLabel: 'per person'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1706553397756-07063648e11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWFycmFrZWNofGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Marrakech Cultural Adventure',
    location: 'Marrakech, Morocco',
    rating: 4.6,
    reviews: 178,
    description: 'Immerse yourself in Moroccan culture with visits to historic medinas, stunning palaces, and the beautiful Atlas Mountains. Authentic halal cuisine included.',
    badges: ['halal', 'prayer-room', 'family-friendly'] as const,
    price: 1099,
    priceLabel: 'per person'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1706249085166-bc6e8a0691cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxheXNpYSUyMHBldHJvbmFzJTIwdG93ZXJzfGVufDF8fHx8MTc2NDA2NzYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Malaysia Explorer',
    location: 'Kuala Lumpur, Malaysia',
    rating: 4.5,
    reviews: 203,
    description: 'Discover the vibrant city of Kuala Lumpur with its modern skyline, Islamic heritage sites, and world-class halal food scene. Perfect for food lovers!',
    badges: ['halal', 'prayer-room', 'family-friendly', 'no-alcohol'] as const,
    price: 899,
    priceLabel: 'per person'
  }
];

export const reviews = [
  {
    id: 1,
    name: 'Amina Khan',
    date: 'November 15, 2024',
    rating: 5,
    text: 'Our family trip to Istanbul was absolutely amazing! The hotel had excellent prayer facilities, and all the food was 100% halal. The tour guide was knowledgeable about Islamic history. Highly recommend HalalTravel for Muslim families!',
    helpfulCount: 24
  },
  {
    id: 2,
    name: 'Mohammed Ali',
    date: 'November 10, 2024',
    rating: 5,
    text: 'Completed Umrah with my wife using this package. Everything was perfectly organized - accommodations near the Haram, transportation, and guidance. Made our spiritual journey stress-free and memorable. JazakAllah khair!',
    helpfulCount: 31
  },
  {
    id: 3,
    name: 'Fatima Rahman',
    date: 'November 5, 2024',
    rating: 4,
    text: "The Maldives resort exceeded our expectations. Private prayer rooms, hijab-friendly beach areas, and amazing halal cuisine. Only minor suggestion would be more variety in the meal options, but overall it was a dream vacation!",
    helpfulCount: 18
  }
];
