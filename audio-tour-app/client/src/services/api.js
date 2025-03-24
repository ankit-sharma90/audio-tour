import axios from 'axios';

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development (will be replaced with actual API calls)
const mockCities = [
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
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that is among the world\'s major commercial, financial and cultural centers.',
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

const mockLandmarks = [
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
    id: 3,
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
  }
];

// API functions
export const fetchCities = async () => {
  try {
    // In a real app, this would be:
    // const response = await api.get('/cities');
    // return response.data;
    
    // For development, return mock data
    return Promise.resolve(mockCities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const fetchCityByName = async (cityName) => {
  try {
    // In a real app, this would be:
    // const response = await api.get(`/cities/${cityName}`);
    // return response.data;
    
    // For development, return mock data
    const city = mockCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    return Promise.resolve(city || null);
  } catch (error) {
    console.error(`Error fetching city ${cityName}:`, error);
    throw error;
  }
};

export const fetchFeaturedLandmarks = async () => {
  try {
    // In a real app, this would be:
    // const response = await api.get('/landmarks/featured');
    // return response.data;
    
    // For development, return mock data
    return Promise.resolve(mockLandmarks);
  } catch (error) {
    console.error('Error fetching featured landmarks:', error);
    throw error;
  }
};

export const fetchLandmarksByCity = async (cityName) => {
  try {
    // In a real app, this would be:
    // const response = await api.get(`/landmarks?city=${cityName}`);
    // return response.data;
    
    // For development, return mock data
    const landmarks = mockLandmarks.filter(l => l.city.toLowerCase() === cityName.toLowerCase());
    return Promise.resolve(landmarks);
  } catch (error) {
    console.error(`Error fetching landmarks for ${cityName}:`, error);
    throw error;
  }
};

export const fetchLandmarkById = async (landmarkId) => {
  try {
    // In a real app, this would be:
    // const response = await api.get(`/landmarks/${landmarkId}`);
    // return response.data;
    
    // For development, return mock data
    const landmark = mockLandmarks.find(l => l.id === parseInt(landmarkId));
    return Promise.resolve(landmark || null);
  } catch (error) {
    console.error(`Error fetching landmark ${landmarkId}:`, error);
    throw error;
  }
};

export default api;
