// Server entry on purpose: the "inscribed" root entry is a client module, and its
// createCmsConfig could not be called from the server components that import this.
import { createCmsConfig } from "inscribed/page";

// Read when the server starts, not at build: one image runs in sandbox and production.
// Without CMS_URL (local development, the build itself) it reads the sandbox CMS, whose
// published content needs no token.
const SANDBOX_CMS = "https://sandbox-api.yildizskylab.com/api";

export const cmsConfig = createCmsConfig({
  baseUrl: process.env.CMS_URL || SANDBOX_CMS,
  // The site's Keycloak client is also its tenant on the CMS and the key for
  // tokenless reads of published content.
  clientKey: process.env.KEYCLOAK_CLIENT_ID || "frontend-artlab",
  // Image uploads go through the site's own route to core (src/app/api/cms-media).
  cdnUrl: "/api/cms-media",
  adminLocale: "tr",
  // The editing panel in the site's own palette and type.
  theme: {
    accent: "#f5b82e",
    collectionAccent: "#3ed6f0",
    danger: "#f0607a",
    bg: "#0b0e13",
    surface: "#ffffff",
    text: "#e9edf2",
    radius: 2,
    fontSans: "var(--font-manrope), system-ui, sans-serif",
  },
});
