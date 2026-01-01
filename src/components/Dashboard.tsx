import { useState, useEffect } from 'react';
import { ArrowLeft, Car, Megaphone, Calendar, DollarSign, MapPin } from 'lucide-react';
import { supabase, type Advertiser, type Vehicle } from '../lib/supabase';

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'advertisers' | 'vehicles'>('advertisers');
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: advertisersData } = await supabase
        .from('advertisers')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: vehiclesData } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      setAdvertisers(advertisersData || []);
      setVehicles(vehiclesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">View all advertiser campaigns and registered vehicles</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('advertisers')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'advertisers'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Megaphone className="w-5 h-5" />
                  <span>Advertisers ({advertisers.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('vehicles')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'vehicles'
                    ? 'bg-cyan-50 text-cyan-600 border-b-2 border-cyan-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Car className="w-5 h-5" />
                  <span>Vehicles ({vehicles.length})</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading data...</p>
              </div>
            ) : activeTab === 'advertisers' ? (
              <div className="space-y-4">
                {advertisers.length === 0 ? (
                  <div className="text-center py-12">
                    <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No advertiser applications yet</p>
                  </div>
                ) : (
                  advertisers.map((advertiser) => (
                    <div
                      key={advertiser.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{advertiser.company_name}</h3>
                          <p className="text-gray-600">{advertiser.contact_name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(advertiser.status)}`}>
                          {advertiser.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start space-x-2">
                          <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Budget</p>
                            <p className="font-semibold text-gray-900">${advertiser.budget.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-semibold text-gray-900">{advertiser.duration_weeks} weeks</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 md:col-span-2">
                          <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Target Locations</p>
                            <p className="font-semibold text-gray-900">{advertiser.target_locations}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Campaign Description</p>
                        <p className="text-gray-700">{advertiser.campaign_description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Contact:</span> {advertiser.email} • {advertiser.phone}
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(advertiser.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {vehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No vehicle registrations yet</p>
                  </div>
                ) : (
                  vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}
                          </h3>
                          <p className="text-gray-600">{vehicle.owner_name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Color</p>
                          <p className="font-semibold text-gray-900">{vehicle.vehicle_color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">License Plate</p>
                          <p className="font-semibold text-gray-900">{vehicle.license_plate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Daily Mileage</p>
                          <p className="font-semibold text-gray-900">{vehicle.daily_mileage} miles</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Primary Routes</p>
                        <p className="text-gray-700">{vehicle.primary_routes}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Availability:</span> {vehicle.availability}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Contact:</span> {vehicle.email}
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(vehicle.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
