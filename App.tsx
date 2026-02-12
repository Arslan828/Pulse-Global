
import React, { useState } from 'react';
import { AppView, Notification } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserDashboard from './components/UserDashboard';
import AdminPortal from './components/AdminPortal';
import NewsApp from './components/NewsApp';
import Login from './components/Login';
import NotificationPanel from './components/NotificationPanel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.NEWS_APP);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const [notifications] = useState<Notification[]>([
    { id: '1', title: 'Breaking: Tokyo Market Surge', message: 'Nikkei 225 reaches historic highs following tech sector rally.', time: '2m ago', type: 'breaking', read: false },
    { id: '2', title: 'Editorial Update', message: 'The Global Finance desk has updated the quarterly outlook.', time: '1h ago', type: 'update', read: true },
    { id: '3', title: 'Network Alert', message: 'London bureau connection restored. Field reports incoming.', time: '3h ago', type: 'alert', read: true },
  ]);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleUpdateUser = (updates: any) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const navigateToView = (view: AppView) => {
    // If trying to access protected views without login, show login
    if (!user && (view === AppView.ADMIN_PORTAL || view === AppView.USER_DASHBOARD)) {
      setShowLogin(true);
      return;
    }
    setCurrentView(view);
  };

  if (showLogin) {
    return <Login onLogin={handleLogin} onCancel={() => setShowLogin(false)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.USER_DASHBOARD:
        return user ? <UserDashboard /> : <NewsApp />;
      case AppView.ADMIN_PORTAL:
        return user ? <AdminPortal /> : <NewsApp />;
      case AppView.NEWS_APP:
      default:
        return <NewsApp />;
    }
  };

  return (
    <div className="flex h-screen bg-[#fcfcfc] text-slate-900 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={navigateToView} 
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={!!user}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header 
          currentView={currentView} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onOpenNotifs={() => setNotifOpen(true)}
          hasUnread={notifications.some(n => !n.read)}
          user={user}
          onSignInClick={() => setShowLogin(true)}
          onUpdateUser={handleUpdateUser}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-10">
          {renderContent()}
        </main>

        <NotificationPanel 
          isOpen={notifOpen} 
          onClose={() => setNotifOpen(false)} 
          notifications={notifications}
        />
      </div>
    </div>
  );
};

export default App;
