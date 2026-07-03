#!/bin/bash

echo "🌊 OceanGuard Full Stack Setup"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Create uploads directory
echo ""
echo "📁 Creating uploads directory..."
mkdir -p backend/uploads
chmod 755 backend/uploads

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ Installation Complete!"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1️⃣  MongoDB Setup:"
echo "   • Local: Make sure mongod is running"
echo "   • Cloud: Get MongoDB Atlas connection string"
echo ""
echo "2️⃣  Configure Environment:"
echo "   • Edit: backend/.env"
echo "   • Set MONGODB_URI and JWT_SECRET"
echo ""
echo "3️⃣  Start Backend:"
echo "   • cd backend"
echo "   • npm start"
echo ""
echo "4️⃣  Start Frontend:"
echo "   • Open: frontend/index.html in your browser"
echo "   • Or: python -m http.server 8000 (in frontend folder)"
echo ""
echo "5️⃣  API Documentation:"
echo "   • Read: README.md for full API reference"
echo ""
echo "🚀 Server will run on http://localhost:5000"
echo "🌐 Frontend on http://localhost:8000 (or just open index.html)"
echo ""