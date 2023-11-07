@regression
@dashboards
Feature: Dashboards
    
    @smoke
    Scenario: Demo Dashboard overview
        Given I open Report Portal
        When I login as admin
        Then I should be on "All Dashboards" page
        And I wait till page is loaded
        When I open demo dashboard detals on "All Dashboards" page
        Then I should be on "Dashboard Details" page
        And I wait till page is loaded