#!/bin/bash
# Paystack Integration - Server Deployment Script
# Usage: Upload this file to your server and run it
# chmod +x deploy-paystack.sh && ./deploy-paystack.sh

echo "🚀 Paystack Payment Integration - Server Deployment"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
WEB_ROOT="public_html"
VERIFY_FILE="payment-verify.php"
CONFIG_FILE="paystack-config.js"

echo -e "\n${YELLOW}Step 1: Checking server requirements...${NC}"

# Check PHP version
PHP_VERSION=$(php -v 2>/dev/null | grep -oP 'PHP \K[0-9]+\.[0-9]+')
if [ -z "$PHP_VERSION" ]; then
    echo -e "${RED}❌ PHP not installed${NC}"
    exit 1
else
    echo -e "${GREEN}✅ PHP $PHP_VERSION found${NC}"
fi

# Check cURL
if ! php -m | grep -q curl; then
    echo -e "${YELLOW}⚠️  cURL extension not enabled${NC}"
    echo -e "${YELLOW}   Contact your hosting provider to enable it${NC}"
else
    echo -e "${GREEN}✅ cURL extension enabled${NC}"
fi

# Check if files exist
echo -e "\n${YELLOW}Step 2: Verifying files...${NC}"

if [ -f "$VERIFY_FILE" ]; then
    echo -e "${GREEN}✅ $VERIFY_FILE found${NC}"
else
    echo -e "${RED}❌ $VERIFY_FILE not found${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Step 3: Setting permissions...${NC}"

# Set correct permissions
chmod 644 "$VERIFY_FILE"
echo -e "${GREEN}✅ Permissions set for $VERIFY_FILE${NC}"

echo -e "\n${YELLOW}Step 4: Verifying installation...${NC}"

# Test verification endpoint
RESPONSE=$(php "$VERIFY_FILE" 2>&1)
if echo "$RESPONSE" | grep -q "error"; then
    echo -e "${GREEN}✅ Verification script working${NC}"
else
    echo -e "${YELLOW}⚠️  Response: $RESPONSE${NC}"
fi

echo -e "\n${GREEN}=================================================="
echo -e "✅ Installation Complete!${NC}"
echo -e "${GREEN}=================================================="
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Verify API keys in $VERIFY_FILE"
echo "2. Test payment flow from your website"
echo "3. Check server logs for any errors"
echo ""
echo -e "${YELLOW}Verification URL:${NC}"
echo "https://yourwebsite.com/$VERIFY_FILE"
echo ""
