# Flight Management System

A modern full-stack flight booking and management application built using Next.js 16, Supabase, Tailwind CSS, and TypeScript.

---

## Features

### Authentication
- User Signup
- User Login
- Supabase Authentication Integration

### Flight Search
- Search flights by origin and destination
- Dynamic search results page
- Responsive search interface

### Flight Details
- Dynamic flight detail pages
- Flight timings
- Aircraft information
- Pricing information

### Interactive Seat Selection
- Visual seat map
- Economy, Business, and First Class sections
- Dynamic fare updates
- Seat availability handling
- Responsive mobile-friendly seat layout

### Booking Flow
- Passenger details form
- Booking summary
- Dynamic total fare calculation

### UI/UX
- Responsive Design
- Mobile Optimized
- Dark Theme UI
- Component-based architecture

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend & Database
- Supabase
- PostgreSQL
- Supabase Auth

### State Management
- Zustand

---

## Project Structure

```bash
app/
components/
services/
lib/
supabase/
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Move into project directory:

```bash
cd flight-management-system
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Database

The project uses Supabase PostgreSQL with:
- Flights table
- Seats table
- Bookings table
- Authentication
- RLS Policies
- SQL migrations

---

## Implemented Functionalities

### Completed
- Authentication System
- Flight Search
- Dynamic Flight Pages
- Seat Selection UI
- Dynamic Pricing
- Passenger Details Page
- Responsive Layout
- Supabase Integration

### In Progress
- Booking confirmation backend flow refinement for Next.js 16 server action compatibility
- Realtime seat synchronization
- Reschedule & cancellation flow

---

## Deployment

The project is deployed using Vercel.

---

## Author

Saurabh Kumar
