# MATTHEWS CORP — Push Notification Preferences Prototype

A local prototype of the current-state push notification preferences journey in the MATTHEWS CORP mobile app.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app renders as a centred mobile phone frame (390px wide) on a grey desktop background.

## Navigation

1. Open the app — you land on the **Home** screen.
2. Tap **More** in the bottom navigation bar.
3. Tap **Notifications** in the settings list.
4. The **Notification Preferences** screen shows the three current categories with toggle controls.

## What you can do on the Notifications screen

| Action | How |
|---|---|
| Enable / disable a category | Tap the toggle |
| See saved preferences after refresh | Preferences persist to `localStorage` |
| Simulate device-level notifications off | Tick "Simulate device notifications off" in the Prototype controls section |
| Simulate an API error on update | Tick "Simulate API error on update" — the next toggle will fail, revert, and show an error |

## Notification categories

- **Account Activity** — Transaction updates, payment confirmations, account status changes (enabled by default)
- **Security & Verification** — Unusual activity alerts, transaction approvals, authentication messages (enabled by default)
- **Marketing & Promotions** — Product offers, campaign messaging, engagement prompts (disabled by default)

## BDD scenario coverage

| Scenario | Covered |
|---|---|
| Customer navigates to notification preferences | Yes — More > Notifications |
| Customer views available notification categories | Yes — three categories with toggles |
| Notification categories reflect stored preferences | Yes — loaded from `localStorage` on mount |
| Customer enables a notification category | Yes — toggle on |
| Customer disables a notification category | Yes — toggle off |
| Notification preferences persist across sessions | Yes — `localStorage`, survives page refresh |
| Customer receives / does not receive notifications for enabled / disabled categories | Simulated — categories visually reflect enabled state |
| Customer has a mix of enabled and disabled categories | Yes — independent toggle state per category |
| Notification preference update fails | Yes — tick "Simulate API error", toggle reverts and error message shows |
| Notifications are disabled at device level | Yes — tick "Simulate device notifications off", banner appears and all toggles are disabled |
| Multiple notification types exist within a category | Noted in helper text — category scope described, individual sub-types not manageable |
