@regression
Feature: Dashboards
    
    Background: 
        Given I open Report Portal
        When I login as admin
        Then I should be on "All Dashboards" page
        And I wait till page is loaded
        When I click on "Add New Dashboard button" on "All Dashboards" page
        Then I should be on "Add New Dashboard" modal on "All Dashboards" page
        When I create new Dashboard on "Add New Dashboard" modal
        Then I should be on "Dashboard Details" page

    Scenario: Delete Dashboard
        When I click on "Delete button" on "Dashboard Details" page
        Then I should be on "Delete Dashboard" modal on "Dashboard Details" page
        When I click on "Delete button" on "Delete Dashboard" modal on "Dashboard Details" page
        Then I should not see created dashboard on "All Dashboards" page
        And I skip Notification Message with text "Dashboard has been deleted"

    Scenario: Edit Dashboard
        When I click on "Edit button" on "Dashboard Details" page
        Then I should be on "Edit Dashboard" modal on "Dashboard Details" page
        When I update Dashboard on "Edit Dashboard" modal
        Then I should see correct dashboard name on "Dashboard Details" page
