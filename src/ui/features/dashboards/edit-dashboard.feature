@regression
Feature: Dashboards
    Background: 
        Given I open Report Portal
        When I login as admin
        Then I should be on "All Dashboards" page
        When I click on "Add New Dashboard button" on "All Dashboards" page
        Then I should be on "Add New Dashboard" modal on "All Dashboards" page
        When I create new Dashboard on "Add New Dashboard" modal
        Then I should be on "Dashboard Details" page
    
    Scenario: Edit Dashboard
        When I click on "Edit button" on "Dashboard Details" page
        Then I should be on "Edit Dashboard" modal on "Dashboard Details" page
        When I update Dashboard on "Edit Dashboard" modal
        Then I should see correct dashboard name on "Dashboard Details" page
