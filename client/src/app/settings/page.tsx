"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import DurationsSettings from "@/components/settings/DurationsSettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AcademiesSettings from "@/components/settings/AcademiesSettings";
import AccountsSettings from "@/components/settings/AccountsSettings";
import TrainingTypesSettings from "@/components/settings/TrainingTypesSettings";

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("durations");

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  const tabs = [
    { id: "academies", label: "Academias" },
    { id: "training-types", label: "Tipos de Treino" },
    { id: "durations", label: "Durações" },
    { id: "accounts", label: "Contas" },
    { id: "profile", label: "Perfil" },
  ];

  return (
    <div className="w-full p-4 mt-4 gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      </div>

      <div className="sm:flex-row gap-6">
        <div className="sm:hidden w-full mb-4">
          <div className="bg-muted p-1 rounded-lg">
            <div className="flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-3 rounded-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-background"
                      : "hover:bg-background/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-full mb-6">
          <div className="bg-muted p-1 rounded-lg">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 text-center px-3 py-2 rounded-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-background"
                      : "hover:bg-background/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          {activeTab === "academies" && <AcademiesSettings />}
          {activeTab === "training-types" && <TrainingTypesSettings />}
          {activeTab === "accounts" && <AccountsSettings />}
          {activeTab === "durations" && <DurationsSettings />}
          {activeTab === "profile" && <ProfileSettings />}
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
      </div>
    </div>
  );
}
