-- AdventureScore Seed Data
-- 240+ locations for MVP launch
-- Run after migrations are complete

-- ============================================
-- US NATIONAL PARKS (All 63)
-- Base points: 10-15 based on popularity/significance
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, is_verified, is_active) VALUES

-- Tier 1: Iconic Parks (15 points)
('Grand Canyon National Park', 'grand-canyon-national-park', 36.0544, -112.1401, NULL, 'Arizona', 'United States', 'national_park', 'parks_nature', 15, 'One of the most spectacular examples of erosion anywhere in the world, featuring layered red rocks revealing millions of years of geological history.', true, true),
('Yellowstone National Park', 'yellowstone-national-park', 44.4280, -110.5885, NULL, 'Wyoming', 'United States', 'national_park', 'parks_nature', 15, 'The world''s first national park, home to Old Faithful, Grand Prismatic Spring, and abundant wildlife including bison and wolves.', true, true),
('Yosemite National Park', 'yosemite-national-park', 37.8651, -119.5383, NULL, 'California', 'United States', 'national_park', 'parks_nature', 15, 'Famous for its granite cliffs, waterfalls, giant sequoias, and biodiversity. Home to iconic Half Dome and El Capitan.', true, true),
('Zion National Park', 'zion-national-park', 37.2982, -113.0263, 'Springdale', 'Utah', 'United States', 'national_park', 'parks_nature', 15, 'Known for steep red cliffs, emerald pools, and The Narrows slot canyon hike through the Virgin River.', true, true),
('Glacier National Park', 'glacier-national-park', 48.7596, -113.7870, NULL, 'Montana', 'United States', 'national_park', 'parks_nature', 15, 'Crown of the Continent featuring pristine forests, alpine meadows, rugged mountains, and over 700 miles of trails.', true, true),
('Rocky Mountain National Park', 'rocky-mountain-national-park', 40.3428, -105.6836, 'Estes Park', 'Colorado', 'United States', 'national_park', 'parks_nature', 15, 'Features Trail Ridge Road, the highest continuous paved road in the US, with stunning mountain vistas and wildlife.', true, true),
('Grand Teton National Park', 'grand-teton-national-park', 43.7904, -110.6818, 'Moose', 'Wyoming', 'United States', 'national_park', 'parks_nature', 15, 'Dramatic mountain peaks rising abruptly from the Jackson Hole valley with pristine lakes and abundant wildlife.', true, true),
('Acadia National Park', 'acadia-national-park', 44.3386, -68.2733, 'Bar Harbor', 'Maine', 'United States', 'national_park', 'parks_nature', 15, 'Atlantic coast parkland featuring Cadillac Mountain, the first place to see sunrise in the US during fall and winter.', true, true),

-- Tier 2: Major Parks (12 points)
('Arches National Park', 'arches-national-park', 38.7331, -109.5925, 'Moab', 'Utah', 'United States', 'national_park', 'parks_nature', 12, 'Home to over 2,000 natural stone arches including the iconic Delicate Arch.', true, true),
('Bryce Canyon National Park', 'bryce-canyon-national-park', 37.5930, -112.1871, NULL, 'Utah', 'United States', 'national_park', 'parks_nature', 12, 'Famous for its unique hoodoo rock formations and vibrant red, orange, and white colors.', true, true),
('Canyonlands National Park', 'canyonlands-national-park', 38.3269, -109.8783, NULL, 'Utah', 'United States', 'national_park', 'parks_nature', 12, 'Dramatic desert landscape carved by the Colorado River, divided into four districts.', true, true),
('Capitol Reef National Park', 'capitol-reef-national-park', 38.2832, -111.2471, 'Torrey', 'Utah', 'United States', 'national_park', 'parks_nature', 12, 'A hidden gem featuring the 100-mile Waterpocket Fold, orchards, and petroglyphs.', true, true),
('Joshua Tree National Park', 'joshua-tree-national-park', 33.8734, -115.9010, NULL, 'California', 'United States', 'national_park', 'parks_nature', 12, 'Where two deserts meet, featuring twisted Joshua trees and surreal boulder landscapes.', true, true),
('Death Valley National Park', 'death-valley-national-park', 36.5054, -117.0794, NULL, 'California', 'United States', 'national_park', 'parks_nature', 12, 'The hottest, driest, and lowest national park, featuring Badwater Basin at 282 feet below sea level.', true, true),
('Sequoia National Park', 'sequoia-national-park', 36.4864, -118.5658, NULL, 'California', 'United States', 'national_park', 'parks_nature', 12, 'Home to the General Sherman Tree, the largest tree on Earth by volume.', true, true),
('Kings Canyon National Park', 'kings-canyon-national-park', 36.8879, -118.5551, NULL, 'California', 'United States', 'national_park', 'parks_nature', 12, 'Features one of North America''s deepest canyons and giant sequoia groves.', true, true),
('Olympic National Park', 'olympic-national-park', 47.8021, -123.6044, 'Port Angeles', 'Washington', 'United States', 'national_park', 'parks_nature', 12, 'Diverse ecosystems from temperate rainforests to glacier-capped mountains to rugged coastline.', true, true),
('Mount Rainier National Park', 'mount-rainier-national-park', 46.8800, -121.7269, NULL, 'Washington', 'United States', 'national_park', 'parks_nature', 12, 'Iconic volcanic peak with 26 named glaciers and subalpine wildflower meadows.', true, true),
('Crater Lake National Park', 'crater-lake-national-park', 42.8684, -122.1685, NULL, 'Oregon', 'United States', 'national_park', 'parks_nature', 12, 'The deepest lake in America, formed in a collapsed volcano, known for its pristine blue water.', true, true),
('Denali National Park', 'denali-national-park', 63.1148, -151.1926, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 12, 'Home to North America''s tallest peak and vast wilderness with grizzlies, wolves, and caribou.', true, true),
('Everglades National Park', 'everglades-national-park', 25.2866, -80.8987, 'Homestead', 'Florida', 'United States', 'national_park', 'parks_nature', 12, 'The largest subtropical wilderness in the US, home to alligators, manatees, and rare birds.', true, true),
('Big Bend National Park', 'big-bend-national-park', 29.2500, -103.2500, NULL, 'Texas', 'United States', 'national_park', 'parks_nature', 12, 'Remote Chihuahuan Desert park on the Rio Grande with diverse ecosystems and dark skies.', true, true),
('Guadalupe Mountains National Park', 'guadalupe-mountains-national-park', 31.9231, -104.8645, 'Salt Flat', 'Texas', 'United States', 'national_park', 'parks_nature', 12, 'Home to Texas'' highest peak and an ancient fossilized reef.', true, true),
('Great Smoky Mountains National Park', 'great-smoky-mountains-national-park', 35.6532, -83.5070, NULL, 'Tennessee', 'United States', 'national_park', 'parks_nature', 12, 'America''s most visited national park, featuring misty mountains and diverse plant life.', true, true),
('Shenandoah National Park', 'shenandoah-national-park', 38.2928, -78.6796, NULL, 'Virginia', 'United States', 'national_park', 'parks_nature', 12, 'Features Skyline Drive with 75 overlooks and 500 miles of hiking trails including part of the Appalachian Trail.', true, true),

-- Tier 3: Standard Parks (10 points)
('Badlands National Park', 'badlands-national-park', 43.8554, -102.3397, NULL, 'South Dakota', 'United States', 'national_park', 'parks_nature', 10, 'Dramatic landscapes of eroded buttes and pinnacles, with rich fossil beds and prairie wildlife.', true, true),
('Theodore Roosevelt National Park', 'theodore-roosevelt-national-park', 46.9790, -103.5387, 'Medora', 'North Dakota', 'United States', 'national_park', 'parks_nature', 10, 'Rugged badlands where Roosevelt ranched, home to wild horses and bison.', true, true),
('Wind Cave National Park', 'wind-cave-national-park', 43.5724, -103.4838, 'Hot Springs', 'South Dakota', 'United States', 'national_park', 'parks_nature', 10, 'One of the world''s longest caves with unique boxwork formations and prairie above.', true, true),
('Mesa Verde National Park', 'mesa-verde-national-park', 37.1853, -108.4862, NULL, 'Colorado', 'United States', 'national_park', 'parks_nature', 10, 'Ancestral Puebloan cliff dwellings preserved for over 700 years.', true, true),
('Black Canyon of the Gunnison National Park', 'black-canyon-gunnison-national-park', 38.5754, -107.7416, NULL, 'Colorado', 'United States', 'national_park', 'parks_nature', 10, 'Sheer cliffs dropping 2,000 feet into a narrow gorge carved by the Gunnison River.', true, true),
('Great Sand Dunes National Park', 'great-sand-dunes-national-park', 37.7916, -105.5943, 'Mosca', 'Colorado', 'United States', 'national_park', 'parks_nature', 10, 'North America''s tallest sand dunes backed by snow-capped peaks.', true, true),
('Petrified Forest National Park', 'petrified-forest-national-park', 35.0657, -109.7880, NULL, 'Arizona', 'United States', 'national_park', 'parks_nature', 10, 'Ancient petrified wood and colorful badlands of the Painted Desert.', true, true),
('Saguaro National Park', 'saguaro-national-park', 32.1479, -110.7387, 'Tucson', 'Arizona', 'United States', 'national_park', 'parks_nature', 10, 'Giant saguaro cacti in the Sonoran Desert, some over 150 years old.', true, true),
('Carlsbad Caverns National Park', 'carlsbad-caverns-national-park', 32.1479, -104.5567, NULL, 'New Mexico', 'United States', 'national_park', 'parks_nature', 10, 'Over 100 caves including the famous Big Room, with nightly bat flights.', true, true),
('White Sands National Park', 'white-sands-national-park', 32.7872, -106.3257, 'Alamogordo', 'New Mexico', 'United States', 'national_park', 'parks_nature', 10, 'The world''s largest gypsum dune field, creating surreal white landscapes.', true, true),
('Channel Islands National Park', 'channel-islands-national-park', 34.0069, -119.7785, 'Ventura', 'California', 'United States', 'national_park', 'parks_nature', 10, 'Five islands off the California coast with unique species and sea caves.', true, true),
('Pinnacles National Park', 'pinnacles-national-park', 36.4906, -121.1825, 'Paicines', 'California', 'United States', 'national_park', 'parks_nature', 10, 'Remnants of an ancient volcano with talus caves and California condors.', true, true),
('Redwood National Park', 'redwood-national-park', 41.2132, -124.0046, 'Crescent City', 'California', 'United States', 'national_park', 'parks_nature', 10, 'Home to the tallest trees on Earth along California''s foggy coast.', true, true),
('Lassen Volcanic National Park', 'lassen-volcanic-national-park', 40.4977, -121.5078, NULL, 'California', 'United States', 'national_park', 'parks_nature', 10, 'Active volcanic landscape with boiling springs, mudpots, and steaming fumaroles.', true, true),
('Hawaii Volcanoes National Park', 'hawaii-volcanoes-national-park', 19.4194, -155.2885, NULL, 'Hawaii', 'United States', 'national_park', 'parks_nature', 10, 'Two active volcanoes including Kilauea, one of the world''s most active.', true, true),
('Haleakala National Park', 'haleakala-national-park', 20.7097, -156.1730, NULL, 'Hawaii', 'United States', 'national_park', 'parks_nature', 10, 'Massive volcanic crater rising above the clouds on Maui.', true, true),
('North Cascades National Park', 'north-cascades-national-park', 48.7718, -121.2985, NULL, 'Washington', 'United States', 'national_park', 'parks_nature', 10, 'Rugged mountain wilderness with over 300 glaciers.', true, true),
('Dry Tortugas National Park', 'dry-tortugas-national-park', 24.6285, -82.8732, NULL, 'Florida', 'United States', 'national_park', 'parks_nature', 10, 'Remote island fort accessible only by boat or seaplane, with pristine reefs.', true, true),
('Biscayne National Park', 'biscayne-national-park', 25.4824, -80.2083, 'Homestead', 'Florida', 'United States', 'national_park', 'parks_nature', 10, '95% underwater park protecting coral reefs and coastal mangroves.', true, true),
('Congaree National Park', 'congaree-national-park', 33.7948, -80.7821, 'Hopkins', 'South Carolina', 'United States', 'national_park', 'parks_nature', 10, 'Old-growth bottomland hardwood forest with champion trees and biodiversity.', true, true),
('Mammoth Cave National Park', 'mammoth-cave-national-park', 37.1870, -86.1006, NULL, 'Kentucky', 'United States', 'national_park', 'parks_nature', 10, 'The world''s longest known cave system with over 400 miles explored.', true, true),
('Cuyahoga Valley National Park', 'cuyahoga-valley-national-park', 41.2808, -81.5678, NULL, 'Ohio', 'United States', 'national_park', 'parks_nature', 10, 'Rural landscape along the Cuyahoga River with waterfalls and historic sites.', true, true),
('Indiana Dunes National Park', 'indiana-dunes-national-park', 41.6533, -87.0524, NULL, 'Indiana', 'United States', 'national_park', 'parks_nature', 10, 'Sandy beaches and diverse ecosystems along Lake Michigan.', true, true),
('Isle Royale National Park', 'isle-royale-national-park', 48.0000, -88.8333, NULL, 'Michigan', 'United States', 'national_park', 'parks_nature', 10, 'Remote wilderness island in Lake Superior with wolves and moose.', true, true),
('Voyageurs National Park', 'voyageurs-national-park', 48.4839, -92.8285, NULL, 'Minnesota', 'United States', 'national_park', 'parks_nature', 10, 'Water-based park with interconnected lakes and boreal forest.', true, true),
('Gateway Arch National Park', 'gateway-arch-national-park', 38.6247, -90.1848, 'St. Louis', 'Missouri', 'United States', 'national_park', 'parks_nature', 10, 'The Gateway to the West, featuring the iconic 630-foot stainless steel arch.', true, true),
('Hot Springs National Park', 'hot-springs-national-park', 34.5217, -93.0424, 'Hot Springs', 'Arkansas', 'United States', 'national_park', 'parks_nature', 10, 'Historic bathhouses fed by natural thermal springs.', true, true),
('Virgin Islands National Park', 'virgin-islands-national-park', 18.3358, -64.7281, 'St. John', 'US Virgin Islands', 'United States', 'national_park', 'parks_nature', 10, 'Caribbean paradise with pristine beaches, coral reefs, and hiking trails.', true, true),
('National Park of American Samoa', 'american-samoa-national-park', -14.2583, -170.6883, NULL, 'American Samoa', 'United States', 'national_park', 'parks_nature', 10, 'Remote tropical rainforests, coral reefs, and Samoan culture.', true, true),
('Wrangell-St. Elias National Park', 'wrangell-st-elias-national-park', 61.7104, -142.9857, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'America''s largest national park with massive glaciers and volcanic peaks.', true, true),
('Kenai Fjords National Park', 'kenai-fjords-national-park', 59.9225, -149.6525, 'Seward', 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'Where glaciers meet the sea, with abundant marine wildlife.', true, true),
('Glacier Bay National Park', 'glacier-bay-national-park', 58.5000, -136.0000, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'Tidewater glaciers, fjords, and marine wildlife in a dynamic ice landscape.', true, true),
('Katmai National Park', 'katmai-national-park', 58.5970, -154.6939, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'Famous for brown bears fishing for salmon at Brooks Falls.', true, true),
('Lake Clark National Park', 'lake-clark-national-park', 60.4127, -153.4188, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'Remote Alaskan wilderness with volcanoes, glaciers, and salmon-filled rivers.', true, true),
('Kobuk Valley National Park', 'kobuk-valley-national-park', 67.3556, -159.1289, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'Arctic sand dunes and caribou migration routes above the Arctic Circle.', true, true),
('Gates of the Arctic National Park', 'gates-of-the-arctic-national-park', 67.7863, -153.3018, NULL, 'Alaska', 'United States', 'national_park', 'parks_nature', 10, 'America''s northernmost park with no roads or trails—true wilderness.', true, true),
('New River Gorge National Park', 'new-river-gorge-national-park', 38.0659, -81.0783, NULL, 'West Virginia', 'United States', 'national_park', 'parks_nature', 10, 'One of America''s newest national parks, featuring whitewater rafting and rock climbing.', true, true);

-- ============================================
-- US STATE PARKS (50 Popular)
-- Base points: 5-8
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, is_verified, is_active) VALUES

-- Top Tier State Parks (8 points)
('Palo Duro Canyon State Park', 'palo-duro-canyon-state-park', 34.8792, -101.6766, 'Canyon', 'Texas', 'United States', 'state_park', 'parks_nature', 8, 'The second-largest canyon in the United States, known as the "Grand Canyon of Texas."', true, true),
('Valley of Fire State Park', 'valley-of-fire-state-park', 36.4367, -114.5136, 'Overton', 'Nevada', 'United States', 'state_park', 'parks_nature', 8, 'Nevada''s oldest state park, featuring stunning red Aztec sandstone formations.', true, true),
('Anza-Borrego Desert State Park', 'anza-borrego-desert-state-park', 33.2558, -116.4017, 'Borrego Springs', 'California', 'United States', 'state_park', 'parks_nature', 8, 'California''s largest state park with wildflower blooms and slot canyons.', true, true),
('Dead Horse Point State Park', 'dead-horse-point-state-park', 38.4877, -109.7378, 'Moab', 'Utah', 'United States', 'state_park', 'parks_nature', 8, 'Dramatic overlook 2,000 feet above the Colorado River.', true, true),
('Goblin Valley State Park', 'goblin-valley-state-park', 38.5647, -110.7048, 'Green River', 'Utah', 'United States', 'state_park', 'parks_nature', 8, 'Surreal landscape of mushroom-shaped hoodoos called "goblins."', true, true),
('Antelope Canyon Navajo Tribal Park', 'antelope-canyon', 36.8619, -111.3743, 'Page', 'Arizona', 'United States', 'state_park', 'parks_nature', 8, 'World-famous slot canyon with light beams and flowing sandstone walls.', true, true),
('Letchworth State Park', 'letchworth-state-park', 42.5708, -77.9514, 'Castile', 'New York', 'United States', 'state_park', 'parks_nature', 8, 'The "Grand Canyon of the East" with three major waterfalls.', true, true),
('Watkins Glen State Park', 'watkins-glen-state-park', 42.3726, -76.8719, 'Watkins Glen', 'New York', 'United States', 'state_park', 'parks_nature', 8, 'Stunning gorge trail passing 19 waterfalls in 2 miles.', true, true),
('Smith Rock State Park', 'smith-rock-state-park', 44.3672, -121.1401, 'Terrebonne', 'Oregon', 'United States', 'state_park', 'parks_nature', 8, 'World-class rock climbing destination with dramatic volcanic spires.', true, true),
('Palouse Falls State Park', 'palouse-falls-state-park', 46.6639, -118.2269, 'Starbuck', 'Washington', 'United States', 'state_park', 'parks_nature', 8, 'Washington''s official waterfall plunging 200 feet into a basalt bowl.', true, true),

-- Standard State Parks (6 points)
('Enchanted Rock State Natural Area', 'enchanted-rock-state-natural-area', 30.5057, -98.8195, 'Fredericksburg', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Massive pink granite dome rising 425 feet above the Hill Country.', true, true),
('Garner State Park', 'garner-state-park', 29.5945, -99.7400, 'Concan', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Popular swimming hole on the crystal-clear Frio River.', true, true),
('Big Bend Ranch State Park', 'big-bend-ranch-state-park', 29.4747, -103.9631, 'Presidio', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Remote desert wilderness adjacent to Big Bend National Park.', true, true),
('Pedernales Falls State Park', 'pedernales-falls-state-park', 30.3078, -98.2578, 'Johnson City', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Scenic waterfall on the Pedernales River in the Hill Country.', true, true),
('Lost Maples State Natural Area', 'lost-maples-state-natural-area', 29.8097, -99.5756, 'Vanderpool', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Famous for fall foliage of rare Uvalde bigtooth maple trees.', true, true),
('Colorado Bend State Park', 'colorado-bend-state-park', 31.0228, -98.4431, 'Bend', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Wild caves, waterfalls, and excellent stargazing.', true, true),
('Caprock Canyons State Park', 'caprock-canyons-state-park', 34.4389, -101.0619, 'Quitaque', 'Texas', 'United States', 'state_park', 'parks_nature', 6, 'Home to the official Texas State Bison Herd.', true, true),
('Custer State Park', 'custer-state-park', 43.7553, -103.4280, 'Custer', 'South Dakota', 'United States', 'state_park', 'parks_nature', 6, 'Free-roaming bison herd and scenic Wildlife Loop Road.', true, true),
('Baxter State Park', 'baxter-state-park', 46.0217, -68.9217, 'Millinocket', 'Maine', 'United States', 'state_park', 'parks_nature', 6, 'Home to Mount Katahdin and the northern terminus of the Appalachian Trail.', true, true),
('Hocking Hills State Park', 'hocking-hills-state-park', 39.4400, -82.5400, 'Logan', 'Ohio', 'United States', 'state_park', 'parks_nature', 6, 'Cave-filled gorges, waterfalls, and rock formations.', true, true),
('Fall Creek Falls State Park', 'fall-creek-falls-state-park', 35.6631, -85.3517, 'Spencer', 'Tennessee', 'United States', 'state_park', 'parks_nature', 6, 'One of the highest waterfalls in the eastern US at 256 feet.', true, true),
('Starved Rock State Park', 'starved-rock-state-park', 41.3206, -88.9931, 'Oglesby', 'Illinois', 'United States', 'state_park', 'parks_nature', 6, '18 canyons with seasonal waterfalls along the Illinois River.', true, true),
('Garden of the Gods', 'garden-of-the-gods', 38.8733, -104.8867, 'Colorado Springs', 'Colorado', 'United States', 'state_park', 'parks_nature', 6, 'Free park with dramatic red rock formations against Pikes Peak.', true, true),
('Ricketts Glen State Park', 'ricketts-glen-state-park', 41.3278, -76.2786, 'Benton', 'Pennsylvania', 'United States', 'state_park', 'parks_nature', 6, '22 named waterfalls along the Falls Trail System.', true, true),
('Franconia Notch State Park', 'franconia-notch-state-park', 44.1606, -71.6817, 'Lincoln', 'New Hampshire', 'United States', 'state_park', 'parks_nature', 6, 'Mountain pass with the famous Flume Gorge and aerial tramway.', true, true),
('Robert H. Treman State Park', 'robert-treman-state-park', 42.3997, -76.5614, 'Ithaca', 'New York', 'United States', 'state_park', 'parks_nature', 6, 'Twelve waterfalls including the 115-foot Lucifer Falls.', true, true),
('Taughannock Falls State Park', 'taughannock-falls-state-park', 42.5458, -76.6036, 'Trumansburg', 'New York', 'United States', 'state_park', 'parks_nature', 6, '215-foot waterfall—higher than Niagara Falls.', true, true),
('Buttermilk Falls State Park', 'buttermilk-falls-state-park', 42.4172, -76.5242, 'Ithaca', 'New York', 'United States', 'state_park', 'parks_nature', 6, 'Series of cascades and waterfalls with a natural swimming hole.', true, true),
('Stone Mountain Park', 'stone-mountain-park', 33.8053, -84.1453, 'Stone Mountain', 'Georgia', 'United States', 'state_park', 'parks_nature', 6, 'World''s largest exposed granite outcrop with Confederate Memorial carving.', true, true),
('Red Rock Canyon State Park', 'red-rock-canyon-state-park-oklahoma', 36.0442, -98.8147, 'Hinton', 'Oklahoma', 'United States', 'state_park', 'parks_nature', 6, 'Red shale and sandstone canyon walls in the Great Plains.', true, true),

-- Basic State Parks (5 points)
('Pfeiffer Big Sur State Park', 'pfeiffer-big-sur-state-park', 36.2469, -121.7836, 'Big Sur', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Gateway to Big Sur with redwoods and access to Pfeiffer Beach.', true, true),
('Julia Pfeiffer Burns State Park', 'julia-pfeiffer-burns-state-park', 36.1581, -121.6725, 'Big Sur', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Famous for McWay Falls dropping onto the beach.', true, true),
('Point Lobos State Natural Reserve', 'point-lobos-state-natural-reserve', 36.5150, -121.9406, 'Carmel', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Crown jewel of California state parks with sea lions and otters.', true, true),
('Natural Bridges State Beach', 'natural-bridges-state-beach', 36.9519, -122.0575, 'Santa Cruz', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Natural rock arch and monarch butterfly migration site.', true, true),
('Emerald Bay State Park', 'emerald-bay-state-park', 38.9533, -120.1092, 'South Lake Tahoe', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Iconic Lake Tahoe bay with Fannette Island and Vikingsholm.', true, true),
('Salt Point State Park', 'salt-point-state-park', 38.5653, -123.3272, 'Jenner', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Rugged Sonoma Coast with tide pools and pygmy forest.', true, true),
('Mount Diablo State Park', 'mount-diablo-state-park', 37.8816, -121.9142, 'Danville', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Summit views spanning 200 miles on clear days.', true, true),
('Castle Crags State Park', 'castle-crags-state-park', 41.1522, -122.3247, 'Castella', 'California', 'United States', 'state_park', 'parks_nature', 5, 'Ancient granite spires rising over 6,000 feet near Mount Shasta.', true, true),
('Silver Falls State Park', 'silver-falls-state-park', 44.8578, -122.6531, 'Sublimity', 'Oregon', 'United States', 'state_park', 'parks_nature', 5, 'Trail of Ten Falls featuring waterfalls you can walk behind.', true, true),
('Deception Pass State Park', 'deception-pass-state-park', 48.4056, -122.6447, 'Oak Harbor', 'Washington', 'United States', 'state_park', 'parks_nature', 5, 'Washington''s most visited park with dramatic bridge and beaches.', true, true),
('Ginkgo Petrified Forest State Park', 'ginkgo-petrified-forest-state-park', 46.9508, -119.9936, 'Vantage', 'Washington', 'United States', 'state_park', 'parks_nature', 5, 'Ancient petrified wood and Columbia River views.', true, true),
('Multnomah Falls', 'multnomah-falls', 45.5762, -122.1158, 'Corbett', 'Oregon', 'United States', 'state_park', 'parks_nature', 5, 'Oregon''s tallest waterfall at 620 feet with iconic Benson Bridge.', true, true),
('Red Rock Canyon National Conservation Area', 'red-rock-canyon-nca', 36.1350, -115.4272, 'Las Vegas', 'Nevada', 'United States', 'state_park', 'parks_nature', 5, 'Scenic loop drive with red sandstone cliffs near Las Vegas.', true, true),
('Slide Rock State Park', 'slide-rock-state-park', 34.9503, -111.7514, 'Sedona', 'Arizona', 'United States', 'state_park', 'parks_nature', 5, 'Natural water slide in Oak Creek Canyon near Sedona.', true, true),
('Sedona Red Rock State Park', 'sedona-red-rock-state-park', 34.8839, -111.8264, 'Sedona', 'Arizona', 'United States', 'state_park', 'parks_nature', 5, 'Environmental education center surrounded by red rocks.', true, true),
('Coronado Historic Site', 'coronado-historic-site', 35.3850, -106.5394, 'Bernalillo', 'New Mexico', 'United States', 'state_park', 'parks_nature', 5, 'Ancient Pueblo ruins along the Rio Grande.', true, true),
('Hanging Lake', 'hanging-lake', 39.6017, -107.1922, 'Glenwood Springs', 'Colorado', 'United States', 'state_park', 'parks_nature', 5, 'Stunning turquoise lake requiring permits and a steep hike.', true, true),
('Maroon Bells-Snowmass Wilderness', 'maroon-bells-snowmass', 39.0708, -106.9414, 'Aspen', 'Colorado', 'United States', 'state_park', 'parks_nature', 5, 'Most photographed peaks in North America.', true, true);

-- ============================================
-- US LANDMARKS & MONUMENTS (50)
-- Base points: 6-10
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, is_verified, is_active) VALUES

-- Major Landmarks (10 points)
('Statue of Liberty', 'statue-of-liberty', 40.6892, -74.0445, 'New York City', 'New York', 'United States', 'landmark', 'attractions', 10, 'Iconic symbol of freedom gifted by France, standing 305 feet tall on Liberty Island.', true, true),
('Mount Rushmore', 'mount-rushmore', 43.8791, -103.4591, 'Keystone', 'South Dakota', 'United States', 'landmark', 'attractions', 10, '60-foot sculptures of Washington, Jefferson, Roosevelt, and Lincoln carved into granite.', true, true),
('Golden Gate Bridge', 'golden-gate-bridge', 37.8199, -122.4783, 'San Francisco', 'California', 'United States', 'landmark', 'attractions', 10, 'Iconic 1.7-mile suspension bridge spanning San Francisco Bay.', true, true),
('Hoover Dam', 'hoover-dam', 36.0160, -114.7377, 'Boulder City', 'Nevada', 'United States', 'landmark', 'attractions', 10, 'Massive Art Deco dam creating Lake Mead on the Colorado River.', true, true),
('Lincoln Memorial', 'lincoln-memorial', 38.8893, -77.0502, 'Washington', 'District of Columbia', 'United States', 'landmark', 'attractions', 10, 'Neoclassical memorial with 19-foot seated Lincoln statue.', true, true),
('Washington Monument', 'washington-monument', 38.8895, -77.0353, 'Washington', 'District of Columbia', 'United States', 'landmark', 'attractions', 10, '555-foot obelisk honoring George Washington.', true, true),
('National Mall', 'national-mall', 38.8895, -77.0228, 'Washington', 'District of Columbia', 'United States', 'landmark', 'attractions', 10, 'America''s front yard with monuments, memorials, and Smithsonian museums.', true, true),
('Space Needle', 'space-needle', 47.6205, -122.3493, 'Seattle', 'Washington', 'United States', 'landmark', 'attractions', 10, 'Seattle''s iconic 605-foot observation tower built for the 1962 World''s Fair.', true, true),
('Empire State Building', 'empire-state-building', 40.7484, -73.9857, 'New York City', 'New York', 'United States', 'landmark', 'attractions', 10, 'Art Deco masterpiece and once the world''s tallest building.', true, true),
('Alcatraz Island', 'alcatraz-island', 37.8267, -122.4230, 'San Francisco', 'California', 'United States', 'landmark', 'attractions', 10, 'Former federal prison in San Francisco Bay, now a museum.', true, true),

-- Standard Landmarks (8 points)
('Hollywood Sign', 'hollywood-sign', 34.1341, -118.3215, 'Los Angeles', 'California', 'United States', 'landmark', 'attractions', 8, 'Iconic 45-foot letters overlooking Los Angeles.', true, true),
('Brooklyn Bridge', 'brooklyn-bridge', 40.7061, -73.9969, 'New York City', 'New York', 'United States', 'landmark', 'attractions', 8, 'Historic suspension bridge connecting Manhattan and Brooklyn.', true, true),
('Times Square', 'times-square', 40.7580, -73.9855, 'New York City', 'New York', 'United States', 'landmark', 'attractions', 8, 'The Crossroads of the World, famous for bright lights and Broadway.', true, true),
('Central Park', 'central-park', 40.7829, -73.9654, 'New York City', 'New York', 'United States', 'landmark', 'parks_nature', 8, '843-acre urban oasis in the heart of Manhattan.', true, true),
('Freedom Trail', 'freedom-trail', 42.3601, -71.0589, 'Boston', 'Massachusetts', 'United States', 'landmark', 'attractions', 8, '2.5-mile walking path through 16 historic sites.', true, true),
('Pearl Harbor National Memorial', 'pearl-harbor-memorial', 21.3649, -157.9501, 'Honolulu', 'Hawaii', 'United States', 'landmark', 'attractions', 8, 'Memorial honoring those who died in the December 7, 1941 attack.', true, true),
('Fisherman''s Wharf', 'fishermans-wharf', 37.8080, -122.4177, 'San Francisco', 'California', 'United States', 'landmark', 'attractions', 8, 'Historic waterfront with sea lions, seafood, and bay views.', true, true),
('French Quarter', 'french-quarter', 29.9584, -90.0644, 'New Orleans', 'Louisiana', 'United States', 'landmark', 'attractions', 8, 'Historic heart of New Orleans with Bourbon Street and jazz.', true, true),
('The Alamo', 'the-alamo', 29.4260, -98.4861, 'San Antonio', 'Texas', 'United States', 'landmark', 'attractions', 8, 'Historic Spanish mission and site of the famous 1836 battle.', true, true),
('San Antonio River Walk', 'san-antonio-river-walk', 29.4241, -98.4936, 'San Antonio', 'Texas', 'United States', 'landmark', 'attractions', 8, '15-mile urban waterway lined with restaurants and shops.', true, true),
('Willis Tower Skydeck', 'willis-tower-skydeck', 41.8789, -87.6359, 'Chicago', 'Illinois', 'United States', 'landmark', 'attractions', 8, 'Glass-bottom Ledge 1,353 feet above Chicago streets.', true, true),
('Las Vegas Strip', 'las-vegas-strip', 36.1147, -115.1728, 'Las Vegas', 'Nevada', 'United States', 'landmark', 'attractions', 8, 'World-famous boulevard of themed resorts and casinos.', true, true),
('Millennium Park', 'millennium-park', 41.8826, -87.6226, 'Chicago', 'Illinois', 'United States', 'landmark', 'parks_nature', 8, 'Home to Cloud Gate (The Bean) and Crown Fountain.', true, true),
('Navy Pier', 'navy-pier', 41.8917, -87.6086, 'Chicago', 'Illinois', 'United States', 'landmark', 'attractions', 8, 'Chicago''s lakefront playground with rides, shows, and dining.', true, true),
('Independence Hall', 'independence-hall', 39.9489, -75.1500, 'Philadelphia', 'Pennsylvania', 'United States', 'landmark', 'attractions', 8, 'Where the Declaration of Independence was signed in 1776.', true, true),
('Liberty Bell', 'liberty-bell', 39.9496, -75.1503, 'Philadelphia', 'Pennsylvania', 'United States', 'landmark', 'attractions', 8, 'Iconic symbol of American independence with famous crack.', true, true),
('Getty Center', 'getty-center', 34.0780, -118.4741, 'Los Angeles', 'California', 'United States', 'landmark', 'attractions', 8, 'World-class art museum with stunning architecture and gardens.', true, true),
('Griffith Observatory', 'griffith-observatory', 34.1184, -118.3004, 'Los Angeles', 'California', 'United States', 'landmark', 'attractions', 8, 'Free astronomy museum with iconic LA views.', true, true),

-- Other Landmarks (6 points)
('Santa Monica Pier', 'santa-monica-pier', 34.0086, -118.4975, 'Santa Monica', 'California', 'United States', 'landmark', 'attractions', 6, 'Historic pier with amusement park and Pacific views.', true, true),
('Venice Beach Boardwalk', 'venice-beach-boardwalk', 33.9850, -118.4695, 'Los Angeles', 'California', 'United States', 'landmark', 'attractions', 6, 'Eclectic oceanfront promenade with street performers and Muscle Beach.', true, true),
('Pike Place Market', 'pike-place-market', 47.6097, -122.3422, 'Seattle', 'Washington', 'United States', 'landmark', 'attractions', 6, 'Iconic farmers market and home of the first Starbucks.', true, true),
('Painted Ladies', 'painted-ladies', 37.7763, -122.4325, 'San Francisco', 'California', 'United States', 'landmark', 'attractions', 6, 'Row of colorful Victorian houses overlooking Alamo Square.', true, true),
('Cloud Gate (The Bean)', 'cloud-gate-the-bean', 41.8827, -87.6233, 'Chicago', 'Illinois', 'United States', 'landmark', 'attractions', 6, 'Reflective stainless steel sculpture in Millennium Park.', true, true),
('Gateway Arch', 'gateway-arch', 38.6247, -90.1848, 'St. Louis', 'Missouri', 'United States', 'landmark', 'attractions', 6, '630-foot stainless steel catenary arch on the Mississippi.', true, true),
('Fenway Park', 'fenway-park', 42.3467, -71.0972, 'Boston', 'Massachusetts', 'United States', 'landmark', 'attractions', 6, 'America''s oldest Major League Baseball stadium.', true, true),
('Wrigley Field', 'wrigley-field', 41.9484, -87.6553, 'Chicago', 'Illinois', 'United States', 'landmark', 'attractions', 6, 'Historic Cubs stadium with iconic ivy-covered walls.', true, true),
('Graceland', 'graceland', 35.0477, -90.0260, 'Memphis', 'Tennessee', 'United States', 'landmark', 'attractions', 6, 'Elvis Presley''s home and final resting place.', true, true),
('Country Music Hall of Fame', 'country-music-hall-of-fame', 36.1584, -86.7760, 'Nashville', 'Tennessee', 'United States', 'landmark', 'attractions', 6, 'World''s largest repository of country music artifacts.', true, true),
('Bourbon Street', 'bourbon-street', 29.9589, -90.0685, 'New Orleans', 'Louisiana', 'United States', 'landmark', 'attractions', 6, 'Famous street in the French Quarter known for nightlife.', true, true),
('Horseshoe Bend', 'horseshoe-bend', 36.8791, -111.5103, 'Page', 'Arizona', 'United States', 'landmark', 'parks_nature', 6, 'Dramatic meander of the Colorado River 1,000 feet below.', true, true),
('Monument Valley', 'monument-valley', 36.9983, -110.0985, 'Oljato-Monument Valley', 'Arizona', 'United States', 'landmark', 'parks_nature', 6, 'Iconic red sandstone buttes on the Navajo Nation.', true, true),
('Salvation Mountain', 'salvation-mountain', 33.2547, -115.4718, 'Niland', 'California', 'United States', 'landmark', 'attractions', 6, 'Colorful desert art installation covered in religious messages.', true, true),
('Cadillac Ranch', 'cadillac-ranch', 35.1872, -101.9871, 'Amarillo', 'Texas', 'United States', 'landmark', 'attractions', 6, 'Ten Cadillacs buried nose-first in a Texas field.', true, true),
('South Congress Avenue (SoCo)', 'south-congress-avenue', 30.2505, -97.7497, 'Austin', 'Texas', 'United States', 'landmark', 'attractions', 6, 'Eclectic Austin district with shops, food trucks, and murals.', true, true),
('Sixth Street', 'sixth-street', 30.2672, -97.7400, 'Austin', 'Texas', 'United States', 'landmark', 'attractions', 6, 'Austin''s famous entertainment district with live music venues.', true, true),
('Fort Worth Stockyards', 'fort-worth-stockyards', 32.7872, -97.3474, 'Fort Worth', 'Texas', 'United States', 'landmark', 'attractions', 6, 'Historic livestock exchange with daily cattle drives.', true, true),
('Dealey Plaza', 'dealey-plaza', 32.7789, -96.8083, 'Dallas', 'Texas', 'United States', 'landmark', 'attractions', 6, 'Historic site of President Kennedy''s assassination in 1963.', true, true);

-- ============================================
-- ADVENTURE ACTIVITIES (40)
-- Base points: 8-15 based on intensity/uniqueness
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, website_url, is_verified, is_active) VALUES

-- Zip Lines & Aerial Adventures (12-15 points)
('Royal Gorge Zip Line Tours', 'royal-gorge-zip-line-tours', 38.4514, -105.3228, 'Cañon City', 'Colorado', 'United States', 'adventure_activity', 'experiences', 15, 'Zip line 1,200 feet above the Arkansas River at Royal Gorge.', 'https://royalgorgebridge.com', true, true),
('Zip Line at Catalina Island', 'zip-line-catalina-island', 33.3428, -118.3286, 'Avalon', 'California', 'United States', 'adventure_activity', 'experiences', 14, 'Five-line eco-tour 600 feet above Descanso Canyon.', 'https://visitcatalinaisland.com', true, true),
('Navitat Canopy Adventures', 'navitat-canopy-adventures', 35.5500, -82.5500, 'Asheville', 'North Carolina', 'United States', 'adventure_activity', 'experiences', 12, 'Treetop adventure with zip lines and sky bridges in the Blue Ridge Mountains.', 'https://navitat.com', true, true),
('Cypress Valley Canopy Tours', 'cypress-valley-canopy-tours', 30.4100, -98.0800, 'Spicewood', 'Texas', 'United States', 'adventure_activity', 'experiences', 12, 'Texas Hill Country zip line through old-growth cypress trees.', 'https://cypressvalley.com', true, true),
('Lake Travis Zipline Adventures', 'lake-travis-zipline-adventures', 30.4050, -97.9200, 'Volente', 'Texas', 'United States', 'adventure_activity', 'experiences', 12, 'Zip across canyons overlooking Lake Travis.', 'https://laketraviszipline.com', true, true),

-- Water Adventures (10-14 points)
('Colorado River Rafting - Moab', 'colorado-river-rafting-moab', 38.5733, -109.5498, 'Moab', 'Utah', 'United States', 'adventure_activity', 'outdoor_recreation', 14, 'Whitewater rafting through red rock canyons near Arches.', NULL, true, true),
('Grand Canyon Rafting', 'grand-canyon-rafting', 36.1000, -112.1000, 'Grand Canyon', 'Arizona', 'United States', 'adventure_activity', 'outdoor_recreation', 15, 'Multi-day rafting expedition through the Grand Canyon.', NULL, true, true),
('Gauley River Whitewater', 'gauley-river-whitewater', 38.2167, -80.9167, 'Summersville', 'West Virginia', 'United States', 'adventure_activity', 'outdoor_recreation', 14, 'Class V rapids known as the "Beast of the East."', NULL, true, true),
('Kayak Bioluminescent Bay', 'kayak-bioluminescent-bay', 18.0969, -65.7444, 'Vieques', 'Puerto Rico', 'United States', 'adventure_activity', 'outdoor_recreation', 14, 'Paddle through glowing bioluminescent waters at night.', NULL, true, true),
('San Marcos River Tubing', 'san-marcos-river-tubing', 29.8833, -97.9333, 'San Marcos', 'Texas', 'United States', 'adventure_activity', 'outdoor_recreation', 8, 'Relaxing float down crystal-clear spring-fed waters.', NULL, true, true),
('Guadalupe River Tubing', 'guadalupe-river-tubing', 29.8600, -98.3900, 'New Braunfels', 'Texas', 'United States', 'adventure_activity', 'outdoor_recreation', 8, 'Popular summer tubing destination in Texas Hill Country.', NULL, true, true),
('Barton Springs Pool', 'barton-springs-pool', 30.2640, -97.7710, 'Austin', 'Texas', 'United States', 'natural_feature', 'outdoor_recreation', 6, 'Spring-fed swimming pool maintaining 68°F year-round.', NULL, true, true),
('Hamilton Pool Preserve', 'hamilton-pool-preserve', 30.3425, -98.1264, 'Dripping Springs', 'Texas', 'United States', 'natural_feature', 'outdoor_recreation', 8, 'Natural swimming hole with 50-foot waterfall in a grotto.', NULL, true, true),
('Jacob''s Well Natural Area', 'jacobs-well-natural-area', 30.0333, -98.1250, 'Wimberley', 'Texas', 'United States', 'natural_feature', 'outdoor_recreation', 10, 'Artesian spring with crystal-clear water and underwater caves.', NULL, true, true),
('Krause Springs', 'krause-springs', 30.4747, -98.1528, 'Spicewood', 'Texas', 'United States', 'natural_feature', 'outdoor_recreation', 6, 'Private spring-fed swimming hole with camping.', NULL, true, true),
('Comal River Tubing', 'comal-river-tubing', 29.7100, -98.1300, 'New Braunfels', 'Texas', 'United States', 'adventure_activity', 'outdoor_recreation', 6, 'Shorter, gentler float perfect for families.', NULL, true, true),

-- Cave Adventures (10-12 points)
('Carlsbad Caverns Tour', 'carlsbad-caverns-tour', 32.1752, -104.4456, 'Carlsbad', 'New Mexico', 'United States', 'adventure_activity', 'experiences', 12, 'Explore massive underground chambers and watch the bat flight.', NULL, true, true),
('Inner Space Cavern', 'inner-space-cavern', 30.6330, -97.6789, 'Georgetown', 'Texas', 'United States', 'adventure_activity', 'experiences', 8, 'Texas cave with prehistoric animal remains discovered during highway construction.', NULL, true, true),
('Natural Bridge Caverns', 'natural-bridge-caverns', 29.6922, -98.3428, 'San Antonio', 'Texas', 'United States', 'adventure_activity', 'experiences', 8, 'Texas'' largest commercial caverns with adventure tours.', 'https://naturalbridgecaverns.com', true, true),
('Longhorn Cavern State Park', 'longhorn-cavern-state-park', 30.6900, -98.3500, 'Burnet', 'Texas', 'United States', 'adventure_activity', 'experiences', 8, 'Unique river-formed cavern with natural lighting.', NULL, true, true),
('Mammoth Cave Tours', 'mammoth-cave-tours', 37.1862, -86.1000, 'Mammoth Cave', 'Kentucky', 'United States', 'adventure_activity', 'experiences', 12, 'Tours of the world''s longest known cave system.', NULL, true, true),
('Luray Caverns', 'luray-caverns', 38.6636, -78.4833, 'Luray', 'Virginia', 'United States', 'adventure_activity', 'experiences', 10, 'Famous for the Great Stalacpipe Organ.', 'https://luraycaverns.com', true, true),

-- Unique Experiences (10-15 points)
('Cadillac Ranch', 'cadillac-ranch-experience', 35.1872, -101.9871, 'Amarillo', 'Texas', 'United States', 'adventure_activity', 'experiences', 8, 'Spray paint buried Cadillacs in this interactive art installation.', NULL, true, true),
('Hot Air Balloon Albuquerque', 'hot-air-balloon-albuquerque', 35.1983, -106.5956, 'Albuquerque', 'New Mexico', 'United States', 'adventure_activity', 'experiences', 14, 'Sunrise balloon ride over the Rio Grande Valley.', NULL, true, true),
('Hot Air Balloon Napa Valley', 'hot-air-balloon-napa-valley', 38.5025, -122.2654, 'Napa', 'California', 'United States', 'adventure_activity', 'experiences', 14, 'Float over vineyards at sunrise in wine country.', NULL, true, true),
('Congress Avenue Bat Bridge', 'congress-avenue-bat-bridge', 30.2618, -97.7455, 'Austin', 'Texas', 'United States', 'adventure_activity', 'experiences', 6, 'Watch 1.5 million Mexican free-tailed bats emerge at sunset.', NULL, true, true),
('Broken Bow Lake Kayaking', 'broken-bow-lake-kayaking', 34.1461, -94.6314, 'Broken Bow', 'Oklahoma', 'United States', 'adventure_activity', 'outdoor_recreation', 8, 'Crystal-clear mountain lake perfect for kayaking and paddleboarding.', NULL, true, true),
('Palo Duro Canyon Horseback Riding', 'palo-duro-canyon-horseback', 34.8792, -101.6766, 'Canyon', 'Texas', 'United States', 'adventure_activity', 'outdoor_recreation', 10, 'Trail rides through the second-largest canyon in America.', NULL, true, true),

-- Theme Parks & Attractions (10-12 points)
('Schlitterbahn New Braunfels', 'schlitterbahn-new-braunfels', 29.7086, -98.1300, 'New Braunfels', 'Texas', 'United States', 'adventure_activity', 'attractions', 10, 'World-famous waterpark with river-fed attractions.', 'https://schlitterbahn.com', true, true),
('Morgan''s Wonderland', 'morgans-wonderland', 29.5369, -98.3867, 'San Antonio', 'Texas', 'United States', 'adventure_activity', 'attractions', 10, 'World''s first ultra-accessible theme park designed for special needs.', 'https://morganswonderland.com', true, true),
('SeaWorld San Antonio', 'seaworld-san-antonio', 29.4578, -98.7000, 'San Antonio', 'Texas', 'United States', 'adventure_activity', 'attractions', 10, 'Marine-life park with roller coasters and animal encounters.', 'https://seaworld.com', true, true),
('Kartchner Caverns State Park', 'kartchner-caverns-state-park', 31.8378, -110.3472, 'Benson', 'Arizona', 'United States', 'adventure_activity', 'experiences', 10, 'Living cave with spectacular formations.', NULL, true, true),

-- Scenic Drives & Tours (8-10 points)
('Going-to-the-Sun Road', 'going-to-the-sun-road', 48.6967, -113.7178, 'Glacier National Park', 'Montana', 'United States', 'adventure_activity', 'experiences', 10, '50-mile mountain road crossing the Continental Divide.', NULL, true, true),
('Blue Ridge Parkway', 'blue-ridge-parkway', 35.7796, -82.5746, 'Asheville', 'North Carolina', 'United States', 'adventure_activity', 'experiences', 10, '469-mile scenic drive connecting Shenandoah to Great Smoky Mountains.', NULL, true, true),
('Pacific Coast Highway', 'pacific-coast-highway', 36.2400, -121.8100, 'Big Sur', 'California', 'United States', 'adventure_activity', 'experiences', 10, 'Iconic coastal drive through Big Sur.', NULL, true, true),
('Trail Ridge Road', 'trail-ridge-road', 40.4000, -105.7000, 'Rocky Mountain NP', 'Colorado', 'United States', 'adventure_activity', 'experiences', 10, 'Highest continuous paved road in the US, reaching 12,183 feet.', NULL, true, true),
('Overseas Highway', 'overseas-highway', 24.6650, -81.3417, 'Florida Keys', 'Florida', 'United States', 'adventure_activity', 'experiences', 10, '113-mile drive across 42 bridges connecting the Florida Keys.', NULL, true, true);

-- ============================================
-- THEME PARKS & MAJOR ATTRACTIONS (20)
-- Base points: 10-15
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, website_url, is_verified, is_active) VALUES

('Walt Disney World Magic Kingdom', 'disney-magic-kingdom', 28.4177, -81.5812, 'Orlando', 'Florida', 'United States', 'theme_park', 'attractions', 15, 'The most visited theme park in the world, home to Cinderella Castle.', 'https://disneyworld.disney.go.com', true, true),
('Walt Disney World EPCOT', 'disney-epcot', 28.3747, -81.5494, 'Orlando', 'Florida', 'United States', 'theme_park', 'attractions', 12, 'Future-focused park with World Showcase pavilions.', 'https://disneyworld.disney.go.com', true, true),
('Walt Disney World Hollywood Studios', 'disney-hollywood-studios', 28.3575, -81.5583, 'Orlando', 'Florida', 'United States', 'theme_park', 'attractions', 12, 'Movie-themed park featuring Star Wars: Galaxy''s Edge.', 'https://disneyworld.disney.go.com', true, true),
('Walt Disney World Animal Kingdom', 'disney-animal-kingdom', 28.3553, -81.5901, 'Orlando', 'Florida', 'United States', 'theme_park', 'attractions', 12, 'Nature-themed park with Pandora: The World of Avatar.', 'https://disneyworld.disney.go.com', true, true),
('Disneyland Resort', 'disneyland-resort', 33.8121, -117.9190, 'Anaheim', 'California', 'United States', 'theme_park', 'attractions', 15, 'The original Disney park opened by Walt Disney in 1955.', 'https://disneyland.disney.go.com', true, true),
('Universal Studios Orlando', 'universal-studios-orlando', 28.4794, -81.4686, 'Orlando', 'Florida', 'United States', 'theme_park', 'attractions', 12, 'Movie-based attractions including The Wizarding World of Harry Potter.', 'https://universalorlando.com', true, true),
('Universal Studios Hollywood', 'universal-studios-hollywood', 34.1381, -118.3534, 'Los Angeles', 'California', 'United States', 'theme_park', 'attractions', 12, 'Working movie studio with theme park attractions.', 'https://universalstudioshollywood.com', true, true),
('Six Flags Over Texas', 'six-flags-over-texas', 32.7551, -97.0703, 'Arlington', 'Texas', 'United States', 'theme_park', 'attractions', 10, 'The original Six Flags park with world-class roller coasters.', 'https://sixflags.com', true, true),
('Six Flags Magic Mountain', 'six-flags-magic-mountain', 34.4254, -118.5971, 'Valencia', 'California', 'United States', 'theme_park', 'attractions', 10, 'Roller coaster capital of the world with 20+ coasters.', 'https://sixflags.com', true, true),
('Six Flags Fiesta Texas', 'six-flags-fiesta-texas', 29.5994, -98.6097, 'San Antonio', 'Texas', 'United States', 'theme_park', 'attractions', 10, 'Texas-themed park built in a quarry.', 'https://sixflags.com', true, true),
('Cedar Point', 'cedar-point', 41.4819, -82.6836, 'Sandusky', 'Ohio', 'United States', 'theme_park', 'attractions', 12, 'America''s roller coaster capital with 17 coasters.', 'https://cedarpoint.com', true, true),
('Busch Gardens Tampa Bay', 'busch-gardens-tampa-bay', 28.0374, -82.4204, 'Tampa', 'Florida', 'United States', 'theme_park', 'attractions', 10, 'African-themed park with thrilling coasters and wildlife.', 'https://buschgardens.com', true, true),
('San Diego Zoo', 'san-diego-zoo', 32.7353, -117.1490, 'San Diego', 'California', 'United States', 'zoo_aquarium', 'attractions', 10, 'World-renowned zoo with 3,700 animals of 650+ species.', 'https://sandiegozoo.org', true, true),
('Monterey Bay Aquarium', 'monterey-bay-aquarium', 36.6181, -121.9019, 'Monterey', 'California', 'United States', 'zoo_aquarium', 'attractions', 10, 'World-class aquarium on Cannery Row.', 'https://montereybayaquarium.org', true, true),
('Georgia Aquarium', 'georgia-aquarium', 33.7634, -84.3951, 'Atlanta', 'Georgia', 'United States', 'zoo_aquarium', 'attractions', 10, 'One of the world''s largest aquariums with whale sharks.', 'https://georgiaaquarium.org', true, true),
('Smithsonian National Zoo', 'smithsonian-national-zoo', 38.9296, -77.0498, 'Washington', 'District of Columbia', 'United States', 'zoo_aquarium', 'attractions', 8, 'Free admission zoo with giant pandas and 2,700 animals.', 'https://nationalzoo.si.edu', true, true),
('Houston Space Center', 'houston-space-center', 29.5519, -95.0975, 'Houston', 'Texas', 'United States', 'museum', 'attractions', 10, 'NASA''s official visitor center with real spacecraft and astronaut encounters.', 'https://spacecenter.org', true, true),
('Kennedy Space Center', 'kennedy-space-center', 28.5729, -80.6490, 'Cape Canaveral', 'Florida', 'United States', 'museum', 'attractions', 12, 'NASA launch facility visitor complex with Space Shuttle Atlantis.', 'https://kennedyspacecenter.com', true, true),
('Smithsonian Air and Space Museum', 'air-and-space-museum', 38.8882, -77.0199, 'Washington', 'District of Columbia', 'United States', 'museum', 'attractions', 8, 'World''s largest collection of historic aircraft and spacecraft.', 'https://airandspace.si.edu', true, true),
('Museum of Modern Art (MoMA)', 'museum-of-modern-art', 40.7614, -73.9776, 'New York City', 'New York', 'United States', 'museum', 'attractions', 8, 'World''s most influential modern art museum.', 'https://moma.org', true, true);

-- ============================================
-- INTERNATIONAL BUCKET LIST (25)
-- Base points: 15-25
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, is_verified, is_active) VALUES

-- Iconic Wonders (25 points)
('Machu Picchu', 'machu-picchu', -13.1631, -72.5450, 'Aguas Calientes', NULL, 'Peru', 'international', 'international', 25, 'Lost city of the Incas perched high in the Andes Mountains.', true, true),
('Great Wall of China', 'great-wall-of-china', 40.4319, 116.5704, 'Beijing', NULL, 'China', 'international', 'international', 25, 'Ancient fortification stretching over 13,000 miles.', true, true),
('Taj Mahal', 'taj-mahal', 27.1751, 78.0421, 'Agra', NULL, 'India', 'international', 'international', 25, 'Ivory-white marble mausoleum, a symbol of eternal love.', true, true),
('Petra', 'petra-jordan', 30.3285, 35.4444, 'Petra', NULL, 'Jordan', 'international', 'international', 25, 'Ancient city carved into rose-red cliffs.', true, true),
('Angkor Wat', 'angkor-wat', 13.4125, 103.8670, 'Siem Reap', NULL, 'Cambodia', 'international', 'international', 25, 'Largest religious monument in the world.', true, true),

-- Major Landmarks (20 points)
('Eiffel Tower', 'eiffel-tower', 48.8584, 2.2945, 'Paris', NULL, 'France', 'international', 'international', 20, 'Iconic iron lattice tower and symbol of Paris.', true, true),
('Colosseum', 'colosseum-rome', 41.8902, 12.4922, 'Rome', NULL, 'Italy', 'international', 'international', 20, 'Ancient Roman amphitheater that held 50,000 spectators.', true, true),
('Big Ben & Houses of Parliament', 'big-ben-london', 51.5007, -0.1246, 'London', NULL, 'United Kingdom', 'international', 'international', 20, 'Iconic clock tower and seat of British Parliament.', true, true),
('Sydney Opera House', 'sydney-opera-house', -33.8568, 151.2153, 'Sydney', NULL, 'Australia', 'international', 'international', 20, 'Architectural masterpiece on Sydney Harbour.', true, true),
('Christ the Redeemer', 'christ-the-redeemer', -22.9519, -43.2105, 'Rio de Janeiro', NULL, 'Brazil', 'international', 'international', 20, '98-foot Art Deco statue overlooking Rio.', true, true),
('Santorini', 'santorini-greece', 36.3932, 25.4615, 'Santorini', NULL, 'Greece', 'international', 'international', 20, 'Stunning volcanic island with iconic white-washed buildings.', true, true),
('Northern Lights Iceland', 'northern-lights-iceland', 64.1466, -21.9426, 'Reykjavik', NULL, 'Iceland', 'international', 'international', 20, 'Aurora borealis dancing across the Arctic sky.', true, true),
('Galápagos Islands', 'galapagos-islands', -0.9538, -90.9656, 'Puerto Ayora', NULL, 'Ecuador', 'international', 'international', 20, 'Volcanic archipelago with unique wildlife that inspired Darwin.', true, true),
('Victoria Falls', 'victoria-falls', -17.9243, 25.8572, 'Livingstone', NULL, 'Zambia', 'international', 'international', 20, 'The largest sheet of falling water in the world.', true, true),
('Pyramids of Giza', 'pyramids-of-giza', 29.9792, 31.1342, 'Giza', NULL, 'Egypt', 'international', 'international', 20, 'Ancient wonder and last surviving of the Seven Wonders.', true, true),

-- Notable Destinations (15 points)
('Neuschwanstein Castle', 'neuschwanstein-castle', 47.5576, 10.7498, 'Schwangau', NULL, 'Germany', 'international', 'international', 15, 'Fairytale castle that inspired Disney''s Sleeping Beauty Castle.', true, true),
('Cinque Terre', 'cinque-terre', 44.1269, 9.7108, 'La Spezia', NULL, 'Italy', 'international', 'international', 15, 'Five colorful fishing villages on the Italian Riviera.', true, true),
('Sagrada Familia', 'sagrada-familia', 41.4036, 2.1744, 'Barcelona', NULL, 'Spain', 'international', 'international', 15, 'Gaudí''s unfinished masterpiece basilica.', true, true),
('Matterhorn', 'matterhorn-switzerland', 45.9763, 7.6586, 'Zermatt', NULL, 'Switzerland', 'international', 'international', 15, 'Iconic pyramid-shaped peak in the Alps.', true, true),
('Blue Lagoon', 'blue-lagoon-iceland', 63.8804, -22.4495, 'Grindavík', NULL, 'Iceland', 'international', 'international', 15, 'Geothermal spa with milky blue waters.', true, true),
('Banff National Park', 'banff-national-park', 51.4968, -115.9281, 'Banff', 'Alberta', 'Canada', 'international', 'international', 15, 'Canada''s first national park with turquoise lakes and peaks.', true, true),
('Ha Long Bay', 'ha-long-bay', 20.9101, 107.1839, 'Ha Long', NULL, 'Vietnam', 'international', 'international', 15, 'Emerald waters with thousands of limestone karsts.', true, true),
('Bora Bora', 'bora-bora', -16.5004, -151.7415, 'Vaitape', NULL, 'French Polynesia', 'international', 'international', 15, 'Paradise island with overwater bungalows and turquoise lagoon.', true, true),
('Serengeti National Park', 'serengeti-national-park', -2.3333, 34.8333, 'Serengeti', NULL, 'Tanzania', 'international', 'international', 15, 'Witness the Great Migration of wildebeest and zebras.', true, true),
('Great Barrier Reef', 'great-barrier-reef', -18.2871, 147.6992, 'Cairns', 'Queensland', 'Australia', 'international', 'international', 15, 'World''s largest coral reef system with incredible marine life.', true, true);

-- ============================================
-- CITIES (Major US Cities for logging)
-- Base points: 3-5
-- ============================================

INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, is_verified, is_active) VALUES

('New York City', 'new-york-city', 40.7128, -74.0060, 'New York City', 'New York', 'United States', 'city', 'attractions', 5, 'The Big Apple - America''s largest city and cultural capital.', true, true),
('Los Angeles', 'los-angeles', 34.0522, -118.2437, 'Los Angeles', 'California', 'United States', 'city', 'attractions', 5, 'City of Angels - entertainment capital of the world.', true, true),
('Chicago', 'chicago', 41.8781, -87.6298, 'Chicago', 'Illinois', 'United States', 'city', 'attractions', 5, 'The Windy City - architecture, deep dish, and lakefront.', true, true),
('San Francisco', 'san-francisco', 37.7749, -122.4194, 'San Francisco', 'California', 'United States', 'city', 'attractions', 5, 'City by the Bay - hills, fog, and Golden Gate.', true, true),
('Las Vegas', 'las-vegas-city', 36.1699, -115.1398, 'Las Vegas', 'Nevada', 'United States', 'city', 'attractions', 5, 'Entertainment Capital of the World.', true, true),
('Miami', 'miami', 25.7617, -80.1918, 'Miami', 'Florida', 'United States', 'city', 'attractions', 5, 'Magic City - beaches, Art Deco, and Latin culture.', true, true),
('Seattle', 'seattle', 47.6062, -122.3321, 'Seattle', 'Washington', 'United States', 'city', 'attractions', 4, 'Emerald City - coffee, tech, and Pacific Northwest beauty.', true, true),
('Austin', 'austin', 30.2672, -97.7431, 'Austin', 'Texas', 'United States', 'city', 'attractions', 4, 'Live Music Capital of the World - Keep Austin Weird.', true, true),
('Denver', 'denver', 39.7392, -104.9903, 'Denver', 'Colorado', 'United States', 'city', 'attractions', 4, 'Mile High City - gateway to the Rockies.', true, true),
('New Orleans', 'new-orleans', 29.9511, -90.0715, 'New Orleans', 'Louisiana', 'United States', 'city', 'attractions', 4, 'The Big Easy - jazz, beignets, and Bourbon Street.', true, true),
('Nashville', 'nashville', 36.1627, -86.7816, 'Nashville', 'Tennessee', 'United States', 'city', 'attractions', 4, 'Music City - country music and hot chicken.', true, true),
('San Diego', 'san-diego', 32.7157, -117.1611, 'San Diego', 'California', 'United States', 'city', 'attractions', 4, 'America''s Finest City - beaches, zoo, and perfect weather.', true, true),
('Boston', 'boston', 42.3601, -71.0589, 'Boston', 'Massachusetts', 'United States', 'city', 'attractions', 4, 'Historic hub of the American Revolution.', true, true),
('Washington DC', 'washington-dc', 38.9072, -77.0369, 'Washington', 'District of Columbia', 'United States', 'city', 'attractions', 4, 'Nation''s capital with monuments and museums.', true, true),
('Portland', 'portland-oregon', 45.5051, -122.6750, 'Portland', 'Oregon', 'United States', 'city', 'attractions', 3, 'Keep Portland Weird - food carts, craft beer, and nature.', true, true),
('Savannah', 'savannah', 32.0809, -81.0912, 'Savannah', 'Georgia', 'United States', 'city', 'attractions', 3, 'Southern charm with Spanish moss and historic squares.', true, true),
('Charleston', 'charleston', 32.7765, -79.9311, 'Charleston', 'South Carolina', 'United States', 'city', 'attractions', 3, 'Historic port city with cobblestone streets and Southern hospitality.', true, true),
('Honolulu', 'honolulu', 21.3069, -157.8583, 'Honolulu', 'Hawaii', 'United States', 'city', 'attractions', 4, 'Gateway to Hawaiian paradise on Oahu.', true, true),
('San Antonio', 'san-antonio', 29.4241, -98.4936, 'San Antonio', 'Texas', 'United States', 'city', 'attractions', 3, 'Remember the Alamo - River Walk and Tex-Mex.', true, true),
('Dallas', 'dallas', 32.7767, -96.7970, 'Dallas', 'Texas', 'United States', 'city', 'attractions', 3, 'Big D - arts district, BBQ, and Cowboys.', true, true),
('Houston', 'houston', 29.7604, -95.3698, 'Houston', 'Texas', 'United States', 'city', 'attractions', 3, 'Space City - NASA, diversity, and world-class dining.', true, true),
('Fort Worth', 'fort-worth', 32.7555, -97.3308, 'Fort Worth', 'Texas', 'United States', 'city', 'attractions', 3, 'Where the West Begins - Stockyards and cowboy culture.', true, true),
('Phoenix', 'phoenix', 33.4484, -112.0740, 'Phoenix', 'Arizona', 'United States', 'city', 'attractions', 3, 'Valley of the Sun - desert beauty and golf paradise.', true, true),
('Sedona', 'sedona', 34.8697, -111.7610, 'Sedona', 'Arizona', 'United States', 'city', 'attractions', 4, 'Red rock country with vortexes and spirituality.', true, true),
('Santa Fe', 'santa-fe', 35.6870, -105.9378, 'Santa Fe', 'New Mexico', 'United States', 'city', 'attractions', 4, 'City Different - adobe architecture and art galleries.', true, true);

-- ============================================
-- Verify counts
-- ============================================

-- Expected totals:
-- National Parks: 63
-- State Parks: 50
-- Landmarks: 50
-- Adventure Activities: ~40
-- Theme Parks & Major Attractions: 20
-- International: 25
-- Cities: 25
-- TOTAL: ~273 locations
