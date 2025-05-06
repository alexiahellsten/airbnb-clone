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

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,       -- Auto-incrementing primary key
  user_id INTEGER NOT NULL,                   -- ID of the user who wrote the review
  listing_id INTEGER NOT NULL,                -- ID of the listing being reviewed
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),  -- Rating between 1 and 5
  comment TEXT,                               -- The comment left by the user
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the review was created
  FOREIGN KEY (user_id) REFERENCES users(id),   -- Foreign key reference to the users table
  FOREIGN KEY (listing_id) REFERENCES listings(id)  -- Foreign key reference to the listings table
);

CREATE TABLE bedrooms (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  name VARCHAR(255), -- t.ex. "Sovrum 1"
  single_beds INTEGER DEFAULT 0, -- antal enkelsängar
  double_beds INTEGER DEFAULT 0, -- antal dubbelsängar
  created_at TIMESTAMP DEFAULT NOW()
);
-- users table stores user information. Each user can be either a regular user or a host (is_host flag).

-- listings table stores details about each listing, including the host (host_id as a foreign key to the users table).

-- amenities table contains different amenities available to the listings (e.g., WiFi, Pool).

-- listing_amenities table establishes a many-to-many relationship between listings and amenities, allowing listings to have multiple amenities and amenities to be shared by multiple listings.

-- listing_images table stores images related to each listing. A listing can have multiple images.

-- categories table defines the various categories of listings (e.g., apartments, houses).

-- listings_categories table links listings to categories, establishing a many-to-many relationship.

-- bookings table stores information about user bookings, including the listing booked, the user, and the check-in/check-out dates.

-- reviews table stores information about reviews

-- listings
INSERT INTO listings (title, description, address, city, country, price_per_night, max_guests, bedrooms, bathrooms, host_id, created_at, updated_at) VALUES
  ('Mysig studio i centrala Göteborg', 'Denna mysiga studio i centrala Göteborg erbjuder ett perfekt boende för en ensamresenär eller ett par som vill ha nära till stadens puls samtidigt som de får ett lugnt och trivsamt hem. Belägen på en av Göteborgs mest eftertraktade adresser, har du gångavstånd till allt staden har att erbjuda – från mysiga kaféer och restauranger till shopping och kulturella upplevelser.
<br><br>Studion är på 25 kvadratmeter och har en smart planlösning som gör att du får ut maximalt av varje yta. Här hittar du en bekväm säng, ett litet men funktionellt kök med alla nödvändiga apparater och en rymlig sittdel där du kan koppla av efter en dag på stan. Den stilrena inredningen har ljusa färger och moderna möbler som ger ett luftigt och fräscht intryck. Fönstren vetter mot en lugn gård, vilket ger en härlig tystnad trots den centrala placeringen.
<br><br>Badrummet är nyrenoverat med en dusch, toalett och tvättställ. Den lilla hallen ger plats för förvaring och en praktisk garderob. Studion har också en liten balkong där du kan njuta av en kopp kaffe på morgonen eller ta en paus från vardagen.
<br><br>Med bara några minuters gångavstånd till både spårvagnshållplats och centralstationen är du snabbt ute i Göteborgs utbud av sevärdheter och nöjen. Denna studio passar perfekt för dig som söker ett centralt, bekvämt och mysigt boende för kortare eller längre perioder.', 'Vasagatan 1', 'Göteborg', 'Sverige', 800.00, 2, 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lyxig 2-rumslägenhet vid havet', 'Välkommen till denna lyxiga 2-rumslägenhet vid havet i Simrishamn – för dig som vill ha det allra bästa av två världar: en spektakulär havsutsikt och en bostad som får dig att känna dig som en kung (eller drottning) i ditt eget palats. Med sina 60 kvadratmeter är denna lägenhet den perfekta blandningen av stil, komfort och, självklart, en grym utsikt – så bra att du kommer fråga dig själv varför du inte flyttade hit tidigare.
<br><br>Lägenheten är inredd med moderna och eleganta detaljer som får både dina ögon och din själ att må bra. Vardagsrummet, där du kan njuta av kvällssolen genom de stora fönstren, erbjuder en sofistikerad atmosfär och plats för att koppla av med ett glas vin efter en dag på stranden. Här kan du låtsas att du är med i en trendig inredningstidning – eller åtminstone känna dig som en influencer på Instagram.
<br><br>Köket, som är ett mästerverk av funktion och design, kommer att få dig att vilja laga gourmetmiddagar, även om dina matlagningskunskaper mest består av att värma upp hämtmat. Men varför inte prova på något nytt? Med toppmoderna vitvaror och gott om arbetsyta kommer du att känna dig som en mästerkock, om inte annat så för att du har så fin utsikt när du står där och hackar grönsaker.
<br><br>Sovrummet är en oas av ro och avkoppling, där den stora sängen gör att du kommer vilja sova till lunch (men vi förstår om du inte vill – det finns ju så mycket att upptäcka). Fönstren ger dig den bästa utsikten över havet, så du kan vakna varje morgon och känna att du är en del av något större än dig själv. Och ja, det är okej att ta en extra lång tupplur här.
<br><br>Badrummet är både fräscht och funktionellt med alla bekvämligheter du kan behöva, från dusch till toalett – och om du känner för det, kan du alltid stå där och skåla med dig själv i spegeln för att du valde just denna lyxiga lägenhet.
<br><br>Och när du inte njuter av lyxen inomhus, kan du gå ut och andas in den friska havsluften på din privata balkong. Tänk dig att sitta där, med en kopp kaffe i handen, och bara titta på när vågorna slår mot stranden. Här får du både lugnet av havet och närheten till Simrishamns mysiga små butiker och restauranger. En kort promenad tar dig till både stranden och stadens centrum, vilket gör denna lägenhet både privat och praktisk.
<br><br>Om du letar efter ett boende vid havet där lyxen möter naturen och bekvämligheten står i centrum, då är detta din plats. Vi lovar att du kommer känna dig som hemma, och kanske även lite rikare på upplevelser (och på livskvalitet).', 'Havsgatan 10', 'Simrishamn', 'Sverige', 2500.00, 4, 2, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Charmig stuga i skogen', 'Denna charmiga stuga ligger vackert belägen i den rofyllda skogen strax utanför Leksand, perfekt för den som vill komma bort från stadens stress och njuta av naturen. Här omges du av stillhet, fågelkvitter och ett landskap som bjuder på både öppna vidder och täta skogar, där du kan njuta av lugnet och den friska luften.
<br><br>Stugan är en mysig liten pärla på 45 kvadratmeter, med rustik inredning som ger en varm och hemtrevlig känsla. Stugan har ett öppet kök med all nödvändig utrustning för att laga måltider, samt ett vardagsrum med en bekväm soffa där du kan slappna av framför kaminen efter en lång dag utomhus. Fönstren släpper in mycket ljus och erbjuder en fantastisk utsikt över skogen.
<br><br>Det finns ett sovrum med en dubbelsäng, samt en sovloft med plats för ytterligare två personer – perfekt för familjer eller vänner som vill bo tillsammans. Badrummet är enkelt men funktionellt, med dusch, toalett och tvättställ.
<br><br>Stugan har också en stor veranda där du kan njuta av morgonkaffet medan du blickar ut över den omgivande skogen. På kvällarna är det perfekt för att grilla eller bara sitta och titta på stjärnhimlen. För den som älskar utomhusaktiviteter finns det gott om vandringsleder, sjöar för fiske och möjligheter till skogsutflykter direkt utanför dörren.
<br><br>Med bara en kort bilresa in till Leksand, som erbjuder både affärer, restauranger och andra bekvämligheter, får du det bästa av två världar – lugnet från naturen och närheten till samhällslivet. Denna stuga är den perfekta platsen för en avkopplande semester eller en helg med familj och vänner.', 'Skogsvägen 5', 'Leksand', 'Sverige', 1200.00, 4, 2, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Modernt loft i hjärtat av staden', 'Välkommen till detta stiliga och moderna loft i hjärtat av Stockholm, perfekt för den som söker en exklusiv bostad med närhet till stadens puls. Denna fantastiska lägenhet på 65 kvadratmeter ligger på en av de mest eftertraktade adresserna, där du har gångavstånd till både trendiga restauranger, shopping och kulturella upplevelser. Från din dörr har du bara några minuter till Gamla Stan, Södermalm och centralstationen.
<br><br>Loftet har en öppen planlösning som ger en luftig och rymlig känsla, och de stora fönstren släpper in massor av naturligt ljus och ger en fantastisk utsikt över stadens takåsar. Här hittar du en bekväm sittgrupp, ett modernt kök med rostfria vitvaror, samt ett matbord för middagar med vänner och familj. Den stilrena inredningen kombinerar industrikänsla med eleganta detaljer, där betongväggar och trägolv möter moderna möbler och design.
<br><br>Sovdelen är avskild med en snygg glasvägg, vilket skapar en känsla av öppenhet samtidigt som det bibehåller privatlivet. Den stora sängen garanterar en god natts sömn, och det finns gott om förvaring i garderober och hyllor. Loftet har också ett exklusivt badrum med dusch, stilren inredning och ett högt kvalitativt tvättställ.
<br><br>På takterrassen kan du njuta av en drink i solnedgången eller bara koppla av i denna privata oas med utsikt över hela staden. Med närheten till kollektivtrafik och all service du kan tänka dig, är detta loft en perfekt bas för den som vill bo centralt i Stockholm och samtidigt ha ett modernt och bekvämt hem.', 'Storgatan 20', 'Stockholm', 'Sverige', 2000.00, 3, 1, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Vacker trädgårdslägenhet', 'Välkommen till denna vackra trädgårdslägenhet belägen i ett lugnt och naturskönt område i Kristianstad. Här bor du i en harmonisk miljö med direkt access till en grönskande trädgård som ger en känsla av avkoppling och frihet. Lägenheten, som är på 60 kvadratmeter, är perfekt för den som vill njuta av både stadens bekvämligheter och närheten till naturen. Med bara några minuter till Kristianstads centrum har du alla affärer, caféer och restauranger inom räckhåll.
<br><br>Den rymliga och ljusa lägenheten har en öppen planlösning med ett modernt kök och ett mysigt vardagsrum där stora fönster släpper in mycket dagsljus och ger en fin utsikt över trädgården. Inredningen är både stilren och hemtrevlig, med en blandning av klassiska detaljer och moderna inslag. Från vardagsrummet kan du direkt gå ut till en egen privat uteplats, där du kan njuta av morgonkaffet eller bara koppla av med en bok.
<br><br>Lägenheten har ett rofyllt sovrum med en stor dubbelsäng och gott om förvaringsutrymme. Det finns också ett ljust och fräscht badrum med dusch, tvättställ och toalett. Trädgården som omger lägenheten är välskött och erbjuder gott om plats för att skapa din egen gröna oas. Här kan du odla, grilla eller bara koppla av i solen.
<br><br>Den här trädgårdslägenheten passar perfekt för dig som vill ha ett lugnt och naturskönt boende men ändå vara nära till stadens liv och aktivitet. Med sin charmiga atmosfär och den privata trädgården är detta boende en verklig pärla för den som söker både avkoppling och bekvämlighet i Kristianstad.', 'Linnégatan 22', 'Kristianstad', 'Sverige', 1400.00, 4, 2, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Rustik stuga i bergen', 'Denna rustika stuga ligger idylliskt belägen i de vackra Åreskogen, omgiven av majestätiska berg och fantastisk natur. Här får du en unik chans att bo i en genuin fjällstuga som kombinerar traditionell charm med moderna bekvämligheter. Denna stuga på 70 kvadratmeter är perfekt för både vinterälskare och sommarentusiaster, då du har närhet till både skidbackarna och de många vandringslederna i området.
<br><br>Stugan har en öppen planlösning med en stor, öppen spis som är hjärtat i huset, där du kan samlas med familj och vänner efter en dag på fjället. De rustika träväggarna, synliga takbjälkarna och de stora fönstren ger en mysig och autentisk atmosfär. Köket är fullt utrustat med allt du behöver för att laga härliga måltider, och den stora matplatsen är perfekt för gemensamma middagar.
<br><br>Sovrummen är rymliga och inredda med både komfort och funktion i åtanke. Det finns plats för upp till sex personer, vilket gör stugan perfekt för en familj eller en grupp vänner. Badrummet har en dusch, toalett och tvättställ, samt en egen liten bastu för extra avkoppling efter en lång dag ute i naturen.
<br><br>Från stugan kan du gå ut direkt och utforska de omgivande fjällen, med skidåkning på vintern och vandring eller cykling på sommaren. För den som söker en lugnare stund finns det en härlig altan där du kan njuta av den friska fjällluften och den otroliga utsikten över bergen. Stugan erbjuder också en liten trädgård som är perfekt för grillning eller bara för att koppla av och njuta av tystnaden.
<br><br>Med endast en kort bilresa till Åre by, som erbjuder både restauranger, affärer och nöjen, har du både avskildheten från storstaden och närheten till aktiviteter och bekvämligheter. Denna rustika stuga är den perfekta basen för ett avkopplande fjällboende året runt.', 'Bergvägen 15', 'Helsingborg', 'Sverige', 1000.00, 4, 2, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Stor takvåning med utsikt över staden', 'Välkommen till denna imponerande takvåning med en utsikt över Sundsvall som får dig att tappa andan – bokstavligt talat! Denna generösa bostad på 120 kvadratmeter ger dig inte bara en otrolig vy över staden, utan också ett boende som är lika snyggt som det är funktionellt. Perfekt för dig som vill bo som en stjärna, men utan att behöva oroa dig för paparazzi (här är det bara du, staden och takterrassen).
<br><br>När du kliver in i denna takvåning möts du av en öppen planlösning som gör hela lägenheten ljus och luftig. Vardagsrummet är en perfekt mix av elegans och komfort, där du kan sjunka ner i soffan med en kopp kaffe (eller ett glas vin, beroende på tiden på dagen) och beundra utsikten. De stora fönstren bjuder på panoramautsikt över Sundsvall, och om du inte redan är en solälskare kommer du definitivt bli det här.
<br><br>Köket är ett drömkök för den som gillar att laga mat, och även för den som mest gillar att titta på fina kök. Med toppmoderna vitvaror och en köksö som gör dig redo för både matlagning och mingel, kommer du känna dig som en professionell kock – även om din största prestation hittills var att koka pasta. Men här kan du definitivt förvandla varje måltid till en fest.
<br><br>Sovrummen är en oas för vila. De stora fönstren gör att du vaknar upp till en fantastisk morgonutsikt över staden, och du kommer att känna dig som kung eller drottning i din egen borg. Sovrummet har en king-size säng som får dig att känna att du är på en femstjärnig resort – och ja, det är helt okej att stanna kvar under täcket hela helgen om du vill.
<br><br>Badrummen är rena och moderna med alla bekvämligheter du kan tänka dig. Det största badrummet har både dusch och badkar, så oavsett om du vill ha en snabb uppfräschning eller en lång, avslappnande stund med ett glas bubbel, finns det utrymme för både och.
<br><br>Den största höjdpunkten? Takterrassen. Här kan du njuta av solnedgången över Sundsvall och känna dig som en äkta stadsbo. Det är den perfekta platsen för att samla vänner för en middag eller bara för att koppla av efter en lång dag. Och om du har gröna fingrar, finns det gott om plats för att skapa din egen lilla oas på taket.
<br><br>Med en central placering har du gångavstånd till både Sundsvalls liv och rörelse, men när du kommer hem till denna takvåning får du känna lugnet och avskildheten av att bo högt upp ovanför staden. Det här är ett boende för dig som inte vill kompromissa med något – vare sig det gäller stil, komfort eller utsikt.', 'Lilla Bommen 7, 411 04 Sundsvall', 'Sundsvall', 'Sverige', 4000.00, 6, 3, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ljus och mysig lägenhet nära stranden', 'Detta är en ljus och mysig lägenhet belägen nära Visbys underbara strand, perfekt för dig som vill njuta av både havets rogivande ljud och stadens charmiga atmosfär. Med sin öppna och luftiga planlösning på 50 kvadratmeter, ger lägenheten ett inbjudande intryck och låter naturligt ljus flöda in genom stora fönster som ger en fantastisk utsikt över den omgivande naturen. Här får du både närheten till stranden och bekvämligheten av Visbys mysiga centrum.
<br><br>Inredningen är både stilren och hemtrevlig, och här finns en härlig atmosfär att trivas i. I det öppna vardagsrummet finns en bekväm soffa där du kan slappna av efter en dag vid havet. Köket är fullt utrustat för att laga både snabba måltider och middagar att njuta av vid matbordet, där du kan blicka ut mot den lummiga trädgården.
<br><br>Sovrummet erbjuder en rofylld plats att sova ut på, med en stor dubbelsäng och mycket förvaring. Fönstren mot trädgården ger en fin utsikt och skapar en lugn atmosfär. Badrummet är stilrent och fräscht med dusch, tvättställ och toalett, perfekt för att fräscha upp sig efter en dag i solen.
<br><br>Från lägenheten har du enkel tillgång till en mysig uteplats där du kan njuta av frukosten eller en solig kväll. En kort promenad tar dig till stranden, där du kan ta ett uppfriskande dopp eller bara njuta av den vackra kustlinjen. Visbys historiska stadskärna ligger också inom gångavstånd, där du hittar både pittoreska gator och livliga caféer och butiker.
<br><br>Denna lägenhet är en perfekt bas för dig som vill kombinera avkoppling vid havet med närheten till Visbys fantastiska utbud av sevärdheter och aktiviteter. Oavsett om du söker en kort weekendresa eller en längre vistelse, erbjuder den både komfort och bekvämlighet i en underbar miljö.', 'Beach Road 12', 'Visby', 'Sverige', 1500.00, 4, 2, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Mysig lägenhet i Stockholm', 'Välkommen till denna mysiga lägenhet i hjärtat av Stockholm, där du får det bästa av både stadens liv och en lugn och hemtrevlig atmosfär. Belägen i ett populärt område, är denna charmiga bostad på 45 kvadratmeter perfekt för dig som söker ett bekvämt boende nära allt som Stockholm har att erbjuda. Här är du bara några minuter från kaféer, restauranger, shopping och kulturupplevelser.
<br><br>Lägenheten har en öppen planlösning som skapar en härlig rymd och en välkomnande känsla. Vardagsrummet är inrett med en mjuk soffa och ett mysigt matbord, perfekt för både avkoppling och middagar. De stora fönstren ger ett fint ljusinsläpp och utsikten mot den lugna gatan utanför bidrar till en känsla av stillhet mitt i staden.
<br><br>Köket är fullt utrustat med alla nödvändiga apparater för att laga både vardagsmåltider och festmåltider. Här kan du laga dina favoriträtter och njuta av en kopp kaffe vid fönstret på morgonen. Sovrummet är en riktig oas, med en stor dubbelsäng och gott om förvaring för kläder och andra tillhörigheter.
<br><br>Badrummet är fräscht och funktionellt med dusch, tvättställ och toalett, perfekt för att starta eller avsluta dagen. Lägenheten erbjuder en avslappnad och trivsam atmosfär som gör att du känner dig som hemma från första stund.
<br><br>Med en perfekt balans mellan närhet till Stockholms mest populära områden och ett lugnt boende, är denna lägenhet idealisk för både kortare och längre vistelser. Här bor du bekvämt, samtidigt som du har allt du kan tänkas behöva inom räckhåll.', 'Sveavägen 50', 'Stockholm', 'Sverige', 1800.00, 4, 2, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Stilren lägenhet i Uppsala centrum', 'Denna stilrena lägenhet ligger centralt i Uppsala, ett stenkast från stadens mest populära gator, caféer och butiker. Med en modern och genomtänkt inredning erbjuder lägenheten på 55 kvadratmeter både funktionalitet och elegans. Här får du ett smakfullt boende i en av Uppsala mest eftertraktade områden, med nära till både historia och stadsnöjen.
<br><br>Lägenheten har en öppen planlösning som ger en känsla av rymd, där vardagsrummet och köket smidigt flyter ihop. Stora fönster släpper in rikligt med dagsljus och skapar en ljus och luftig atmosfär. Vardagsrummet har en bekväm soffa och en smart designad tv-hörna, perfekt för avkoppling. Köket är modernt och fullt utrustat, med stilrena ytor och alla nödvändiga apparater för att laga både enklare måltider och festmåltider.
<br><br>Sovrummet är rofyllt och elegant inrett med en stor dubbelsäng, samt förvaringslösningar som gör det lätt att hålla ordning. Här kan du njuta av en god natts sömn och vakna upp till utsikten mot den charmiga stadsmiljön. Badrummet är nyrenoverat och har dusch, tvättställ och toalett i minimalistisk design – perfekt för en fräsch start på dagen.
<br><br>Från lägenheten har du gångavstånd till både Uppsala slott, Botaniska trädgården och alla stadens kulturliv. Här bor du med bästa möjliga läge för att uppleva stadens puls, samtidigt som du har en lugn och privat plats att komma hem till.
<br><br>Med sin moderna inredning och centrala placering är denna lägenhet perfekt för dig som vill bo stilrent i hjärtat av Uppsala, oavsett om du stannar en kortare period eller letar efter ett längre boende.', 'Lilla Torg 10', 'Uppsala', 'Sverige', 1500.00, 4, 2, 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lägenhet med fantastisk utsikt i Malmö', 'Välkommen till denna lägenhet med en utsikt över Malmö som kommer att göra varje morgon till en njutning. Belägen på en hög våning, erbjuder denna lägenhet inte bara ett fantastiskt boende utan också en panoramautsikt över stadens silhuett, Öresundsbron och bortom det, havet. Här kan du vakna upp till en vy som får dig att känna att du bor på toppen av världen – och det bästa är att du slipper vara rädd för höjder!
<br><br>Lägenheten på 70 kvadratmeter är perfekt för både avkoppling och underhållning. Vardagsrummet har stora fönster som släpper in massor av ljus, och den öppna planlösningen gör att rummet känns luftigt och välkomnande. Här kan du luta dig tillbaka i soffan och beundra den vackra utsikten, eller varför inte bjuda in vänner på en middag och låta staden vara en levande bakgrund till kvällen?
<br><br>Köket är modernt och stilrent, utrustat med högkvalitativa vitvaror och en köksö som ger extra arbetsyta. Det är både funktionellt och snyggt – perfekt för dig som gillar att laga mat och samtidigt kunna hålla ett öga på den fantastiska utsikten när du står vid spisen.
<br><br>Sovrummet är en rofylld oas, där den stora sängen gör att du sover gott, även om du skulle vara en nattskrämd. Fönstren ger också här en fantastisk utsikt över staden, så du kan vakna upp till solens första strålar och en vy som får dig att känna dig på topp varje dag. Det finns också gott om förvaring i sovrummet, så du kan hålla ordning på dina saker medan du njuter av att bo i en lägenhet som verkligen lever upp till förväntningarna.
<br><br>Badrummet är modernt och funktionellt med dusch, tvättställ och toalett. Här finns allt du behöver för att fräscha upp dig efter en lång dag, och det är enkelt att hålla det snyggt och rent med den stilrena inredningen.
<br><br>Lägenheten har också en härlig balkong, där du kan njuta av din morgonkaffe eller ett glas vin på kvällen medan du blickar ut över staden. Tänk dig att sitta där på sommaren, med Malmö som din lekplats nedanför, och känna att livet inte kan bli mycket bättre än så här.
<br><br>Med läget i hjärtat av Malmö har du nära till allt du kan tänkas behöva – från shopping och restauranger till kultur och nöjen. Och när du kommer hem till denna oas, har du både den bästa utsikten och ett hem som känns som en privat fristad i en av Sveriges mest livfulla städer.', 'Västra Varvsgatan 12, 211 11 Malmö', 'Malmö', 'Sverige', 2500.00, 4, 2, 2, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Vacker villa på Österlen', 'Välkommen till denna vackra villa på Österlen i Simrishamn, en plats där stil möter naturens rogivande skönhet. Denna exklusiva bostad är perfekt för dig som drömmer om att bo på en plats full av charm, med närhet till både havet och den idylliska landsbygden. Med sina 200 kvadratmeter erbjuder villan en enastående kombination av traditionell Österlen-känsla och modern elegans.
<br><br>Vid första anblicken fångas du av villans stiliga fasad och den vackra trädgården som omger hela fastigheten. Oavsett om du är en trädgårdsentusiast eller bara gillar att njuta av den friska luften, kommer du att uppskatta de välskötta grönområdena och den rofyllda omgivningen. Trädgården erbjuder även en härlig uteplats där du kan koppla av med en bok eller bjuda in vänner och familj för en grillkväll i solnedgången.
<br><br>Inuti möts du av en öppen och ljus planlösning, där stora fönster släpper in det naturliga ljuset och skapar en inbjudande atmosfär. Vardagsrummet har en mysig och stilren inredning med plats för både avkoppling och sociala stunder. Den öppna spisen ger en extra charm till rummet och skapar en varm och hemtrevlig känsla, perfekt för kyliga kvällar.
<br><br>Köket är ett riktigt drömrum för den matlagningsintresserade, med moderna faciliteter och en design som får dig att känna dig som en mästerkock. Här kan du laga allt från enkla måltider till festliga middagar, och den öppna planlösningen gör att du kan underhålla gäster medan du tillagar maten.
<br><br>Villan har fyra rymliga sovrum, alla med vacker utsikt över den omgivande naturen. Huvudsovrummet har en stor dubbelsäng och en walk-in closet som gör det enkelt att hålla ordning på kläder och tillbehör. Sovrummen är alla smakfullt inredda med naturliga material och färger som ger en lugn och harmonisk känsla, perfekt för en god natts sömn.
<br><br>Badrummen är moderna och funktionella, och det största har både dusch och badkar – en perfekt plats för avkoppling efter en dag vid havet eller i trädgården. Villan är dessutom utrustad med ett praktiskt tvättstuga och flera förvaringsutrymmen, vilket gör att du har gott om plats för allt.
<br><br>Som om inte detta vore nog, har du bara ett par minuters bilfärd till Simrishamns pittoreska centrum och den härliga Österlen-kusten, där du kan njuta av både sandstränder och den unika naturen. Denna villa erbjuder en sällsynt möjlighet att bo i en lugn och naturskön miljö, samtidigt som du har alla bekvämligheter och nöjen nära till hands.
<br><br>Denna villa är perfekt för den som söker ett vackert hem i hjärtat av Österlen, där både stil, komfort och naturen går hand i hand. Kom och upplev charmen i denna fantastiska bostad – vi är säkra på att du kommer att känna dig som hemma från första stund.', 'Kullavägen 2', 'Simrishamn', 'Sverige', 4500.00, 6, 4, 3, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Familjevänligt hus med pool', 'Ett fantastiskt familjevänligt hus med pool i Linköping – den perfekta platsen för att skapa minnen med familj och vänner. Denna rymliga bostad på 180 kvadratmeter är designad för att ge både komfort och funktion, med en stor trädgård, en uppvärmd pool och alla bekvämligheter för att göra livet både enklare och roligare. Oavsett om du vill ha en lugn helg med familjen eller en festlig sommar med vännerna, kommer detta hus att vara en plats du längtar till.
<br><br>Vid ankomst möts du av en vacker och välskött trädgård, perfekt för lek och avkoppling. Den stora uppvärmda poolen är utan tvekan husets hjärta och ger en härlig plats för både vuxna och barn att svalka sig under sommarmånaderna. Med tillräckligt med utrymme runt omkring finns det gott om plats för solstolar, lek, eller bara för att njuta av solen och den friska luften.
<br><br>Inuti huset får du en öppen och ljus planlösning som är både funktionell och stilren. Vardagsrummet är rymligt och inbjudande med stora fönster som släpper in rikligt med dagsljus, och det är här ni kommer att samlas för att titta på film, spela spel eller bara njuta av en kopp kaffe tillsammans. För extra mysfaktor finns en öppen spis som skapar en varm och hemtrevlig känsla under kallare dagar.
<br><br>Köket är modernt och fullt utrustat, perfekt för familjer som älskar att laga mat tillsammans. Här finns gott om arbetsyta, och den öppna designen gör att du kan vara en del av samtalen i vardagsrummet medan du förbereder dagens måltider. Den stora matplatsen rymmer hela familjen och fler, vilket gör det lätt att bjuda in släkt och vänner för middagar eller fester.
<br><br>Huset har fyra rymliga sovrum, varav ett är ett mysigt master bedroom med eget badrum. Alla sovrum är smakfullt inredda och erbjuder gott om förvaring för kläder och andra tillhörigheter. För familjer är det praktiskt med flera sovrum där barnen kan ha sina egna utrymmen, men ändå vara nära för att kunna leka tillsammans.
<br><br>Badrummen är moderna och funktionella, och det största har både dusch och badkar – perfekt för både snabb uppfräschning och lång, avslappnande bad. Det finns även en tvättstuga som gör vardagen ännu enklare, med gott om plats för tvätt och förvaring av familjens kläder.
<br><br>En av höjdpunkterna med detta hus är den stora uteplatsen och trädgården, som erbjuder både lekytor för barnen och avkopplande ytor för de vuxna. Tänk dig sommarfester på terrassen, grillkvällar med vänner, eller att bara njuta av en bok i trädgården under en solig eftermiddag.
<br><br>Huset ligger i ett lugnt och tryggt område i Linköping, men samtidigt har du närhet till både skolor, affärer, parker och kollektivtrafik. Det är ett perfekt läge för familjer som vill ha en balans mellan lugn och närhet till stadens alla bekvämligheter.
<br><br>Detta hus är verkligen en dröm för den stora familjen eller för den som söker ett bekvämt och funktionellt hem med möjligheter till avkoppling och aktivitet. Kom och upplev detta underbara boende, och upptäck varför detta hus kan bli ditt hem!', 'Villa Road 3', 'Linköping', 'Sverige', 3500.00, 6, 4, 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Charmig stuga på landet', 'Denna charmiga stuga på landet i Halmstad är för dig som drömmer om att bo mitt i naturen, men ändå ha nära till stadens alla bekvämligheter (och wi-fi, såklart). Med sina 60 kvadratmeter får du både den lantliga idyllen och tillräckligt med plats för att kunna öppna fönstret och lyssna på fågelsången – eller bara njuta av den tysta, oavbrutna friden.
<br><br>Stugan är som en blandning av en mysig bondgård och en Pinterest-inspirerad dröm. Vardagsrummet har en bekväm soffa för alla dina maraton av Netflix och te-drickande (eller varför inte båda samtidigt?). De stora fönstren ger dig fri utsikt över den omgivande grönskan, så om du vill ta en paus från att vara en inomhusmänniska, är det bara att öppna dörren och gå ut i trädgården där det är fritt fram att odla både morötter och drömmar.
<br><br>Köket är så charmigt att du nästan vill laga mat varje dag (eller åtminstone försöka). Här finns allt du behöver för att skapa kulinariska mästerverk, om inte annat kan du alltid slå upp en kokbok och låtsas vara en mästerkock. Det finns också ett matbord där du kan samla vänner för härliga middagar, eller för att smyga in ett glas vin och njuta av stillheten när ingen ser på.
<br><br>Sovrummet, å andra sidan, erbjuder en dubbelsäng så bekväm att du kommer vilja sova hela helgen bort – och det är helt okej. Här kan du vakna till ljudet av den egna trädgården, och kanske se några rådjur skymta förbi (eller om du är riktigt lycklig, en igelkott på en promenad). Badrummet är enkelt men funktionellt, med dusch och toalett som gör jobbet och ser till att du är fräsch nog att ge dig ut i naturen igen – eller bara hålla dig gömd under en filt.
<br><br>Med bara en kort bilresa till Halmstad, som bjuder på både härliga stränder, shopping och restauranger, har du alla fördelar av att bo på landet, samtidigt som du inte behöver vara alltför långt bort från stadens liv och rörelse. Här på landet slipper du både trafik och stress, men vi kan inte lova att du slipper alla grannars hundar, som kanske vill hälsa på.
<br><br>Så om du vill bo i en charmig stuga med mycket personlighet och en extra dos natur, då är denna plats precis vad du söker. Kom och känn lugnet, och kanske, bara kanske, blir du en lantlivsentusiast på riktigt!', 'Landvägen 3', 'Halmstad', 'Sverige', 1400.00, 4, 2, 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
('Modern lägenhet i centrala Uppsala', 'Välkommen till denna moderna lägenhet i hjärtat av Uppsala, där stil och funktion smälter samman för att skapa ett bekvämt och praktiskt boende. Belägen bara ett stenkast från stadens liv och rörelse, erbjuder denna lägenhet både det bästa av stadslivet och en avkopplande atmosfär att komma hem till. Med sina 55 kvadratmeter är det här ett perfekt alternativ för den som vill bo centralt men utan att ge avkall på komforten.
<br><br>När du kliver in i lägenheten möts du av en öppen planlösning som gör hela bostaden ljus och luftig. Vardagsrummet har stora fönster som släpper in massor av naturligt ljus, och den moderna inredningen skapar en känsla av enkel elegans. Här kan du koppla av efter en lång dag, eller kanske ta emot vänner för en middag i den rymliga matplatsen – allt medan du njuter av den stämningsfulla atmosfären.
<br><br>Köket är både funktionellt och stilrent med högkvalitativa vitvaror och gott om förvaringsutrymme. Den öppna planlösningen gör att du kan vara en del av sällskapet i vardagsrummet samtidigt som du lagar mat, vilket gör det här till en idealisk lägenhet för den som älskar att både laga och underhålla.
<br><br>Sovrummet är rymligt och smakfullt inrett, med en stor dubbelsäng som ger en plats för avkoppling efter en hektisk dag. Fönstren ger dig en fin utsikt över staden, och den moderna designen med minimalistiska detaljer ger en rogivande känsla, vilket gör det till en perfekt plats att hämta energi och vila ut.
<br><br>Badrummet är också toppmodernt, utrustat med dusch, tvättställ och toalett. Här finns även tvättmaskin och torktumlare, vilket gör att du enkelt kan hålla ordning på tvätten utan att behöva lämna lägenheten.
<br><br>Läget kan inte bli bättre – här bor du precis där allt händer. Med gångavstånd till både Uppsala slott, Botaniska trädgården och stadens alla kaféer, butiker och restauranger har du verkligen det bästa av både stadens puls och lugnet. Uppsala universitet och kollektivtrafikförbindelser finns också bara ett stenkast bort, vilket gör det här till ett perfekt boende för både studenter, unga professionella och alla som söker bekvämlighet och läge.
<br><br>Sammanfattningsvis är denna lägenhet en fantastisk möjlighet för den som vill bo i ett modernt och funktionellt hem i centrala Uppsala. Här får du både stil och komfort, och framför allt ett läge som gör det enkelt att ta del av allt vad staden har att erbjuda.', 'Studentgatan 7', 'Uppsala', 'Sverige', 1700.00, 4, 2, 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
('Traditionell fjällstuga i Åre', 'Välkommen till denna traditionella fjällstuga i Åre, där charm möter komfort och naturen bjuder på en oslagbar upplevelse. Belägen mitt i det svenska fjällandskapet, erbjuder denna stuga ett unikt tillfälle att bo på en plats som kombinerar det bästa av både vinteräventyr och avkoppling i en rustik och hemtrevlig miljö. Denna 80 kvadratmeter stora stuga ger dig alla de bekvämligheter du kan önska, samtidigt som den behåller den genuina fjällkänslan.
<br><br>När du stiger in i stugan slås du av den varma och inbjudande atmosfären. Med sina träväggar och den öppna spisen som står i centrum, känns det som att vara i en riktig fjälloas. Vardagsrummet är både mysigt och funktionellt, med plats för att samlas med vänner och familj efter en lång dag på backarna eller vandringsstigarna. Här kan du koppla av med en kopp varm choklad, eller kanske tända en brasa och njuta av lugnet.
<br><br>Köket, som är både rustikt och modernt, ger dig möjlighet att laga både enkla måltider och festliga middagar. Med alla bekvämligheter du behöver, från spis till kylskåp, kommer du känna dig som hemma, även om du bara är på fjällsemester. Det finns gott om arbetsyta för att förbereda dina favoriträtter, och en stor matplats för att njuta av dem tillsammans.
<br><br>Stugan har tre mysiga sovrum, alla med den där speciella fjällstugukänslan – träinredning, varma färger och en plats att sova gott efter en lång dag av aktivitet. Sovrummen är utrustade med bekväma sängar, och de stora fönstren ger dig möjlighet att vakna upp till utsikten av de majestätiska fjällen och de omgivande skogarna.
<br><br>Badrummet är funktionellt med dusch, toalett och handfat – allt du behöver för att fräscha upp dig efter en dag ute i kylan. Det finns också ett praktiskt förråd för skidutrustning och andra utomhusprylar, så du slipper trängas med vinterkläder i vardagsrummet.
<br><br>För den som älskar friluftsliv är denna fjällstuga den perfekta basen. Åre erbjuder både vinteraktiviteter som skidåkning och snowboardåkning på några av Sveriges bästa backar, och sommartid finns det oändliga möjligheter för vandring, mountainbike och fiske. Oavsett årstid får du tillgång till naturen precis utanför dörren, vilket gör det här till ett drömboende för alla naturälskare.
<br><br>Med endast en kort bilresa till Åres centrum är du också nära till butiker, restauranger och andra bekvämligheter, samtidigt som du får njuta av lugnet och avskildheten som fjällstugan erbjuder. Här kan du verkligen få känslan av att vara bortom all stress och vardag – och bara njuta av det enkla livet på fjället.
<br><br>Sammanfattningsvis är denna traditionella fjällstuga en perfekt plats för dig som vill uppleva det bästa av Åre. Här får du både äventyret och lugnet, i en miljö som bjuder på både naturens skönhet och ett hemtrevligt boende. Välkommen till din egna fjällidyll!', 'Fjällvägen 22', 'Åre', 'Sverige', 3200.00, 6, 3, 2, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


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

-- reviews 
INSERT INTO reviews (user_id, listing_id, rating, comment, created_at) VALUES
(1, 1, 4, 'Mysig studio i centrala Göteborg. Perfekt för en helgresa, men lite trång.', CURRENT_TIMESTAMP),  -- Review for listing 1 (Mysig studio i Göteborg)
(2, 2, 5, 'Fantastisk 2-rumslägenhet vid havet! Utsikten är otrolig och lägenheten är mycket modern.', CURRENT_TIMESTAMP),  -- Review for listing 2 (Lyxig 2-rumslägenhet)
(3, 3, 3, 'Charmig stuga men något sliten inuti. Bra för en avkopplande helg.', CURRENT_TIMESTAMP),  -- Review for listing 3 (Charmig stuga)
(4, 4, 5, 'Mycket elegant loft. Centralt läge och mycket rymligt.', CURRENT_TIMESTAMP),  -- Review for listing 4 (Modern loft)
(5, 5, 4, 'Stilig studio med ett bra läge i Göteborg. Perfekt för ett kortare besök.', CURRENT_TIMESTAMP),  -- Review for listing 5 (Stilig studio)
(6, 6, 5, 'Vacker trädgårdslägenhet med perfekt läge nära allt. Rekommenderar starkt.', CURRENT_TIMESTAMP),  -- Review for listing 6 (Trädgårdslägenhet)
(7, 7, 3, 'Stugan var fin men ganska långt bort från staden. Värt det om du söker en avlägsen plats.', CURRENT_TIMESTAMP),  -- Review for listing 7 (Rustik stuga)
(8, 8, 5, 'Utsikten från takvåningen är fantastisk, mycket rymlig och modern.', CURRENT_TIMESTAMP),  -- Review for listing 8 (Takvåning)
(9, 9, 4, 'Enkel men fin lägenhet nära stranden. Jag rekommenderar den för en avkopplande helg.', CURRENT_TIMESTAMP),  -- Review for listing 9 (Lägenhet nära stranden)
(10, 10, 2, 'Huset är stort men jag blev besviken på att det inte var så väl underhållet.', CURRENT_TIMESTAMP),  -- Review for listing 10 (Förortshus)
(11, 11, 4, 'Lägenheten var charmig och hade mycket karaktär. Låg i ett trevligt område.', CURRENT_TIMESTAMP),  -- Review for listing 11 (Lägenhet i historiskt område)
(12, 12, 3, 'Bra lägenhet men den var ganska liten och inte så bra utrustad.', CURRENT_TIMESTAMP),  -- Review for listing 12 (1-rumslägenhet)
(13, 13, 5, 'Fantastisk villa, stor och väl utrustad. Perfekt för en familjesemester.', CURRENT_TIMESTAMP),  -- Review for listing 13 (Familjevilla med pool)
(14, 14, 4, 'Loftet är modernt och fint, men området kan vara lite livligt på kvällarna.', CURRENT_TIMESTAMP),  -- Review for listing 14 (Loft i trendigt område)
(15, 15, 5, 'En mycket modern lägenhet med bra faciliteter. Vi hade en fantastisk vistelse.', CURRENT_TIMESTAMP),  -- Review for listing 15 (Modern lägenhet i Uppsala)
(16, 16, 4, 'Fjällstugan var fantastisk. Stort och bekvämt, men saknade lite moderna faciliteter.', CURRENT_TIMESTAMP);  -- Review for listing 16 (Fjällstuga i Åre)

-- categories data
INSERT OR REPLACE INTO categories (id, name, description, icon) VALUES
(1, 'Stugor', 'Traditionella stugor i naturnära miljöer, perfekta för avkoppling.', 'cabin.webp'),
(2, 'Lägenheter', 'Moderna lägenheter i stad och landsbygd, ofta med bekväma faciliteter.', 'design.webp'),
(3, 'Villor', 'Rymliga villor för större grupper eller familjer, ofta med trädgård.', 'big-mansion.webp'),
(4, 'Vid stranden', 'Boenden nära havet eller sjöar med fantastisk utsikt och tillgång till strand.', 'beach.webp'),
(5, 'Stadsliv', 'Boenden mitt i stadens hjärta med närhet till restauranger och kultur.', 'city.webp'),
(6, 'Fjällstugor', 'Bo nära naturen i fjällmiljö, perfekt för skidåkning eller vandring.', 'pist.webp'),
(7, 'Familjevänligt', 'Anpassade för barnfamiljer med gott om plats och bekvämligheter.', 'room.webp'),
(8, 'Wow!', 'Unika eller lyxiga boenden som sticker ut – trädkojor, slott eller designerhus.', 'wow.webp'),
(9, 'Tiny Homes', 'Små men smart planerade bostäder med charm och funktion i fokus.', 'tiny.webp'),
(10, 'Jordnära', 'Boenden i grottor, jordhus eller liknande naturnära arkitektur.', 'earth.webp'),
(11, 'Lantligt', 'Charmiga hus och gårdar på landsbygden – lugn och ro garanterad.', 'farm.webp'),
(12, 'Historiskt', 'Boenden med historisk betydelse – slott, herresäten eller gamla kyrkor.', 'castle.webp'),
(13, 'Lyx', 'Exklusiva och påkostade boenden med premiumbekvämligheter.', 'luxury.webp'),
(14, 'Nationalparker', 'Boenden nära eller i nationalparker, perfekt för naturälskare.', 'national-park.webp'),
(15, 'Sjöar', 'Bo nära vattnet med möjlighet till bad, paddling och avkoppling.', 'lake.webp'),
(16, 'Arbetsvänligt', 'Boenden med skrivbord och snabb Wi-Fi – perfekt för distansarbete.', 'work.webp'),
(17, 'Öken', 'Unika vistelser i ökenmiljöer med magiska solnedgångar.', 'islands.webp'),
(18, 'Skidåkning', 'Boenden med direkt tillgång till backarna eller nära liftsystem.', 'skiing.webp'),
(19, 'Surf', 'Bo nära havet med närhet till bra surfställen och strandkultur.', 'surf.webp'),
(20, 'Camping', 'Tält, yurts och glamping – upplev naturen på ditt sätt.', 'camping.webp');

-- listing_images data

INSERT INTO listing_images (id, listing_id, image_url) VALUES
  -- Listing 1
  (1, 1, 'https://images.unsplash.com/photo-1560185127-6c9f1d8d3c4e'),
  (2, 1, 'https://images.unsplash.com/photo-1572120360610-d971b9b63903'),
  (3, 1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),
  (4, 1, 'https://images.unsplash.com/photo-1599423300746-b62533397364'),
  (5, 1, 'https://images.unsplash.com/photo-1600585154204-3b3b7b3b3b3b'),

  -- Listing 2
  (6, 2, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'),
  (7, 2, 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'),
  (8, 2, 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg'),
  (9, 2, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg'),
  (10, 2, 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'),

  -- Listing 3
  (11, 3, 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1867187_1280.jpg'),
  (12, 3, 'https://cdn.pixabay.com/photo/2016/11/29/04/17/architecture-1867187_1280.jpg'),
  (13, 3, 'https://cdn.pixabay.com/photo/2017/01/18/17/14/house-1993640_1280.jpg'),
  (14, 3, 'https://cdn.pixabay.com/photo/2017/01/18/17/14/house-1993640_1280.jpg'),
  (15, 3, 'https://cdn.pixabay.com/photo/2017/01/18/17/14/house-1993640_1280.jpg'),

  -- Listing 4
  (16, 4, 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae'),
  (17, 4, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
  (18, 4, 'https://images.unsplash.com/photo-1572120360610-d971b9b63903'),
  (19, 4, 'https://images.unsplash.com/photo-1599423300746-b62533397364'),
  (20, 4, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c');

-- Listing 5
INSERT INTO listing_images (id, listing_id, image_url) VALUES
(21, 5, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'),
(22, 5, 'https://images.unsplash.com/photo-1572120360610-17930d10549b'),
(23, 5, 'https://images.unsplash.com/photo-1600585154171-7283ddedc1bc'),
(24, 5, 'https://images.unsplash.com/photo-1595526114035-0d15a7da6a5e'),
(25, 5, 'https://images.unsplash.com/photo-1600047501427-0d84f3f7ecca'),

-- Listing 6
(26, 6, 'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg'),
(27, 6, 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'),
(28, 6, 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'),
(29, 6, 'https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg'),
(30, 6, 'https://images.pexels.com/photos/259597/pexels-photo-259597.jpeg'),

-- Listing 7
(31, 7, 'https://cdn.pixabay.com/photo/2018/05/23/22/56/home-3429674_1280.jpg'),
(32, 7, 'https://cdn.pixabay.com/photo/2017/03/28/12/10/home-2187177_1280.jpg'),
(33, 7, 'https://cdn.pixabay.com/photo/2016/11/29/05/08/architecture-1867188_1280.jpg'),
(34, 7, 'https://cdn.pixabay.com/photo/2016/11/29/12/54/architecture-1867190_1280.jpg'),
(35, 7, 'https://cdn.pixabay.com/photo/2018/09/07/20/19/home-3663222_1280.jpg'),

-- Listing 8
(36, 8, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'),
(37, 8, 'https://images.unsplash.com/photo-1616486233029-651a6a143e3f'),
(38, 8, 'https://images.unsplash.com/photo-1620419731729-f9be2a6677b4'),
(39, 8, 'https://images.unsplash.com/photo-1613545325263-f7b38e7a21de'),
(40, 8, 'https://images.unsplash.com/photo-1613977257363-b3c0d5c4d1f6'),

-- Listing 9
(41, 9, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'),
(42, 9, 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'),
(43, 9, 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg'),
(44, 9, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'),
(45, 9, 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg'),

-- Listing 10
(46, 10, 'https://cdn.pixabay.com/photo/2016/12/30/10/07/home-1940172_1280.jpg'),
(47, 10, 'https://cdn.pixabay.com/photo/2017/07/12/10/29/home-2499236_1280.jpg'),
(48, 10, 'https://cdn.pixabay.com/photo/2020/01/15/08/46/house-4768264_1280.jpg'),
(49, 10, 'https://cdn.pixabay.com/photo/2016/11/29/09/42/architecture-1867186_1280.jpg'),
(50, 10, 'https://cdn.pixabay.com/photo/2020/01/03/06/54/villa-4738629_1280.jpg'),

-- Listing 11
(51, 11, 'https://images.unsplash.com/photo-1600585154204-3b3b7b3b3b3b'),
(52, 11, 'https://images.unsplash.com/photo-1600047501427-0d84f3f7ecca'),
(53, 11, 'https://images.unsplash.com/photo-1599423300746-b62533397364'),
(54, 11, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),
(55, 11, 'https://images.unsplash.com/photo-1572120360610-d971b9b63903'),

-- Listing 12
(56, 12, 'https://images.pexels.com/photos/276715/pexels-photo-276715.jpeg'),
(57, 12, 'https://images.pexels.com/photos/276530/pexels-photo-276530.jpeg'),
(58, 12, 'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg'),
(59, 12, 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'),
(60, 12, 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'),

-- Listing 13
(61, 13, 'https://cdn.pixabay.com/photo/2020/01/03/06/54/villa-4738629_1280.jpg'),
(62, 13, 'https://cdn.pixabay.com/photo/2017/01/18/17/14/house-1993640_1280.jpg'),
(63, 13, 'https://cdn.pixabay.com/photo/2016/11/29/04/17/architecture-1867187_1280.jpg'),
(64, 13, 'https://cdn.pixabay.com/photo/2017/03/28/12/10/home-2187177_1280.jpg'),
(65, 13, 'https://cdn.pixabay.com/photo/2018/05/23/22/56/home-3429674_1280.jpg'),

-- Listing 14
(66, 14, 'https://images.unsplash.com/photo-1599423300746-b62533397364'),
(67, 14, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),
(68, 14, 'https://images.unsplash.com/photo-1600585154204-3b3b7b3b3b3b'),
(69, 14, 'https://images.unsplash.com/photo-1560185127-6c9f1d8d3c4e'),
(70, 14, 'https://images.unsplash.com/photo-1572120360610-d971b9b63903'),

-- Listing 15
(71, 15, 'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg'),
(72, 15, 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'),
(73, 15, 'https://images.pexels.com/photos/259597/pexels-photo-259597.jpeg'),
(74, 15, 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'),
(75, 15, 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'),

-- Listing 16
(76, 16, 'https://cdn.pixabay.com/photo/2016/12/30/10/07/home-1940172_1280.jpg'),
(77, 16, 'https://cdn.pixabay.com/photo/2017/07/12/10/29/home-2499236_1280.jpg'),
(78, 16, 'https://cdn.pixabay.com/photo/2020/01/15/08/46/house-4768264_1280.jpg'),
(79, 16, 'https://cdn.pixabay.com/photo/2018/09/07/20/19/home-3663222_1280.jpg'),
(80, 16, 'https://cdn.pixabay.com/photo/2018/09/07/20/19/home-3663222_1280.jpg');


INSERT INTO bedrooms (listing_id, name, single_beds, double_beds) VALUES
(1, 'Sovrum 1', 2, 0),

(2, 'Sovrum 1', 1, 0),
(2, 'Sovrum 2', 0, 1),

(3, 'Sovrum 1', 1, 1),

(4, 'Sovrum 1', 2, 0),
(4, 'Sovrum 2', 0, 1),

(5, 'Sovrum 1', 2, 1),
(5, 'Sovrum 2', 1, 0),

(6, 'Sovrum 1', 0, 1),
(6, 'Sovrum 2', 1, 1),

(7, 'Sovrum 1', 2, 0),
(7, 'Sovrum 2', 0, 1),

(8, 'Sovrum 1', 1, 1),
(8, 'Sovrum 2', 0, 1),

(9, 'Sovrum 1', 2, 0),
(9, 'Sovrum 2', 1, 1),

(10, 'Sovrum 1', 1, 1),
(10, 'Sovrum 2', 0, 1),

(11, 'Sovrum 1', 2, 0),
(11, 'Sovrum 2', 0, 1),
(11, 'Sovrum 3', 1, 1),

(12, 'Sovrum 1', 1, 1),
(12, 'Sovrum 2', 2, 0),

(13, 'Sovrum 1', 1, 1),
(13, 'Sovrum 2', 2, 0),
(13, 'Sovrum 3', 0, 1),
(13, 'Sovrum 4', 1, 1),

(14, 'Sovrum 1', 0, 1),
(14, 'Sovrum 2', 2, 0),

(15, 'Sovrum 1', 1, 1),
(15, 'Sovrum 2', 1, 0),
(15, 'Sovrum 3', 0, 1),

(16, 'Sovrum 1', 1, 1),
(16, 'Sovrum 2', 2, 0),
(16, 'Sovrum 3', 0, 1),
(16, 'Sovrum 4', 1, 1);

-- UPDATE bookings status
-- First, drop the existing constraint
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

-- Then add the new constraint with Swedish values
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
CHECK (status IN ('Väntar på bekräftelse', 'Bekräftad', 'Avbruten'));

-- Update existing records to use Swedish values
UPDATE bookings SET status = 'Väntar på bekräftelse' WHERE status = 'pending';
UPDATE bookings SET status = 'Bekräftad' WHERE status = 'confirmed';
UPDATE bookings SET status = 'Avbruten' WHERE status = 'cancelled'; 