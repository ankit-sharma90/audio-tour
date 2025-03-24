// Mock data for development

export const mockCities = [
  {
    id: 1,
    name: 'San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    description: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California.',
    landmarkCount: 10
  },
  {
    id: 2,
    name: 'New York',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that\'s among the world\'s major commercial, financial and cultural centers.',
    landmarkCount: 10
  },
  {
    id: 3,
    name: 'Boston',
    imageUrl: 'https://images.unsplash.com/photo-1501979376754-f46f582a0593',
    description: 'Boston is Massachusetts\' capital and largest city. Founded in 1630, it\'s one of the oldest cities in the U.S. The key role it played in the American Revolution is highlighted on the Freedom Trail, a 2.5-mile walking route of historic sites.',
    landmarkCount: 10
  },
  {
    id: 4,
    name: 'Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313',
    description: 'Chicago, on Lake Michigan in Illinois, is among the largest cities in the U.S. Famed for its bold architecture, it has a skyline punctuated by skyscrapers such as the iconic John Hancock Center.',
    landmarkCount: 10
  },
  {
    id: 5,
    name: 'Los Angeles',
    imageUrl: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0',
    description: 'Los Angeles is a sprawling Southern California city and the center of the nation\'s film and television industry. Near its iconic Hollywood sign, studios such as Paramount Pictures, Universal and Warner Brothers offer behind-the-scenes tours.',
    landmarkCount: 10
  }
];

export const mockLandmarks = [
  {
    id: 1,
    name: 'Golden Gate Bridge',
    city: 'San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    shortDescription: 'An iconic suspension bridge spanning the Golden Gate Strait.',
    description: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean. The structure links the U.S. city of San Francisco, California—the northern tip of the San Francisco Peninsula—to Marin County, carrying both U.S. Route 101 and California State Route 1 across the strait.',
    address: 'Golden Gate Bridge, San Francisco, CA',
    tours: [
      {
        id: 101,
        type: 'short',
        audioUrl: 'https://example.com/audio/golden-gate-short.mp3',
        transcript: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean. Construction began on January 5, 1933, and the bridge opened on May 27, 1937. At the time of its opening, it was both the longest and the tallest suspension bridge in the world.'
      },
      {
        id: 102,
        type: 'full',
        audioUrl: 'https://example.com/audio/golden-gate-full.mp3',
        transcript: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean. Construction began on January 5, 1933, and the bridge opened on May 27, 1937. At the time of its opening, it was both the longest and the tallest suspension bridge in the world. The bridge is one of the most internationally recognized symbols of San Francisco and California. It was initially designed by engineer Joseph Strauss in 1917. The bridge\'s distinctive orange-vermilion color was specifically chosen to make the bridge more visible through the thick fog that frequently shrouds the bridge.'
      }
    ]
  },
  {
    id: 2,
    name: 'Alcatraz Island',
    city: 'San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1541464522140-485dc9cb5a84',
    shortDescription: 'A small island home to the abandoned federal prison.',
    description: 'Alcatraz Island is located in San Francisco Bay, 1.25 miles offshore from San Francisco, California. The small island was developed with facilities for a lighthouse, a military fortification, a military prison, and a federal prison from 1934 until 1963.',
    address: 'Alcatraz Island, San Francisco, CA',
    tours: [
      {
        id: 103,
        type: 'short',
        audioUrl: 'https://example.com/audio/alcatraz-short.mp3',
        transcript: 'Alcatraz Island is located in San Francisco Bay, 1.25 miles offshore from San Francisco, California. The small island was developed with facilities for a lighthouse, a military fortification, a military prison, and a federal prison from 1934 until 1963.'
      },
      {
        id: 104,
        type: 'full',
        audioUrl: 'https://example.com/audio/alcatraz-full.mp3',
        transcript: 'Alcatraz Island is located in San Francisco Bay, 1.25 miles offshore from San Francisco, California. The small island was developed with facilities for a lighthouse, a military fortification, a military prison, and a federal prison from 1934 until 1963. Beginning in November 1969, the island was occupied for more than 19 months by a group of Native Americans from San Francisco, who were part of a wave of Native activism across the nation, with public protests through the 1970s. In 1972, Alcatraz became part of Golden Gate National Recreation Area and received designation as a National Historic Landmark in 1986.'
      }
    ]
  },
  {
    id: 3,
    name: 'Statue of Liberty',
    city: 'New York',
    imageUrl: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a',
    shortDescription: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor.',
    description: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel.',
    address: 'Liberty Island, New York, NY',
    tours: [
      {
        id: 201,
        type: 'short',
        audioUrl: 'https://example.com/audio/liberty-short.mp3',
        transcript: 'The Statue of Liberty was a gift from the people of France to the United States, dedicated on October 28, 1886. The statue commemorates the centennial of the signing of the United States Declaration of Independence and was given to the United States to represent the friendship between the two countries established during the American Revolution.'
      },
      {
        id: 202,
        type: 'full',
        audioUrl: 'https://example.com/audio/liberty-full.mp3',
        transcript: 'The Statue of Liberty was a gift from the people of France to the United States, dedicated on October 28, 1886. The statue commemorates the centennial of the signing of the United States Declaration of Independence and was given to the United States to represent the friendship between the two countries established during the American Revolution. The statue is of a robed female figure representing Libertas, the Roman goddess of freedom, who bears a torch and a tabula ansata (a tablet evoking the law) upon which is inscribed the date of the American Declaration of Independence, July 4, 1776. A broken shackle and chain lie at her feet as she walks forward, commemorating the recent national abolition of slavery.'
      }
    ]
  },
  {
    id: 4,
    name: 'Empire State Building',
    city: 'New York',
    imageUrl: 'https://images.unsplash.com/photo-1546436836-07a91091f160',
    shortDescription: 'A 102-story Art Deco skyscraper in Midtown Manhattan.',
    description: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan in New York City, United States. It was designed by Shreve, Lamb & Harmon and built from 1930 to 1931. Its name is derived from "Empire State", the nickname of the state of New York.',
    address: '350 Fifth Avenue, New York, NY',
    tours: [
      {
        id: 203,
        type: 'short',
        audioUrl: 'https://example.com/audio/empire-state-short.mp3',
        transcript: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan in New York City. Construction started on March 17, 1930, and the building opened on May 1, 1931. The building has a roof height of 1,250 feet and stands a total of 1,454 feet tall, including its antenna.'
      },
      {
        id: 204,
        type: 'full',
        audioUrl: 'https://example.com/audio/empire-state-full.mp3',
        transcript: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan in New York City. Construction started on March 17, 1930, and the building opened on May 1, 1931. The building has a roof height of 1,250 feet and stands a total of 1,454 feet tall, including its antenna. The Empire State Building stood as the world\'s tallest building until the construction of the World Trade Center in 1970. Following the September 11 attacks in 2001, it was again the tallest building in New York until the new One World Trade Center was completed in April 2012.'
      }
    ]
  },
  {
    id: 5,
    name: 'Freedom Trail',
    city: 'Boston',
    imageUrl: 'https://images.unsplash.com/photo-1569261995036-70d757e4219f',
    shortDescription: 'A 2.5-mile-long path through downtown Boston that passes by 16 locations significant to the history of the United States.',
    description: 'The Freedom Trail is a 2.5-mile-long path through downtown Boston, Massachusetts, that passes by 16 locations significant to the history of the United States. Marked largely with brick, it winds between Boston Common to the Bunker Hill Monument in Charlestown.',
    address: 'Boston Common Visitor Center, 139 Tremont St, Boston, MA',
    tours: [
      {
        id: 301,
        type: 'short',
        audioUrl: 'https://example.com/audio/freedom-trail-short.mp3',
        transcript: 'The Freedom Trail is a 2.5-mile-long path through downtown Boston that passes by 16 locations significant to the history of the United States. The trail was conceived by local journalist William Schofield, who in 1951 suggested building a pedestrian trail to link important local landmarks.'
      },
      {
        id: 302,
        type: 'full',
        audioUrl: 'https://example.com/audio/freedom-trail-full.mp3',
        transcript: 'The Freedom Trail is a 2.5-mile-long path through downtown Boston that passes by 16 locations significant to the history of the United States. The trail was conceived by local journalist William Schofield, who in 1951 suggested building a pedestrian trail to link important local landmarks. Mayor John Hynes decided to put Schofield\'s idea into action. By 1953, 40,000 people were walking the trail annually. The trail includes Boston Common, Massachusetts State House, Park Street Church, Granary Burying Ground, King\'s Chapel, Benjamin Franklin statue, Old Corner Bookstore, Old South Meeting House, Old State House, Site of the Boston Massacre, Faneuil Hall, Paul Revere House, Old North Church, Copp\'s Hill Burying Ground, USS Constitution, and Bunker Hill Monument.'
      }
    ]
  },
  {
    id: 6,
    name: 'Willis Tower',
    city: 'Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    shortDescription: 'A 108-story, 1,450-foot skyscraper in Chicago.',
    description: 'Willis Tower, formerly and informally known as the Sears Tower, is a 108-story, 1,450-foot skyscraper in Chicago. At completion in 1973, it surpassed the World Trade Center in New York to become the tallest building in the world, a title it held for nearly 25 years.',
    address: '233 S Wacker Dr, Chicago, IL',
    tours: [
      {
        id: 401,
        type: 'short',
        audioUrl: 'https://example.com/audio/willis-tower-short.mp3',
        transcript: 'Willis Tower, formerly known as the Sears Tower, is a 108-story, 1,450-foot skyscraper in Chicago. At completion in 1973, it surpassed the World Trade Center in New York to become the tallest building in the world, a title it held for nearly 25 years.'
      },
      {
        id: 402,
        type: 'full',
        audioUrl: 'https://example.com/audio/willis-tower-full.mp3',
        transcript: 'Willis Tower, formerly known as the Sears Tower, is a 108-story, 1,450-foot skyscraper in Chicago. At completion in 1973, it surpassed the World Trade Center in New York to become the tallest building in the world, a title it held for nearly 25 years. The building was renamed in 2009 after the Willis Group, a global insurance broker, obtained the building\'s naming rights. The Skydeck on the 103rd floor, 1,353 feet above the ground, is a major tourist attraction. It features glass balconies extending four feet outside the building, allowing visitors to look directly through the glass floor to the street below.'
      }
    ]
  },
  {
    id: 7,
    name: 'Hollywood Sign',
    city: 'Los Angeles',
    imageUrl: 'https://images.unsplash.com/photo-1608142172657-5e2c4c8e4f3f',
    shortDescription: 'An American landmark and cultural icon overlooking Hollywood, Los Angeles.',
    description: 'The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood, Los Angeles, California. It is situated on Mount Lee, in the Hollywood Hills area of the Santa Monica Mountains. The sign was originally created in 1923 as an advertisement for a local real estate development, but due to increasing recognition, the sign was left up.',
    address: 'Hollywood Sign, Los Angeles, CA',
    tours: [
      {
        id: 501,
        type: 'short',
        audioUrl: 'https://example.com/audio/hollywood-sign-short.mp3',
        transcript: 'The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood, Los Angeles. It was originally created in 1923 as an advertisement for a local real estate development called "Hollywoodland." In 1949, the Hollywood Chamber of Commerce contracted to repair and rebuild the sign, removing the "LAND" portion.'
      },
      {
        id: 502,
        type: 'full',
        audioUrl: 'https://example.com/audio/hollywood-sign-full.mp3',
        transcript: 'The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood, Los Angeles. It was originally created in 1923 as an advertisement for a local real estate development called "Hollywoodland." In 1949, the Hollywood Chamber of Commerce contracted to repair and rebuild the sign, removing the "LAND" portion. The sign has been a frequent target of pranks and vandalism, but also an enduring symbol of the entertainment industry, and a reminder of the golden age of Hollywood. In 1978, the sign was completely rebuilt after deteriorating. The new letters are 45 feet tall and range from 31 to 39 feet wide. The new sign was unveiled on Hollywood\'s 75th anniversary, November 11, 1978, as a permanent monument to Hollywood.'
      }
    ]
  }
];

export default { mockCities, mockLandmarks };
