const fs = require('fs');

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

console.log('✅ Processing prices for all products...\n');

let updateCount = 0;

// Find all product cards and extract the image filename to determine the product
const cardRegex = /<article class="product-card">[\s\S]*?<img src="([^"]+)" alt="([^"]+)">[\s\S]*?<h3>([^<]+)<\/h3>[\s\S]*?<span class="price">(N[\d,]+)<\/span>/g;

let match;
const updates = [];

while ((match = cardRegex.exec(content)) !== null) {
    const imagePath = match[1];
    const alt = match[2];
    const productTitle = match[3];
    const currentPrice = match[4];
    
    // Extract product name from image filename
    const filename = imagePath.split('\\').pop().split('.')[0];
    
    // Remove variant suffixes (standard, enhanced, premium, deluxe, exclusive)
    let baseName = filename
        .replace(/-standard$/i, '')
        .replace(/-enhanced$/i, '')
        .replace(/-premium$/i, '')
        .replace(/-deluxe$/i, '')
        .replace(/-exclusive$/i, '');
    
    // Find matching price
    let newPrice = null;
    
    // Try exact match first
    if (priceMap[baseName]) {
        newPrice = priceMap[baseName];
    } else {
        // Try partial matches
        for (const [key, price] of Object.entries(priceMap)) {
            if (baseName.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(baseName.toLowerCase())) {
                newPrice = price;
                break;
            }
        }
    }
    
    if (newPrice) {
        const newPriceStr = 'N' + newPrice.toLocaleString();
        if (newPriceStr !== currentPrice) {
            updates.push({
                oldMatch: match[0],
                newPrice: newPriceStr,
                currentPrice: currentPrice,
                product: baseName
            });
        }
    }
}

// Apply all updates
for (const update of updates) {
    const replacement = update.oldMatch.replace(update.currentPrice, update.newPrice);
    content = content.replace(update.oldMatch, replacement);
    updateCount++;
    
    if (updateCount <= 20) {
        console.log(`✓ ${update.product.substring(0, 30)}: ${update.currentPrice} → ${update.newPrice}`);
    }
}

if (updateCount > 20) {
    console.log(`... and ${updateCount - 20} more products`);
}

console.log(`\n✅ Total products updated: ${updateCount}`);

// Save
fs.writeFileSync(htmlPath, content, 'utf-8');
console.log('✅ HTML file updated successfully!');
