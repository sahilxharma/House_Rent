import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  ownerId: string;
  ownerName: string;
  available: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  renterName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface PropertyContextType {
  properties: Property[];
  bookings: Booking[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  getPropertiesByOwner: (ownerId: string) => Property[];
  getBookingsByRenter: (renterId: string) => Booking[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load initial data
    const storedProperties = localStorage.getItem('properties');
    const storedBookings = localStorage.getItem('bookings');
    
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    } else {
      // Initialize with sample data
      const sampleProperties: Property[] = [
        {
          id: '1',
          title: 'Modern Downtown Apartment',
          description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.',
          price: 2500,
          location: 'Downtown, New York',
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Gym'],
          ownerId: 'owner1',
          ownerName: 'John Smith',
          available: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Cozy Suburban House',
          description: 'Perfect family home with a beautiful garden and quiet neighborhood.',
          price: 3200,
          location: 'Suburbs, California',
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          images: [
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          amenities: ['Garden', 'Garage', 'WiFi', 'Pet Friendly'],
          ownerId: 'owner2',
          ownerName: 'Sarah Johnson',
          available: true,
          createdAt: new Date().toISOString()
        },
        
  {
    id: '3',
    title: 'Luxury Beachfront Villa',
    description: 'Stunning villa overlooking the ocean with private pool and modern interiors.',
    price: 8500,
    location: 'Malibu, California',
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    images: [
      'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Pool', 'Beach Access', 'WiFi', 'Security'],
    ownerId: 'owner3',
    ownerName: 'Michael Lee',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Compact City Studio',
    description: 'Affordable and compact studio apartment ideal for students and solo travelers.',
    price: 1200,
    location: 'Chicago, Illinois',
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Furnished', 'Laundry'],
    ownerId: 'owner4',
    ownerName: 'Emma Watson',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Elegant Penthouse Suite',
    description: 'Top-floor penthouse with skyline views and high-end amenities.',
    price: 7000,
    location: 'Manhattan, New York',
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    images: [
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Elevator', 'Concierge', 'Gym', 'WiFi'],
    ownerId: 'owner5',
    ownerName: 'Ava Brown',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Rustic Country Cottage',
    description: 'Charming cottage in a peaceful countryside setting.',
    price: 1500,
    location: 'Asheville, North Carolina',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    images: [
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Fireplace', 'Backyard', 'WiFi', 'Pet Friendly'],
    ownerId: 'owner6',
    ownerName: 'Liam Wilson',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Modern Loft Apartment',
    description: 'Open-concept loft with high ceilings and industrial decor.',
    price: 2800,
    location: 'Seattle, Washington',
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    images: [
      'https://tse1.mm.bing.net/th/id/OIP.SljXqTcbx3vtxWs2lMigIQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    amenities: ['WiFi', 'Washer/Dryer', 'Rooftop Access'],
    ownerId: 'owner7',
    ownerName: 'Noah Davis',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Suburban Duplex',
    description: 'Spacious duplex home perfect for families, with a fenced yard.',
    price: 2700,
    location: 'Austin, Texas',
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    images: [
      "https://tse3.mm.bing.net/th/id/OIP.qiZx2OZL3rVG0oT9_0fo_AHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Garage', 'Backyard', 'Pet Friendly'],
    ownerId: 'owner8',
    ownerName: 'Olivia Martin',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Elegant Townhouse',
    description: 'Multi-story townhouse with modern finishes and secure entry.',
    price: 3600,
    location: 'Atlanta, Georgia',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1900,
    images: [
      "https://tse3.mm.bing.net/th/id/OIP.NfjgbuvflKhe8zrk5uNLXAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
    amenities: ['Balcony', 'WiFi', 'Security System'],
    ownerId: 'owner9',
    ownerName: 'Isabella Garcia',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
  id: '11',
  title: 'Mountain View Cabin',
  description: 'Peaceful cabin with breathtaking mountain views, perfect for weekend getaways.',
  price: 2200,
  location: 'Denver, Colorado',
  bedrooms: 2,
  bathrooms: 2,
  area: 1000,
  images: [
    "https://tse4.mm.bing.net/th/id/OIP.FJmm6SHwqg5HEZLSZ9GdkAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  amenities: ['Fireplace', 'WiFi', 'Hot Tub'],
  ownerId: 'owner11',
  ownerName: 'Daniel Craig',
  available: true,
  createdAt: new Date().toISOString()
},
{
  id: '12',
  title: 'Eco-Friendly Smart Home',
  description: 'Smart home with solar panels and automated systems in a quiet eco-community.',
  price: 3900,
  location: 'Portland, Oregon',
  bedrooms: 4,
  bathrooms: 3,
  area: 2100,
  images: [
    'https://i.pinimg.com/originals/6b/b1/b1/6bb1b1d3ac5403916522ceb87d4f40c4.jpg',
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  amenities: ['Solar Panels', 'Smart Thermostat', 'Garage', 'Garden'],
  ownerId: 'owner12',
  ownerName: 'Sophia Lee',
  available: true,
  createdAt: new Date().toISOString()
},
{
  id: '13',
  title: 'Riverside Studio Apartment',
  description: 'Studio apartment right by the river, ideal for writers and artists.',
  price: 1400,
  location: 'Savannah, Georgia',
  bedrooms: 1,
  bathrooms: 1,
  area: 600,
  images: [
    "https://tse4.mm.bing.net/th/id/OIP.W9CvhZmPavQ9HoKIHWIRNAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  ],
  amenities: ['River View', 'WiFi', 'Air Conditioning'],
  ownerId: 'owner13',
  ownerName: 'Natalie Brooks',
  available: true,
  createdAt: new Date().toISOString()
},
{
  id: '14',
  title: 'City Edge Family Home',
  description: 'Spacious and modern family house with easy city access and top schools nearby.',
  price: 3300,
  location: 'Phoenix, Arizona',
  bedrooms: 4,
  bathrooms: 3,
  area: 2300,
  images: [
    'https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  amenities: ['Garage', 'Backyard', 'WiFi', 'Security'],
  ownerId: 'owner14',
  ownerName: 'Lucas Green',
  available: true,
  createdAt: new Date().toISOString()
},
  {
    id: '10',
    title: 'Downtown Condo',
    description: 'Newly renovated condo in a high-rise building with all amenities included.',
    price: 3100,
    location: 'Boston, Massachusetts',
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    images: [
      "https://th.bing.com/th/id/R.89b7f500116de85f747877946fffccbc?rik=6HYjnv9vSPKdcQ&riu=http%3a%2f%2frealestate.boston.com%2fwp-content%2fuploads%2f2017%2f09%2fLocalImageReader-1-7-1024x576.jpg&ehk=DV9NQf%2fGK5j%2bcoaceAdoAsJp%2bXS7fOXunLD%2f9lemoLQ%3d&risl=&pid=ImgRaw&r=0"
    ],
    amenities: ['Gym', 'Elevator', 'WiFi'],
    ownerId: 'owner10',
    ownerName: 'William Moore',
    available: true,
    createdAt: new Date().toISOString()
  }
]

      
      setProperties(sampleProperties);
      localStorage.setItem('properties', JSON.stringify(sampleProperties));
    }
    
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const addProperty = (property: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    const updatedProperties = properties.map(prop => 
      prop.id === id ? { ...prop, ...updatedProperty } : prop
    );
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const deleteProperty = (id: string) => {
    const updatedProperties = properties.filter(prop => prop.id !== id);
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, ...updatedBooking } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const getPropertiesByOwner = (ownerId: string) => {
    return properties.filter(prop => prop.ownerId === ownerId);
  };

  const getBookingsByRenter = (renterId: string) => {
    return bookings.filter(booking => booking.renterId === renterId);
  };

  const value = {
    properties,
    bookings,
    addProperty,
    updateProperty,
    deleteProperty,
    addBooking,
    updateBooking,
    getPropertiesByOwner,
    getBookingsByRenter
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};