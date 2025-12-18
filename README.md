# 🏨 The Wild Oasis - Website

A modern hotel booking website built with Next.js 14, featuring cabin reservations, user authentication, and a beautiful, responsive UI.

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with NextAuth.js
- 🏠 **Cabin Browsing** - View available cabins with detailed information and pricing
- 📅 **Date Selection** - Interactive calendar with dual-month view for easy date range selection
- ✅ **Booking Management** - Create, view, edit, and delete reservations
- 👤 **User Profile** - Manage personal information and view booking history
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Optimistic Updates** - Fast, responsive UI with React's useOptimistic hook
- 🗄️ **Supabase Integration** - Backend powered by Supabase for data management

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v5
- **Database:** Supabase
- **Date Handling:** date-fns
- **Calendar:** react-day-picker
- **Icons:** Heroicons

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account and project
- Google OAuth credentials (for authentication)

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd the-wild-oasis-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**

   Create a \`.env.local\` file in the root directory:

   \`\`\`env
   # Supabase
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key

   # NextAuth
   AUTH_SECRET=your_auth_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   \`\`\`

4. **Set up Supabase Database**

   Create the following tables in your Supabase project:
   - \`cabins\` - Stores cabin information
   - \`guest\` - Stores guest profiles
   - \`bookings\` - Stores reservation data
   - \`settings\` - Stores app settings (min/max booking length, etc.)

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
app/
├── _components/          # Reusable React components
│   ├── Cabin.js
│   ├── DateSelector.js
│   ├── ReservationForm.js
│   └── ...
├── _lib/                # Utility functions and actions
│   ├── action.js       # Server actions
│   ├── auth.js         # Authentication config
│   ├── data-service.js # Data fetching functions
│   └── supabase.js     # Supabase client
├── _styles/            # Global styles
├── about/              # About page
├── account/            # User account pages
│   ├── profile/
│   └── reservations/
├── api/                # API routes
│   └── auth/
├── cabins/             # Cabin listing and details
└── login/              # Login page
\`\`\`

## 🎯 Key Features Explained

### Date Selection
- Dual-calendar view for easy date range selection
- Prevents booking of past dates and already booked dates
- Validates that start and end dates are different
- Shows real-time pricing based on selected dates

### Booking Management
- Create new reservations with guest count and special requests
- View all your reservations
- Edit existing bookings
- Delete reservations with confirmation

### User Authentication
- Google OAuth integration
- Protected routes for authenticated users
- Session management with NextAuth.js

## 📜 Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run prod     # Build and start production server
\`\`\`

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| \`SUPABASE_URL\` | Your Supabase project URL |
| \`SUPABASE_KEY\` | Your Supabase anonymous key |
| \`AUTH_SECRET\` | Secret key for NextAuth.js session encryption |
| \`NEXTAUTH_URL\` | Base URL of your application |
| \`AUTH_GOOGLE_ID\` | Google OAuth Client ID |
| \`AUTH_GOOGLE_SECRET\` | Google OAuth Client Secret |

## 🚢 Deployment

This project can be deployed on [Vercel](https://vercel.com):

---

Made with ❤️ using Next.js and Supabase
