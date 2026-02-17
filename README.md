# Wiyorent_V2.0

/my-house-hunting-app
├── /public              # Static assets (logos, icons)
├── /src
│   ├── /app             # App Router (The "Pages")
│   │   ├── /(auth)      # Group for login/register
│   │   ├── /(user)      # Group for student-facing pages
│   │   │   ├── /listings
│   │   │   │   ├── page.tsx          # All listings
│   │   │   │   └── [id]/page.tsx     # Single house detail
│   │   │   ├── /favorites
│   │   │   │   └── page.tsx
│   │   │   ├── /housemates
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── /profile
│   │   │       └── page.tsx
│   │   ├── /admin       # Group for admin dashboard
│   │   │   ├── /dashboard
│   │   │   ├── /packages
│   │   │   ├── /users
│   │   │   └── /reviews
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Landing page
│   ├── /components      # Reusable UI pieces
│   │   ├── /ui          # Buttons, Inputs, Cards (Atomic)
│   │   ├── /shared      # Navbar, Footer
│   │   ├── /listings    # ListingCard, FilterBar
│   │   └── /admin       # Charts, AdminTables
│   ├── /lib             # Utility functions (API fetchers, formatters)
│   ├── /hooks           # Custom React hooks
│   └── /types           # TypeScript interfaces
├── .env.local
└── tailwind.config.js

/backend-api
├── /src
│   ├── /controllers     # Logic for handling requests
│   ├── /models          # Database schemas (Prisma/Mongoose)
│   ├── /routes          # API endpoints definition
│   ├── /middleware      # Auth, validation, error handling
│   ├── /services        # Heavy business logic/DB queries
│   ├── /utils           # Helpers (sendEmail, logger)
│   └── app.js           # Entry point
├── /tests               # Integration/Unit tests
├── .env
└── package.json