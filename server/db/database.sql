CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-incrementing primary key
  name TEXT NOT NULL,                    -- User's name
  email TEXT NOT NULL UNIQUE,            -- User's email, unique to each user
  password_hash TEXT NOT NULL,           -- Hashed password
  profile_picture TEXT,                  -- URL or path to profile picture (optional)
  bio TEXT,                              -- Short bio or description (optional)
  is_host BOOLEAN DEFAULT 0,             -- Whether the user is a host (default: 0 = false)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the user was created
);

CREATE TABLE listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,          -- Auto-incrementing primary key
  title TEXT NOT NULL,                            -- Listing title (e.g., "Charming apartment in central Göteborg")
  description TEXT,                              -- Description of the listing
  address TEXT NOT NULL,                         -- Address of the property
  city TEXT NOT NULL,                            -- City where the listing is located
  country TEXT NOT NULL,                         -- Country of the listing
  price_per_night DECIMAL(10, 2) NOT NULL,       -- Price per night (e.g., 99.99)
  max_guests INTEGER NOT NULL,                   -- Maximum number of guests
  bedrooms INTEGER NOT NULL,                     -- Number of bedrooms
  bathrooms INTEGER NOT NULL,                    -- Number of bathrooms
  amenities TEXT,                                -- Comma-separated list of amenities or a reference to Listing_Amenities
  host_id INTEGER NOT NULL,                      -- Foreign key for the user who is hosting the listing
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the listing was created
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the listing was last updated
  FOREIGN KEY (host_id) REFERENCES users(id)    -- Foreign key constraint referencing the 'users' table
);


CREATE TABLE amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS listing_amenities (
  listing_id INTEGER NOT NULL,
  amenity_id INTEGER NOT NULL,
  PRIMARY KEY (listing_id, amenity_id),  -- Composite primary key
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,  -- Foreign key to listings
  FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE   -- Foreign key to amenities
);

CREATE TABLE IF NOT EXISTS listing_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,  -- URL or path to the image
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE  -- Foreign key to listings
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL  -- e.g., "Apartment", "House"
);

CREATE TABLE IF NOT EXISTS listings_categories (
  listing_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (listing_id, category_id),  -- Composite primary key
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,  -- Foreign key to listings
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE   -- Foreign key to categories
);

CREATE TABLE IF NOT EXISTS listings_categories (
  listing_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (listing_id, category_id),  -- Composite primary key
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,  -- Foreign key to listings
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE   -- Foreign key to categories
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,       -- Primary key for the booking
  user_id INTEGER NOT NULL,                   -- Foreign key to the Users table (the user who made the booking)
  listing_id INTEGER NOT NULL,                -- Foreign key to the Listings table (the listing that was booked)
  start_date DATE NOT NULL,                   -- Start date for the booking (check-in date)
  end_date DATE NOT NULL,                     -- End date for the booking (check-out date)
  total_price DECIMAL(10, 2) NOT NULL,        -- Total price for the stay
  guests INTEGER NOT NULL,                    -- Number of guests in the booking
  status TEXT NOT NULL CHECK(status IN ('pending', 'confirmed', 'cancelled')), -- Booking status (pending, confirmed, cancelled)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the booking was created
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key to users table
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE -- Foreign key to listings table
);


-- users table stores user information. Each user can be either a regular user or a host (is_host flag).

-- listings table stores details about each listing, including the host (host_id as a foreign key to the users table).

-- amenities table contains different amenities available to the listings (e.g., WiFi, Pool).

-- listing_amenities table establishes a many-to-many relationship between listings and amenities, allowing listings to have multiple amenities and amenities to be shared by multiple listings.

-- listing_images table stores images related to each listing. A listing can have multiple images.

-- categories table defines the various categories of listings (e.g., apartments, houses).

-- listings_categories table links listings to categories, establishing a many-to-many relationship.

-- bookings table stores information about user bookings, including the listing booked, the user, and the check-in/check-out dates.