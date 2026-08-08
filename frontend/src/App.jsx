import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

import Dashboard from './pages/Dashboard';
import Experiments from './pages/Experiments';
import ExperimentDetail from './pages/ExperimentDetail';
import ChaosLab from './pages/ChaosLab';
import Settings from './pages/Settings';

import ConnectProjectModal from './components/modals/ConnectProjectModal';
import CreateExperimentModal from './components/modals/CreateExperimentModal';

function AppContent() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route
              path="/"
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
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <Router>
        <AppContent />
      </Router>
    </ProjectProvider>
  );
}
