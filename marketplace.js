/**
 * Centralized Marketplace Catalog
 * Single source of truth for all brainboxX products/services
 * Extensible structure for easy addition of new categories and products
 */

const MARKETPLACE_CONFIG = {
  appName: 'brainboxX',
  storagePrefix: 'brainboxx',
  currency: '₦',
  serviceFee: 2500,
  serviceFeeThreshold: 0
};

const WEBSITE_FEATURES = 'Custom design, responsive and mobile-friendly layout, SEO foundations, user-friendly pages, fast turnaround, ongoing support, and payment links.';

const CATALOG = {
  delivery: {
    category: 'Delivery & Logistics',
    icon: '📦',
    description: 'Fast nationwide delivery and logistics solutions',
    products: [
      // ===== LETTERS & DOCUMENTS =====
      { id: 'd001', name: 'Formal & Informal Letter (Hand Written)', price: 80000, desc: 'Personalized hand-written letter - nationwide delivery' },
      { id: 'd002', name: 'Love Notes With Photo', price: 80000, desc: 'Romantic personalized notes with your photo - shipped nationwide' },
      
      // ===== FOOD & BEVERAGES =====
      { id: 'd003', name: 'Pizza 30-Min Delivery', price: 60000, desc: 'Fresh hot pizza delivered within 30 minutes' },
      { id: 'd004', name: 'Birthday Cakes', price: 120000, desc: 'Custom designed birthday cakes - nationwide delivery' },
      { id: 'd005', name: 'Chocolate Box Set', price: 80000, desc: 'Premium chocolate selection - nationwide shipping' },
      { id: 'd006', name: 'Quality Red Wine', price: 120000, desc: 'Premium wine collection - delivered nationwide' },
      { id: 'd007', name: 'Fruit Basket Deluxe', price: 150000, desc: 'Fresh fruit baskets - same-day to 48hr delivery' },
      
      // ===== FLOWERS =====
      { id: 'd008', name: 'Fresh Cut Flowers (Same Day)', price: 120000, desc: 'Fresh cut flowers - same-day delivery available' },
      { id: 'd009', name: 'Artificial Glass Flower', price: 80000, desc: 'Decorative glass flowers - nationwide delivery' },
      
      // ===== JEWELRY & ACCESSORIES =====
      { id: 'd010', name: 'Ring Order (Custom)', price: 85000, desc: 'Custom designed rings - nationwide shipping' },
      { id: 'd011', name: 'Necklace Selection', price: 110000, desc: 'Premium necklaces - delivered nationwide' },
      { id: 'd012', name: 'Locket With Pictures', price: 110000, desc: 'Personalized photo locket - nationwide delivery' },
      { id: 'd013', name: 'Male Wrist Watch', price: 80000, desc: 'Premium wrist watches for men - nationwide' },
      { id: 'd014', name: 'Customized Neck Lace', price: 150000, desc: 'Custom engraved necklace - nationwide shipping' },
      { id: 'd015', name: 'Female Matching Earring & Neck Lace', price: 70000, desc: 'Coordinated jewelry set - nationwide delivery' },
      { id: 'd016', name: 'Male Necklace', price: 70000, desc: 'Stylish necklaces for men - nationwide shipping' },
      { id: 'd017', name: 'Customized Bracelets', price: 90000, desc: 'Personalized bracelets - nationwide delivery' },
      { id: 'd018', name: 'Engagement Ring (Female)', price: 75000, desc: 'Premium engagement rings - nationwide' },
      { id: 'd019', name: 'Male Engagement Ring', price: 60000, desc: 'Engagement rings for men - nationwide delivery' },
      { id: 'd020', name: 'Real Diamond Ring With Certificate', price: 150000, desc: 'Certified diamond rings with GIA certificate & name engraving' },
      
      // ===== CLOTHING & APPAREL =====
      { id: 'd021', name: 'USA Army Shirt', price: 85000, desc: 'Official USA Army merchandise - nationwide delivery' },
      { id: 'd022', name: 'Custom T-Shirt/Hoodie/Face Cap', price: 90000, desc: 'Custom printed apparel - nationwide shipping' },
      { id: 'd023', name: 'Night Wears Collection', price: 80000, desc: 'Premium sleepwear - nationwide delivery' },
      { id: 'd024', name: 'Shoes (All Basics)', price: 80000, desc: 'Quality shoes across all styles - nationwide shipping' },
      { id: 'd025', name: 'Wedding Gown', price: 250000, desc: 'Premium wedding dresses - nationwide delivery' },
      { id: 'd026', name: 'Dresses (Casual to Formal)', price: 100000, desc: 'Wide selection of dresses - nationwide shipping' },
      { id: 'd027', name: 'Men Suits (Designer)', price: 150000, desc: 'Premium tailored suits - nationwide delivery' },
      { id: 'd028', name: 'Male Leather Belt', price: 60000, desc: 'Quality leather belts - nationwide shipping' },
      { id: 'd029', name: 'Christmas Sweater', price: 90000, desc: 'Festive holiday sweaters - nationwide delivery' },
      { id: 'd030', name: 'Christmas Pyjamas', price: 105000, desc: 'Comfortable Christmas PJs - nationwide shipping' },
      { id: 'd031', name: 'Military Face Cap', price: 80000, desc: 'Military-style caps - nationwide delivery' },
      
      // ===== HANDBAGS & ACCESSORIES =====
      { id: 'd032', name: 'Purse', price: 45000, desc: 'Designer purses - nationwide shipping' },
      { id: 'd033', name: 'Hand Bag Delivery', price: 120000, desc: 'Premium handbags - nationwide delivery' },
      { id: 'd034', name: 'Female Handbag', price: 120000, desc: 'Stylish ladies handbags - nationwide shipping' },
      { id: 'd035', name: 'Eye Glasses / Shades', price: 55000, desc: 'Trendy eyewear collection - nationwide delivery' },
      
      // ===== HOME & DECOR =====
      { id: 'd036', name: 'Blankets Collection', price: 100000, desc: 'Cozy blankets - nationwide delivery' },
      { id: 'd037', name: 'Costume Mug (Custom)', price: 90000, desc: 'Custom printed mugs - nationwide shipping' },
      { id: 'd038', name: 'Picture Frame', price: 90000, desc: 'Decorative picture frames - nationwide delivery' },
      { id: 'd039', name: 'Teddy Bear', price: 135000, desc: 'Plush teddy bears - nationwide shipping' },
      { id: 'd040', name: 'Flower Teddy Bear', price: 55000, desc: 'Teddy with artificial flowers - nationwide delivery' },
      { id: 'd041', name: 'Bedside Picture Frame', price: 120000, desc: 'Personalized bedside frames - nationwide shipping' },
      { id: 'd042', name: 'Dinner Set', price: 100000, desc: 'Premium dinner sets - nationwide delivery' },
      { id: 'd043', name: 'Customized Pillow', price: 90000, desc: 'Custom printed pillows - nationwide shipping' },
      
      // ===== PERSONAL CARE =====
      { id: 'd044', name: 'Perfumes', price: 130000, desc: 'Premium fragrance collection - nationwide delivery' },
      { id: 'd045', name: 'Quality Undies', price: 100000, desc: 'Premium underwear - nationwide shipping' },
      { id: 'd046', name: 'Female Care Packages', price: 180000, desc: 'Curated women\'s care bundles - nationwide delivery' },
      { id: 'd047', name: 'Male Care Packages', price: 150000, desc: 'Curated men\'s care bundles - nationwide shipping' },
      { id: 'd048', name: 'Lingerie', price: 75000, desc: 'Premium lingerie - nationwide delivery' },
      
      // ===== SEASONAL & HOLIDAY =====
      { id: 'd049', name: 'Santa Claus Costume', price: 140000, desc: 'Complete Santa outfit - nationwide shipping' },
      { id: 'd050', name: 'Christmas Chocolate', price: 65000, desc: 'Holiday chocolate selection - nationwide delivery' },
      { id: 'd051', name: 'Table Top Christmas Tree', price: 85000, desc: 'Decorative Christmas trees - nationwide shipping' },
      { id: 'd052', name: 'Paper Star Lanterns', price: 70000, desc: 'Festive paper lanterns - nationwide delivery' },
      { id: 'd053', name: 'Christmas Cozy Slippers', price: 80000, desc: 'Comfortable Christmas slippers - nationwide shipping' },
      { id: 'd054', name: 'Christmas Lights', price: 80000, desc: 'Holiday LED lights - nationwide delivery' },
      { id: 'd055', name: 'Christmas Door Wreath', price: 90000, desc: 'Festive door wreaths - nationwide shipping' },
      { id: 'd056', name: 'Scented Christmas Candles', price: 70000, desc: 'Holiday fragrance candles - nationwide delivery' },
      { id: 'd057', name: 'Luxury Christmas Tree', price: 200000, desc: 'Premium Christmas trees - nationwide shipping' },
      { id: 'd058', name: 'Christmas Lingerie', price: 90000, desc: 'Festive lingerie - nationwide delivery' },
      { id: 'd059', name: 'Christmas Door Mat', price: 80000, desc: 'Holiday door mats - nationwide shipping' },
      { id: 'd060', name: 'Christmas Mug', price: 70000, desc: 'Festive custom mugs - nationwide delivery' },
      { id: 'd061', name: 'Christmas Socks', price: 50000, desc: 'Holiday socks collection - nationwide shipping' },
      { id: 'd062', name: 'Christmas Fleece Throw Blanket', price: 80000, desc: 'Cozy fleece blankets - nationwide delivery' },
      { id: 'd063', name: 'Christmas Tree Ornaments', price: 60000, desc: 'Decorative ornaments - nationwide shipping' },
      { id: 'd064', name: 'Christmas Hat', price: 50000, desc: 'Santa and holiday hats - nationwide delivery' },
      { id: 'd065', name: 'Christmas Lanterns', price: 90000, desc: 'Decorative lanterns - nationwide shipping' },
      
      // ===== PERSONALIZED EXTRAS =====
      { id: 'd066', name: 'Custom Key Holder', price: 90000, desc: 'Personalized home key holder - nationwide delivery' },
      { id: 'd067', name: 'Engraved Key Ring', price: 60000, desc: 'Custom name or date key ring - nationwide shipping' },
      { id: 'd068', name: 'Personalized Leather Wallet', price: 120000, desc: 'Premium wallet with name engraving - nationwide delivery' },
      { id: 'd069', name: 'Custom Photo Calendar', price: 90000, desc: 'Personalized photo calendar - nationwide shipping' },
      { id: 'd070', name: 'Gift Voucher', price: 90000, desc: 'A flexible gift voucher for a special occasion' },
      
      // ===== SPECIAL OCCASIONS & GIFTS =====
      { id: 'd071', name: 'Valentine Packages', price: 150000, desc: 'Complete Valentine\'s Day packages - nationwide shipping' },
      { id: 'd072', name: 'Rose Box + Necklace', price: 80000, desc: 'Rose box with jewelry set - nationwide delivery' },
      { id: 'd073', name: 'Name Engraved Diamond', price: 150000, desc: 'Diamond with custom engraving - nationwide shipping' },
      { id: 'd074', name: 'Personalized Gift Voucher', price: 175000, desc: 'Premium custom gift voucher - nationwide delivery' },
      { id: 'd075', name: 'Celebrity Fan/Membership Card', price: 105000, desc: 'Premium membership cards - nationwide shipping' }
    ]
  },

  digitalServices: {
    category: 'Digital Services',
    icon: '💻',
    description: 'Web, app, and software solutions',
    products: [
      { id: 'ds003', name: 'Mobile App Development (iOS)', price: 150000, desc: 'Native iOS app development' },
      { id: 'ds004', name: 'Mobile App Development (Android)', price: 140000, desc: 'Native Android app development' },
      { id: 'ds005', name: 'Landing Page Design', price: 35000, desc: 'High-converting single-page design' },
      { id: 'ds006', name: 'Website Redesign', price: 75000, desc: 'Modern UI/UX overhaul of existing site' },
      { id: 'ds007', name: 'API Development', price: 80000, desc: 'Custom REST API integration' },
      { id: 'ds008', name: 'CMS Setup & Training', price: 45000, desc: 'WordPress or custom CMS configuration' },
      { id: 'ds009', name: 'Portfolio Website', price: 55000, desc: 'Professional portfolio for creatives' },
      { id: 'ds010', name: 'Website Maintenance (Annual)', price: 30000, desc: 'Annual support and updates' }
    ]
  },

  industryWebsites: {
    category: 'Industry Websites',
    icon: '🌐',
    description: 'Purpose-built websites for businesses and specialist industries',
    products: [
      { id: 'iw001', name: 'Banking & Finance Information Website', price: 200000, desc: `A trusted finance brand website with secure enquiry forms and service pages. ${WEBSITE_FEATURES}` },
      { id: 'iw002', name: 'Brokerage Website', price: 180000, desc: `A professional brokerage website for services, enquiries, and client leads. ${WEBSITE_FEATURES}` },
      { id: 'iw003', name: 'Company Website', price: 50000, desc: `A polished company website for presenting your team, services, and contact details. ${WEBSITE_FEATURES}` },
      { id: 'iw004', name: 'E-Commerce Website', price: 120000, desc: `A complete online store with products, cart, checkout, and payment links. ${WEBSITE_FEATURES}` },
      { id: 'iw005', name: 'Food Delivery Website', price: 180000, desc: `A food ordering website with menus, delivery zones, checkout, and payment links. ${WEBSITE_FEATURES}` },
      { id: 'iw006', name: 'Hotel Website', price: 140000, desc: `A hotel website with rooms, gallery, booking enquiries, and payment links. ${WEBSITE_FEATURES}` },
      { id: 'iw007', name: 'Investment Website', price: 180000, desc: `An investment business website for services, disclosures, enquiries, and client education. ${WEBSITE_FEATURES}` },
      { id: 'iw008', name: 'Logistics Website', price: 140000, desc: `A logistics website with service areas, shipment enquiries, and customer contact flows. ${WEBSITE_FEATURES}` },
      { id: 'iw009', name: 'NFT Collection Website', price: 150000, desc: `A branded NFT collection showcase with roadmap, gallery, and wallet-link integration. ${WEBSITE_FEATURES}` },
      { id: 'iw010', name: 'Real Estate Website', price: 150000, desc: `A property listing website with searchable listings, agent enquiries, and viewing requests. ${WEBSITE_FEATURES}` }
    ]
  },

  marketing: {
    category: 'Marketing & Promotion',
    icon: '📢',
    description: 'Digital marketing and brand promotion',
    products: [
      { id: 'm001', name: 'Instagram Ads Campaign', price: 15000, desc: 'Targeted Instagram advertising (1 month)' },
      { id: 'm002', name: 'Facebook Marketing Package', price: 12000, desc: 'Facebook ads management and optimization' },
      { id: 'm003', name: 'TikTok Viral Campaign', price: 18000, desc: 'TikTok influencer and organic promotion' },
      { id: 'm004', name: 'Google Ads Setup', price: 20000, desc: 'Google search and display ads management' },
      { id: 'm005', name: 'SMS Marketing Campaign', price: 8000, desc: 'Bulk SMS promotion to customer list' },
      { id: 'm006', name: 'Email Marketing Series', price: 10000, desc: 'Email campaign automation setup' },
      { id: 'm007', name: 'Content Creation (5 posts)', price: 12000, desc: 'Professional social media content' },
      { id: 'm008', name: 'Influencer Collaboration', price: 35000, desc: 'Partner with verified social influencers' },
      { id: 'm009', name: 'Video Marketing', price: 25000, desc: 'Professional promotional video production' },
      { id: 'm010', name: 'Retargeting Ad Campaign', price: 16000, desc: 'Retarget website visitors for conversion' }
    ]
  },

  courses: {
    category: 'Tech Courses',
    icon: '🎓',
    description: 'Professional training and skill development',
    products: [
      { id: 'c001', name: 'Web Development Bootcamp', price: 10000, desc: 'HTML, CSS, JavaScript with projects' },
      { id: 'c002', name: 'AI Tools Mastery', price: 15000, desc: 'ChatGPT, Midjourney, automation tools' },
      { id: 'c003', name: 'Digital Marketing Certification', price: 12000, desc: 'SEO, SEM, social media marketing' },
      { id: 'c004', name: 'Python Programming Course', price: 14000, desc: 'Beginner to intermediate Python' },
      { id: 'c005', name: 'Mobile App Development', price: 16000, desc: 'React Native or Flutter basics' },
      { id: 'c006', name: 'Graphic Design Masterclass', price: 13000, desc: 'Canva, Figma, design principles' },
      { id: 'c007', name: 'Video Editing Pro', price: 11000, desc: 'Adobe Premiere or DaVinci Resolve' },
      { id: 'c008', name: 'Data Analytics Bootcamp', price: 18000, desc: 'Google Analytics, Excel, Tableau' },
      { id: 'c009', name: '1-on-1 Tech Mentoring (5 sessions)', price: 20000, desc: 'Personalized technical coaching' },
      { id: 'c010', name: 'E-Commerce Success Guide', price: 8000, desc: 'Building and scaling online stores' }
    ]
  },

  crypto: {
    category: 'Crypto & Digital Assets',
    icon: '₿',
    description: 'Legitimate cryptocurrency and investment services',
    products: [
      { id: 'cr001', name: 'Crypto Wallet Setup & Security', price: 5000, desc: 'Secure hardware wallet consultation' },
      { id: 'cr002', name: 'Bitcoin Exchange Facilitation', price: 8000, desc: 'Peer-to-peer Bitcoin trading support' },
      { id: 'cr003', name: 'Ethereum Trading Guidance', price: 8000, desc: 'Professional trading setup assistance' },
      { id: 'cr004', name: 'Stablecoin Conversion', price: 4000, desc: 'USDT/USDC/BUSD exchange assistance' },
      { id: 'cr005', name: 'DeFi Investment Consultation', price: 12000, desc: 'Decentralized finance strategy planning' },
      { id: 'cr006', name: 'NFT Marketplace Onboarding', price: 6000, desc: 'NFT platform setup and trading' },
      { id: 'cr007', name: 'Crypto Tax Planning', price: 15000, desc: 'Investment portfolio tax optimization' },
      { id: 'cr008', name: 'Blockchain Education Course', price: 9000, desc: 'Understanding blockchain technology' },
      { id: 'cr009', name: 'Smart Contract Audit', price: 25000, desc: 'Code review for token projects' },
      { id: 'cr010', name: 'Crypto Portfolio Management', price: 20000, desc: 'Monthly investment management service' }
    ]
  },

  giftCards: {
    category: 'Gift Cards & Digital Gifts',
    icon: '🎁',
    description: 'Digital and physical gift card solutions',
    products: [
      { id: 'g001', name: 'Amazon Gift Card', price: 10500, desc: '₦10,000 value card - instant delivery' },
      { id: 'g002', name: 'iTunes & Apple Store Card', price: 5500, desc: 'Apple ecosystem purchases' },
      { id: 'g003', name: 'Google Play Card', price: 10500, desc: 'Android apps and games' },
      { id: 'g004', name: 'Netflix Subscription Card', price: 8000, desc: '3-month premium subscription' },
      { id: 'g005', name: 'Spotify Premium Card', price: 7000, desc: 'Music streaming 3 months' },
      { id: 'g006', name: 'Steam Gaming Card', price: 15500, desc: 'PC gaming platform credit' },
      { id: 'g007', name: 'PlayStation Store Card', price: 12000, desc: 'Gaming platform credit' },
      { id: 'g008', name: 'Uber Ride Card', price: 5200, desc: 'Ride voucher credits' },
      { id: 'g009', name: 'Physical Visa Prepaid Card', price: 22000, desc: 'Reloadable international card' },
      { id: 'g010', name: 'Corporate Gift Bundle', price: 50000, desc: 'Multiple cards for team gifting' }
    ]
  },

  professional: {
    category: 'Professional Services',
    icon: '👔',
    description: 'CV writing, career coaching, and professional development',
    products: [
      { id: 'p001', name: 'CV Writing & Optimization', price: 8000, desc: 'Professional resume creation' },
      { id: 'p002', name: 'LinkedIn Profile Setup', price: 6000, desc: 'Complete LinkedIn optimization' },
      { id: 'p003', name: 'Job Application Assistance', price: 5000, desc: 'Help with job portal applications' },
      { id: 'p004', name: 'Interview Preparation', price: 10000, desc: 'Mock interviews and coaching' },
      { id: 'p005', name: 'Cover Letter Writing', price: 4000, desc: 'Customized cover letters' },
      { id: 'p006', name: 'Career Counseling (1 session)', price: 7000, desc: 'Professional career guidance' },
      { id: 'p007', name: 'Job Matching Service', price: 12000, desc: 'Curated job opportunities' },
      { id: 'p008', name: 'Freelance Portfolio Setup', price: 9000, desc: 'Upwork/Fiverr profile optimization' },
      { id: 'p009', name: 'Salary Negotiation Coaching', price: 8000, desc: 'Negotiation strategy and tips' },
      { id: 'p010', name: 'Remote Work Preparation', price: 6000, desc: 'Skills for remote opportunities' }
    ]
  },

  communication: {
    category: 'Communication Software',
    icon: '📱',
    description: 'Video conferencing and communication tools',
    products: [
      { id: 'cc001', name: 'Video Conference Setup (10 users)', price: 3000, desc: 'Full-body HD video conferencing' },
      { id: 'cc002', name: 'Team Collaboration License (Annual)', price: 12000, desc: 'Group communication platform' },
      { id: 'cc003', name: 'Virtual Event Hosting', price: 15000, desc: 'Webinar and online event setup' },
      { id: 'cc004', name: 'Live Streaming Setup', price: 8000, desc: 'Professional streaming configuration' },
      { id: 'cc005', name: 'Screen Recording Software', price: 5000, desc: 'Professional screen capture tool' },
      { id: 'cc006', name: 'Voice Over Service', price: 7000, desc: 'Professional voice-over recording' },
      { id: 'cc007', name: 'Transcription Service (5 hours)', price: 6000, desc: 'Audio-to-text conversion' },
      { id: 'cc008', name: 'Call Center Integration', price: 20000, desc: 'Business phone system setup' },
      { id: 'cc009', name: 'Chat Bot Development', price: 18000, desc: 'AI customer service bot' },
      { id: 'cc010', name: 'Multilingual Interpretation (1 hour)', price: 9000, desc: 'Real-time language interpretation' }
    ]
  },

  telecom: {
    category: 'Telecom & Connectivity',
    icon: '📴',
    description: 'SIM cards, mobile plans, and connectivity solutions',
    products: [
      { id: 't001', name: 'E-SIM Activation', price: 2000, desc: 'Virtual SIM card setup' },
      { id: 't002', name: 'International SIM Card', price: 5000, desc: 'Travel SIM for 15 countries' },
      { id: 't003', name: 'Local SIM Bundle', price: 3500, desc: 'Airtime + data package' },
      { id: 't004', name: 'Mobile Plan Migration', price: 2000, desc: 'Switch and porting assistance' },
      { id: 't005', name: 'Virtual Phone Number', price: 4000, desc: 'Business phone number service' },
      { id: 't006', name: 'VoIP Setup (Annual)', price: 10000, desc: 'Internet calling service' },
      { id: 't007', name: 'Bulk SMS Credits (1000 SMS)', price: 6000, desc: 'SMS messaging credits' },
      { id: 't008', name: 'Business Data Plan', price: 8000, desc: 'Dedicated business connectivity' },
      { id: 't009', name: '4G/5G Optimization', price: 3000, desc: 'Network speed enhancement' },
      { id: 't010', name: 'Roaming Pass (30 days)', price: 12000, desc: 'International roaming package' }
    ]
  }
};

CATALOG.launchForge = {
  category: 'LaunchForge Web & Digital Studio',
  icon: '🚀',
  description: 'Websites, platforms, apps, and digital infrastructure built to move your business forward',
  products: [...CATALOG.digitalServices.products, ...CATALOG.industryWebsites.products]
};
delete CATALOG.digitalServices;
delete CATALOG.industryWebsites;

CATALOG.giftsDelivery = {
  category: 'Gifts Order & Delivery',
  icon: '🎁',
  description: 'Digital gifts, e-gift codes, and nationwide delivery in one simple place',
  products: [...CATALOG.delivery.products, ...CATALOG.giftCards.products]
};
delete CATALOG.delivery;
delete CATALOG.giftCards;

const DELIVERY_SUBCATEGORIES = {
  accessories: { name: 'Accessories & Bags', icon: '👜', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80', productIds: ['d032', 'd033', 'd034', 'd035'] },
  apparel: { name: 'Clothing & Apparel', icon: '👗', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80', productIds: ['d021', 'd022', 'd023', 'd024', 'd025', 'd026', 'd027', 'd028', 'd029', 'd030', 'd031'] },
  flowers: { name: 'Flowers & Plants', icon: '💐', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80', productIds: ['d008', 'd009'] },
  food: { name: 'Food & Drinks', icon: '🍰', image: 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=900&q=80', productIds: ['d003', 'd004', 'd005', 'd006', 'd007'] },
  home: { name: 'Home & Decor', icon: '🏠', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80', productIds: ['d036', 'd037', 'd038', 'd039', 'd040', 'd041', 'd042', 'd043'] },
  jewelry: { name: 'Jewelry & Watches', icon: '💍', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80', productIds: ['d010', 'd011', 'd012', 'd013', 'd014', 'd015', 'd016', 'd017', 'd018', 'd019', 'd020', 'd072', 'd073'] },
  keepsakes: { name: 'Letters & Keepsakes', icon: '💌', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80', productIds: ['d001', 'd002'] },
  personal: { name: 'Personal Care', icon: '✨', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80', productIds: ['d044', 'd045', 'd046', 'd047', 'd048'] },
  personalized: { name: 'Personalized Gifts', icon: '🎀', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80', productIds: ['d066', 'd067', 'd068', 'd069', 'd070', 'd071', 'd074', 'd075'] },
  seasonal: { name: 'Seasonal & Christmas', icon: '🎄', image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=900&q=80', productIds: ['d049', 'd050', 'd051', 'd052', 'd053', 'd054', 'd055', 'd056', 'd057', 'd058', 'd059', 'd060', 'd061', 'd062', 'd063', 'd064', 'd065'] }
};

function getDeliverySubcategory(productId) {
  return Object.entries(DELIVERY_SUBCATEGORIES).find(([, subcategory]) =>
    subcategory.productIds.includes(productId)
  )?.[0] || 'personalized';
}

/**
 * Cart Management System
 */
class CartManager {
  constructor() {
    this.storageKey = `${MARKETPLACE_CONFIG.storagePrefix}-cart`;
    this.orderHistoryKey = `${MARKETPLACE_CONFIG.storagePrefix}-orders`;
    this.cart = this.loadCart();
    this.orderHistory = this.loadOrderHistory();
  }

  loadCart() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch (e) {
      console.error('Error loading cart:', e);
      return [];
    }
  }

  loadOrderHistory() {
    try {
      return JSON.parse(localStorage.getItem(this.orderHistoryKey)) || [];
    } catch (e) {
      console.error('Error loading order history:', e);
      return [];
    }
  }

  addItem(id, name, price, quantity = 1) {
    const existing = this.cart.find(item => item.id === id);
    if (existing) {
      existing.qty += parseInt(quantity) || 1;
    } else {
      this.cart.push({ id, name, price, qty: parseInt(quantity) || 1 });
    }
    this.saveCart();
  }

  removeItem(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
  }

  updateQuantity(id, quantity) {
    const item = this.cart.find(item => item.id === id);
    if (item) {
      item.qty = Math.max(1, parseInt(quantity) || 1);
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getItemCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  createOrder(customerInfo) {
    const subtotal = this.getTotal();
    const fee = subtotal > MARKETPLACE_CONFIG.serviceFeeThreshold ? MARKETPLACE_CONFIG.serviceFee : 0;
    const total = subtotal + fee;

    const order = {
      id: `${MARKETPLACE_CONFIG.appName.toUpperCase()}-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      customer: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      notes: customerInfo.notes,
      items: [...this.cart],
      subtotal,
      fee,
      total,
      paymentMethod: customerInfo.paymentMethod,
      status: 'Pending',
      reference: Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    this.orderHistory.unshift(order);
    localStorage.setItem(this.orderHistoryKey, JSON.stringify(this.orderHistory));
    this.clearCart();

    return order;
  }

  getOrderHistory() {
    return this.orderHistory;
  }
}

/**
 * Marketplace Utility Functions
 */
function formatMoney(value) {
  return MARKETPLACE_CONFIG.currency + Number(value).toLocaleString();
}

function getProductById(id) {
  for (const category of Object.values(CATALOG)) {
    const product = category.products.find(p => p.id === id);
    if (product) return product;
  }
  return null;
}

function getAllProducts() {
  const all = [];
  for (const category of Object.values(CATALOG)) {
    all.push(...category.products);
  }
  return all;
}

function getProductsByCategory(categoryKey) {
  return CATALOG[categoryKey]?.products || [];
}

function getCategoryList() {
  return Object.entries(CATALOG).map(([key, value]) => ({
    key,
    name: value.category,
    icon: value.icon,
    description: value.description,
    count: value.products.length
  }));
}

// Export for use in HTML
const cartManager = new CartManager();