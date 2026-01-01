import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AdvertiserForm from './components/AdvertiserForm';
import VehicleForm from './components/VehicleForm';
import Dashboard from './components/Dashboard';

type Page = 'landing' | 'advertiser' | 'vehicle' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'advertiser' && (
        <AdvertiserForm onBack={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'vehicle' && (
        <VehicleForm onBack={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;
