Issues found in the original 'engineers solution'

Incorrect Handling of Guests Willing to Pay EUR 100 or More:

The current implementation in calculateOccupancy skips over guests willing to pay EUR 100 or more. This is incorrect as these guests should be considered for Premium rooms first.

To fix this, I have first allocated these high-paying guests to Premium rooms before considering other guests.

Allocation Logic for Premium and Economy Rooms:

The current logic doesn't properly handle the scenario where lower-paying customers could be upgraded to Premium rooms if all Economy rooms are filled. This required a more complex allocation logic.

I have implemented a two-pass allocation: first, allocating guests to their preferred rooms (Premium for >= EUR 100, Economy otherwise), and then checked if any upgrades are possible.

State Management and Display Logic:

The application should have handled the display of the number of occupied rooms and the revenue generated more effectively.

After calculating the occupancy, I have updated the state variables to reflect the correct number of free and occupied rooms.

Typescript:

Even if the code is using typescript there were several ANY types which should be avoided so I made changes on that as well, and created a simple interface