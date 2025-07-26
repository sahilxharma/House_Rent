import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProperty } from '../../contexts/PropertyContext';
import { Users, Building2, Calendar, TrendingUp, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const { properties, bookings, updateProperty, updateBooking } = useProperty();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'bookings' | 'users'>('overview');

  // Mock users data (in real app, this would come from API)
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'renter', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'owner', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'renter', status: 'pending' }
  ];

  const handlePropertyStatusToggle = (propertyId: string, currentStatus: boolean) => {
    updateProperty(propertyId, { available: !currentStatus });
  };

  const handleBookingStatusUpdate = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    updateBooking(bookingId, { status: newStatus });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Building2, color: 'blue' },
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'emerald' },
    { label: 'Active Users', value: mockUsers.filter(u => u.status === 'active').length, icon: Users, color: 'purple' },
    { label: 'Revenue', value: '$45,678', icon: TrendingUp, color: 'orange' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      emerald: 'bg-emerald-500 text-emerald-600 bg-emerald-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage all platform activities and users</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = getColorClasses(stat.color).split(' ');
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${colorClasses[2]}`}>
                    <Icon className={`h-6 w-6 ${colorClasses[1]}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'properties', label: 'Properties', icon: Building2 },
                { id: 'bookings', label: 'Bookings', icon: Calendar },
                { id: 'users', label: 'Users', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">New property listed by Jane Smith</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Booking confirmed for downtown apartment</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">New user registration: Bob Wilson</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active Properties</span>
                        <span className="font-semibold text-emerald-600">
                          {properties.filter(p => p.available).length}/{properties.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pending Bookings</span>
                        <span className="font-semibold text-yellow-600">
                          {bookings.filter(b => b.status === 'pending').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">User Satisfaction</span>
                        <span className="font-semibold text-blue-600">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">All Properties</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-lg object-cover"
                                  src={property.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=100'}
                                  alt={property.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-sm text-gray-500">{property.location}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {property.ownerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${property.price.toLocaleString()}/month
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                              property.available ? getStatusColor('confirmed') : getStatusColor('cancelled')
                            }`}>
                              {property.available ? 'Available' : 'Occupied'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handlePropertyStatusToggle(property.id, property.available)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const property = properties.find(p => p.id === booking.propertyId);
                    return (
                      <div key={booking.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{property?.title || 'Property Not Found'}</h4>
                            <p className="text-sm text-gray-600">Renter: {booking.renterName}</p>
                            <p className="text-sm text-gray-600">
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </p>
                            <p className="text-sm font-medium text-gray-900">${booking.totalPrice.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            {booking.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleBookingStatusUpdate(booking.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleBookingStatusUpdate(booking.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                  <span className="text-white font-medium">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="capitalize text-sm text-gray-900">{user.role}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;