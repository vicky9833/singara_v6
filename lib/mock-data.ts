import type { Artist, ServiceCategory, FilterState } from '@/types'

// ── Artist placeholder gradient pool (by artist index) ──────────────────────
export const ARTIST_CARD_GRADIENTS = [
  'linear-gradient(135deg, var(--color-rosewater) 0%, var(--color-sandstone) 100%)',
  'linear-gradient(135deg, var(--color-marigold) 0%, var(--color-sandstone) 100%)',
  'linear-gradient(135deg, var(--color-heritage-gold) 0%, var(--color-rosewater) 100%)',
  'linear-gradient(135deg, var(--color-sandstone) 0%, var(--color-dune) 100%)',
  'linear-gradient(135deg, var(--color-mist-warm) 0%, var(--color-sandstone) 100%)',
  'linear-gradient(135deg, var(--color-rosewater) 0%, var(--color-heritage-gold) 100%)',
  'linear-gradient(135deg, var(--color-dune) 0%, var(--color-rosewater) 100%)',
  'linear-gradient(135deg, var(--color-sandstone) 0%, var(--color-marigold) 100%)',
]

export const PORTFOLIO_GRADIENTS = [
  'linear-gradient(135deg, var(--color-rosewater) 0%, var(--color-sandstone) 100%)',
  'linear-gradient(135deg, var(--color-marigold) 0%, var(--color-rosewater) 100%)',
  'linear-gradient(135deg, var(--color-sandstone) 0%, var(--color-dune) 100%)',
  'linear-gradient(135deg, var(--color-heritage-gold) 0%, var(--color-sandstone) 100%)',
  'linear-gradient(135deg, var(--color-rosewater) 0%, var(--color-mist-warm) 100%)',
  'linear-gradient(135deg, var(--color-mist-warm) 0%, var(--color-rosewater) 100%)',
  'linear-gradient(135deg, var(--color-dune) 0%, var(--color-heritage-gold) 100%)',
  'linear-gradient(135deg, var(--color-sandstone) 0%, var(--color-rosewater) 100%)',
  'linear-gradient(135deg, var(--color-marigold) 0%, var(--color-dune) 100%)',
]

// ── Mock artist data ─────────────────────────────────────────────────────────
const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    firstName: 'Priya',
    lastName: 'Agarwal',
    displayName: 'Priya Agarwal',
    photoUrl: null,
    bio: 'I believe every bride deserves to feel like the most beautiful version of herself. With over a decade of experience in bridal artistry, I specialize in creating timeless looks that photograph beautifully and last through every emotion of your big day.',
    city: 'Bangalore',
    area: 'Jayanagar',
    categories: ['bridal'],
    experienceYears: 12,
    avgRating: 4.9,
    totalReviews: 128,
    totalBookings: 340,
    responseTimeMinutes: 30,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Hindi'],
    gender: 'woman',
    startingPrice: 8000,
    travelRadiusKm: 25,
    workingHours: { start: '07:00', end: '21:00' },
    memberSince: '2022-01-15',
    portfolioImages: [
      { id: 'p1-1', url: '', category: 'bridal', caption: 'Sabyasachi bridal look' },
      { id: 'p1-2', url: '', category: 'bridal', caption: 'South Indian bridal' },
      { id: 'p1-3', url: '', category: 'bridal', caption: 'Reception glam' },
      { id: 'p1-4', url: '', category: 'bridal', caption: 'Mehendi occasion' },
      { id: 'p1-5', url: '', category: 'bridal', caption: 'Engagement look' },
      { id: 'p1-6', url: '', category: 'bridal', caption: 'Sangeet night' },
    ],
    services: [
      {
        id: 's1-1',
        name: 'Bridal Complete',
        category: 'bridal',
        description: 'Full bridal makeup, hair styling, and draping for your wedding day. Includes pre-bridal consultation and a signature product kit.',
        durationMinutes: 180,
        basePrice: 15000,
        peakPrice: 18000,
        isPopular: true,
      },
      {
        id: 's1-2',
        name: 'Bridal Trial',
        category: 'bridal',
        description: 'A full rehearsal session to perfect your wedding-day look. Includes one complete makeup and hair run-through.',
        durationMinutes: 120,
        basePrice: 5000,
        peakPrice: 6000,
      },
      {
        id: 's1-3',
        name: 'Reception Look',
        category: 'bridal',
        description: 'Glamorous evening makeup and hair styling for the reception. Bold, photogenic, and long-lasting.',
        durationMinutes: 120,
        basePrice: 8000,
        peakPrice: 10000,
      },
      {
        id: 's1-4',
        name: 'Engagement Look',
        category: 'bridal',
        description: 'A soft, romantic look for your engagement ceremony. Dewy skin, defined eyes, and elegant hair.',
        durationMinutes: 90,
        basePrice: 7000,
        peakPrice: 8500,
      },
    ],
    reviews: [
      {
        id: 'r1-1',
        customerName: 'Deepika Verma',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Priya is an absolute genius. My bridal look was exactly what I had imagined — classic, timeless, and it lasted the entire day and night. Every photo looked stunning.',
        date: '2024-03-12',
        serviceCategory: 'bridal',
        artistResponse: 'Thank you so much, Deepika! It was a privilege to be a part of your special day.',
      },
      {
        id: 'r1-2',
        customerName: 'Neha Singh',
        customerPhotoUrl: null,
        rating: 5,
        text: 'I booked Priya for my reception and the look she created was jaw-dropping. She listened to everything I wanted and delivered it perfectly. Highly recommend!',
        date: '2024-02-20',
        serviceCategory: 'bridal',
      },
      {
        id: 'r1-3',
        customerName: 'Pooja Gupta',
        customerPhotoUrl: null,
        rating: 4,
        text: 'Great experience overall. The look was beautiful and she was very professional. The only thing is she arrived 15 minutes late, but once she started, it was worth every minute.',
        date: '2024-01-08',
        serviceCategory: 'bridal',
      },
      {
        id: 'r1-4',
        customerName: 'Shreya Nair',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Booked for my engagement and I have never felt more beautiful. She has this incredible ability to enhance your natural features without making you look overdone. Pure artistry.',
        date: '2023-12-30',
        serviceCategory: 'bridal',
      },
    ],
  },
  {
    id: 'a2',
    firstName: 'Sneha',
    lastName: 'Kapoor',
    displayName: 'Sneha Kapoor',
    photoUrl: null,
    bio: 'From smoky editorials to the perfect party-night glam, I thrive on creative looks that push boundaries while staying wearable. Trained at VLCC and worked with leading fashion photographers in Bangalore.',
    city: 'Bangalore',
    area: 'Indiranagar',
    categories: ['party', 'editorial'],
    experienceYears: 7,
    avgRating: 4.8,
    totalReviews: 94,
    totalBookings: 210,
    responseTimeMinutes: 45,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Hindi', 'Kannada'],
    gender: 'woman',
    startingPrice: 3500,
    travelRadiusKm: 20,
    workingHours: { start: '09:00', end: '22:00' },
    memberSince: '2022-06-01',
    portfolioImages: [
      { id: 'p2-1', url: '', category: 'party', caption: 'NYE glam' },
      { id: 'p2-2', url: '', category: 'editorial', caption: 'Fashion editorial shoot' },
      { id: 'p2-3', url: '', category: 'party', caption: 'Cocktail evening look' },
      { id: 'p2-4', url: '', category: 'editorial', caption: 'High-fashion shoot' },
      { id: 'p2-5', url: '', category: 'party', caption: 'Birthday glam' },
    ],
    services: [
      {
        id: 's2-1',
        name: 'Party Glam',
        category: 'party',
        description: 'High-impact party makeup with long-lasting formulas. Perfect for nights out, cocktail events, and celebrations.',
        durationMinutes: 60,
        basePrice: 3500,
        peakPrice: 4500,
        isPopular: true,
      },
      {
        id: 's2-2',
        name: 'Editorial Look',
        category: 'editorial',
        description: 'Conceptual, fashion-forward makeup for photo shoots and creative projects. Includes consultation on the creative brief.',
        durationMinutes: 90,
        basePrice: 6000,
        peakPrice: 7000,
      },
      {
        id: 's2-3',
        name: 'Airbrush Glam',
        category: 'party',
        description: 'Flawless, camera-ready airbrush finish. Lightweight, buildable, and perfect for photographs.',
        durationMinutes: 75,
        basePrice: 4500,
        peakPrice: 5500,
      },
    ],
    reviews: [
      {
        id: 'r2-1',
        customerName: 'Ananya Krishnamurthy',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Sneha did my makeup for a fashion shoot and the photos were incredible. She understood the brief immediately and executed it perfectly. Will definitely rebook.',
        date: '2024-03-01',
        serviceCategory: 'editorial',
      },
      {
        id: 'r2-2',
        customerName: 'Preethi Rao',
        customerPhotoUrl: null,
        rating: 5,
        text: "Booked for my best friend's bachelorette and she made all 4 of us look absolutely gorgeous. Super fun to work with and incredibly talented.",
        date: '2024-02-14',
        serviceCategory: 'party',
      },
      {
        id: 'r2-3',
        customerName: 'Sonal Mehta',
        customerPhotoUrl: null,
        rating: 4,
        text: 'Great makeup artist. The look she created for the party was stunning. Would have given 5 stars but she was a bit rushed. Overall very happy with the result.',
        date: '2024-01-20',
        serviceCategory: 'party',
      },
    ],
  },
  {
    id: 'a3',
    firstName: 'Meera',
    lastName: 'Reddy',
    displayName: 'Meera Reddy',
    photoUrl: null,
    bio: 'With 15 years of experience specializing in South Indian and pan-Indian bridal looks, I bring an encyclopedic knowledge of regional bridal traditions. Based in Bangalore, I have dedicated my career to honoring the beauty of every regional bridal style.',
    city: 'Bangalore',
    area: 'Malleshwaram',
    categories: ['bridal', 'mehendi'],
    experienceYears: 15,
    avgRating: 5.0,
    totalReviews: 56,
    totalBookings: 180,
    responseTimeMinutes: 60,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Hindi', 'Telugu'],
    gender: 'woman',
    startingPrice: 12000,
    travelRadiusKm: 30,
    workingHours: { start: '07:00', end: '20:00' },
    memberSince: '2021-11-10',
    portfolioImages: [
      { id: 'p3-1', url: '', category: 'bridal', caption: 'Traditional Telugu bridal' },
      { id: 'p3-2', url: '', category: 'bridal', caption: 'Kanjeevaram saree drape' },
      { id: 'p3-3', url: '', category: 'mehendi', caption: 'Bridal mehendi occasion' },
      { id: 'p3-4', url: '', category: 'bridal', caption: 'North-South fusion bridal' },
    ],
    services: [
      {
        id: 's3-1',
        name: 'South Indian Bridal',
        category: 'bridal',
        description: 'Authentic South Indian bridal look with traditional gold jewelry styling, silk saree draping, and classic eye makeup. A living heritage look.',
        durationMinutes: 210,
        basePrice: 20000,
        peakPrice: 25000,
        isPopular: true,
      },
      {
        id: 's3-2',
        name: 'Bridal Complete',
        category: 'bridal',
        description: 'Pan-Indian bridal package covering all occasions — mehendi, sangeet, wedding, and reception. Consistent look evolution across all four days.',
        durationMinutes: 180,
        basePrice: 12000,
        peakPrice: 15000,
      },
      {
        id: 's3-3',
        name: 'Mehendi Occasion',
        category: 'mehendi',
        description: 'Vibrant, festive look for your mehendi ceremony. Color-pop eyes, glowing skin, and effortless hair.',
        durationMinutes: 90,
        basePrice: 6000,
        peakPrice: 7500,
      },
    ],
    reviews: [
      {
        id: 'r3-1',
        customerName: 'Lakshmi Venkatesh',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Meera is a goddess. She did my traditional Telugu bridal look and it was exactly what I had dreamed about since childhood. Every elder in my family was moved to tears.',
        date: '2024-02-28',
        serviceCategory: 'bridal',
      },
      {
        id: 'r3-2',
        customerName: 'Madhavi Rao',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Booked Meera for my wedding in Bangalore and she was outstanding. Worth every rupee. The look was flawless and she stayed until the ceremony started just to touch up.',
        date: '2024-01-15',
        serviceCategory: 'bridal',
      },
      {
        id: 'r3-3',
        customerName: 'Sunita Reddy',
        customerPhotoUrl: null,
        rating: 5,
        text: "Booked for my daughter's mehendi and she created the most stunning look. Very professional, very warm, and incredibly talented.",
        date: '2023-11-22',
        serviceCategory: 'mehendi',
      },
    ],
  },
  {
    id: 'a4',
    firstName: 'Anjali',
    lastName: 'Sharma',
    displayName: 'Anjali Sharma',
    photoUrl: null,
    bio: 'I am a skin-first makeup artist. My philosophy: great makeup starts with great skin. I specialize in natural, dewy, skin-like finishes that look incredible both in person and in photos. Perfect for everyday clients who want to look effortlessly polished.',
    city: 'Bangalore',
    area: 'Whitefield',
    categories: ['everyday', 'skincare'],
    experienceYears: 5,
    avgRating: 4.7,
    totalReviews: 210,
    totalBookings: 450,
    responseTimeMinutes: 20,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Hindi', 'Marathi'],
    gender: 'woman',
    startingPrice: 2000,
    travelRadiusKm: 15,
    workingHours: { start: '08:00', end: '20:00' },
    memberSince: '2023-02-01',
    portfolioImages: [
      { id: 'p4-1', url: '', category: 'everyday', caption: 'Glass skin everyday look' },
      { id: 'p4-2', url: '', category: 'skincare', caption: 'Pre-event facial glow' },
      { id: 'p4-3', url: '', category: 'everyday', caption: 'Office-to-evening look' },
      { id: 'p4-4', url: '', category: 'everyday', caption: 'Natural GRWM' },
      { id: 'p4-5', url: '', category: 'skincare', caption: 'Skin prep session' },
    ],
    services: [
      {
        id: 's4-1',
        name: 'Everyday Glam',
        category: 'everyday',
        description: 'A polished, wearable look for work, casual outings, or daytime events. Skin-first approach for a natural, radiant finish.',
        durationMinutes: 45,
        basePrice: 2000,
        peakPrice: 2500,
        isPopular: true,
      },
      {
        id: 's4-2',
        name: 'Skin Prep + Makeup',
        category: 'skincare',
        description: 'A comprehensive session starting with a 20-minute skin prep using professional products, followed by makeup application for the most flawless base.',
        durationMinutes: 75,
        basePrice: 3500,
        peakPrice: 4000,
      },
      {
        id: 's4-3',
        name: 'Corporate Headshot Prep',
        category: 'everyday',
        description: 'Makeup specifically optimized for professional photography. Balanced, natural, and camera-ready.',
        durationMinutes: 60,
        basePrice: 2800,
        peakPrice: 3200,
      },
    ],
    reviews: [
      {
        id: 'r4-1',
        customerName: 'Ritu Kapoor',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Anjali is my go-to for everything! She has transformed how I think about everyday makeup. The skin prep she does before the makeup is a total game changer.',
        date: '2024-03-15',
        serviceCategory: 'everyday',
      },
      {
        id: 'r4-2',
        customerName: 'Kavya Pillai',
        customerPhotoUrl: null,
        rating: 4,
        text: 'Great for natural looks. She is super quick and punctual. I get the corporate headshot prep every few months and always look incredible in the photos.',
        date: '2024-03-05',
        serviceCategory: 'everyday',
      },
      {
        id: 'r4-3',
        customerName: 'Tara Shah',
        customerPhotoUrl: null,
        rating: 5,
        text: 'The skin prep and makeup combo is absolutely worth it. My skin looked dewy and perfect for 10+ hours. Will definitely be a regular client.',
        date: '2024-02-18',
        serviceCategory: 'skincare',
      },
    ],
  },
  {
    id: 'a5',
    firstName: 'Kavitha',
    lastName: 'Nair',
    displayName: 'Kavitha Nair',
    photoUrl: null,
    bio: 'I specialize in the union of bridal makeup and creative hair styling — because a bridal look is only complete when both are perfectly harmonized. I have been creating complete bridal transformations for 10 years and have worked at destination weddings across Kerala, Karnataka, and Tamil Nadu.',
    city: 'Bangalore',
    area: 'Koramangala',
    categories: ['bridal', 'hair'],
    experienceYears: 10,
    avgRating: 4.9,
    totalReviews: 76,
    totalBookings: 195,
    responseTimeMinutes: 30,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Malayalam', 'Kannada', 'Tamil'],
    gender: 'woman',
    startingPrice: 6500,
    travelRadiusKm: 40,
    workingHours: { start: '07:00', end: '21:00' },
    memberSince: '2022-03-20',
    portfolioImages: [
      { id: 'p5-1', url: '', category: 'bridal', caption: 'Kerala bridal look' },
      { id: 'p5-2', url: '', category: 'hair', caption: 'Floral bridal updo' },
      { id: 'p5-3', url: '', category: 'bridal', caption: 'Kasavu saree bridal' },
      { id: 'p5-4', url: '', category: 'hair', caption: 'Braid with jasmine' },
      { id: 'p5-5', url: '', category: 'bridal', caption: 'Destination wedding' },
    ],
    services: [
      {
        id: 's5-1',
        name: 'Bridal + Hair Complete',
        category: 'bridal',
        description: 'A full bridal transformation covering makeup and hair styling. My signature package — the two are designed together for a cohesive, stunning look.',
        durationMinutes: 240,
        basePrice: 18000,
        peakPrice: 22000,
        isPopular: true,
      },
      {
        id: 's5-2',
        name: 'Kerala Bridal',
        category: 'bridal',
        description: 'Authentic Kerala bridal look — kasavu saree draping, traditional gold jewelry styling, and the iconic Kerala eye makeup. A celebration of heritage.',
        durationMinutes: 180,
        basePrice: 15000,
        peakPrice: 18000,
      },
      {
        id: 's5-3',
        name: 'Bridal Hair Styling',
        category: 'hair',
        description: "Bridal hair only — elaborate updos, floral plaiting, and traditional hairstyles. Can be combined with another artist's makeup.",
        durationMinutes: 90,
        basePrice: 6500,
        peakPrice: 8000,
      },
    ],
    reviews: [
      {
        id: 'r5-1',
        customerName: 'Aishwarya Menon',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Kavitha did both my makeup and hair for my Kerala wedding. The look was straight out of a dream. She knows exactly how to style hair to complement the jewelry — I was in awe.',
        date: '2024-03-10',
        serviceCategory: 'bridal',
        artistResponse: 'It was such an honor to work on your special day, Aishwarya. You were a beautiful bride!',
      },
      {
        id: 'r5-2',
        customerName: 'Nithya Krishnan',
        customerPhotoUrl: null,
        rating: 5,
        text: 'The jasmine braid she did for my reception was the most beautiful thing I have ever seen in real life. She truly elevates hair styling to art.',
        date: '2024-02-05',
        serviceCategory: 'hair',
      },
      {
        id: 'r5-3',
        customerName: 'Divya Suresh',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Booked for my destination wedding in Coorg. She traveled with us and was absolutely wonderful throughout. Professional, calm, and incredibly skilled.',
        date: '2024-01-28',
        serviceCategory: 'bridal',
      },
    ],
  },
  {
    id: 'a6',
    firstName: 'Divya',
    lastName: 'Menon',
    displayName: 'Divya Menon',
    photoUrl: null,
    bio: 'I love making people feel confident and beautiful for every occasion — not just the big ones. My specialty is party-ready glam that stays fresh all night, and saree draping for every body type. I believe beauty should be fun, accessible, and for everyone.',
    city: 'Bangalore',
    area: 'HSR Layout',
    categories: ['party', 'draping'],
    experienceYears: 4,
    avgRating: 4.6,
    totalReviews: 42,
    totalBookings: 98,
    responseTimeMinutes: 60,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Hindi', 'Kannada'],
    gender: 'woman',
    startingPrice: 2500,
    travelRadiusKm: 15,
    workingHours: { start: '10:00', end: '22:00' },
    memberSince: '2023-05-15',
    portfolioImages: [
      { id: 'p6-1', url: '', category: 'party', caption: 'New Year party look' },
      { id: 'p6-2', url: '', category: 'draping', caption: 'Wedding guest draping' },
      { id: 'p6-3', url: '', category: 'party', caption: 'Birthday makeup' },
      { id: 'p6-4', url: '', category: 'draping', caption: 'Silk saree draping' },
    ],
    services: [
      {
        id: 's6-1',
        name: 'Party Makeup',
        category: 'party',
        description: 'Glamorous, long-lasting party makeup for any occasion. Bold lips or smoked eyes — you choose, I deliver.',
        durationMinutes: 60,
        basePrice: 2500,
        peakPrice: 3000,
        isPopular: true,
      },
      {
        id: 's6-2',
        name: 'Saree Draping',
        category: 'draping',
        description: 'Expert saree draping in any style — Nivi, Bengali, Gujarati, Kasavu, and more. Includes pinning and pleating for all-day security.',
        durationMinutes: 30,
        basePrice: 800,
        peakPrice: 1200,
      },
      {
        id: 's6-3',
        name: 'Makeup + Draping',
        category: 'party',
        description: 'The complete package — party makeup followed by expert saree draping. Perfect for weddings, festivals, and formal events.',
        durationMinutes: 90,
        basePrice: 3000,
        peakPrice: 3800,
      },
    ],
    reviews: [
      {
        id: 'r6-1',
        customerName: 'Swati Shetty',
        customerPhotoUrl: null,
        rating: 5,
        text: "Divya draped my silk saree for my sister's wedding and it stayed perfectly for 8 hours! I have struggled with saree draping my whole life and she made it look like second nature.",
        date: '2024-03-08',
        serviceCategory: 'draping',
      },
      {
        id: 'r6-2',
        customerName: 'Padma Bhat',
        customerPhotoUrl: null,
        rating: 4,
        text: 'Nice party makeup. She is friendly and talented. The look lasted well into the night. Would book again for sure.',
        date: '2024-02-22',
        serviceCategory: 'party',
      },
      {
        id: 'r6-3',
        customerName: 'Usha Nambiar',
        customerPhotoUrl: null,
        rating: 5,
        text: "Got the makeup + draping combo for my nephew's wedding. Looked and felt incredible. Great value for the price!",
        date: '2024-01-10',
        serviceCategory: 'party',
      },
    ],
  },
  {
    id: 'a7',
    firstName: 'Rashmi',
    lastName: 'Joshi',
    displayName: 'Rashmi Joshi',
    photoUrl: null,
    bio: 'My work lives at the intersection of heritage and editorial. I create bridal looks that honor tradition while feeling modern and magazine-worthy. I have been featured in Vogue India, Femina, and collaborated with leading wedding photographers in Bangalore.',
    city: 'Bangalore',
    area: 'JP Nagar',
    categories: ['bridal', 'editorial'],
    experienceYears: 8,
    avgRating: 4.8,
    totalReviews: 112,
    totalBookings: 280,
    responseTimeMinutes: 45,
    isVerified: true,
    isAvailable: false,
    availabilityMode: 'busy',
    languages: ['English', 'Hindi', 'Kannada'],
    gender: 'woman',
    startingPrice: 9000,
    travelRadiusKm: 30,
    workingHours: { start: '08:00', end: '21:00' },
    memberSince: '2022-08-01',
    portfolioImages: [
      { id: 'p7-1', url: '', category: 'bridal', caption: 'Vogue-style bridal' },
      { id: 'p7-2', url: '', category: 'editorial', caption: 'Femina editorial' },
      { id: 'p7-3', url: '', category: 'bridal', caption: 'Modern minimalist bridal' },
      { id: 'p7-4', url: '', category: 'editorial', caption: 'Dark romantic editorial' },
      { id: 'p7-5', url: '', category: 'bridal', caption: 'Heritage gold bridal' },
      { id: 'p7-6', url: '', category: 'editorial', caption: 'Festive editorial shoot' },
    ],
    services: [
      {
        id: 's7-1',
        name: 'Editorial Bridal',
        category: 'bridal',
        description: 'A magazine-worthy bridal look that balances heritage and modernity. Perfect for brides who want to look classic yet contemporary.',
        durationMinutes: 180,
        basePrice: 18000,
        peakPrice: 22000,
        isPopular: true,
      },
      {
        id: 's7-2',
        name: 'Bridal Package',
        category: 'bridal',
        description: 'Complete bridal package covering consultation, trial, and wedding-day application. Full support from first conversation to last look.',
        durationMinutes: 150,
        basePrice: 9000,
        peakPrice: 12000,
      },
      {
        id: 's7-3',
        name: 'Fashion Editorial',
        category: 'editorial',
        description: 'High-concept editorial makeup for fashion photography and lookbooks. Brief consultation included.',
        durationMinutes: 120,
        basePrice: 8000,
        peakPrice: 9000,
      },
    ],
    reviews: [
      {
        id: 'r7-1',
        customerName: 'Isha Malhotra',
        customerPhotoUrl: null,
        rating: 5,
        text: 'Rashmi did my wedding makeup and the photos look like they belong in a magazine. She has an incredible eye for detail and truly understands light and photography.',
        date: '2024-03-20',
        serviceCategory: 'bridal',
      },
      {
        id: 'r7-2',
        customerName: 'Rhea Pillai',
        customerPhotoUrl: null,
        rating: 5,
        text: 'I hired her for an editorial shoot and she completely elevated the concept. The makeup she created was transformative. Would book again in a heartbeat.',
        date: '2024-02-12',
        serviceCategory: 'editorial',
      },
      {
        id: 'r7-3',
        customerName: 'Geeta Krishnan',
        customerPhotoUrl: null,
        rating: 4,
        text: 'Beautiful work, though communication could have been faster during the booking process. The actual look was stunning and I got so many compliments.',
        date: '2024-01-30',
        serviceCategory: 'bridal',
      },
    ],
  },
  {
    id: 'a8',
    firstName: 'Fatima',
    lastName: 'Sheikh',
    displayName: 'Fatima Sheikh',
    photoUrl: null,
    bio: 'I weave traditions of mehendi artistry with modern skincare knowledge to create a complete beauty experience. My mehendi designs draw from Rajasthani, Arabic, and Indo-western styles. For skincare, I use only dermatologically tested professional products.',
    city: 'Bangalore',
    area: 'Bellandur',
    categories: ['mehendi', 'skincare'],
    experienceYears: 6,
    avgRating: 4.7,
    totalReviews: 88,
    totalBookings: 165,
    responseTimeMinutes: 40,
    isVerified: true,
    isAvailable: true,
    availabilityMode: 'available',
    languages: ['English', 'Hindi', 'Urdu', 'Kannada'],
    gender: 'woman',
    startingPrice: 3000,
    travelRadiusKm: 20,
    workingHours: { start: '09:00', end: '21:00' },
    memberSince: '2022-12-01',
    portfolioImages: [
      { id: 'p8-1', url: '', category: 'mehendi', caption: 'Bridal mehendi full arms' },
      { id: 'p8-2', url: '', category: 'skincare', caption: 'Pre-bridal glow treatment' },
      { id: 'p8-3', url: '', category: 'mehendi', caption: 'Arabic mehendi design' },
      { id: 'p8-4', url: '', category: 'mehendi', caption: 'Indo-western fusion' },
      { id: 'p8-5', url: '', category: 'skincare', caption: 'Brightening facial' },
    ],
    services: [
      {
        id: 's8-1',
        name: 'Bridal Mehendi',
        category: 'mehendi',
        description: 'Elaborate full-arm bridal mehendi in your chosen style. Includes both hands and feet. Dark stain guarantee with premium organic henna.',
        durationMinutes: 240,
        basePrice: 8000,
        peakPrice: 10000,
        isPopular: true,
      },
      {
        id: 's8-2',
        name: 'Party Mehendi',
        category: 'mehendi',
        description: 'Beautiful mehendi for guests at weddings or festivals. Quick, intricate designs in 30-45 minutes per person.',
        durationMinutes: 40,
        basePrice: 3000,
        peakPrice: 3500,
      },
      {
        id: 's8-3',
        name: 'Pre-Bridal Skincare',
        category: 'skincare',
        description: 'A series of 3 professional facial treatments in the 3 weeks before your wedding. Brightening, hydrating, and pore-refining for the perfect makeup base.',
        durationMinutes: 90,
        basePrice: 9000,
        peakPrice: 11000,
      },
    ],
    reviews: [
      {
        id: 'r8-1',
        customerName: 'Zara Khan',
        customerPhotoUrl: null,
        rating: 5,
        text: "Fatima's mehendi is extraordinary. The design she did for my wedding covered both my arms beautifully and the color lasted for almost 3 weeks. Absolute artistry.",
        date: '2024-03-25',
        serviceCategory: 'mehendi',
        artistResponse: 'Thank you so much, Zara! Your wedding was absolutely beautiful and I loved being a part of it.',
      },
      {
        id: 'r8-2',
        customerName: 'Amna Siddiqui',
        customerPhotoUrl: null,
        rating: 5,
        text: 'The pre-bridal skincare package was so worth it. By my wedding day, my skin was glowing in a way it never had before. Makeup sat beautifully on the skin she had prepared.',
        date: '2024-02-10',
        serviceCategory: 'skincare',
      },
      {
        id: 'r8-3',
        customerName: 'Rubina Mirza',
        customerPhotoUrl: null,
        rating: 4,
        text: "Beautiful party mehendi for my sister's wedding. She did designs for 12 of us and every single one was unique and gorgeous. Slight delay but worth the wait.",
        date: '2024-01-18',
        serviceCategory: 'mehendi',
      },
    ],
  },
]

// ── Helper functions ─────────────────────────────────────────────────────────

export function getArtists(): Artist[] {
  return MOCK_ARTISTS
}

export function getArtistById(id: string): Artist | undefined {
  return MOCK_ARTISTS.find((a) => a.id === id)
}

export function getArtistsByCategory(category: ServiceCategory): Artist[] {
  return MOCK_ARTISTS.filter((a) => a.categories.includes(category))
}

export function searchArtists(query: string): Artist[] {
  const q = query.toLowerCase().trim()
  if (!q) return MOCK_ARTISTS
  return MOCK_ARTISTS.filter(
    (a) =>
      a.displayName.toLowerCase().includes(q) ||
      a.area.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.bio.toLowerCase().includes(q) ||
      a.categories.some((c) => c.toLowerCase().includes(q))
  )
}

export function filterArtists(artists: Artist[], filters: FilterState): Artist[] {
  return artists.filter((a) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.some((c) => a.categories.includes(c))
    ) {
      return false
    }
    if (
      a.startingPrice < filters.priceRange[0] ||
      a.startingPrice > filters.priceRange[1]
    ) {
      return false
    }
    if (a.avgRating < filters.minRating) {
      return false
    }
    if (filters.availableOnly && !a.isAvailable) {
      return false
    }
    return true
  })
}

export function sortArtists(
  artists: Artist[],
  sortBy: FilterState['sortBy']
): Artist[] {
  const sorted = [...artists]
  switch (sortBy) {
    case 'rating':
      return sorted.sort(
        (a, b) => b.avgRating - a.avgRating || b.totalReviews - a.totalReviews
      )
    case 'price_low':
      return sorted.sort((a, b) => a.startingPrice - b.startingPrice)
    case 'price_high':
      return sorted.sort((a, b) => b.startingPrice - a.startingPrice)
    case 'reviews':
      return sorted.sort((a, b) => b.totalReviews - a.totalReviews)
    case 'distance':
      return sorted // distance requires geolocation — keep original order
    default:
      return sorted
  }
}

export function getFeaturedArtists(): Artist[] {
  return [...MOCK_ARTISTS]
    .sort(
      (a, b) =>
        b.avgRating * b.totalReviews - a.avgRating * a.totalReviews
    )
    .slice(0, 4)
}

export function getCategoryOptions(): {
  value: ServiceCategory
  label: string
}[] {
  return [
    { value: 'bridal', label: 'Bridal' },
    { value: 'party', label: 'Party' },
    { value: 'everyday', label: 'Everyday' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'mehendi', label: 'Mehendi' },
    { value: 'hair', label: 'Hair' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'draping', label: 'Draping' },
  ]
}
