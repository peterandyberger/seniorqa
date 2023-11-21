const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LandingPage = require('../../pages/landingPage');

let landingPage;

Given('I have a list of guest bids', async function () {
  this.landingPage = new LandingPage(this.page);
  await this.landingPage.navigate();
});

When('I have entered {string} premium rooms and {string} economy rooms', async function (premiumRooms, economyRooms) {
  await this.landingPage.enterRoomDetails(premiumRooms, economyRooms);
});

When('I calculate occupancy', async function () {
  await this.landingPage.calculateOccupancy();
});

Then('I should see {string} premium and {string} economy rooms occupied', async function (occupiedPremium, occupiedEconomy) {
  const occupancyDetails = await this.landingPage.getOccupancyDetails();
  expect(occupancyDetails.premiumRevenue).toContain(occupiedPremium);
  expect(occupancyDetails.economyRevenue).toContain(occupiedEconomy);
});

Then('the total premium revenue should be {string} EUR', async function (premiumRevenue) {
  const occupancyDetails = await this.landingPage.getOccupancyDetails();
  expect(occupancyDetails.premiumRevenue).toContain(`${premiumRevenue}`);
});

Then('the total economy revenue should be {string} EUR', async function (economyRevenue) {
  const occupancyDetails = await this.landingPage.getOccupancyDetails();
  expect(occupancyDetails.economyRevenue).toContain(`${economyRevenue}`);
});
