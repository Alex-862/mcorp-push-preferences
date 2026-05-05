# Push Notification Preferences

## Overview

Push notifications are a primary communication channel within the MATTHEWS CORP mobile app, used to deliver:

- Account activity updates
- Transaction alerts
- Security and verification messages
- Marketing and promotional communications

Customers currently have limited control over the notifications they receive. Preferences are accessible within the app but offer only basic, high-level toggles.

This feature aims to improve customer control, increase opt-in rates, and enhance engagement with relevant notifications.

---

## Problem Statement

Push notifications are increasingly important for customer engagement and communication, but current performance is suboptimal.

Key issues include:

- Push notification opt-in rate is below 50%
- Customers have limited ability to control notification types
- Notifications are broadly grouped with minimal transparency
- Customers may disable notifications entirely due to volume or irrelevance

This results in:

- Reduced reach of important communications
- Lower engagement with marketing and product messages
- Missed opportunities to drive customer behaviour
- Risk of customers not receiving critical alerts

---

## Goals

- Increase push notification opt-in rate
- Improve engagement with relevant notifications
- Provide clearer and more granular control over notification preferences
- Reduce full opt-outs at OS/device level
- Maintain effectiveness of critical notifications (e.g. security alerts)

---

## Non-Goals

- Redesigning notification content or messaging
- Introducing new notification triggers or campaigns
- Managing preferences for email or SMS channels
- Changing OS-level permission flows

---

## Current State Summary

- Notification preferences are accessible via a secondary navigation path
- Preferences are controlled using simple on/off toggles
- Notification categories are broadly defined
- Limited visibility into:
  - types of notifications within each category
  - frequency or volume
  - impact of disabling notifications

---

## Key Problems

1. **Lack of granularity**
   - Customers cannot selectively manage different types of notifications within a category

2. **Binary controls**
   - Preferences are limited to simple on/off toggles with no nuance

3. **Poor discoverability**
   - Settings are not easily accessible or surfaced in relevant moments

4. **Notification fatigue**
   - High volume and low relevance lead to disengagement

5. **Risk of over-disabling**
   - Customers may disable all notifications rather than tolerate unwanted ones

---

## Proposed Direction (High-Level)

Enhance push notification preferences to:

- Introduce clearer categorisation (e.g. account, security, marketing)
- Provide more granular controls within categories
- Improve transparency around what notifications customers receive
- Introduce a hierarchy between critical and optional notifications
- Improve usability and accessibility of the preferences experience

---

## User Segments

- Active mobile app users
- Customers who have opted out of push notifications
- Customers receiving frequent notifications
- Customers sensitive to security alerts
- Customers who value control and personalisation

---

## Key Use Cases

1. Customer wants to receive only essential account notifications  
2. Customer wants to disable marketing communications  
3. Customer wants to re-enable notifications after opting out  
4. Customer wants to understand what notifications they will receive  
5. Customer wants to reduce overall notification volume  

---

## Constraints

- Critical notifications (e.g. security alerts) must remain reliable
- Must integrate with existing notification delivery systems
- Must respect OS-level notification permissions
- Must not materially increase risk exposure
- Must align with existing communication and consent frameworks

---

## Dependencies

- Notification delivery platform
- Customer preference storage system
- Mobile app UI (iOS and Android)
- Security and verification systems
- Marketing communication systems

---

## Risks

- Customers disabling important notifications
- Increased complexity in preference management
- Poor categorisation leading to confusion
- Inconsistent behaviour across platforms

---

## Assumptions

- Customers want more control over notifications
- Granular preferences will increase opt-in rates
- Improved transparency will build trust
- More relevant notifications will increase engagement

---

## Open Questions

- What categories should be exposed to customers?
- Which notifications should be mandatory?
- Should frequency controls be introduced (e.g. digest vs real-time)?
- How should critical notifications be handled?
- How can we best educate customers about notification value?

---