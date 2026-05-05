Build a SECOND local prototype representing the proposed Notification Preference Transparency initiative.

IMPORTANT:
- DO NOT modify, overwrite, rename, or delete the existing /prototype folder
- The existing /prototype folder represents the baseline current-state experience and must remain untouched
- Create a completely separate implementation in a NEW folder called /prototype2
- I need to be able to run and demo BOTH prototypes side-by-side:
  - /prototype = current-state baseline
  - /prototype2 = proposed future-state enhancement

The purpose of prototype2 is to demonstrate how the experience changes when the PRD is implemented.

Use the following context sources:
- outputs/prd-notification-transparency.md
- bdd/regression.feature
- bdd/proposed-notification-transparency.feature
- design-system.md
- feature/context.md
- business-context/customer.md
- business-context/product-strategy.md
- business-context/risk-and-compliance.md

Goals for prototype2:
- Retain the baseline journey and navigation structure
- Implement only the scoped changes defined in the PRD
- Do not introduce additional redesigns or future-state ideas outside the PRD
- Ensure the prototype demonstrates the behavioural changes captured in the proposed BDD scenarios

prototype2 must include:
- Improved category descriptions
- Illustrative notification examples
- Contextual impact confirmation when disabling a category
- Enhanced warning treatment for Security & Verification notifications
- Device-level notifications disabled behaviour
- Error handling for failed preference updates

Technical requirements:
- Build as a standalone runnable local prototype
- Create all files ONLY inside /prototype2
- Do not reference or depend on runtime assets from /prototype
- Ensure /prototype2 can run independently

The prototype must:
- Run locally using:
  npm install
  npm run dev
- Include its own package.json
- Include its own README.md

README.md should explain:
- How to run prototype2
- How prototype2 differs from prototype
- Which PRD requirements are implemented
- Which BDD scenarios are demonstrated

At the end:
- Summarise what was created
- Explain how to run both prototypes side-by-side
- Confirm that /prototype was not modified