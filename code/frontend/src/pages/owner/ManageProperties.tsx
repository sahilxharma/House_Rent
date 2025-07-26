import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProperty } from '../../contexts/PropertyContext';
import { Plus, Edit, Trash2, Eye, MapPin, Bed, Bath, Square, DollarSign } from 'lucide-react';

const ManageProperties = () => {
  const { user } = useAuth();
  const { getPropertiesByOwner, deleteProperty, updateProperty } = useProperty();
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const userProperties = user ? getPropertiesByOwner(user.id) : [];

  const handleDelete = (propertyId: string) => {
    deleteProperty(propertyId);
    setShowDeleteModal(null);
  };

  const toggleAvailability = (propertyId: string, currentStatus: boolean) => {
    updateProperty(propertyId, { available: !currentStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Properties</h1>
            <p className="text-gray-600">View and manage all your listed properties</p>
          </div>
          <Link
            to="/add-property"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{userProperties.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-emerald-50">
                <Eye className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProperties.filter(p => p.available).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <Bed className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProperties.filter(p => !p.available).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-50">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${userProperties.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties List */}
        {userProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Plus className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Listed</h3>
              <p className="text-gray-600 mb-6">
                You haven't listed any properties yet. Start by adding your first property.
              </p>
              <Link
                to="/add-property"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Your First Property</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {userProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
                  {property.images[0] && (
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                    ${property.price.toLocaleString()}/month
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      property.available ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {property.available ? 'Available' : 'Occupied'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/property/${property.id}`}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Link>
                    
                    <button
                      onClick={() => toggleAvailability(property.id, property.available)}
                      className={`flex-1 py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 ${
                        property.available 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      <Edit className="h-4 w-4" />
                      <span>{property.available ? 'Mark Occupied' : 'Mark Available'}</span>
                    </button>
                    
                    <button
                      onClick={() => setShowDeleteModal(property.id)}
                      className="bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Property</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;