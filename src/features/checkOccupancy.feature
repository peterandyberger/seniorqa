Feature: Room Occupancy Calculation
  As a hotel manager
  I want to calculate room occupancy and revenue
  So that I can optimize room allocation

  Scenario Outline: Calculate occupancy for given room numbers
    Given I have a list of guest bids
    And I have entered "<premiumRooms>" premium rooms and "<economyRooms>" economy rooms
    When I calculate occupancy
    Then I should see "<occupiedPremium>" premium and "<occupiedEconomy>" economy rooms occupied
    And the total premium revenue should be "<premiumRevenue>" EUR
    And the total economy revenue should be "<economyRevenue>" EUR

  Examples:
    | premiumRooms | economyRooms | occupiedPremium | occupiedEconomy | premiumRevenue | economyRevenue |
    | 3            | 3            | 3               | 3               | 738            | 167            |
    | 7            | 5            | 6               | 4               | 1054           | 189            |
    | 2            | 7            | 2               | 4               | 583            | 189            |
    | 7            | 1            | 7               | 1               | 1153           | 45             |
    | -1           | -1           | 0               | 0               | 0              | 0              |
    | 1            | 1            | 1               | 1               | 374            | 99             |
    | 0            | 0            | 0               | 0               | 0              | 0              |
