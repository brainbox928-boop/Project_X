const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = 'C:\\Users\\HomePC\\Desktop\\Project_X\\Project_X\\gifts-delivery.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

// Price mappings
const priceMap = {
    'Cakes': 120000,
    'Celebrity Fan Membership Card': 110000,
    'Chocolate': 85000,
    'Christmas Chocolate': 75000,
    'Christmas Cozy Slippers': 85000,
    'Christmas Door Mat': 85000,
    'Christmas Fleece Throw Blanket': 90000,
    'Christmas Hat': 60000,
    'Christmas Lanterns': 100000,
    'Christmas Lingerie': 100000,
    'Christmas Light': 95000,
    'Christmas Mug': 80000,
    'Christmas Poor Wreath': 100000,
    'Christmas Pyjamas': 110000,
    'Christmas Socks': 65000,
    'Christmas Sweater': 100000,
    'Christmas Tree Ornaments': 70000,
    'Costume Mug': 100000,
    'Customized Bracelets': 95000,
    'Customized Hoodie': 130000,
    'Customized Neck Lace': 160000,
    'Customized Pillow': 100000,
    'Dinner Set': 100000,
    'Dildo': 110000,
    'Dresses': 100000,
    'Engagement Ring': 75000,
    'Eye Glasses': 70000,
    'Fan Membership Card': 110000,
    'Female Care Packages': 180000,
    'Female Engagement Ring': 80000,
    'Female Handbag': 120000,
    'Female Matching Earring': 85000,
    'Formal And Informal Letter': 80000,
    'Flower Teddy Bear': 75000,
    'Fresh Cut Flower': 120000,
    'Fruit Basket': 150000,
    'Hand Bag Delivery': 125000,
    'House Key': 90000,
    'Lingerie': 75000,
    'Locket': 110000,
    'Love Notes': 80000,
    'Luxury Christmas Tree': 250000,
    'Male Care Packages': 150000,
    'Male Engagement Ring': 75000,
    'Male Leather Belt': 80000,
    'Male Necklace': 85000,
    'Male Wrist Watch': 95000,
    'Men Suits': 160000,
    'Mercedes Benz Key': 95000,
    'Military Face Cap': 80000,
    'Name Engraved Diamond': 150000,
    'Necklace': 100000,
    'Night Wears': 80000,
    'Online Banking Debit Card': 175000,
    'Paper Star Lanterns': 85000,
    'Perfumes': 130000,
    'Picture Frame': 95000,
    'Pizza': 60000,
    'Purse': 50000,
    'Quality Red Wine': 120000,
    'Quality Undies': 100000,
    'Real Diamond Ring': 160000,
    'Ring Order': 85000,
    'Rose Box': 85000,
    'Santa Claus Costume': 140000,
    'Scented Christmas': 80000,
    'Shoes': 120000,
    'Table Top Christmas Tree': 85000,
    'Teddy Bear': 135000,
    'Tesla Car Key': 350000,
    'Truck Keys': 160000,
    'Valentine Packages': 160000,
    'Wedding Gown': 280000
};

let updateCount = 0;
let sectionABEnd = -1;

// Extract Section A & B to preserve them
const sectionAStart = content.indexOf('<section class="letter-group">');
const sectionCMarker = content.indexOf('<h3 class="letter-title">C</h3>');

if (sectionAStart >= 0 && sectionCMarker > 0) {
    sectionABEnd = content.lastIndexOf('<section class="letter-group">', sectionCMarker);
}

console.log('✅ Starting price updates...');

// Update prices by searching for product names and replacing prices
for (const [productName, newPrice] of Object.entries(priceMap)) {
    const regex = new RegExp(
        `(<h3[^>]*>\\s*${productName.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\s*<\\/h3>.*?<span class="price">)N[0-9,]+(</span>)`,
        'gis'
    );
    
    const newPriceFormatted = `N${newPrice.toLocaleString()}`;
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, `$1${newPriceFormatted}$2`);
        if (newContent !== content) {
            content = newContent;
            updateCount++;
            if (updateCount <= 15) {
                console.log(`✓ ${productName}: ${newPriceFormatted}`);
            }
        }
    }
}

console.log(`\n✅ Updated ${updateCount} products with new prices`);

// Save updated HTML
fs.writeFileSync(htmlPath, content, 'utf-8');
console.log('✅ HTML file saved successfully!');
