# PRD: Notification Preference Transparency

**Initiative:** Improve Notification Preference Transparency
**Status:** Draft
**Audience:** Product, Engineering, Design, Risk & Compliance

---

### 1. Introduction & Background

**Problem**

Customers using the MATTHEWS CORP mobile app have limited visibility into what push notifications they receive, why they receive them, and what happens if they disable a category. This lack of transparency contributes directly to:

- A push notification opt-in rate of only 48% — significantly below the 60%+ target
- 18% of users disabling notifications entirely within 7 days of install
- Customers opting out of entire categories (or all notifications) because they cannot make an informed, selective decision
- Low trust in notifications as a communication channel, particularly for marketing and promotional messages

The current preferences screen shows three broad categories with a one-line label and a toggle. There is no further context about what is included in each category, how frequently notifications are sent, or what a customer will miss by turning a category off.

**Who is affected**

- All mobile app customers who receive push notifications
- Customers who have partially or fully opted out of push notifications
- Customers in the process of deciding whether to disable a category or all notifications

---

### 2. Objectives & Success Metrics

**Objectives**

1. Help customers make informed decisions about their notification preferences by improving transparency at the point of choice
2. Reduce full opt-outs driven by uncertainty or frustration, replacing them with targeted category management
3. Improve customer understanding of what each notification category contains
4. Increase engagement with the notification preferences screen

**Success Metrics**

| Metric | Baseline | Target | Notes |
|---|---|---|---|
| Push notification opt-in rate | 48% | >60% | Shared target across related initiatives |
| % of users disabling all notifications within 7 days of install | 18% | Reduction (specific target TBD) | Indicates early disengagement |
| % of users who visit preferences screen and make a change | Not currently tracked | Baseline to be established at launch | Proxy for engagement with transparency content |
| Full device-level opt-out rate | 52% | Reduction (specific target TBD) | Measures migration from full opt-out to category management |
| Support contacts related to notification confusion | Not currently tracked | Reduction (specific target TBD) | Qualitative signal of improved understanding |
| Marketing notification engagement rate | 12% | Improvement (specific target TBD) | If customers better understand what they opted into |

> **Note:** Specific numerical targets for several metrics are not defined in the initiative. These should be agreed with stakeholders before launch and used as the basis for post-launch evaluation.

---

### 3. Customer / User Journey

**Primary journey: Customer views and manages notification preferences**

1. Customer opens the MATTHEWS CORP mobile app
2. Taps **More** in the bottom navigation bar
3. Selects **Notifications** from the settings list
4. The notification preferences screen loads showing all three categories
5. Each category displays:
   - Category name
   - An improved, specific description of what is included
   - Illustrative examples of the types of notifications within that category
   - The current toggle state (enabled/disabled)
6. Customer reads the category content to understand what they are managing
7. Customer decides to disable a category and taps the toggle
8. Before the preference is saved, a contextual message is shown explaining what the customer will stop receiving if they proceed
9. Customer confirms or cancels
10. If confirmed, the preference is updated and persisted as per the existing model
11. If cancelled, the toggle returns to its previous state

**Variation: Customer with device-level notifications disabled**

- All toggles are visible but disabled
- A banner is displayed at the top of the screen explaining that device-level notifications are off
- Transparency content (descriptions and examples) remains visible and readable
- No preference changes can be made until the customer re-enables notifications at the device level

**Variation: Customer re-enabling a previously disabled category**

- Customer sees the category description and examples while the toggle is off
- Transparency content may prompt re-engagement by clarifying the value of that category
- Customer enables the toggle — no confirmation step required for enabling (only for disabling)
- Preference is saved immediately following the existing update model

**Variation: Preference update fails**

- Toggle reverts to its previous state
- Error message is displayed
- Transparency content remains visible; customer can retry

---

### 4. Scope

**In scope**

- Improved category descriptions on the notification preferences screen for all three existing categories (Account Activity, Security & Verification, Marketing & Promotions)
- Illustrative examples of notification types within each category (read-only, non-interactive)
- Contextual impact messaging shown when a customer attempts to disable a category, explaining what they will stop receiving
- Specific warning or additional context when a customer attempts to disable the Security & Verification category, given its safety-critical nature
- The Security & Verification warning must be more prominent than the standard impact message (exact treatment to be determined by design)

**Out of scope**

- Granular controls within categories (individual notification type toggles)
- Notification frequency or timing controls (e.g. digests, quiet hours)
- Changes to the existing three notification categories or their internal definitions
- Changes to backend notification tagging or delivery systems
- Changes to OS-level permission flows
- Redesign of notification content or messaging
- Email or SMS notification preference management
- Contextual entry points from within received notifications (e.g. "manage this notification")

---

### 5. Business Rules & Logic

**BR-01: Category descriptions**

- **Trigger:** Customer navigates to the notification preferences screen
- **Happy path:** Each category displays an updated description that clearly identifies the specific types of notifications included (e.g. not "Account Activity" alone but "Includes: transaction updates, payment confirmations, account status changes")
- **Unhappy path:** N/A — descriptions are static content loaded with the screen

---

**BR-02: Notification examples**

- **Trigger:** Customer views a category on the preferences screen
- **Happy path:** Each category shows a minimum of two illustrative example notifications (representing real notification types in that category). Examples are read-only. Examples do not change based on the customer's activity or history.
- **Unhappy path:** If examples cannot be loaded (e.g. content delivery failure), the category row degrades gracefully — description remains visible; examples section is hidden or shows a neutral fallback

> **Assumption:** Examples are static, editorial content managed as part of the app release cycle. Dynamic, personalised examples are out of scope.

---

**BR-03: Impact message on disabling a category**

- **Trigger:** Customer taps the toggle to disable an enabled category
- **Happy path:** Before the preference is saved, a contextual message is presented explaining what the customer will stop receiving (e.g. "You will no longer receive payment confirmation notifications"). Customer must confirm or cancel.
- **Unhappy path — customer cancels:** Toggle returns to enabled; no preference change is made
- **Unhappy path — preference update fails:** Toggle reverts; error message displayed; impact message is dismissed
- **Constraint:** The confirmation step applies only when disabling, not when enabling

---

**BR-04: Security & Verification category warning**

- **Trigger:** Customer taps the toggle to disable the Security & Verification category
- **Happy path:** A more prominent warning is shown in addition to the standard impact message. The warning must communicate that disabling this category may result in the customer missing critical security alerts, unusual activity notifications, and authentication-related messages.
- **Constraint:** The customer must be permitted to proceed after reading the warning — this is informational, not a hard block. The decision to allow customers to fully disable this category must be confirmed with risk and compliance (see Section 8).
- **Unhappy path:** Same as BR-03

---

**BR-05: No changes to the underlying toggle model**

- **Trigger:** Any preference change
- **Rule:** The underlying on/off toggle model, preference storage, and delivery behaviour are unchanged. This initiative adds transparency content only; it does not change how preferences are applied or how notifications are delivered.

---

**BR-06: Device-level notifications disabled**

- **Trigger:** Customer views the preferences screen when device-level push notifications are disabled
- **Happy path:** A banner is displayed explaining that device-level notifications are off. All transparency content (descriptions, examples) remains visible. All toggles are disabled.
- **Rule:** App-level preferences must not override or mask device-level settings. The banner must direct the customer to their device settings.

---

### 6. Design & UX Requirements

**General principles**

- Mobile-first; clean and low-clutter in line with the existing design system
- Large touch targets; rounded cards and toggles
- Clear visual hierarchy — category name, description, examples, toggle (in that order)
- Transparency content must not make the screen feel overwhelming or increase cognitive load

**Category descriptions**

- Maximum two sentences per category
- Written in plain, non-technical language for a general consumer audience
- Must accurately reflect what customers will receive — copy must be reviewed against the backend notification taxonomy before launch

**Notification examples**

- Display as a short, scannable list within each category row (not a modal or separate screen)
- Examples should resemble actual notification copy but must be clearly illustrative, not live data
- Design must make clear these are examples, not real notifications
- Expandable or always-visible treatment to be determined by design based on scroll depth and screen real-estate testing

**Impact message and warnings**

- Impact message on disable: inline, contextual, shown within the toggle interaction (e.g. bottom sheet or inline confirmation — not a disruptive full-screen modal)
- Security & Verification warning: visually distinct from the standard impact message (e.g. amber/warning colour treatment, icon)
- Both must be dismissible / confirmable with a single tap

**Accessibility**

- All new content must meet WCAG 2.1 AA contrast requirements
- Toggle controls must include accessible labels reflecting the category name and current state
- Example content must be readable by screen readers

**Error state**

- Error message on failed preference update must be visible without requiring the customer to scroll
- Error state must not obscure transparency content

---

### 7. Assumptions, Dependencies & Risk

**Assumptions**

- Notification examples will be static, editorial content managed within the app — not pulled dynamically from backend systems
- The existing three-category model (Account Activity, Security & Verification, Marketing & Promotions) is stable and will not change during this initiative
- Backend notification tagging is consistent with the category model presented in the app UI
- The preference update API and storage model are unchanged by this initiative

**Dependencies**

| Dependency | Owner | Risk if unavailable |
|---|---|---|
| Notification category taxonomy | Backend / Platform team | Cannot write accurate descriptions or examples without confirmed mapping |
| Copy / content review | Content design or legal | Inaccurate descriptions could mislead customers or create compliance exposure |
| Design system components | Design | Expandable rows, bottom sheets, or inline confirmations may require new or extended components |
| Risk & Compliance sign-off on Security & Verification warning treatment | Risk / Compliance | Cannot confirm whether the category can be disabled, or what the warning must say |
| QA on preference persistence and update flows | Engineering | Changes to the UI surface must not regress the existing toggle and persistence behaviour |

**Risks**

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Transparency content increases screen complexity and cognitive load | Medium | Medium | Design review; user research or testing before launch |
| Inaccurate category descriptions or examples erode trust | Medium | High | Copy reviewed against backend taxonomy; legal review if required |
| Security & Verification warning is insufficient to prevent customer harm | Low | High | Escalate to risk and compliance for binding guidance; consider hard block as an alternative |
| Transparency content increases time-to-decision and reduces opt-in | Low | Medium | Monitor conversion data post-launch; be prepared to iterate on copy or layout |
| Static examples become outdated as notification types evolve | Medium | Low | Define a process for updating examples at each app release cycle |

---

### 8. Key Stakeholder Guardrails

**Risk & Compliance**

- The Security & Verification category warning treatment must be reviewed and approved by risk and compliance before launch
- The question of whether customers should be permitted to fully disable the Security & Verification category is an open risk decision — this PRD assumes they can, with a warning, but this must be confirmed
- Preference changes must remain auditable; this initiative must not introduce any gap in the audit trail for preference updates
- Copy describing notification categories and their impact must be reviewed to ensure it is accurate and does not mislead customers about what they will or will not receive

**Legal / Regulatory**

- Any content describing what customers are opting in or out of must be consistent with applicable consent frameworks
- If any notification types in the Security & Verification category are considered mandatory communications under applicable regulation, the ability to disable that category may need to be restricted or the copy updated accordingly

**Engineering**

- No changes to backend notification tagging, delivery, or preference storage are in scope
- The preference update API contract is unchanged; this initiative only changes the UI layer
- Any new UI components (e.g. expandable rows, inline confirmations) must be implemented to existing design system standards

**Customer Operations**

- Support team should be briefed on the new transparency content so they can correctly handle customer queries about the changes
- A reduction in notification-related support contacts is a lagging success signal; baseline contact volume should be captured before launch

---

### 9. Monitoring, Tracking & Alerting

**Analytics events to instrument**

| Event | Description |
|---|---|
| `notification_prefs_screen_viewed` | Customer views the notification preferences screen |
| `notification_category_expanded` | Customer expands examples for a category (if expandable treatment is used) |
| `notification_disable_intent` | Customer taps toggle to disable a category (before confirmation) |
| `notification_disable_confirmed` | Customer confirms the disable action |
| `notification_disable_cancelled` | Customer cancels the disable action at the impact message step |
| `notification_enabled` | Customer enables a previously disabled category |
| `notification_prefs_error` | Preference update fails |

**Dashboards**

- Preferences screen visit rate (% of active users per week)
- Toggle change rate by category (enables vs. disables)
- Confirmation vs. cancellation rate at the impact message step
- Error rate on preference updates
- Overall notification opt-in / opt-out rate trend (weekly, segmented by category)

**Alerts**

| Alert | Threshold | Action |
|---|---|---|
| Preference update error rate spike | >5% of attempts in a 1-hour window | Page on-call engineering |
| Notification opt-out rate increase post-launch | >5 percentage point increase within 14 days of launch | PM and engineering review; consider rollback |
| Security & Verification disable rate | Baseline to be established; alert if materially higher than expected | Escalate to risk |

**Post-launch review**

- 2-week and 6-week post-launch review of all metrics above
- Qualitative review of any increase in support contacts referencing notification content or category descriptions
- Decision point at 6 weeks: iterate on copy or layout if metrics are not trending toward targets
