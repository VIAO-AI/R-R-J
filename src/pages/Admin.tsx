
import React from 'react';
import DeploymentManager from '../components/DeploymentManager';

const Admin = () => {
  return (
    <div className="container py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Gestión de Edge Functions</h2>
          <DeploymentManager />
        </section>
      </div>
    </div>
  );
};

export default Admin;
