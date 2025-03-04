import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "04b9925f-a339-4355-baab-baa5a6f8e9c2",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
