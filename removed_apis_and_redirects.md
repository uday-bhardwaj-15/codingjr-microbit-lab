# Exhaustive List of Removed Microsoft APIs, Endpoints, Trackers & Redirects

This document lists **every single API call, cloud service, telemetry tracker, authentication endpoint, and external redirect** that originally communicated with Microsoft or third-party servers in this codebase, explaining what each did and how it was removed or neutralized.

---

## 1. Microsoft Cloud APIs & Endpoints

| Original API / Endpoint | Domain / Service | What It Did (Original Function) | Status & How It Was Removed |
| :--- | :--- | :--- | :--- |
| `https://www.makecode.com/api/` | Microsoft MakeCode Cloud | Central backend API for MakeCode targets. Used for cloud project sync, downloading packages, saving user scripts, script sharing, and OTAC (one-time authorization codes). | **Cut off**: Default `apiRoot` pointing to Microsoft removed. Local package management enabled via offline target bundles (`pxt-common-packages` / local `libs/`). |
| `https://makecode.com/api/` | Microsoft MakeCode Cloud | Alternative HTTP/HTTPS root for cloud scripts and project metadata. | **Cut off**: Replaced with local endpoints. Cloud sync disabled. |
| `https://makecode.com/api/kiosk/updatecode` | Microsoft Arcade / Kiosk API | Cloud sync endpoint for uploading game/editor code to MakeCode Kiosk hardware. | **Disabled**: `shareToKiosk` disabled, kiosk sync disabled. |
| `https://contentstorage.onenote.office.net/...` | Microsoft Office / OneNote CDN | Downloaded external polyfills and Immersive Reader assets from Microsoft OneNote CDN. | **Removed**: `immersiveReader: false` in `pxtarget.json`, CDN requests eliminated. |
| `https://teams.microsoft.com/share` | Microsoft Teams | Share dialog integration allowing users to publish projects directly to Microsoft Teams. | **Removed**: Removed from share options and social configuration in `pxtarget.json`. |
| `https://vscode.dev/edu/makecode/` | Microsoft VS Code Online | Redirected projects to Microsoft's cloud-hosted VS Code for Education. | **Disabled**: `showOpenInVscode: false` in `pxtarget.json`. |
| `aiErrorHelp` | Microsoft Azure AI / OpenAI | Dispatched user code and compilation errors to Microsoft AI cognitive services for code suggestions. | **Disabled & Removed**: Removed from `appTheme.enabledFeatures` in `pxtarget.json`. |

---

## 2. Telemetry, Analytics & User-Tracking Endpoints

| Tracker / Service | Destination Endpoints | What It Did (Original Function) | Status & How It Was Removed |
| :--- | :--- | :--- | :--- |
| **Usabilla Feedback & Tracking Overlay** | `//w.usabilla.com/fe98398a199e.js` | Third-party script injected on page load to record screen interactions, mouse movements, and user feedback. | **Completely Removed**: Deleted the entire Usabilla live embed script and observer from `docfiles/apptrackingweb.html`. |
| **pxtweb Analytics Script** | `/blb/pxtweb.js` |MakeCode web analytics tracking script. | **Completely Removed**: Stripped from `docfiles/apptrackingweb.html`. |
| **Microsoft Application Insights / Vortex Telemetry** | `dc.services.visualstudio.com`, `vortex.data.microsoft.com` | Pushed granular usage logs (project creation, button clicks, language switches, errors) to Microsoft telemetry collectors via `pxt.tickEvent` and `pxt.aiTrackEvent`. | **Neutralized**: `pxt.tickEvent`, `pxt.aiTrackEvent`, and `pxt.aiTrackException` converted into no-ops. `allowSimulatorTelemetry: false` set in `pxtarget.json`. |
| **CrowdIn Live Translations API** | `https://api.crowdin.com/` | Contacted CrowdIn servers dynamically on startup to download updated localized strings. | **Disabled**: `disableLiveTranslations: true` and removed `crowdinProject` in `pxtarget.json`. |

---

## 3. Authentication & Sign-in OAuth Endpoints

| Provider | Endpoint / Auth Flow | What It Did | Action Taken |
| :--- | :--- | :--- | :--- |
| **Microsoft Account (MSA / Azure AD)** | Microsoft identity OAuth2 redirect / popup | Enabled user login with Microsoft work/school/personal accounts. | **Removed** from `cloud.cloudProviders` in `pxtarget.json`. |
| **Google Sign-In** | Google OAuth2 identity flow | Google account authentication. | **Removed** from `cloud.cloudProviders` in `pxtarget.json`. |
| **Clever SSO** | Clever Single Sign-On flow | School SSO authentication. | **Removed** from `cloud.cloudProviders` in `pxtarget.json`. |
| **GitHub Identity** | GitHub OAuth login | GitHub account linking. | **Removed** from `cloud.cloudProviders` in `pxtarget.json`. |
| **Global Sign-in UI (`identity`)** | Top navigation bar avatar / sign-in button | Displayed login prompts and user profile drawer. | **Disabled**: `identity: false` in `pxtarget.json`, all auth UI hidden. |

---

## 4. Removed External Redirects & Third-Party Documentation Links

| Original URL | Location in UI | Action Taken |
| :--- | :--- | :--- |
| `https://support.microbit.org/` | Top menu / Help dropdown -> "Support" | **Removed**: `docMenu` cleared. |
| `https://microbit.org/buy/` | Top menu / Help dropdown -> "Buy" | **Removed**: `docMenu` cleared. |
| `https://makecode.com/privacy` | Settings / Footer -> "Privacy" | **Removed**: `privacyUrl: ""` set in `pxtarget.json`. |
| `https://makecode.com/termsofuse` | Settings / Footer -> "Terms of Use" | **Removed**: `termsOfUseUrl: ""` set in `pxtarget.json`. |
| `https://forum.makecode.com/` | Social / Share -> MakeCode Forum | **Removed**: `socialOptions` cleared in `pxtarget.json`. |
| `@MSMakeCode` | Share dialog -> Twitter handle | **Removed**: `socialOptions` cleared in `pxtarget.json`. |
| `https://github.com/Microsoft/pxt-microbit` | About / Project link | **Removed**: `githubUrl: ""` set in `pxtarget.json`. |
| `https://microsoft.github.io/microbit-robot/` | Simulator iframe channel | **Removed** from `simulator.messageSimulators`. |
| `https://microsoft.github.io/ml4f/` | Approved Extensions list | **Removed** from `targetconfig.json`. |
| `/device/usb` & `/reference` | Help button & Documentation links | **Removed & Hidden**: `docMenu: []`, `hasReferenceDocs: false`, and Help buttons force-hidden. |

---

## 5. UI Elements & Dialogues Removed

1. **"About..." Dialogue & Menu Items**:
   - `showAboutDialog` and `showAboutDialogAsync` modals removed.
   - Menu items for "About...", "Feedback", and "Report Abuse" stripped from the settings dropdown.
   - Version click handler in footer neutralized.
2. **Help & Documentation Buttons**:
   - Help / Reference / Hardware buttons and sidedocs pane removed.
3. **Double Logo Fix**:
   - Menubar configured with `hideMenubarLogo: true` and CSS adjusted so only the user's primary **Coding Jr** logo appears.
4. **Loading Screen**:
   - `loader.svg`, `avatar.svg`, `microbit.red.svg`, and all loading screens updated to display the user's `codingjr.webp` logo.
5. **Project Loading & Compatibility**:
   - `tryCheckTargetVersionAsync` patched to allow existing, legacy, and new projects to open seamlessly from the home screen without version errors.
   - Local tutorials now load reliably from the local filesystem with zero external network requests.
