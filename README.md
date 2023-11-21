Issues found in the original 'engineers solution'

- Incorrect Handling of Guests Willing to Pay EUR 100 or More:

The current implementation in calculateOccupancy skips over guests willing to pay EUR 100 or more. This is incorrect as these guests should be considered for Premium rooms first.

To fix this, I have first allocated these high-paying guests to Premium rooms before considering other guests.

- Allocation Logic for Premium and Economy Rooms:

The current logic doesn't properly handle the scenario where lower-paying customers could be upgraded to Premium rooms if all Economy rooms are filled. This required a more complex allocation logic.

I have implemented a two-pass allocation: first, allocating guests to their preferred rooms (Premium for >= EUR 100, Economy otherwise), and then checked if any upgrades are possible.

- State Management and Display Logic:

The application should have handled the display of the number of occupied rooms and the revenue generated more effectively.

After calculating the occupancy, I have updated the state variables to reflect the correct number of free and occupied rooms.

- Typescript:

Even if the code is using typescript there were several ANY types which should be avoided so I made changes on that as well, and created a simple interface

Test Plan:

Business Requirements:

Primary Goal: 

    Optimize room occupancy for Premium and Economy rooms.

Constraints:

    Premium rooms are for customers paying EUR 100 or more.
    Economy rooms are for customers paying less than EUR 100.
    Upgrades to Premium are allowed if all Economy rooms are filled and Premium rooms are available.

Test Categories:

    Unit Testing: 
        Making sure that the core logic works properly, which is in the 'calculateOccupancy' method.
        Test have been created in App.test.tsx using Jest
        To run, run the command 'npm test'
    
    UI functional/integration testsing:
        Making sure that the UI works properly and shows the right information / results to the user.
        I used playwright and cucumber. Cucumber is important to run the Gherkin format feature files,
        as those files make sure that the business and the development are on the same page, it is an
        easily readable way of showing what the tests are aiming for.
        To run, run the command 'npx cucumber-js' in the ./src folder.

    CI Pipeline:
        As part of the CI we are running all unit and UI tests.
        I have used the Github Actions, its config can be found under .github/workflows/ci.yml
        To run, you can push any changes, or running from the Github Actions

