import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProperty } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Bed, Bath, Square, Star, Calendar, User, ArrowLeft, Heart } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, addBooking } = useProperty();
  const { user, isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    setIsBooking(true);
    
    // Calculate total price (simplified calculation)
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * property.price;

    const booking = {
      propertyId: property.id,
      renterId: user.id,
      renterName: user.name,
      checkIn,
      checkOut,
      totalPrice,
      status: 'pending' as const
    };

    addBooking(booking);
    setIsBooking(false);
    setShowBookingForm(false);
    
    // Show success message or redirect
    alert('Booking request submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="h-96 bg-gradient-to-r from-blue-400 to-blue-600">
                {property.images[0] && (
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {property.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {property.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="h-20 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${property.title} ${index + 2}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.area} sqft</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-gray-700">4.8 (24 reviews)</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Owner</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{property.ownerName}</h3>
                  <p className="text-gray-600">Property Owner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${property.price.toLocaleString()}
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8 · 24 reviews</span>
                </div>
              </div>

              {property.available ? (
                <>
                  {!showBookingForm ? (
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Book Now
                    </button>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowBookingForm(false)}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isBooking}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {isBooking ? 'Booking...' : 'Confirm'}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="bg-red-50 text-red-600 py-3 px-4 rounded-lg mb-4">
                    This property is currently not available
                  </div>
                  <button
                    className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Not Available
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Service fee</span>
                  <span>$50</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Cleaning fee</span>
                  <span>$25</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${(property.price + 75).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;