# EcoLink+ - Sustainable Fashion Platform

A comprehensive platform for sustainable fashion that enables users to return, donate, and purchase pre-owned clothing while supporting local communities.

## Features

### For Customers
- **Return Clothes**: Submit return requests with photos and descriptions
- **Donate Clothes**: Donate items to local NGOs and charities
- **Rewear Store**: Browse and purchase pre-owned clothing
- **Rewards System**: Earn points for returns and donations
- **Real-time Tracking**: Track status of returns and donations

### For Shopkeepers
- **Receive Offers**: Get offers for returned items from Walmart
- **Manage Inventory**: List and manage products in the rewear store
- **Analytics Dashboard**: View sales performance and trends
- **Real-time Notifications**: Get notified of new offers and orders

### For Administrators
- **Dashboard Overview**: Monitor platform activity and statistics
- **Quality Control**: Review and approve returns and donations
- **Offer Management**: Send offers to shopkeepers for returned items
- **User Management**: Manage users, shopkeepers, and NGOs
- **Analytics**: Comprehensive platform analytics and reporting

### For Walmart Employees
- **Return Processing**: Review and process return requests
- **Quality Assessment**: Grade items and determine value
- **Donation Coordination**: Manage donation distribution to NGOs
- **Inventory Management**: Track processed items

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MySQL** database with connection pooling
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Frontend
- **React 18.3.0** with Next.js 14
- **Tailwind CSS** for styling
- **Radix UI** components
- **Socket.IO Client** for real-time updates
- **Axios** for API communication

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd ecolink-plus
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Setup MySQL Database**
\`\`\`bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ecolink_plus;
\`\`\`

4. **Configure Environment Variables**
\`\`\`bash
# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecolink_plus
JWT_SECRET=your-super-secret-jwt-key
\`\`\`

5. **Initialize Database**
\`\`\`bash
npm run init-db
\`\`\`

6. **Start Backend Server**
\`\`\`bash
npm run server
\`\`\`

### Frontend Setup

1. **Configure Frontend Environment**
\`\`\`bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
\`\`\`

2. **Start Frontend Development Server**
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Returns
- `POST /api/returns` - Submit return request
- `GET /api/returns/my-returns` - Get user's returns
- `GET /api/returns` - Get all returns (admin)
- `PUT /api/returns/:id/status` - Update return status

### Donations
- `POST /api/donations` - Submit donation
- `GET /api/donations/my-donations` - Get user's donations
- `GET /api/donations` - Get all donations (admin)
- `PUT /api/donations/:id/status` - Update donation status

### Products
- `GET /api/products` - Get available products
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories/list` - Get categories

### Shopkeepers
- `GET /api/shopkeepers/offers` - Get offers for shopkeeper
- `PUT /api/shopkeepers/offers/:id` - Respond to offer
- `GET /api/shopkeepers/products` - Get shopkeeper's products
- `GET /api/shopkeepers/analytics` - Get shopkeeper analytics

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `POST /api/admin/offers` - Send offer to shopkeeper
- `GET /api/admin/shopkeepers` - Get all shopkeepers

## Database Schema

### Users Table
- User authentication and profile information
- Role-based access (customer, admin, shopkeeper)
- Rewards points and wallet balance

### Returns Table
- Return requests with item details
- Status tracking and quality assessment
- Photo storage and admin notes

### Donations Table
- Donation submissions with item details
- NGO assignment and distribution tracking
- Status updates and admin notes

### Products Table
- Available items in rewear store
- Pricing and condition information
- Shopkeeper and source tracking

### Shopkeeper Offers Table
- Offers sent to shopkeepers for returned items
- Acceptance/rejection tracking
- Price negotiations

## Real-time Features

The platform uses Socket.IO for real-time communication:

- **Status Updates**: Users receive instant notifications when return/donation status changes
- **New Offers**: Shopkeepers get notified immediately of new offers
- **Admin Notifications**: Admins receive alerts for new submissions and responses
- **Live Dashboard**: Real-time updates on dashboard statistics

## File Upload System

- **Multer Integration**: Handles multipart form data for image uploads
- **File Validation**: Accepts only image files with size limits
- **Storage Management**: Organized file storage with unique naming
- **URL Generation**: Automatic URL generation for uploaded files

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-based Access**: Different permissions for different user types
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Restricted file types and sizes

## Development

### Running in Development Mode

1. **Backend Development**
\`\`\`bash
# Start with nodemon for auto-restart
npm run dev:server
\`\`\`

2. **Frontend Development**
\`\`\`bash
# Start Next.js development server
npm run dev
\`\`\`

### Database Management

\`\`\`bash
# Reset database
npm run reset-db

# Seed sample data
npm run seed-db
\`\`\`

## Production Deployment

### Environment Configuration
- Set `NODE_ENV=production`
- Configure production database credentials
- Set secure JWT secret
- Configure file upload paths
- Set CORS origins

### Build Process
\`\`\`bash
# Build frontend
npm run build

# Start production server
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
