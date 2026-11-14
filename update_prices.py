import re
import json

# Read HTML file
html_path = r'C:\Users\HomePC\Desktop\Project_X\Project_X\gifts-delivery.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define all price updates - maps product names to new prices
price_updates = {
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
    'Custom Face Cap': 'Contact',
    'Custom Hoodie': 'Contact',
    'Custom t Shirt': 'Contact',
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
}

# Count updates
update_count = 0

# For each product, find and update its price
for product_name, new_price in price_updates.items():
    # Pattern to find product cards - look for h3 with product name followed by pricing
    # This is complex, so let's do it step by step
    
    # First, escape special regex characters in product name
    escaped_name = re.escape(product_name)
    
    # Find all product cards with this name
    # Pattern: <h3>Product Name</h3> ... <span class="price">N100,000</span>
    pattern = f'(<h3>{escaped_name}.*?</h3>.*?<span class="price">)N[0-9,]+</span>'
    
    if new_price == 'Contact':
        replacement = r'\1Contact for Price</span>'
    else:
        formatted_price = f'N{new_price:,}'
        replacement = f'\\1{formatted_price}</span>'
    
    new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL | re.IGNORECASE)
    
    if count > 0:
        content = new_content
        update_count += count
        print(f'✓ {product_name}: Updated {count} occurrence(s)')

print(f'\\nTotal price updates applied: {update_count}')

# Save updated content
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ HTML file updated with new prices!')
