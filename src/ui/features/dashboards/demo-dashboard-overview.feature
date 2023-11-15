@regression @dashboards
Feature: Dashboards

    @smoke
    Scenario: Demo Dashboard overview
        When I login as admin
        Then I should be on "All Dashboards" page
        And I wait till page is loaded
        When I open demo dashboard detals on "All Dashboards" page
        Then I should be on "Dashboard Details" page
        And I wait till page is loaded
        And I should see following widgets on "Dashboard Details" page:
            | widgets                             |
            | LAUNCH STATISTICS BAR               |
            | LAUNCH STATISTICS AREA              |
            | INVESTIGATED PERCENTAGE OF LAUNCHES |
            | TEST CASES GROWTH TREND CHART       |
            | OVERALL STATISTICS PANEL            |
            | LAUNCHES DURATION CHART             |
            | OVERALL STATISTICS DONUT            |
            | FAILED CASES TREND CHART            |
            | LAUNCH TABLE                        |
            | MOST FAILED TEST CASES              |
            | PASSING RATE SUMMARY                |
            | FLAKY TEST CASES                    |