# ElegantNest Finder

ElegantNest Finder is a modern web application designed to help seniors and their families find the perfect living community that matches their needs, preferences, and lifestyle. The platform provides a user-friendly interface to explore, compare, and connect with various senior living communities.

## 🏠 Project Overview

ElegantNest Finder aims to simplify the process of finding senior living communities by providing:
- Comprehensive community profiles
- Advanced search and filtering capabilities
- Detailed amenities and services information
- Location-based search with interactive maps
- User reviews and ratings
- Easy contact and inquiry system

## 🛠️ Technical Stack

The project is built using modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with Shadcn UI components
- **State Management**:
  - React Query (TanStack Query v5) for server state
  - Zustand v5 for client state
- **Database & Backend**: Supabase
- **Maps Integration**: Mapbox GL JS v3
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM v6
- **UI Components**:
  - Radix UI primitives
  - Embla Carousel for image carousels
  - Sonner for toast notifications
  - Recharts for data visualization
- **Performance Optimization**:
  - Resource preconnect
  - Dynamic loading
  - React.memo for component optimization

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── map/             # Map-related components
│   ├── MapView/         # Map view specific components
│   ├── Properties/      # Property listing components
│   ├── PropertyFilters/ # Property filtering components
│   ├── SavedProperties/ # Saved properties components
│   └── ui/              # Shadcn UI components
├── pages/               # Page components and routes
│   ├── Index.tsx        # Home page
│   ├── MapView.tsx      # Interactive map view
│   ├── Properties.tsx   # Property listings
│   ├── PropertyDetail.tsx # Single property view
│   ├── SavedApartments.tsx # Saved properties
│   ├── Blog.tsx         # Blog page
│   ├── BlogPost.tsx     # Individual blog post
│   ├── AboutUs.tsx      # About page
│   ├── HowItWorks.tsx   # How it works page
│   ├── Auth.tsx         # Authentication page
│   ├── Admin.tsx        # Admin dashboard
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
│   ├── map/             # Map-related hooks
│   ├── useAuth.ts       # Authentication hook
│   ├── usePropertiesData.tsx # Property data fetching
│   ├── useSavedProperties.ts # Saved properties management
│   ├── usePropertyFilters.tsx # Property filtering logic
│   └── useBlogPosts.ts  # Blog data fetching
├── types/               # TypeScript type definitions
│   ├── property.ts      # Property interfaces
│   └── map.ts           # Map-related types
├── utils/               # Helper functions
│   ├── map/             # Map utility functions
│   ├── propertyQueries.ts # Supabase query functions
│   ├── propertyTransform.ts # Data transformation
│   └── performanceOptimization.ts # Performance helpers
├── integrations/        # Third-party service integrations
│   └── supabase/        # Supabase client and types
├── data/                # Static data and constants
│   ├── propertyData.ts  # Property fallback data
│   └── blogData.ts      # Blog post data
├── styles/              # Global styles
│   └── blog.css         # Blog-specific styles
├── lib/                 # Utility functions and configurations
│   └── utils.ts         # Common utility functions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global CSS
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd elegantnest-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with bun:
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_MAPBOX_TOKEN=your_mapbox_token
   ```

   Note: The repository currently has hardcoded Supabase URL and key in `src/integrations/supabase/client.ts` for development purposes. In a production environment, you should use environment variables instead.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Additional scripts**
   ```bash
   # Build for production
   npm run build
   
   # Build for development
   npm run build:dev
   
   # Run linting
   npm run lint
   
   # Preview production build
   npm run preview
   ```

## 🎯 Features

- **Advanced Search**: Filter communities by metro region, price range, amenities, bedrooms, and more
- **Interactive Maps**: Visualize community locations with Mapbox integration
  - Custom markers and popups
  - Property clusters for high-density areas
  - Mobile-optimized map views with tabs
- **Detailed Profiles**: Comprehensive information about each senior housing option including:
  - Pricing information
  - Floor plans
  - Amenities and features
  - Contact information
  - Image galleries
- **Saved Properties**: Users can save their favorite properties to revisit later
- **Authentication**: User accounts with Supabase Auth
- **Blog Section**: Articles and resources for seniors and their families
- **Responsive Design**: Different layouts optimized for desktop and mobile
- **Performance Optimization**: Resource preconnect and loading monitoring
- **Admin Dashboard**: Property management for administrators

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Shadcn UI for the component library
- Supabase for the backend infrastructure
- Mapbox for mapping services
- All contributors and maintainers
