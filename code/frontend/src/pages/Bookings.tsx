import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProperty } from '../contexts/PropertyContext';
import { Calendar, MapPin, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Bookings = () => {
  const { user } = useAuth();
  const { bookings, properties, updateBooking, getBookingsByRenter } = useProperty();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  // Get bookings based on user.?.type
  const userBookings = user?.type === 'renter' 
    ? getBookingsByRenter(user.id)
    : bookings; // Admin and owners see all bookings

  // Filter bookings based on selected filter
  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const handleStatusUpdate = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    updateBooking(bookingId, { status: newStatus });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPropertyDetails = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.type === 'renter' ? 'My Bookings' : 'All Bookings'}
          </h1>
          <p className="text-gray-600">
            {user?.type === 'renter' 
              ? 'View and manage your property bookings'
              : 'Manage all property bookings on the platform'
            }
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status} ({userBookings.filter(b => status === 'all' || b.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You don't have any bookings yet."
                  : `No ${filter} bookings found.`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const property = getPropertyDetails(booking.propertyId);
              
              return (
                <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {property?.title || 'Property Not Found'}
                            </h3>
                            {property && (
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{property.location}</span>
                              </div>
                            )}
                            <div className="flex items-center text-gray-600">
                              <User className="h-4 w-4 mr-1" />
                              <span className="text-sm">Renter: {booking.renterName}</span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Check-in</p>
                              <p className="font-medium">{formatDate(booking.checkIn)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Check-out</p>
                              <p className="font-medium">{formatDate(booking.checkOut)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Total Price</p>
                              <p className="font-medium">${booking.totalPrice.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">
                          Booking ID: {booking.id} • Created: {formatDate(booking.createdAt)}
                        </div>
                      </div>

                      {/* Property Image */}
                      {property && property.images[0] && (
                        <div className="mt-4 lg:mt-0 lg:ml-6">
                          <div className="w-full lg:w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                              src={property.images[0]} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=200';
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons for Admin/Owner */}
                    {(user?.type === 'admin' || user?.type === 'owner') && booking.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t flex space-x-3">
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Confirm</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;