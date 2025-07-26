import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProperty } from '../contexts/PropertyContext';
import { Home, Calendar, Users, TrendingUp, Plus, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { properties, bookings, getPropertiesByOwner, getBookingsByRenter } = useProperty();

 const userProperties = user?.type === 'owner' ? getPropertiesByOwner(user.id) : [];
const userBookings = user?.type === 'renter' ? getBookingsByRenter(user.id) : [];
  const getDashboardStats = () => {
    if (user?.type === 'admin') {
      return [
        { label: 'Total Properties', value: properties.length, icon: Building2, color: 'blue' },
        { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'emerald' },
        { label: 'Active Users', value: '1,234', icon: Users, color: 'purple' },
        { label: 'Revenue', value: '$45,678', icon: TrendingUp, color: 'orange' }
      ];
    } else if (user?.type === 'owner') {
      return [
        { label: 'My Properties', value: userProperties.length, icon: Building2, color: 'blue' },
        { label: 'Total Bookings', value: '12', icon: Calendar, color: 'emerald' },
        { label: 'Monthly Revenue', value: '$8,450', icon: TrendingUp, color: 'purple' },
        { label: 'Occupancy Rate', value: '89%', icon: Home, color: 'orange' }
      ];
    } else {
      return [
        { label: 'My Bookings', value: userBookings.length, icon: Calendar, color: 'blue' },
        { label: 'Favorites', value: '8', icon: Home, color: 'emerald' },
        { label: 'Total Spent', value: '$2,340', icon: TrendingUp, color: 'purple' },
        { label: 'Reviews Given', value: '15', icon: Users, color: 'orange' }
      ];
    }
  };

  const getQuickActions = () => {
    if (user?.type === 'admin') {
      return [
        { label: 'Manage Users', href: '/admin', icon: Users, color: 'blue' },
        { label: 'View All Properties', href: '/properties', icon: Building2, color: 'emerald' },
        { label: 'System Reports', href: '/admin', icon: TrendingUp, color: 'purple' }
      ];
    } else if (user?.type === 'owner') {
      return [
        { label: 'Add Property', href: '/add-property', icon: Plus, color: 'blue' },
        { label: 'Manage Properties', href: '/manage-properties', icon: Building2, color: 'emerald' },
        { label: 'View Bookings', href: '/bookings', icon: Calendar, color: 'purple' }
      ];
    } else {
      return [
        { label: 'Browse Properties', href: '/properties', icon: Building2, color: 'blue' },
        { label: 'My Bookings', href: '/bookings', icon: Calendar, color: 'emerald' },
        { label: 'Favorites', href: '/favorites', icon: Home, color: 'purple' }
      ];
    }
  };

  const stats = getDashboardStats();
  const quickActions = getQuickActions();

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
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your {user?.type} account.
          </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const colorClasses = getColorClasses(action.color).split(' ');
                  
                  return (
                    <Link
                      key={index}
                      to={action.href}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg ${colorClasses[2]} group-hover:shadow-md transition-shadow`}>
                        <Icon className={`h-5 w-5 ${colorClasses[1]}`} />
                      </div>
                      <span className="ml-3 font-medium text-gray-700 group-hover:text-gray-900">
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {user?.type === 'owner' && (
                  <>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">New property inquiry</p>
                        <p className="text-sm text-gray-600">Someone is interested in your downtown apartment</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Booking confirmed</p>
                        <p className="text-sm text-gray-600">Your suburban house has been booked for next month</p>
                      </div>
                    </div>
                  </>
                )}
                
                {user?.type === 'renter' && (
                  <>
                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Home className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">New properties match your criteria</p>
                        <p className="text-sm text-gray-600">5 new properties in your preferred area</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Booking reminder</p>
                        <p className="text-sm text-gray-600">Your check-in is in 3 days</p>
                      </div>
                    </div>
                  </>
                )}
                
                {user?.type === 'admin' && (
                  <>
                    <div className="flex items-center p-4 bg-red-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Users className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">User verification needed</p>
                        <p className="text-sm text-gray-600">3 new users pending verification</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Monthly report ready</p>
                        <p className="text-sm text-gray-600">Platform analytics for this month are available</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;