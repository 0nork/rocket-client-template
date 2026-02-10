"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ExternalLink, Key, Save } from "lucide-react";

interface IntegrationStatus {
  googleSheets: boolean;
  googleDrive: boolean;
  gemini: boolean;
  cro9: boolean;
  crm: boolean;
}

interface EnvStatus {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_SHEETS_ID: string;
  GOOGLE_DRIVE_FOLDER_ID: string;
  GEMINI_API_KEY: string;
  CRO9_API_KEY: string;
  CRM_API_KEY: string;
}

function maskValue(val: string): string {
  if (!val || val === "not set") return "Not configured";
  if (val.length <= 8) return "****";
  return val.slice(0, 4) + "****" + val.slice(-4);
}

export default function SettingsPage() {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);
  const [geminiKey, setGeminiKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const [statusRes, envRes] = await Promise.all([
          fetch("/api/settings/status"),
          fetch("/api/settings/env"),
        ]);

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setStatus(statusData);
        }

        if (envRes.ok) {
          const envData = await envRes.json();
          setEnvStatus(envData);
        }
      } catch {
        // Settings endpoints may not exist yet, that's ok
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSaveGeminiKey = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "site_config",
          row: { key: "gemini_api_key", value: geminiKey },
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaveMessage("Gemini API key saved successfully");
      setGeminiKey("");
    } catch {
      setSaveMessage("Failed to save Gemini API key");
    } finally {
      setSaving(false);
    }
  };

  const integrationItems = status
    ? [
        { name: "Google Sheets", connected: status.googleSheets, description: "Content management backend" },
        { name: "Google Drive", connected: status.googleDrive, description: "Media file storage" },
        { name: "Gemini AI", connected: status.gemini, description: "AI content generation" },
        { name: "CRO9 Analytics", connected: status.cro9, description: "Analytics and behavioral tracking" },
        { name: "CRM", connected: status.crm, description: "Customer relationship management" },
      ]
    : [];

  const envItems = envStatus
    ? [
        { label: "Service Account Email", value: envStatus.GOOGLE_SERVICE_ACCOUNT_EMAIL },
        { label: "Google Sheets ID", value: envStatus.GOOGLE_SHEETS_ID },
        { label: "Google Drive Folder ID", value: envStatus.GOOGLE_DRIVE_FOLDER_ID },
        { label: "Gemini API Key", value: envStatus.GEMINI_API_KEY },
        { label: "CRO9 API Key", value: envStatus.CRO9_API_KEY },
        { label: "CRM API Key", value: envStatus.CRM_API_KEY },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-3 text-gray-500">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your integrations and configuration.
        </p>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          {integrationItems.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {integrationItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.connected ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-green-600">Connected</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-sm text-red-600">Not connected</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Unable to load integration status. The status API may not be configured yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* CRM Connection */}
      <Card>
        <CardHeader>
          <CardTitle>CRM Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Connect your CRM account to sync contacts, manage leads, and automate follow-ups.
          </p>
          <a
            href="/api/crm/connect"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Connect CRM
          </a>
        </CardContent>
      </Card>

      {/* Environment Variables (Masked) */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Status</CardTitle>
        </CardHeader>
        <CardContent>
          {envItems.length > 0 ? (
            <div className="space-y-2">
              {envItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <code className="text-sm text-gray-500 font-mono">
                    {maskValue(item.value)}
                  </code>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Unable to load environment status. The env API may not be configured yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Gemini API Key Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Gemini API Key
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Enter your Gemini API key to enable AI content generation. This will be saved
            to your site_config sheet.
          </p>
          <div className="flex gap-3">
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="Enter Gemini API key..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSaveGeminiKey}
              disabled={saving || !geminiKey.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
          {saveMessage && (
            <p
              className={`text-sm mt-2 ${
                saveMessage.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {saveMessage}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
