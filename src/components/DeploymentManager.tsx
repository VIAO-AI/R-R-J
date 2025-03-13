
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Separator } from './ui/separator';
import { CheckCircle, XCircle, RefreshCw, GitBranch, Clock } from 'lucide-react';
import { toast } from './ui/use-toast';

// Mock data for deployment history
// In a production app, this would come from your API
const deploymentHistory = [
  { 
    id: 1, 
    date: '2023-10-15 14:23', 
    status: 'success', 
    function: 'handle-reservation',
    commit: '67a8f32',
    deployer: 'GitHub Actions'
  },
  { 
    id: 2, 
    date: '2023-10-10 09:45', 
    status: 'failed', 
    function: 'handle-reservation',
    commit: '45b2d18',
    deployer: 'Manual CLI'
  },
  { 
    id: 3, 
    date: '2023-10-05 16:12', 
    status: 'success', 
    function: 'handle-reservation',
    commit: '23c9e7d',
    deployer: 'GitHub Actions'
  }
];

const DeploymentManager = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedTab, setSelectedTab] = useState('history');

  const handleManualDeploy = () => {
    setIsDeploying(true);
    
    // Simulate a deployment process
    setTimeout(() => {
      setIsDeploying(false);
      toast({
        title: "Despliegue completado",
        description: "La función Edge se ha desplegado correctamente",
      });
    }, 3000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Gestor de Despliegues</CardTitle>
        <CardDescription>
          Administra el despliegue de tus Edge Functions de Supabase
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="history" value={selectedTab} onValueChange={setSelectedTab}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="history" className="flex-1">Historial</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Configuración</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-6">
          <TabsContent value="history" className="space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted/50 p-4">
                <div className="grid grid-cols-5 font-semibold">
                  <div>Fecha</div>
                  <div>Función</div>
                  <div>Commit</div>
                  <div>Método</div>
                  <div>Estado</div>
                </div>
              </div>
              
              <div className="divide-y">
                {deploymentHistory.map((deploy) => (
                  <div key={deploy.id} className="grid grid-cols-5 p-4 items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{deploy.date}</span>
                    </div>
                    <div>{deploy.function}</div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <code className="bg-muted px-1 py-0.5 rounded text-sm">{deploy.commit}</code>
                    </div>
                    <div>{deploy.deployer}</div>
                    <div>
                      {deploy.status === 'success' ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          Exitoso
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-5 w-5" />
                          Fallido
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Alert>
              <AlertTitle>Despliegue Automático Activo</AlertTitle>
              <AlertDescription>
                Los despliegues se realizan automáticamente a través de GitHub Actions cuando se detectan cambios en las Edge Functions.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Configuraciones de Despliegue</h3>
                <p className="text-muted-foreground text-sm">
                  Configura las opciones de despliegue automático para tus Edge Functions.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium">GitHub Actions</h4>
                <p className="text-sm text-muted-foreground">
                  El despliegue automático está configurado mediante GitHub Actions. Cada vez que se realiza un push a la rama main con cambios en las Edge Functions, se despliegan automáticamente.
                </p>
                <div className="mt-2 p-3 bg-muted/50 rounded-md">
                  <code className="text-xs">supabase/functions/handle-reservation/**</code>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium">Despliegue Manual</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  También puedes desplegar manualmente las Edge Functions cuando lo necesites.
                </p>
                <Button 
                  onClick={handleManualDeploy} 
                  disabled={isDeploying}
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Desplegando...
                    </>
                  ) : (
                    'Desplegar Ahora'
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between border-t p-6">
        <div className="text-xs text-muted-foreground">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeploymentManager;
