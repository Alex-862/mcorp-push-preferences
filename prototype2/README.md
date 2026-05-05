# MATTHEWS CORP — Prototype 2: Notification Preference Transparency

This is the **proposed future-state** prototype demonstrating the Notification Preference Transparency initiative.

It runs alongside `/prototype` (the current-state baseline) so both experiences can be demoed side-by-side.

---

## How to run

```bash
cd prototype2
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

> Prototype 1 (current-state) runs on port 3000. Prototype 2 (proposed) runs on port 3001.

---

## How to run both side-by-side

Open two terminal windows:

**Terminal 1 — current-state baseline:**
```bash
cd prototype
npm run dev
# → http://localhost:3000
```

**Terminal 2 — proposed future-state:**
```bash
cd prototype2
npm run dev
# → http://localhost:3001
```

Open both in separate browser windows or tabs to compare the experiences.

---

## How prototype2 differs from prototype

The navigation structure, home screen, and all placeholder screens are identical. The differences are entirely on the **Notifications screen** (More → Notifications):

| Behaviour | Prototype 1 (current-state) | Prototype 2 (proposed) |
|---|---|---|
| Category descriptions | Short one-line label only | Specific description listing the notification types included |
| Notification examples | None | Two illustrative example notifications per category, clearly marked as examples |
| Disabling a category | Toggle saves immediately | Inline confirmation with impact message before saving |
| Security & Verification disable | Standard toggle | Inline impact message + additional prominent amber warning |
| Re-enabling a category | Toggle saves immediately | Toggle saves immediately (no confirmation required) |
| Device-level disabled | Warning banner + toggles disabled | Warning banner + toggles disabled + descriptions and examples still readable |
| Error on update | Toggle reverts + error message | Toggle reverts + error message above content (content remains readable) |
| localStorage key | `mcorp_notification_prefs` | `mcorp2_notification_prefs` (independent state) |

---

## PRD requirements implemented

From `outputs/prd/notification-preference.md`:

- **BR-01** — Improved category descriptions: each category identifies the specific notification types it contains
- **BR-02** — Illustrative examples: minimum two examples per category, read-only, clearly illustrative
- **BR-03** — Impact message on disable: shown before preference is saved; customer must confirm or cancel
- **BR-04** — Security & Verification warning: additional amber warning box, visually distinct from the standard impact message; customer can still proceed
- **BR-05** — Underlying toggle model unchanged: same on/off behaviour and persistence as baseline
- **BR-06** — Device-level disabled: banner shown, transparency content remains visible, all toggles disabled

---

## BDD scenarios demonstrated

From `bdd/proposed-notification-transparency.feature`:

| Scenario group | Demonstrated |
|---|---|
| Category descriptions (3 scenarios) | All three categories show specific descriptions on screen load |
| Notification examples (4 scenarios) | 2+ examples per category; read-only; labelled as illustrative; graceful fallback not triggerable in prototype (static content) |
| Impact message on disable (4 scenarios) | Tap any enabled toggle → impact message appears; confirm saves; cancel reverts |
| Security & Verification warning (3 scenarios) | Tap Security toggle → amber warning shown above confirm/cancel; confirm saves; cancel reverts |
| Re-enabling (2 scenarios) | Tap a disabled toggle → saves immediately with no confirmation; descriptions and examples visible even when toggle is off |
| Device-level disabled (3 scenarios) | Tick "Simulate device notifications off" → banner + readable content + disabled toggles |
| Preference update failure (3 scenarios) | Tick "Simulate API error on update" → confirm a disable → toggle reverts, error shown above content |

### Prototype controls

Use the **Prototype controls** section at the bottom of the Notifications screen to:

| Control | Simulates |
|---|---|
| Simulate device notifications off | Device-level push notifications disabled — banner appears, toggles locked |
| Simulate API error on update | Next preference update fails — toggle reverts, error message shown |
