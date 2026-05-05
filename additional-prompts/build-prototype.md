You are building a local prototype of the current-state MATTHEWS CORP mobile app push notification preferences journey.

This is a baseline prototype only. Do not introduce any future-state improvements, new categories, new flows, or redesigned functionality.

Use the following files as source context:
- feature/feature.md
- feature/metrics.md
- feature/context.md
- business-context/product-strategy.md
- business-context/customer.md
- business-context/risk-and-compliance.md
- bdd/regression.feature
- design-system.md

Goal:
Create a fully operational local prototype that I can run on localhost.

Prototype requirements:
- Build a simple mobile app UI
- Include a bottom navigation bar
- Include a “More” area or settings area
- Allow the user to navigate to “Notifications”
- Show the current limited notification preferences experience
- Use toggle controls for the existing broad categories only
- Persist toggle state locally during the session
- Show basic error handling if a preference update fails, if appropriate
- Reflect device-level notification disabled behaviour as a simulated state
- Do not add future-state granular controls
- Do not add new notification categories beyond those implied by the current context

Technical requirements:
- Use a simple Next.js or React app
- Use Node/npm
- Keep the app easy to run locally
- Include setup instructions in README.md
- Ensure I can run it using:
  npm install
  npm run dev

Output:
- Create the prototype files in the /prototype folder
- Explain what files were created
- Explain how to run the prototype locally
- Confirm how the prototype maps to the baseline BDD scenarios