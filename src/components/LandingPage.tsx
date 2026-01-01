import { Car, Megaphone, TrendingUp, Users } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'advertiser' | 'vehicle' | 'dashboard') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DriveAdsNow</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-2 text-gray-600 font-medium hover:text-gray-900 transition"
              >
                View Dashboard
              </button>
              <button
                onClick={() => onNavigate('advertiser')}
                className="px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition"
              >
                For Advertisers
              </button>
              <button
                onClick={() => onNavigate('vehicle')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
              >
                For Vehicle Owners
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Turn Every Mile Into Revenue
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Connect advertisers with vehicle owners for mobile advertising. Drive your car, earn money, and help businesses reach their audience.
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => onNavigate('advertiser')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Post a Campaign
              </button>
              <button
                onClick={() => onNavigate('vehicle')}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Register Your Vehicle
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Megaphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Advertisers</h3>
              <p className="text-gray-600">
                Reach your target audience with mobile advertising. Your brand on wheels, driving through your key markets every day.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-6">
                <Car className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Vehicle Owners</h3>
              <p className="text-gray-600">
                Earn passive income by displaying ads on your vehicle. Turn your daily commute into a money-making opportunity.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Win-Win Platform</h3>
              <p className="text-gray-600">
                Seamless matching between advertisers and drivers. Track impressions, manage campaigns, and grow together.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Simple process for both advertisers and vehicle owners</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Megaphone className="w-6 h-6 mr-3 text-blue-600" />
                  For Advertisers
                </h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                    <div>
                      <strong className="text-gray-900">Submit Campaign Details</strong>
                      <p className="text-gray-700">Tell us about your advertising needs and budget</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <strong className="text-gray-900">Get Matched</strong>
                      <p className="text-gray-700">We connect you with suitable vehicles in your target areas</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <strong className="text-gray-900">Launch Campaign</strong>
                      <p className="text-gray-700">Your ads hit the road and reach thousands daily</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Car className="w-6 h-6 mr-3 text-cyan-600" />
                  For Vehicle Owners
                </h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                    <div>
                      <strong className="text-gray-900">Register Your Vehicle</strong>
                      <p className="text-gray-700">Provide details about your vehicle and driving habits</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <strong className="text-gray-900">Get Approved</strong>
                      <p className="text-gray-700">We review and match you with relevant advertisers</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <strong className="text-gray-900">Earn Money</strong>
                      <p className="text-gray-700">Drive as usual and earn passive income monthly</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white shadow-2xl">
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of advertisers and vehicle owners already using DriveAdsNow
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => onNavigate('advertiser')}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                I'm an Advertiser
              </button>
              <button
                onClick={() => onNavigate('vehicle')}
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg"
              >
                I'm a Vehicle Owner
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Car className="w-6 h-6" />
            <span className="text-xl font-bold">DriveAdsNow</span>
          </div>
          <p className="text-gray-400">
            Connecting advertisers with vehicle owners for mobile advertising solutions
          </p>
        </div>
      </footer>
    </div>
  );
}
