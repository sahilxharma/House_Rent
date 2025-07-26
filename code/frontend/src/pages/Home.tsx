import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home as HomeIcon, Users, Shield, Star, ArrowRight } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const Home = () => {
  const { properties } = useProperty();
  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="text-blue-200"> Rental Home</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover amazing properties, connect with trusted owners, and make your next move effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Browse Properties</span>
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RentEase?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make property rental simple, secure, and stress-free for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Properties</h3>
              <p className="text-gray-600">
                Carefully vetted properties with detailed descriptions and high-quality photos.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-lg transition-shadow">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Connect with verified property owners and renters in a safe environment.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with industry-leading security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600">
              Discover some of our most popular rental properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative">
                  {property.images[0] && (
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                    ${property.price}/month
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.area} sqft</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  <Link
                    to={`/property/${property.id}`}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About RentEase
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're revolutionizing the property rental experience by creating a platform that puts trust, 
                transparency, and convenience at the forefront. Whether you're a renter looking for your next home 
                or a property owner seeking reliable tenants, we've got you covered.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to make property rental as simple as a few clicks while maintaining the highest 
                standards of security and user experience.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10,000+</div>
                  <div className="text-gray-600">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50,000+</div>
                  <div className="text-gray-600">Happy Users</div>
                </div>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <HomeIcon className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Your Home Awaits</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Real Estate St.<br />New York, NY 10001</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">+1 (555) 123-4567<br />Mon-Fri 9am-6pm</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">hello@rentease.com<br />support@rentease.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;