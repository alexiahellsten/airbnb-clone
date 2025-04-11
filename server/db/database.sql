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


-- listings
INSERT INTO listings (title, description, address, city, country, price_per_night, max_guests, bedrooms, bathrooms, host_id, created_at, updated_at) VALUES
  ('Mysig studio i centrala Göteborg', 'En liten och mysig studio perfekt för ensamresenärer.', 'Vasagatan 1, 411 24 Göteborg', 'Göteborg', 'Sverige', 800.00, 2, 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lyxig 2-rumslägenhet vid havet', 'En lyxig 2-rumslägenhet med fantastisk havsutsikt.', 'Havsgatan 10, 426 78 Simrishamn', 'Simrishamn', 'Sverige', 2500.00, 4, 2, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Charmig stuga i skogen', 'En fridfull och tyst stuga perfekt för en helgresa.', 'Skogsvägen 5, 442 35 Leksand', 'Leksand', 'Sverige', 1200.00, 4, 2, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Modern loft i hjärtat av staden', 'En elegant loftlägenhet med modern design i stadens centrum.', 'Storgatan 20, 411 35 Stockholm', 'Stockholm', 'Sverige', 2000.00, 3, 1, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Vacker trädgårdslägenhet', 'Spacious 2-rumslägenhet med tillgång till en privat trädgård.', 'Linnégatan 22, 413 08 Kristianstad', 'Kristianstad', 'Sverige', 1400.00, 4, 2, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Rustik stuga i bergen', 'En charmig stuga i bergen, perfekt för vandring och utomhusaktiviteter.', 'Bergvägen 15, 722 45 Helsingborg', 'Helsingborg', 'Sverige', 1000.00, 4, 2, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Stor takvåning med utsikt över staden', 'En 3-rumstakvåning med panoramautsikt över stadens skyline.', 'Lilla Bommen 7, 411 04 Sundsvall', 'Sundsvall', 'Sverige', 4000.00, 6, 3, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ljus och mysig lägenhet nära stranden', 'En charmig lägenhet bara några steg från stranden.', 'Beach Road 12, 411 33 Visby', 'Visby', 'Sverige', 1500.00, 4, 2, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Mysig lägenhet i Stockholm', 'En charmig och tyst lägenhet med nära till allt.', 'Sveavägen 50, 113 59 Stockholm', 'Stockholm', 'Sverige', 1800.00, 4, 2, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Stilren lägenhet i Uppsala centrum', 'En modern lägenhet med ett utmärkt läge nära restauranger, universitet och shopping.', 'Lilla Torg 10, 211 34 Uppsala', 'Uppsala', 'Sverige', 1500.00, 4, 2, 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lägenhet med fantastisk utsikt i Malmö', 'En modern lägenhet med fantastisk utsikt över Öresundsbron.', 'Västra Varvsgatan 12, 211 11 Malmö', 'Malmö', 'Sverige', 2500.00, 4, 2, 2, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Vacker villa på Österlen', 'En lyxig villa på Österlen, perfekt för avkoppling vid havet.', 'Kullavägen 2, 271 77 Simrishamn', 'Simrishamn', 'Sverige', 4500.00, 6, 4, 3, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Familjevänligt hus med pool', 'Ett stort familjehus med privat pool och trädgård.', 'Villa Road 3, 421 23 Linköping', 'Linköping', 'Sverige', 3500.00, 6, 4, 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Charmig stuga på landet', 'En mysig stuga på landet, perfekt för en helg i naturen.', 'Landvägen 3, 301 45 Halmstad', 'Halmstad', 'Sverige', 1400.00, 4, 2, 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- amenities
ALTER TABLE amenities ADD COLUMN description TEXT;
ALTER TABLE amenities ADD COLUMN icon TEXT;
ALTER TABLE amenities RENAME COLUMN amenity TO name;

INSERT INTO amenities (name, description, icon) VALUES
('WiFi', 'Snabbt och tillförlitligt trådlöst internet', 'wifi'),
('Parkering', 'Gratis parkering på plats', 'local_parking'),
('Diskmaskin', 'Fullstor diskmaskin i köket', 'dishwasher'),
('Tvättmaskin', 'Privat tvättmaskin tillgänglig', 'washing_machine'),
('Torktumlare', 'Torktumlare för kläder finns', 'dryer'),
('TV', 'Smart-TV med streamingtjänster', 'tv'),
('Balkong', 'Privat balkong med utsikt', 'balcony'),
('Luftkonditionering', 'Kylning under varma sommardagar', 'ac_unit'),
('Uppvärmning', 'Centralvärme eller golvvärme', 'thermostat'),
('Pool', 'Utomhuspool tillgänglig för gäster', 'pool'),
('Bastu', 'Privat bastu finns i bostaden', 'sauna'),
('Grill', 'Grillmöjligheter i trädgården', 'outdoor_grill'),
('Barnsäng', 'Barnsäng tillgänglig vid behov', 'crib'),
('Arbetsyta', 'Ett skrivbord eller arbetsbord finns', 'desk'),
('Kaffe-/tekokare', 'Kaffebryggare och vattenkokare ingår', 'coffee'),
('Djurvänligt', 'Husdjur är välkomna', 'pets');

-- listing_amenities
-- Sample data for listing_amenities (many-to-many relationship)
INSERT INTO listing_amenities (listing_id, amenity_id) VALUES
(1, 1), (1, 2), (1, 4),
(2, 1), (2, 3), (2, 5),
(3, 2), (3, 6), (3, 9),
(4, 1), (4, 4), (4, 7),
(5, 3), (5, 6), (5, 8),
(6, 2), (6, 5), (6, 10),
(7, 1), (7, 2), (7, 6),
(8, 1), (8, 3), (8, 7),
(9, 4), (9, 5), (9, 8),
(10, 1), (10, 2), (10, 9),
(11, 3), (11, 6), (11, 10),
(12, 1), (12, 4), (12, 5),
(13, 2), (13, 7), (13, 9),
(14, 3), (14, 5), (14, 10),
(15, 1), (15, 6), (15, 8),
(16, 2), (16, 4), (16, 7);


-- categories
INSERT INTO categories (id, name, description, icon) VALUES
(1, 'Stugor', 'Traditionella stugor i naturnära miljöer, perfekta för avkoppling.', '🏡'),
(2, 'Lägenheter', 'Moderna lägenheter i stad och landsbygd, ofta med bekväma faciliteter.', '🏢'),
(3, 'Villor', 'Rymliga villor för större grupper eller familjer, ofta med trädgård.', '🏘️'),
(4, 'Vid stranden', 'Boenden nära havet eller sjöar med fantastisk utsikt och tillgång till strand.', '🌊'),
(5, 'Stadsliv', 'Boenden mitt i stadens hjärta med närhet till restauranger och kultur.', '🌆'),
(6, 'Fjällstugor', 'Bo nära naturen i fjällmiljö, perfekt för skidåkning eller vandring.', '⛰️'),
(7, 'Familjevänligt', 'Anpassade för barnfamiljer med gott om plats och bekvämligheter.', '👨‍👩‍👧‍👦'),
(8, 'Wow!', 'Unika eller lyxiga boenden som sticker ut – trädkojor, slott eller designerhus.', '⭐');

-- listing_categories
INSERT INTO listing_categories (listing_id, category_id) VALUES
(1, 2),   -- Mysig studio i Göteborg – Lägenhet
(2, 2),   -- Lyxig 2-rumslägenhet – Lägenhet
(3, 4),   -- Charmig stuga – Hus vid stranden
(4, 2),   -- Modern loft – Lägenhet
(5, 2),   -- Stilig studio – Lägenhet
(6, 1),   -- Trädgårdslägenhet – Lägenhet
(7, 4),   -- Rustik stuga – Hus vid stranden
(8, 2),   -- Takvåning – Lägenhet
(9, 5),   -- Lägenhet nära stranden – Vid stranden
(10, 3),  -- Förortshus – Villa
(11, 2),  -- Lägenhet i historiskt område – Lägenhet
(12, 2),  -- 1-rumslägenhet – Lägenhet
(13, 3),  -- Familjevilla med pool – Villa
(14, 2),  -- Loft i trendigt område – Lägenhet
(15, 2),  -- Modern lägenhet i Uppsala – Lägenhet
(16, 6);  -- Fjällstuga i Åre – Stugor i bergen

-- listing_images
INSERT INTO listing_images (listing_id, image_url) VALUES
(1, 'https://example.com/images/listing1_1.jpg'),   -- Mysig studio i Göteborg
(1, 'https://example.com/images/listing1_2.jpg'),   -- Mysig studio i Göteborg
(1, 'https://example.com/images/listing1_3.jpg'),   -- Mysig studio i Göteborg
(1, 'https://example.com/images/listing1_4.jpg'),   -- Mysig studio i Göteborg
(1, 'https://example.com/images/listing1_5.jpg'),   -- Mysig studio i Göteborg
(2, 'https://example.com/images/listing2_1.jpg'),   -- Lyxig 2-rumslägenhet
(2, 'https://example.com/images/listing2_2.jpg'),   -- Lyxig 2-rumslägenhet
(2, 'https://example.com/images/listing2_3.jpg'),   -- Lyxig 2-rumslägenhet
(2, 'https://example.com/images/listing2_4.jpg'),   -- Lyxig 2-rumslägenhet
(2, 'https://example.com/images/listing2_5.jpg'),   -- Lyxig 2-rumslägenhet
(3, 'https://example.com/images/listing3_1.jpg'),   -- Charmig stuga
(3, 'https://example.com/images/listing3_2.jpg'),   -- Charmig stuga
(3, 'https://example.com/images/listing3_3.jpg'),   -- Charmig stuga
(3, 'https://example.com/images/listing3_4.jpg'),   -- Charmig stuga
(3, 'https://example.com/images/listing3_5.jpg'),   -- Charmig stuga
(4, 'https://example.com/images/listing4_1.jpg'),   -- Modern loft
(4, 'https://example.com/images/listing4_2.jpg'),   -- Modern loft
(4, 'https://example.com/images/listing4_3.jpg'),   -- Modern loft
(4, 'https://example.com/images/listing4_4.jpg'),   -- Modern loft
(4, 'https://example.com/images/listing4_5.jpg'),   -- Modern loft
(5, 'https://example.com/images/listing5_1.jpg'),   -- Stilig studio
(5, 'https://example.com/images/listing5_2.jpg'),   -- Stilig studio
(5, 'https://example.com/images/listing5_3.jpg'),   -- Stilig studio
(5, 'https://example.com/images/listing5_4.jpg'),   -- Stilig studio
(5, 'https://example.com/images/listing5_5.jpg'),   -- Stilig studio
(6, 'https://example.com/images/listing6_1.jpg'),   -- Trädgårdslägenhet
(6, 'https://example.com/images/listing6_2.jpg'),   -- Trädgårdslägenhet
(6, 'https://example.com/images/listing6_3.jpg'),   -- Trädgårdslägenhet
(6, 'https://example.com/images/listing6_4.jpg'),   -- Trädgårdslägenhet
(6, 'https://example.com/images/listing6_5.jpg'),   -- Trädgårdslägenhet
(7, 'https://example.com/images/listing7_1.jpg'),   -- Rustik stuga
(7, 'https://example.com/images/listing7_2.jpg'),   -- Rustik stuga
(7, 'https://example.com/images/listing7_3.jpg'),   -- Rustik stuga
(7, 'https://example.com/images/listing7_4.jpg'),   -- Rustik stuga
(7, 'https://example.com/images/listing7_5.jpg'),   -- Rustik stuga
(8, 'https://example.com/images/listing8_1.jpg'),   -- Takvåning
(8, 'https://example.com/images/listing8_2.jpg'),   -- Takvåning
(8, 'https://example.com/images/listing8_3.jpg'),   -- Takvåning
(8, 'https://example.com/images/listing8_4.jpg'),   -- Takvåning
(8, 'https://example.com/images/listing8_5.jpg'),   -- Takvåning
(9, 'https://example.com/images/listing9_1.jpg'),   -- Lägenhet nära stranden
(9, 'https://example.com/images/listing9_2.jpg'),   -- Lägenhet nära stranden
(9, 'https://example.com/images/listing9_3.jpg'),   -- Lägenhet nära stranden
(9, 'https://example.com/images/listing9_4.jpg'),   -- Lägenhet nära stranden
(9, 'https://example.com/images/listing9_5.jpg'),   -- Lägenhet nära stranden
(10, 'https://example.com/images/listing10_1.jpg'), -- Förortshus
(10, 'https://example.com/images/listing10_2.jpg'), -- Förortshus
(10, 'https://example.com/images/listing10_3.jpg'), -- Förortshus
(10, 'https://example.com/images/listing10_4.jpg'), -- Förortshus
(10, 'https://example.com/images/listing10_5.jpg'), -- Förortshus
(11, 'https://example.com/images/listing11_1.jpg'), -- Lägenhet i historiskt område
(11, 'https://example.com/images/listing11_2.jpg'), -- Lägenhet i historiskt område
(11, 'https://example.com/images/listing11_3.jpg'), -- Lägenhet i historiskt område
(11, 'https://example.com/images/listing11_4.jpg'), -- Lägenhet i historiskt område
(11, 'https://example.com/images/listing11_5.jpg'), -- Lägenhet i historiskt område
(12, 'https://example.com/images/listing12_1.jpg'), -- 1-rumslägenhet
(12, 'https://example.com/images/listing12_2.jpg'), -- 1-rumslägenhet
(12, 'https://example.com/images/listing12_3.jpg'), -- 1-rumslägenhet
(12, 'https://example.com/images/listing12_4.jpg'), -- 1-rumslägenhet
(12, 'https://example.com/images/listing12_5.jpg'), -- 1-rumslägenhet
(13, 'https://example.com/images/listing13_1.jpg'), -- Familjevilla med pool
(13, 'https://example.com/images/listing13_2.jpg'), -- Familjevilla med pool
(13, 'https://example.com/images/listing13_3.jpg'), -- Familjevilla med pool
(13, 'https://example.com/images/listing13_4.jpg'), -- Familjevilla med pool
(13, 'https://example.com/images/listing13_5.jpg'), -- Familjevilla med pool
(14, 'https://example.com/images/listing14_1.jpg'), -- Loft i trendigt område
(14, 'https://example.com/images/listing14_2.jpg'), -- Loft i trendigt område
(14, 'https://example.com/images/listing14_3.jpg'), -- Loft i trendigt område
(14, 'https://example.com/images/listing14_4.jpg'), -- Loft i trendigt område
(14, 'https://example.com/images/listing14_5.jpg'), -- Loft i trendigt område
(15, 'https://example.com/images/listing15_1.jpg'), -- Modern lägenhet i Uppsala
(15, 'https://example.com/images/listing15_2.jpg'), -- Modern lägenhet i Uppsala
(15, 'https://example.com/images/listing15_3.jpg'), -- Modern lägenhet i Uppsala
(15, 'https://example.com/images/listing15_4.jpg'), -- Modern lägenhet i Uppsala
(15, 'https://example.com/images/listing15_5.jpg'), -- Modern lägenhet i Uppsala
(16, 'https://example.com/images/listing16_1.jpg'), -- Fjällstuga i Åre
(16, 'https://example.com/images/listing16_2.jpg'), -- Fjällstuga i Åre
(16, 'https://example.com/images/listing16_3.jpg'), -- Fjällstuga i Åre
(16, 'https://example.com/images/listing16_4.jpg'), -- Fjällstuga i Åre
(16, 'https://example.com/images/listing16_5.jpg'); -- Fjällstuga i Åre

-- bookings
INSERT INTO bookings (user_id, listing_id, start_date, end_date, total_price, guests, status, created_at) VALUES
(1, 1, '2025-05-01', '2025-05-07', 4800.00, 2, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 1 (Mysig studio i Göteborg)
(2, 2, '2025-06-01', '2025-06-05', 10000.00, 3, 'pending', CURRENT_TIMESTAMP),  -- Booking for listing 2 (Lyxig 2-rumslägenhet)
(3, 3, '2025-07-10', '2025-07-15', 6000.00, 4, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 3 (Charmig stuga)
(4, 4, '2025-05-15', '2025-05-20', 10000.00, 3, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 4 (Modern loft)
(5, 5, '2025-06-10', '2025-06-12', 4500.00, 2, 'pending', CURRENT_TIMESTAMP),  -- Booking for listing 5 (Stilig studio)
(6, 6, '2025-08-01', '2025-08-07', 7000.00, 4, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 6 (Trädgårdslägenhet)
(7, 7, '2025-07-20', '2025-07-25', 5000.00, 3, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 7 (Rustik stuga)
(8, 8, '2025-05-10', '2025-05-15', 12000.00, 5, 'cancelled', CURRENT_TIMESTAMP),  -- Booking for listing 8 (Takvåning)
(9, 9, '2025-06-01', '2025-06-05', 7500.00, 4, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 9 (Lägenhet nära stranden)
(10, 10, '2025-07-01', '2025-07-07', 12000.00, 6, 'confirmed', CURRENT_TIMESTAMP), -- Booking for listing 10 (Förortshus)
(11, 11, '2025-06-15', '2025-06-20', 11000.00, 4, 'pending', CURRENT_TIMESTAMP),  -- Booking for listing 11 (Lägenhet i historiskt område)
(12, 12, '2025-08-01', '2025-08-05', 5500.00, 2, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 12 (1-rumslägenhet)
(13, 13, '2025-09-01', '2025-09-05', 15000.00, 6, 'confirmed', CURRENT_TIMESTAMP), -- Booking for listing 13 (Familjevilla med pool)
(14, 14, '2025-06-10', '2025-06-15', 10500.00, 4, 'cancelled', CURRENT_TIMESTAMP), -- Booking for listing 14 (Loft i trendigt område)
(15, 15, '2025-07-05', '2025-07-10', 9000.00, 3, 'confirmed', CURRENT_TIMESTAMP),  -- Booking for listing 15 (Modern lägenhet i Uppsala)
(16, 16, '2025-05-01', '2025-05-07', 6000.00, 4, 'pending', CURRENT_TIMESTAMP); -- Booking for listing 16 (Fjällstuga i Åre)
