@regression @dashboards
Feature: Dashboards
    
    @smoke
    Scenario: Add new Dashboard
        Given I open Report Portal
        When I login as admin
        Then I should be on "All Dashboards" page
        And I wait till page is loaded
        When I click on "Add New Dashboard button" on "All Dashboards" page
        Then I should be on "Add New Dashboard" modal on "All Dashboards" page
        When I create new Dashboard on "Add New Dashboard" modal
        Then I should be on "Dashboard Details" page
