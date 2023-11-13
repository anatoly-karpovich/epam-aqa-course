@login @regression
Feature: Login

  Scenario Outline: Login witn invalid credentials
    When I enter "<login>" in "Login input" on "Login" page
    And I enter "<password>" in "Password input" on "Login" page
    And I click on "Login button" on "Login" page
    Then I should be on "Login" page
    And I skip Notification Message with text "An error occurred while connecting to server: You do not have enough permissions. Bad credentials"

    Examples:
      | login         | password         |
      | invalid_login | invalid_password |
      | invalid_login | ____             |
      | ____          | invalid_password |