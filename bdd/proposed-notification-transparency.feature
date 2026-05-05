Feature: Notification preference transparency

  Background:
    Given the customer is logged into the mobile app
    And the customer has navigated to the notification preferences screen

  # --- Category transparency ---

  Scenario: Notification categories display additional context
    When the notification preferences screen loads
    Then each notification category displays:
      | Description |
      | Notification Examples |

  Scenario: Notification examples are informational only
    When the notification preferences screen loads
    Then notification examples cannot be interacted with

  Scenario: Notification categories remain visible if example content cannot be loaded
    Given notification example content cannot be loaded
    When the notification preferences screen loads
    Then notification category descriptions remain visible
    And the screen continues to load successfully

  # --- Disabling categories ---

  Scenario: Customer receives confirmation before disabling a category
    Given the "Account Activity" category is enabled
    When the customer attempts to disable the category
    Then a confirmation message is displayed
    And the preference is not updated until the customer confirms

  Scenario: Customer confirms disabling a category
    Given the customer is viewing a confirmation message for disabling "Account Activity"
    When the customer confirms the action
    Then the "Account Activity" category is saved as disabled

  Scenario: Customer cancels disabling a category
    Given the customer is viewing a confirmation message for disabling "Account Activity"
    When the customer cancels the action
    Then the "Account Activity" category remains enabled
    And no preference change is saved

  # --- Security & Verification behaviour ---

  Scenario: Customer receives additional warning before disabling Security & Verification
    Given the "Security & Verification" category is enabled
    When the customer attempts to disable the category
    Then an additional warning message is displayed
    And the customer must confirm or cancel the action

  Scenario: Customer confirms disabling Security & Verification
    Given the customer is viewing the Security & Verification warning
    When the customer confirms the action
    Then the "Security & Verification" category is saved as disabled

  Scenario: Customer cancels disabling Security & Verification
    Given the customer is viewing the Security & Verification warning
    When the customer cancels the action
    Then the "Security & Verification" category remains enabled
    And no preference change is saved

  # --- Enabling categories ---

  Scenario: Customer enables a disabled category
    Given the "Marketing & Promotions" category is disabled
    When the customer enables the category
    Then the preference is saved as enabled
    And no confirmation step is required

  Scenario: Transparency content remains visible for disabled categories
    Given the "Marketing & Promotions" category is disabled
    When the notification preferences screen loads
    Then the category description and notification examples remain visible

  # --- Device-level notification behaviour ---

  Scenario: Device-level notification settings override app preferences
    Given device-level push notifications are disabled
    When the notification preferences screen loads
    Then notification preference controls are disabled
    And the customer is informed that device notifications are disabled

  Scenario: Transparency content remains visible when device notifications are disabled
    Given device-level push notifications are disabled
    When the notification preferences screen loads
    Then notification category descriptions remain visible
    And notification examples remain visible

  # --- Preference update failures ---

  Scenario: Preference state reverts when an update fails
    Given the customer confirms disabling "Marketing & Promotions"
    When the preference update request fails
    Then the "Marketing & Promotions" category returns to its previous state

  Scenario: Customer is informed when a preference update fails
    Given the customer confirms a preference change
    When the preference update request fails
    Then an error message is displayed

  Scenario: Customer can retry after a failed preference update
    Given a preference update request has failed
    When the customer remains on the notification preferences screen
    Then the customer can retry the preference change