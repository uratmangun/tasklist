# Taskflow Navbar Branding Requirements

## Introduction
This feature moves the TaskFlow branding (logo + name) from the HomePage main content area into the global navigation bar so that the branding is consistently visible on every page and the UI remains uncluttered.

## Requirements

### Requirement 1: Navbar Branding
**User Story:** As a user, I want the TaskFlow branding to appear in the navbar, so that I can always identify the application regardless of which page I am on.

#### Acceptance Criteria
1. WHEN any page loads THEN the system SHALL display the TaskFlow logo and name in the navbar header.
2. WHEN the viewport width is less than the `sm` breakpoint THEN the system SHALL hide the text "TaskFlow" and only show the logo initial "T".
3. WHEN a user navigates between routes THEN the navbar branding SHALL remain unchanged and in the same position.

### Requirement 2: Remove Redundant Branding
**User Story:** As a user, I want redundant TaskFlow branding removed from the HomePage content, so that the interface looks clean and avoids duplication.

#### Acceptance Criteria
1. WHEN the HomePage renders THEN the system SHALL NOT display any additional TaskFlow header inside the main content area.
2. WHEN inspecting the DOM THEN there SHALL be exactly one element containing the text "TaskFlow" (in the navbar header).

### Requirement 3: Codebase Clean-Up
**User Story:** As a developer, I want the codebase to be free of unused imports and lint warnings after the refactor, so that the project maintains high quality standards.

#### Acceptance Criteria
1. WHEN running the linter THEN the system SHALL report zero unused-import warnings related to the refactor.
2. WHEN running type-checking THEN the system SHALL report zero errors related to removed variables or imports.
