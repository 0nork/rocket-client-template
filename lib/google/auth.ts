import { google } from "googleapis";

let cachedAuth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

export function getGoogleAuth() {
  if (cachedAuth) return cachedAuth;

  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured");
  }

  const credentials = JSON.parse(
    Buffer.from(keyBase64, "base64").toString("utf-8")
  );

  cachedAuth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  return cachedAuth;
}

export function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getGoogleAuth() });
}

export function getDriveClient() {
  return google.drive({ version: "v3", auth: getGoogleAuth() });
}
