Feature: Push notification preferences - current behaviour

  Background:
    Given the customer is logged into the mobile app

  # --- Navigation ---

  Scenario: Customer navigates to notification preferences
    When the customer opens the main menu or settings section
    And selects "Notifications"
    Then the notification preferences screen should be displayed

  # --- Visibility of preferences ---

  Scenario: Customer views available notification categories
    When the customer is on the notification preferences screen
    Then they should see a list of notification categories
    And each category should have a toggle control

  # --- Default state ---

  Scenario: Notification categories reflect stored preferences
    Given the customer has existing notification preferences
    When they view the notification preferences screen
    Then each toggle should reflect the current stored state

  # --- Toggle behaviour ---

  Scenario: Customer enables a notification category
    Given a notification category is currently disabled
    When the customer enables the toggle
    Then the preference should be updated to enabled
    And the customer should receive notifications for that category

  Scenario: Customer disables a notification category
    Given a notification category is currently enabled
    When the customer disables the toggle
    Then the preference should be updated to disabled
    And the customer should no longer receive notifications for that category

  # --- Persistence ---

  Scenario: Notification preferences persist across sessions
    Given the customer has updated their notification preferences
    When the customer logs out and logs back in
    Then the updated preferences should be retained

  # --- Delivery behaviour ---

  Scenario: Customer receives notifications for enabled categories
    Given a notification category is enabled
    When a relevant notification event occurs
    Then a push notification should be sent to the customer

  Scenario: Customer does not receive notifications for disabled categories
    Given a notification category is disabled
    When a relevant notification event occurs
    Then no push notification should be sent for that category

  # --- Mixed state behaviour ---

  Scenario: Customer has a mix of enabled and disabled categories
    Given some notification categories are enabled
    And some notification categories are disabled
    When relevant notification events occur
    Then notifications should only be sent for enabled categories

  # --- Error handling ---

  Scenario: Notification preference update fails
    Given the customer attempts to change a notification preference
    And the update request fails
    Then the toggle should revert to its previous state
    And the customer should be informed that the update failed

  # --- Device-level interaction ---

  Scenario: Notifications are disabled at device level
    Given the customer has disabled push notifications at the device level
    When a relevant notification event occurs
    Then no push notification should be delivered
    And app-level preferences should not override device settings

  # --- Category scope ---

  Scenario: Multiple notification types exist within a category
    Given a notification category contains multiple notification types
    When the category is enabled
    Then all notification types within that category may be sent
    And the customer cannot selectively disable individual types within the category