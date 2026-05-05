# Push Notification Context

## Overview

Push notifications are a primary communication channel within the MATTHEWS CORP mobile app, used for:

- Account activity updates
- Transaction alerts
- Security and verification events
- Marketing and promotional messaging

Notifications are triggered by backend systems and delivered to users in near real-time.

---

## Current User Journey

1. User opens the mobile app
2. Navigates to a secondary menu (e.g. profile or “More” section)
3. Selects “Notifications”
4. Views available notification categories
5. Uses toggle controls to enable or disable categories

The notification preferences screen is not surfaced prominently and is not part of primary navigation.

---

## Current Preference Model

- Preferences are controlled via simple on/off toggles
- Categories are broadly defined (e.g. account activity, security, marketing)
- Limited granularity within each category
- No ability to:
  - customise frequency
  - choose specific sub-types of notifications
  - view examples of notifications

---

## Notification Delivery Behaviour

- Notifications are triggered by backend events or campaigns
- All enabled categories are delivered in real-time
- No batching or digest functionality exists
- No prioritisation logic exposed to the user

---

## Category Types (Current)

### Account Activity
- Transaction updates
- Payment confirmations
- Account status changes

### Security / Verification
- Unusual activity alerts
- Transaction approvals
- Authentication-related messages

### Marketing / Promotions
- Product offers
- Campaign messaging
- Engagement prompts

Categories are grouped broadly and may contain multiple underlying notification types.

---

## Limitations in Current System

- Lack of granularity within categories
- Binary control (on/off only)
- No frequency or timing controls
- No hierarchy between critical and optional notifications
- No visibility into:
  - notification volume
  - notification content
  - consequences of disabling notifications

---

## Device-Level Interaction

- Push notifications are subject to OS-level permissions (iOS/Android)
- If notifications are disabled at device level:
  - no push notifications are delivered
  - app-level preferences remain unchanged but ineffective

---

## Data & Preference Storage

- Notification preferences are stored at the user profile level
- Preferences are applied across sessions and devices
- Updates are expected to propagate in near real-time

---

## Technical Constraints

- Notification delivery is handled by a central messaging platform
- Integration required across:
  - transaction systems
  - security systems
  - marketing systems
- Limited support for:
  - dynamic personalisation at delivery level
  - advanced scheduling or batching

---

## Risk Considerations

- Certain notifications (e.g. security alerts) are critical for customer safety
- Over-suppression of notifications may result in:
  - missed important events
  - increased risk exposure
- Misclassification of notification types may lead to:
  - inappropriate suppression
  - poor user experience

---

## UX Constraints

- Preferences are not easily discoverable
- Current UI is simple but lacks flexibility
- Limited explanation of notification categories
- No contextual entry points (e.g. from a received notification)

---

## Opportunities

- Improve transparency around notifications
- Increase perceived value of notifications
- Reduce notification fatigue
- Enable more relevant and targeted communication
- Increase engagement and retention via better communication control

---