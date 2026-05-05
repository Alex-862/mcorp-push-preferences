# Feature Analysis: Push Notification Preferences — MATTHEWS CORP

### Feature Summary

The push notification preferences feature gives MATTHEWS CORP customers the ability to control which types of notifications they receive on their mobile app. Currently, only 48% of customers have push notifications enabled, contributing to reduced reach of important communications and lower engagement. This feature provides a more accessible preferences interface with three broad notification categories (Account Activity, Security & Verification, Marketing & Promotions) controlled via simple on/off toggles.

The feature is fundamentally about customer control and transparency. By allowing customers to selectively disable unwanted notifications rather than disabling all notifications at the device level, MATTHEWS CORP aims to increase opt-in rates to above 60%, improve overall engagement, and reduce the friction that currently causes customers to disengage entirely.

This is a current-state baseline feature: the prototype documents and represents existing functionality with minimal enhancements, not a future redesign.

---

### User Journey / Flow

**Navigation and Access**

1. Customer opens the mobile app and taps the "More" tab in the bottom navigation
2. Navigates to the "Notifications" menu item (first item under "Settings")
3. Lands on the notification preferences screen

**On the Notification Preferences Screen**

1. Customer sees a warning banner if device-level notifications are disabled, informing them to enable notifications in device settings
2. Customer views three notification categories with descriptions and toggle controls:
   - **Account Activity** — Transaction updates, payment confirmations, account status changes
   - **Security & Verification** — Unusual activity alerts, transaction approvals, authentication messages
   - **Marketing & Promotions** — Product offers, campaign messaging, engagement prompts
3. Default state: Account and Security categories are enabled; Marketing is disabled
4. Customer can toggle each category on or off
5. Toggles are disabled if the previous update is still processing or if device notifications are off
6. If an update fails, the toggle reverts to its previous state and an error message appears
7. Changes take effect immediately upon successful save

**Contextual Information**

- Helper text below the categories explains that categories contain multiple notification types that cannot be individually managed
- Customers understand the scope and limitation of the preference controls

---

### Key Logic and Behaviours

**Preference Storage and Persistence**

- Preferences are stored at the user profile level and applied across sessions and devices
- The prototype uses localStorage for demonstration; production uses backend storage
- Preferences persist across device changes and app sessions

**Toggle Behaviour and State Management**

- Each category toggle is a binary control (enabled/disabled)
- When a customer changes a preference, an optimistic update occurs immediately (UI updates before the server confirms)
- A simulated API call validates the change
- If the API call succeeds, preferences are saved
- If the API call fails, the toggle reverts and an error message displays
- Toggles are disabled during update operations to prevent simultaneous conflicting requests

**Device-Level Interaction**

- If push notifications are disabled at the device/OS level, the app displays a warning banner
- App-level preferences are retained but inactive — they do not override device settings
- Toggles are disabled when device notifications are off
- The customer must re-enable notifications in device settings for any preferences to take effect

**Default Configuration**

| Category | Default |
|---|---|
| Account Activity | Enabled |
| Security & Verification | Enabled |
| Marketing & Promotions | Disabled |

**Error Handling**

- Failed preference updates revert the toggle to its previous state
- A user-facing error message explains the failure and prompts retry
- The specific API error is not exposed to the customer

---

### Dependencies

**Internal Systems**

- **Notification Delivery Platform** — Reads customer preferences and applies them when deciding whether to send notifications
- **Customer Preference Storage System** — Backend database that stores and retrieves notification preferences
- **Mobile App UI** — iOS and Android implementations must support the same preference categories and controls
- **Security and Verification Systems** — Must respect that Security & Verification notifications should not be suppressed
- **Marketing Communication Systems** — Must respect that Marketing notifications can be disabled

**External Constraints**

- **OS-level Notification Permissions** — iOS and Android handle device-level permissions independently; the app cannot override device settings
- **Notification Delivery Latency** — Changes must propagate to the notification delivery platform in near real-time

**Data Dependencies**

- Notification categorisation must be consistent between the app UI and backend delivery logic
- The three categories must align with how notifications are tagged internally

---

### Risks / Gaps / Unknowns

**Critical Risks**

1. **Over-Suppression of Security Notifications** — Customers can technically disable the Security & Verification category, which could result in missing critical fraud alerts or account compromise notifications. No explicit safeguard prevents this. Mitigation approach is undefined.

2. **Inconsistent Behaviour Across Platforms** — iOS and Android may handle preferences or notification delivery differently. Cross-platform consistency is noted but not explicitly verified.

3. **Notification Fatigue Remains Unaddressed** — The feature provides category-level control but does not solve the underlying volume problem. 40% of customers receive more than 5 notifications per week; disabling an entire category is the only option available.

**Significant Gaps**

1. **No Granularity Within Categories** — Customers cannot selectively disable specific notification types within a category (e.g., disable promotional offers but keep product feature announcements). This is acknowledged but not resolved in this feature.

2. **No Frequency or Timing Controls** — Customers cannot choose digest notifications, quiet hours, or batching. All enabled notifications are delivered in real-time.

3. **Limited Transparency** — Customers see category descriptions but cannot view examples of notifications they will receive, understand notification frequency or volume, or see the consequences of disabling a category.

4. **No Contextual Entry Points** — Customers cannot manage preferences from within a received notification or from other relevant moments in the app. The screen is only discoverable via the "More" menu.

5. **Marketing Engagement Is Weak** — Marketing notifications have only 12% engagement versus 35–42% for service notifications. The feature does not address the underlying relevance or content quality problem.

**Technical Unknowns**

1. **Preference Change Propagation Time** — How quickly do preference changes reach all backend systems? Latency could cause notifications to be sent or suppressed inconsistently with what the customer expects.

2. **Multi-Device Synchronisation** — If a customer changes preferences on multiple devices, which takes precedence? The documentation states preferences apply "across devices" but synchronisation logic is undefined.

3. **Error Recovery and Retry Logic** — What happens if a preference update fails repeatedly? The prototype shows a single failure state but does not define retry strategy or graceful degradation.

4. **API Timeout and Network Failure Handling** — Real-world scenarios such as slow networks or timeouts are not documented.

5. **Audit and Compliance Logging** — The risk-and-compliance documentation states that preference changes must be "auditable," but no logging mechanism or format is specified.

**Product Unknowns**

1. **Causal Link to Opt-In Rate** — The feature targets an increase in opt-in rate from 48% to >60%, but it is not clear how the feature alone will drive this improvement or what other initiatives support the goal.

2. **Customer Behaviour Post-Launch** — Whether customers will actually enable more notifications when given control, or continue to disable them, is an assumption that has not been validated.

3. **Re-Engagement Strategy** — There is no documented strategy to encourage customers who have already opted out to re-engage with notifications.

4. **Mandatory vs. Optional Notifications** — The risk document references the need for "safeguards" on certain notifications but does not define which categories are mandatory or what the safeguard mechanism is.

---

### Suggested Next Steps

**For Product and Design**

1. **Define Critical Notification Policy** — Establish a clear policy for which notifications cannot be disabled. Options include: preventing disabling of the Security & Verification category; allowing it but with an explicit warning/confirmation; or introducing a separate always-on "critical alerts" category. Determine which approach aligns with compliance and risk tolerance before launch.

2. **Plan the Granularity Roadmap** — This feature is a stepping stone. Define when sub-category controls will be introduced and prioritise based on customer demand data gathered post-launch.

3. **Measure Adoption and Behaviour** — Plan to track: the proportion of customers who visit the preferences screen; which categories they enable or disable; whether opt-in rates increase; whether re-enabled customers remain engaged; and correlation between preference changes and disengagement.

4. **Develop a Re-Engagement Strategy** — The feature allows opt-in but does not drive it. Consider in-app education on notification value, contextual prompts that explain what the customer will miss, and graduated re-introduction for disengaged users.

5. **Address Marketing Notification Relevance** — Investigate whether the 12% engagement rate is driven by volume, relevance, or content quality, and determine whether marketing communications should be handled separately from service notifications.

**For Engineering and Operations**

1. **Cross-Platform Validation** — Ensure iOS and Android implementations are functionally identical and that preferences sync correctly between platforms.

2. **Preference Propagation Testing** — Verify that preference changes reach the notification delivery platform within the acceptable latency window and document the propagation time.

3. **Error Handling and Recovery** — Implement and test retry logic for failed updates, graceful degradation if the preference service is unavailable, and fallback behaviour (e.g., default to safe state).

4. **Audit and Logging** — Ensure preference changes are logged with customer ID, timestamp, category, and new state for compliance and debugging purposes.

5. **Multi-Device Synchronisation Testing** — Clarify and test behaviour when a customer changes preferences on multiple devices simultaneously or within a short time window.

**For Risk and Compliance**

1. **Document Mandatory Notification Handling** — Work with legal and compliance to define which notifications cannot be suppressed and how this is communicated to customers in the UI.

2. **Privacy and Consent Alignment** — Verify that the preference UI and behaviour align with applicable regulations (e.g., GDPR) regarding customer consent and communication preferences.

3. **Customer Communication** — Prepare clear customer-facing communication about the feature: what it enables, what it does not do, and how to re-enable notifications if needed.
