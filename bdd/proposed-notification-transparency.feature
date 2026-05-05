Feature: Notification preference transparency

  Background:
    Given the customer is logged into the mobile app
    And the customer has navigated to the notification preferences screen

  # --- Category descriptions ---

  Scenario: Account Activity category displays an improved description
    When the notification preferences screen has loaded
    Then the "Account Activity" category displays a description that identifies the specific notification types it contains

  Scenario: Security & Verification category displays an improved description
    When the notification preferences screen has loaded
    Then the "Security & Verification" category displays a description that identifies the specific notification types it contains

  Scenario: Marketing & Promotions category displays an improved description
    When the notification preferences screen has loaded
    Then the "Marketing & Promotions" category displays a description that identifies the specific notification types it contains

  # --- Notification examples ---

  Scenario: Each category displays at least two illustrative notification examples
    When the notification preferences screen has loaded
    Then the "Account Activity" category shows a minimum of two illustrative notification examples
    And the "Security & Verification" category shows a minimum of two illustrative notification examples
    And the "Marketing & Promotions" category shows a minimum of two illustrative notification examples

  Scenario: Notification examples are read-only and not interactive
    When the notification preferences screen has loaded
    Then the notification examples within each category cannot be tapped or interacted with

  Scenario: Notification examples are presented as illustrative content, not live data
    When the notification preferences screen has loaded
    Then the examples within each category are visually presented as illustrative, not as real received notifications

  Scenario: Examples section is hidden when example content cannot be loaded
    Given the notification examples content cannot be loaded due to a content delivery failure
    When the notification preferences screen loads
    Then the description for each affected category remains visible
    And the examples section for each affected category is hidden or shows a neutral fallback
    And no error is presented to the customer relating to example content

  # --- Impact message on disabling a category ---

  Scenario: Customer is shown an impact message before disabling Account Activity
    Given the "Account Activity" category is currently enabled
    When the customer taps the toggle to disable the "Account Activity" category
    Then an impact message is displayed explaining what notifications the customer will stop receiving
    And the preference is not saved until the customer confirms or cancels

  Scenario: Customer is shown an impact message before disabling Marketing & Promotions
    Given the "Marketing & Promotions" category is currently enabled
    When the customer taps the toggle to disable the "Marketing & Promotions" category
    Then an impact message is displayed explaining what notifications the customer will stop receiving
    And the preference is not saved until the customer confirms or cancels

  Scenario: Customer confirms the disable action from the impact message
    Given the "Account Activity" category is currently enabled
    And the customer has tapped the toggle to disable "Account Activity"
    And the impact message is displayed
    When the customer confirms the disable action
    Then the "Account Activity" preference is saved as disabled
    And the impact message is dismissed

  Scenario: Customer cancels the disable action from the impact message
    Given the "Account Activity" category is currently enabled
    And the customer has tapped the toggle to disable "Account Activity"
    And the impact message is displayed
    When the customer cancels the disable action
    Then the "Account Activity" toggle returns to the enabled state
    And no preference change is saved

  # --- Security & Verification category warning ---

  Scenario: Customer is shown a prominent warning when disabling Security & Verification
    Given the "Security & Verification" category is currently enabled
    When the customer taps the toggle to disable the "Security & Verification" category
    Then a warning is displayed communicating that disabling this category may result in missing critical security alerts, unusual activity notifications, and authentication-related messages
    And this warning is visually distinct from and more prominent than the standard impact message

  Scenario: The Security & Verification warning does not block the customer from proceeding
    Given the "Security & Verification" category is currently enabled
    And the customer has tapped the toggle to disable "Security & Verification"
    And the Security & Verification warning is displayed
    When the customer confirms the disable action
    Then the "Security & Verification" preference is saved as disabled
    And the warning is dismissed

  Scenario: Customer cancels after seeing the Security & Verification warning
    Given the "Security & Verification" category is currently enabled
    And the customer has tapped the toggle to disable "Security & Verification"
    And the Security & Verification warning is displayed
    When the customer cancels the disable action
    Then the "Security & Verification" toggle returns to the enabled state
    And no preference change is saved

  # --- Re-enabling a previously disabled category ---

  Scenario: Customer re-enables a previously disabled category without a confirmation step
    Given the "Marketing & Promotions" category is currently disabled
    When the customer taps the toggle to enable the "Marketing & Promotions" category
    Then no impact message or confirmation step is presented
    And the "Marketing & Promotions" preference is saved as enabled immediately

  Scenario: Transparency content is visible for a disabled category
    Given the "Marketing & Promotions" category is currently disabled
    When the customer views the notification preferences screen
    Then the description and notification examples for "Marketing & Promotions" are visible and readable
    And the toggle reflects the disabled state

  # --- Device-level notifications disabled ---

  Scenario: A banner is displayed when device-level push notifications are disabled
    Given the customer has disabled push notifications at the device level
    When the notification preferences screen loads
    Then a banner is displayed at the top of the screen explaining that device-level notifications are off
    And the banner directs the customer to their device settings

  Scenario: Transparency content remains visible when device-level notifications are disabled
    Given the customer has disabled push notifications at the device level
    When the notification preferences screen loads
    Then the descriptions and notification examples for all three categories remain visible and readable

  Scenario: All category toggles are disabled when device-level notifications are off
    Given the customer has disabled push notifications at the device level
    When the notification preferences screen loads
    Then the toggles for all three categories are disabled and cannot be changed

  # --- Preference update failure ---

  Scenario: Toggle reverts when a preference update fails
    Given the "Marketing & Promotions" category is currently enabled
    And the customer has confirmed disabling "Marketing & Promotions"
    When the preference update request fails
    Then the "Marketing & Promotions" toggle reverts to the enabled state

  Scenario: An error message is shown when a preference update fails
    Given the customer has confirmed a preference change
    When the preference update request fails
    Then an error message is displayed that is visible without the customer needing to scroll
    And the error message does not obscure the transparency content

  Scenario: Transparency content remains visible after a preference update failure
    Given the customer has confirmed disabling a category
    When the preference update request fails
    Then the category descriptions and notification examples remain visible and readable
    And the customer is able to retry the action
