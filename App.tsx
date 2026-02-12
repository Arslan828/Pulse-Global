
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserDashboard from './components/UserDashboard';
import AdminPortal from './components/AdminPortal';
import NewsApp from './components/NewsApp';

const App: React.FC = () => {
  // Pivot: News App is now the default homepage
  const [currentView, setCurrentView] = useState<AppView>(AppView.NEWS_APP);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (currentView) {
      case AppView.USER_DASHBOARD:
        return <UserDashboard />;
      case AppView.ADMIN_PORTAL:
        return <AdminPortal />;
      case AppView.NEWS_APP:
        return <NewsApp />;
      default:
        return <NewsApp />;
    }
  };

  return (
    <div className="flex h-screen bg-[#fcfcfc] text-slate-900 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentView={currentView} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
