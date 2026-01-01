import { useState } from 'react';
import { ArrowLeft, Car, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VehicleFormProps {
  onBack: () => void;
}

export default function VehicleForm({ onBack }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    owner_name: '',
    email: '',
    phone: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    vehicle_color: '',
    license_plate: '',
    daily_mileage: '',
    primary_routes: '',
    availability: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('vehicles')
        .insert([{
          owner_name: formData.owner_name,
          email: formData.email,
          phone: formData.phone,
          vehicle_make: formData.vehicle_make,
          vehicle_model: formData.vehicle_model,
          vehicle_year: parseInt(formData.vehicle_year),
          vehicle_color: formData.vehicle_color,
          license_plate: formData.license_plate,
          daily_mileage: parseInt(formData.daily_mileage),
          primary_routes: formData.primary_routes,
          availability: formData.availability
        }]);

      if (submitError) throw submitError;

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Complete!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for registering your vehicle. We'll review your application and contact you within 24-48 hours with next steps.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full">
              <Car className="w-8 h-8 text-cyan-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Vehicle Owner Registration
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Register your vehicle and start earning passive income from mobile advertising
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="owner_name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="owner_name"
                    name="owner_name"
                    required
                    value={formData.owner_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vehicle_make" className="block text-sm font-semibold text-gray-700 mb-2">
                    Make *
                  </label>
                  <input
                    type="text"
                    id="vehicle_make"
                    name="vehicle_make"
                    required
                    value={formData.vehicle_make}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="Toyota"
                  />
                </div>

                <div>
                  <label htmlFor="vehicle_model" className="block text-sm font-semibold text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="vehicle_model"
                    name="vehicle_model"
                    required
                    value={formData.vehicle_model}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="Camry"
                  />
                </div>

                <div>
                  <label htmlFor="vehicle_year" className="block text-sm font-semibold text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    id="vehicle_year"
                    name="vehicle_year"
                    required
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={formData.vehicle_year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="2020"
                  />
                </div>

                <div>
                  <label htmlFor="vehicle_color" className="block text-sm font-semibold text-gray-700 mb-2">
                    Color *
                  </label>
                  <input
                    type="text"
                    id="vehicle_color"
                    name="vehicle_color"
                    required
                    value={formData.vehicle_color}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="Silver"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="license_plate" className="block text-sm font-semibold text-gray-700 mb-2">
                    License Plate Number *
                  </label>
                  <input
                    type="text"
                    id="license_plate"
                    name="license_plate"
                    required
                    value={formData.license_plate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="ABC-1234"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driving Information</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="daily_mileage" className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Daily Mileage *
                  </label>
                  <input
                    type="number"
                    id="daily_mileage"
                    name="daily_mileage"
                    required
                    min="0"
                    value={formData.daily_mileage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="50"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Higher mileage typically means more exposure for advertisers
                  </p>
                </div>

                <div>
                  <label htmlFor="primary_routes" className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Routes & Areas *
                  </label>
                  <textarea
                    id="primary_routes"
                    name="primary_routes"
                    required
                    rows={3}
                    value={formData.primary_routes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Downtown commute, Shopping districts, Highway I-95..."
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability *
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select availability...</option>
                    <option value="Weekdays only">Weekdays only</option>
                    <option value="Weekends only">Weekends only</option>
                    <option value="Full week">Full week (7 days)</option>
                    <option value="Flexible">Flexible schedule</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-cyan-600 text-white rounded-lg text-lg font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
