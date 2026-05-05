# Risk and Compliance

## Overview

The MATTHEWS CORP platform must ensure that all customer communications are secure, reliable, and compliant with applicable regulations and internal policies.

Push notifications are used to deliver both informational and critical communications, including security-related alerts. As such, changes to notification preferences must not compromise customer safety, awareness, or regulatory obligations.

---

## Key Principles

### 1. Protect Critical Communications
Security and account-related notifications must be delivered reliably and in a timely manner. These notifications are essential for protecting customers and their accounts.

### 2. Maintain Customer Awareness
Customers must remain informed about important account events, particularly those requiring action or indicating risk.

### 3. Respect Customer Preferences
Customers should have control over non-essential communications, but this must be balanced against the need to deliver critical information.

### 4. Ensure Transparency
Customers must clearly understand what they are opting in or out of when managing notification preferences.

### 5. Preserve Auditability
Changes to notification preferences must be recorded and traceable for audit and compliance purposes.

---

## Mandatory Notification Considerations

Certain types of notifications may require safeguards and cannot be fully suppressed without appropriate controls. These may include:

- Security or fraud alerts
- Unusual account activity
- Transaction verification or approval requests

For these notifications:

- Delivery must remain reliable
- Suppression must be restricted or clearly communicated
- Alternative communication methods may be required if push is unavailable

---

## Customer Consent and Preferences

- Customers must be able to make informed decisions about notification preferences
- Preference controls must be clear and unambiguous
- Opt-in/opt-out behaviour must align with applicable consent frameworks
- Changes to preferences must take effect accurately and promptly

---

## Risk Considerations

### Over-Suppression Risk
Customers disabling notifications may:
- Miss critical alerts
- Fail to take required actions
- Increase exposure to fraud or account misuse

### Misclassification Risk
Incorrect categorisation of notifications may result in:
- Critical notifications being suppressed
- Non-essential notifications being over-delivered

### Notification Fatigue
Excessive or irrelevant notifications may:
- Lead to full opt-out at device level
- Reduce engagement with important messages
- Erode customer trust

---

## Device-Level Constraints

- Push notifications are dependent on OS-level permissions (iOS/Android)
- If notifications are disabled at the device level:
  - No push notifications can be delivered
  - Alternative channels may be required for critical communications

---

## Technical and Operational Requirements

- Notification delivery must remain reliable and performant
- Preference changes must be applied consistently across systems
- Systems must handle edge cases (e.g. partial failures, delayed updates)
- Critical notification pathways must be resilient

---

## Compliance Considerations

- Communication practices must align with relevant regulatory requirements
- Customers must be informed of the implications of disabling notifications
- Preference management must be auditable and reversible where appropriate
- Clear distinction should exist between essential and optional communications

---

## Implications for Product Design

- Preference controls should not allow unintended suppression of critical notifications
- Critical and non-critical notifications should be clearly separated
- Users should be guided when making decisions that could increase risk
- The system should default toward protecting customer safety and awareness
- Any changes must maintain trust, clarity, and compliance

---