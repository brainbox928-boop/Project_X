const fs = require('fs');

const htmlPath = 'C:\\Users\\HomePC\\Desktop\\Project_X\\Project_X\\gifts-delivery.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

// Professional marketing descriptions for each product
const descriptionMap = {
    'Cakes': 'Delight your loved ones with our exquisitely crafted custom cakes, perfect for celebrating life\'s most precious moments. Handmade with premium ingredients and artistic flair.',
    'Celebrity Fan': 'Exclusive membership card granting access to premium celebrity content, behind-the-scenes exclusives, and VIP event invitations. A must-have for dedicated fans.',
    'Chocolate': 'Indulge in our premium chocolate selection, meticulously sourced from renowned artisans. Each piece delivers luxury in taste and elegance in presentation.',
    'Christmas Chocolate': 'Festive chocolate treasures wrapped in holiday charm. Perfect for spreading Christmas joy with sophisticated flavors and elegant seasonal packaging.',
    'Christmas Cozy Slippers': 'Wrap your feet in unparalleled comfort this holiday season. Premium soft-touch material engineered for warmth, style, and all-day coziness.',
    'Christmas Door Mat': 'Welcome guests with festive elegance. UV-resistant, durable outdoor mat that brings holiday spirit while maintaining sophisticated home aesthetics.',
    'Christmas Fleece Throw Blanket': 'Experience ultimate relaxation with our luxuriously soft fleece blanket. Perfect for cozy winter evenings and creating warm, memorable moments together.',
    'Christmas Hat': 'Elevate your holiday look with this premium festive headwear. Stylishly crafted for maximum comfort and photo-worthy holiday celebrations.',
    'Christmas Lanterns': 'Transform your space with enchanting ambient lighting. Elegant holiday lanterns that create a warm, welcoming atmosphere for festive gatherings.',
    'Christmas Lingerie': 'Celebrate intimacy with sophisticated elegance. Premium lingerie designed for confidence, comfort, and creating unforgettable romantic moments.',
    'Christmas Light': 'Illuminate your home with our state-of-the-art LED Christmas lights. Energy-efficient, weather-resistant, and engineered for seamless seasonal ambiance.',
    'Christmas Mug': 'Start each morning with holiday cheer. Premium ceramic mug perfect for displaying on your shelf or gifting to coffee enthusiasts.',
    'Christmas Poor Wreath': 'Adorn your entrance with timeless festive beauty. Handcrafted wreath featuring premium evergreen materials and elegant seasonal embellishments.',
    'Christmas Pyjamas': 'Embrace holiday comfort in style. Premium fabrics engineered for all-night coziness during festive family gatherings and holiday celebrations.',
    'Christmas Socks': 'Step into festive fashion with our premium holiday sock collection. Breathable, cushioned comfort with eye-catching seasonal designs.',
    'Christmas Sweater': 'Stay warm and fashionable this season. Premium knitwear combining holiday style with superior comfort for casual or formal holiday occasions.',
    'Christmas Tree Ornaments': 'Preserve cherished memories with elegant handcrafted ornaments. Timeless pieces that reflect your unique holiday aesthetic year after year.',
    'Costume Mug': 'Express your personality daily. Premium ceramic mug featuring custom character designs, perfect for collectors and enthusiasts.',
    'Customized Bracelets': 'Wear your story on your wrist. Premium crafted bracelets personalized to reflect your unique style, personality, and cherished memories.',
    'Customized Hoodie': 'Make a statement with personalized fashion. Premium quality hoodie custom-designed for comfort, durability, and individual expression.',
    'Customized Neck Lace': 'Elevate your elegance with bespoke jewelry. Handcrafted necklace personalized to your specifications with premium materials and expert craftsmanship.',
    'Customized Pillow': 'Rest your head on personalized luxury. Premium memory foam pillow featuring custom designs for ultimate comfort and home décor appeal.',
    'Customized t-Shirt': 'Express your style authentically. Premium quality tee personalized to perfection—ideal for gifting or personal statement-making.',
    'Dinner Set': 'Transform mealtimes into elegant occasions. Premium ceramic dinner set combining sophisticated design with practical dishwasher durability.',
    'Dildo': 'Discover pleasure crafted for you. Premium intimate product engineered with body-safe materials and ergonomic design for personal wellness.',
    'Dresses': 'Elevate your wardrobe with timeless elegance. Premium fabric dresses designed for confidence, comfort, and effortless sophistication.',
    'Engagement Ring Female': 'Celebrate love with radiant brilliance. Premium gemstone ring symbolizing commitment with timeless design and impeccable craftsmanship.',
    'Eye Glasses': 'See the world in style. Premium eyewear combining optical excellence with contemporary aesthetics for fashion-forward vision correction.',
    'Fan Membership Card': 'Access exclusive perks and privileges. Premium membership granting VIP treatment, early event access, and celebrity fan community benefits.',
    'Female Care Packages': 'Pamper the special woman in your life. Curated premium wellness and beauty collection celebrating femininity and self-care excellence.',
    'Female Engagement Ring': 'Symbolize eternal love elegantly. Premium diamond engagement ring crafted with precision and adorned in luxury metal settings.',
    'Female Handbag': 'Carry sophistication everywhere. Premium leather handbag merging functionality with high-fashion design for the modern professional woman.',
    'Female Matching Earring And Neck Lace': 'Complete your look with coordinated elegance. Premium jewelry set featuring matching pieces designed for stunning visual harmony.',
    'Formal And Informal Letter': 'Communicate with distinction. Hand-written letters crafted with professional elegance, perfect for business, celebrations, or personal expression.',
    'Flower Teddy Bear': 'Combine sentiment with playfulness. Premium plush companion adorned with fresh flowers for a gift that truly captures the heart.',
    'Fresh Cut Flower Same Day Delivery': 'Express your feelings instantly. Premium fresh flower arrangements delivered same-day with expert handling and stunning presentation.',
    'Fruit Basket': 'Deliver health and taste combined. Premium assorted fruit basket featuring fresh produce, elegant presentation, and gourmet quality selections.',
    'Hand Bag Delivery': 'Receive luxury at your doorstep. Premium designer handbag delivered with care, authenticity guaranteed, and white-glove service included.',
    'House Key': 'Celebrate new beginnings symbolically. Custom-designed house key crafted for memory and presentation, perfect for milestone moments.',
    'Lingerie': 'Embrace sensuality with confidence. Premium intimate apparel engineered for elegance, comfort, and celebrating your individual beauty.',
    'Locket With Pictures': 'Keep memories close to your heart. Premium precious metal locket personalized with cherished photos and expert engraving.',
    'Love Notes With Photo': 'Express affection artistically. Premium handcrafted love notes adorned with personal photos, creating unforgettable emotional keepsakes.',
    'Luxury Christmas Tree': 'Make a grand holiday statement. Premium artificial Christmas tree featuring realistic design, superior durability, and festive magnificence.',
    'Male Care Packages': 'Treat the special man in your life. Curated premium grooming and wellness collection celebrating masculinity and personal excellence.',
    'Male Engagement Ring': 'Symbolize commitment with masculine elegance. Premium metal engagement ring combining sophistication with timeless style for the groom-to-be.',
    'Male Leather Belt': 'Anchor your style statement. Premium genuine leather belt featuring precision craftsmanship, ideal for professional or casual sophistication.',
    'Male Necklace': 'Elevate masculine elegance. Premium chain necklace or pendant combining contemporary design with quality materials for distinguished style.',
    'Male Wrist Watch': 'Master time with refined elegance. Premium timepiece combining precision engineering with sophisticated aesthetics for the discerning gentleman.',
    'Men Suits': 'Command presence professionally. Premium tailored suit engineered for confidence, comfort, and enduring business sophistication.',
    'Mercedes Benz Key': 'Display automotive passion proudly. Premium replica key crafted with meticulous detail, perfect for car enthusiasts and collectors.',
    'Military Face Cap': 'Showcase your style confidently. Premium military-inspired cap combining functionality with contemporary fashion for everyday excellence.',
    'Name Engraved Diamond': 'Immortalize what matters most. Premium diamond with your name expertly engraved, creating a timeless treasure beyond comparison.',
    'Necklace': 'Adorn yourself with timeless elegance. Premium necklace featuring quality materials and contemporary design perfect for any occasion.',
    'Night Wears': 'Surrender to comfort elegantly. Premium sleepwear engineered for quality rest, designed with sophisticated comfort and luxury fabrics.',
    'Online Banking Debit Card': 'Experience financial convenience reimagined. Premium digital banking solution offering seamless transactions and enhanced security features.',
    'Paper Star Lanterns': 'Create magical ambiance effortlessly. Premium decorative lanterns featuring intricate paper design perfect for celebrations and special events.',
    'Perfumes': 'Leave a lasting impression. Premium fragrance collections crafted by renowned perfumers, offering sophistication in every spritz.',
    'Picture Frame': 'Display your cherished moments beautifully. Premium frame enhancing artwork or photographs with elegant design and quality materials.',
    'Pizza': 'Savor authentic taste delivered fresh. Premium pizza prepared with artisan ingredients and expert craftsmanship, delivered piping hot in 30 minutes.',
    'Purse': 'Carry your essentials in style. Premium compact purse combining fashion-forward design with practical functionality for modern convenience.',
    'Quality Red Wine': 'Celebrate refined taste sensibly. Premium red wine selected from prestigious vineyards, delivering complex flavors and elegant sophistication.',
    'Quality Undies': 'Experience comfort redefined daily. Premium intimate apparel engineered for breathability, comfort, and lasting durability.',
    'Real Diamond Ring': 'Invest in timeless brilliance. Certified premium diamond ring featuring GRA certification and expert name engraving for heirloom quality.',
    'Ring Order': 'Create your perfect ring. Custom-designed premium ring crafted to your specifications with superior materials and expert goldsmith artistry.',
    'Rose Box': 'Express eternal love eloquently. Premium rose arrangement in elegant box, paired with matching necklace for complete romantic gesture.',
    'Santa Claus Costume': 'Bring holiday magic to life. Premium Santa outfit featuring authentic details, comfort fit, and professional-quality construction.',
    'Scented Christmas Themed': 'Enhance holiday ambiance aromatically. Premium festive candle infusing your space with warm, sophisticated seasonal fragrances.',
    'Shoes': 'Step forward with confidence. Premium footwear combining contemporary design with comfort engineering for all-day style and support.',
    'Table Top Christmas Tree': 'Bring festive elegance anywhere. Premium compact Christmas tree perfect for desks, shelves, or small spaces wanting holiday cheer.',
    'Teddy Bear': 'Capture hearts instantly. Premium plush bear crafted with quality materials, perfect for gifting love, comfort, and cherished companionship.',
    'Tesla Car Key Card': 'Celebrate automotive passion extraordinarily. Premium Tesla key replica for collectors, featuring meticulous craftsmanship and premium materials.',
    'Truck Keys': 'Display automotive pride authentically. Premium truck key replica featuring realistic detail, perfect for truck enthusiasts and automotive collectors.',
    'Valentine Packages': 'Create unforgettable romantic moments. Curated premium gift collection celebrating love, designed for maximum emotional impact.',
    'Wedding Gown': 'Walk down the aisle in absolute magnificence. Premium bridal gown combining luxurious fabrics, impeccable tailoring, and timeless elegance.',
    'Picture Frames': 'Preserve precious moments beautifully. Premium frames designed to showcase your most cherished photographs with elegant sophistication.'
};

// Find all product descriptions and update them
let updateCount = 0;

// Pattern to find product cards with h3 and description
const cardPattern = /<article class="product-card">[\s\S]*?<h3>([^<]+)<\/h3>[\s\S]*?<p class="product-description">([^<]+)<\/p>/g;

let match;
const updates = [];

while ((match = cardPattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const productTitle = match[1];
    const currentDesc = match[2];
    
    // Extract base product name (remove -jpg, variants, numbers)
    let baseName = productTitle
        .replace(/-jpg$/, '')
        .replace(/[0-9]+(,|$)/g, '$1') // Remove trailing numbers
        .replace(/(-standard|-enhanced|-premium|-deluxe|-exclusive).*$/i, '');
    
    // Try to find matching description
    let newDesc = null;
    
    // Try exact match
    if (descriptionMap[baseName]) {
        newDesc = descriptionMap[baseName];
    } else {
        // Try partial matches
        for (const [key, desc] of Object.entries(descriptionMap)) {
            if (baseName.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(baseName.toLowerCase())) {
                newDesc = desc;
                break;
            }
        }
    }
    
    // If still no match, try cleaning up more aggressively
    if (!newDesc) {
        const cleanName = baseName.replace(/[^a-zA-Z\s]/g, '').trim();
        for (const [key, desc] of Object.entries(descriptionMap)) {
            if (cleanName.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(cleanName.toLowerCase())) {
                newDesc = desc;
                break;
            }
        }
    }
    
    if (newDesc && newDesc !== currentDesc) {
        const replacement = fullMatch.replace(currentDesc, newDesc);
        updates.push({
            oldMatch: fullMatch,
            newMatch: replacement,
            product: baseName.substring(0, 40),
            oldDesc: currentDesc.substring(0, 50)
        });
    }
}

// Apply all updates
for (const update of updates) {
    content = content.replace(update.oldMatch, update.newMatch);
    updateCount++;
}

console.log('✅ PRODUCT DESCRIPTIONS MODERNIZATION COMPLETE\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (updateCount > 0) {
    console.log(`✅ Total products updated: ${updateCount}`);
    
    updates.slice(0, 15).forEach((update, idx) => {
        console.log(`\n${idx + 1}. ${update.product}`);
        console.log(`   Old: "${update.oldDesc}..."`);
    });
    
    if (updates.length > 15) {
        console.log(`\n... and ${updates.length - 15} more products updated`);
    }
} else {
    console.log('⚠️ No descriptions were matched for update');
}

console.log('\n');

// Save updated content
fs.writeFileSync(htmlPath, content, 'utf-8');
console.log('✅ File saved successfully!');
