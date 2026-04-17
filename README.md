# WiyoRent

**A student housing marketplace for Kigali, Rwanda.**

**Live**: [wiyorent.com](https://wiyorent.com)

WiyoRent connects university students and young professionals with verified rental listings and compatible housemates. The platform provides a dual marketplace — browse curated housing listings or find a roommate — backed by an admin dashboard for listing management, user verification, and review moderation.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [External Services](#external-services)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)

---

## Overview

WiyoRent is a full-stack web application with:

- A **Next.js** frontend (App Router, React 19)
- An **Express.js** backend (v5)
- A **PostgreSQL** database hosted on [Neon](https://neon.tech)
- **Google OAuth** authentication via NextAuth.js v5
- Image management via **Cloudinary**
- Transactional emails via **Resend**
- Error monitoring via **Sentry**

**Frontend** runs on port `3000`, **Backend** on port `4000`.

---

## Tech Stack

### Frontend (`/app`)

| Category | Technology |
|---|---|
| Framework | Next.js 16 + React 19 |
| Styling | Tailwind CSS v4 + DaisyUI v5 (custom `mytheme`) |
| Authentication | NextAuth.js v5 (beta) with Neon adapter |
| Icons | Lucide React |
| Notifications | React Toastify |
| Phone input | react-phone-number-input |
| Country select | react-flags-select, react-select-country-list |
| Animations | AOS (Animate on Scroll) |
| Monitoring | Sentry, Vercel Analytics, Vercel Speed Insights |
| Email | Resend SDK |
| Image upload | Cloudinary SDK |

### Backend (`/api`)

| Category | Technology |
|---|---|
| Framework | Express.js v5 |
| Database | PostgreSQL via Neon (serverless) |
| DB Client | `pg` + `postgres` |
| File upload | Multer + Cloudinary SDK |
| Email | Resend API |
| Auth tokens | jsonwebtoken |
| Validation | validator.js |

---

## Features

### For Students / Users

- **Browse Listings** — Filter housing by price, bedrooms, furnishing, neighborhood, and availability
- **Housemate Discovery** — Browse student profiles and filter by lifestyle preferences, budget, and move-in date
- **Housemate Matching** — Dedicated matching page to find compatible roommates
- **User Listings** — Students can post their own housing ads with photos, amenities, and house rules
- **Save & Waitlist** — Save favourite listings and join waitlists for booked properties
- **Reviews & Ratings** — Leave star ratings and written reviews for listings and profiles
- **Profile Onboarding** — Upload admission letter, passport, housing preferences, and lifestyle details
- **Email Notifications** — Receive emails on verification approval/rejection, account changes, and waitlist availability

### For Admins

- **Listings Management** — Create, edit, toggle visibility, and delete listings with image management
- **User Management** — View all users, verify accounts, block/unblock with reasons
- **Review Moderation** — Approve or reject reviews with rejection notes
- **Package Management** — Create and manage subscription/listing packages
- **Analytics Dashboard** — Track user signups, listing views, and platform activity
- **Cron Job** — Automated listing availability status updates

---

## Project Structure

```
Wiyorent_V2.0/
├── app/                        # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── (auth)/         # Login, post-login onboarding
│       │   ├── (public)/       # Listings, housemates, profile, favourites
│       │   └── (admin)/admin/  # Admin dashboard pages
│       ├── components/         # Feature-organised React components
│       ├── services/           # API client functions (admin + public)
│       ├── context/            # React context providers
│       ├── hooks/              # Custom React hooks
│       ├── validators/         # Input validation
│       ├── lib/                # Utility functions
│       ├── actions/            # Next.js server actions
│       └── auth.js             # NextAuth configuration
│
├── api/                        # Express.js backend
│   ├── routes/                 # Endpoint definitions
│   ├── controllers/            # Request handlers
│   ├── middleware/             # Auth checks, validation, error handling
│   ├── config/                 # DB and Cloudinary configuration
│   ├── utils/                  # Email helpers and shared utilities
│   └── server.js               # Express entry point
│
└── CLAUDE.md                   # Development guidelines
```

---

## API Reference

All endpoints are prefixed with `/api/v1`.

### Public Endpoints (`/api/v1/public/`)

#### Listings

| Method | Endpoint | Description |
|---|---|---|
| GET | `/getListings` | Paginated listings with filters (price, bedrooms, furnished, neighborhood) |
| GET | `/getSingleListing/:id` | Single listing details |
| POST | `/saveListing` | Save or unsave a listing |
| GET | `/fetchSavedListings` | Get current user's saved listings |
| POST | `/toggleWaitlist` | Add or remove from a property waitlist |
| GET | `/fetchWaitlistedListings` | Get current user's waitlisted properties |
| POST | `/listing/:id/view` | Track a listing view |

#### Housemates

| Method | Endpoint | Description |
|---|---|---|
| GET | `/fetchHousemates` | Browse housemate profiles with filters |
| GET | `/fetchHousemate/:id` | Individual housemate profile |
| GET | `/fetchHousemateContactDetail/:id` | Contact info (email / phone) |
| POST | `/saveHousemate` | Save a housemate profile |
| GET | `/fetchSavedHousemates` | Get saved housemate profiles |
| POST | `/housemates/:id/view` | Track a housemate profile view |

#### User Profile

| Method | Endpoint | Description |
|---|---|---|
| GET | `/profile/:id` | Full profile including user listing |
| PATCH | `/update/profile` | Update profile, documents, and user listing |

#### Reviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/create/review` | Submit a review for a listing or user |
| PATCH | `/edit/review` | Edit an existing review |
| DELETE | `/delete/review/:id` | Delete a review |

#### Packages

| Method | Endpoint | Description |
|---|---|---|
| GET | `/getPackages` | Fetch all available subscription packages |

### Admin Endpoints (`/api/v1/admin/`)

Require `X-Internal-API-Key` and `X-User-Role: admin` headers.

#### Listings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/createListing` | Create a new listing |
| GET | `/fetchAllListings` | All listings with status |
| GET | `/fetchSingleListing/:id` | Listing details |
| PATCH | `/editListing/:id` | Update listing fields |
| PATCH | `/toggleActive/:id` | Toggle visibility |
| PATCH | `/setListingImages/:id` | Update listing images |
| DELETE | `/deleteListing/:id` | Delete a listing |

#### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get/users` | Paginated user list with filters |
| GET | `/get/user/:id` | Single user details |
| PATCH | `/update/user` | Verify, block, or unblock a user |
| DELETE | `/delete/user/:id` | Delete a user |

#### Reviews

| Method | Endpoint | Description |
|---|---|---|
| GET | `/reviews` | All reviews |
| PATCH | `/approve/:id` | Approve a review |
| PATCH | `/reject/:id` | Reject with a reason |

#### Packages

Full CRUD for subscription and listing packages.

#### Internal

| Method | Endpoint | Description |
|---|---|---|
| POST | `/internal/process-available-listings` | Cron — auto-update listing availability |

---

## Database Schema

PostgreSQL hosted on Neon. Key tables:

### `users`
Core user record. Stores Google OAuth identity, role, onboarding state, housing preferences, lifestyle fields, document URLs, and verification status.

**Key fields**: `id`, `email`, `full_name`, `avatar_url`, `role` (`student` | `admin` | `landlord`), `is_onboarded`, `is_blocked`, `verification_status` (`pending` | `approved` | `rejected`), `nationality`, `university_name`, `program`, `year_of_study`, `date_of_birth`, `gender`, `phone_number`, `move_in_date`, `min`/`max` (budget), `max_housemates`, `private_room`, `furnished`, `sleep_schedule`, `cleanliness`, `social_habits`, `is_profile_public`, `admission_letter`, `passport_id`, `preferred_locations`, `lease_duration`, `urgency`, `has_house`.

### `listings`
Admin-managed rental properties.

**Key fields**: `id`, `title`, `description`, `price_per_month`, `bedroom_number`, `bathroom_number`, `max_roommates`, `neighborhood`, `city`, `available_status` (`available` | `booked`), `available_from`, `is_furnished`, `is_a_wiyorent_house`, `landlord_name`, `landlord_number`, `thumbnail_url`, `images[]`, `house_rules[]`, `amenities[]`, `housemate_gender_preference`, `is_active`.

### `user_listings`
Housing posts created by students. Linked to `users` via `user_id`.

### `user_listing_images`
Cloudinary image URLs for user-created listings.

### `saved_listings`
Junction table — user saved listing (`user_id`, `listing_id`).

### `waitlists`
Junction table — user waitlisted property (`user_id`, `listing_id`).

### `saved_housemates`
Junction table — saved housemate profiles (`user_id`, `housemate_user_id`).

### `reviews`
**Key fields**: `id`, `reviewer_id`, `listing_id` or `user_id`, `rating` (1–5), `comment`, `status` (`pending` | `approved` | `rejected`), `rejection_reason`.

### `listing_views` / `housemate_views`
View tracking for analytics (`user_id`, `listing_id` / `housemate_id`, `viewed_at`).

### `packages`
Subscription tiers — `name`, `description`, `price`, `upfront_months_required`, `active`.

> NextAuth also creates its own standard tables: `accounts`, `sessions`, `verification_tokens`.

---

## Authentication

WiyoRent uses **NextAuth.js v5** with Google OAuth.

**Flow**:
1. User signs in with Google
2. NextAuth creates or retrieves the user record in PostgreSQL via the Neon adapter
3. Custom JWT callback injects `role`, `is_onboarded`, `is_blocked`, and `is_blocked_reason`
4. Session callback exposes user metadata to the frontend via `session.user`
5. Frontend reads auth state via `useSession()`

**Backend auth**:
- Public endpoints accept an optional `X-User-ID` header for user context
- Admin endpoints require `X-Internal-API-Key` and `X-User-Role: admin`

**Protected frontend routes**:
- `/profile` — valid session required
- `/housemates/*` — session required for save and contact features
- `/admin/*` — admin role required

---

## External Services

| Service | Purpose |
|---|---|
| [Neon](https://neon.tech) | Serverless PostgreSQL database |
| [Cloudinary](https://cloudinary.com) | Image upload, storage, and CDN |
| [Resend](https://resend.com) | Transactional emails |
| [Google OAuth](https://console.cloud.google.com) | User authentication |
| [Sentry](https://sentry.io) | Error monitoring (org: `wiyorent-ltd`) |
| [Vercel Analytics](https://vercel.com/analytics) | Web analytics and speed insights |

**Emails sent**:
- Welcome on new signup
- Verification request on first onboarding
- Approval / rejection of profile verification
- Account blocked / unblocked notifications
- Admin alerts on profile updates
- Waitlist availability notifications

Set `SEND_EMAILS=false` to suppress all emails in development.

---

## Environment Variables

### Backend (`/api/.env`)

```env
DATABASE_URL=postgresql://...
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
SECRET_JWT_TOKEN=
INTERNAL_BACKEND_KEY=
Wiyorent_Resend_API_KEY=
FRONTEND_URL=
SEND_EMAILS=true
CRON_SECRET=
PORT=4000
```

### Frontend (`/app/.env`)

```env
AUTH_SECRET=
AUTH_URL=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
DATABASE_URL=
INTERNAL_BACKEND_KEY=
Wiyorent_Resend_API_KEY=
SEND_EMAILS=true
NEXT_PUBLIC_API_URL=http://localhost:4000
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FRONTEND_URL=
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (Neon recommended)
- Cloudinary account
- Resend account
- Google OAuth credentials

### Installation

```bash
# Install backend dependencies
cd api && npm install

# Install frontend dependencies
cd ../app && npm install
```

### Development

```bash
# Start the backend (port 4000)
cd api && npm run dev

# Start the frontend (port 3000)
cd app && npm run dev
```

### Build

```bash
cd app && npm run build
```

---

## Brand

- **Primary accent**: `oklch(75% 0.15 85)` — bright yellow `#F1C528`
- **Secondary**: `oklch(10% 0.01 240)` — rich black `#010101`
- **Headings / buttons**: Oswald, sans-serif
- **Body / labels**: Inter, sans-serif
- Styled with Tailwind CSS v4 + DaisyUI v5 (`mytheme`)

---

## Contact

**Support**: wiyorent@gmail.com
