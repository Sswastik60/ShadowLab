import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Experiments from './pages/Experiments';
import ExperimentDetail from './pages/ExperimentDetail';
import ChaosLab from './pages/ChaosLab';
import Settings from './pages/Settings';

import ConnectProjectModal from './components/modals/ConnectProjectModal';
import CreateExperimentModal from './components/modals/CreateExperimentModal';
import ToastNotification from './components/ui/ToastNotification';

function AppLayout() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard onOpenCreateModal={() => setIsCreateModalOpen(true)} />}
            />
            <Route
              path="/experiments"
              element={<Experiments onOpenCreateModal={() => setIsCreateModalOpen(true)} />}
            />
            <Route path="/experiments/:id" element={<ExperimentDetail />} />
            <Route path="/chaos" element={<ChaosLab />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      <ConnectProjectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

      <CreateExperimentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
}

