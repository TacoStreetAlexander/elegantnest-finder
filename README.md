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

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: React Query
- **Database**: Supabase
- **Maps Integration**: Mapbox GL
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives with custom styling

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components and routes
├── lib/           # Utility functions and configurations
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
├── integrations/  # Third-party service integrations
├── data/          # Static data and constants
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
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

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Features

- **Advanced Search**: Filter communities by location, amenities, care levels, and more
- **Interactive Maps**: Visualize community locations with Mapbox integration
- **Detailed Profiles**: Comprehensive information about each community
- **User Reviews**: Read and write reviews about communities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Built with accessibility in mind for all users

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Shadcn UI for the component library
- Supabase for the backend infrastructure
- Mapbox for mapping services
- All contributors and maintainers
