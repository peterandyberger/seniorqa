class LandingPage {

    constructor(page) {
      this.page = page;
      this.premiumRoomsInput = '#premium-rooms-input';
      this.economyRoomsInput = '#economy-rooms-input';
      this.calculateButton = '#calculate-occupancy-button';
      this.freePremiumRooms = '#free-premium-rooms';
      this.freeEconomyRooms = '#free-economy-rooms';
      this.usagePremium = '#usage-premium';
      this.usageEconomy = '#usage-economy';
    }
  
    async navigate() {
      await this.page.goto('http://localhost:3000');
    }
  
    async enterRoomDetails(premiumRooms, economyRooms) {
      await this.page.fill(this.premiumRoomsInput, premiumRooms);
      await this.page.fill(this.economyRoomsInput, economyRooms);
    }
  
    async calculateOccupancy() {
      await this.page.click(this.calculateButton);
    }
  
    async getOccupancyDetails() {
      const premiumRooms = await this.page.textContent(this.freePremiumRooms);
      const economyRooms = await this.page.textContent(this.freeEconomyRooms);
      const premiumRevenue = await this.page.textContent(this.usagePremium);
      const economyRevenue = await this.page.textContent(this.usageEconomy);
      return { premiumRooms, economyRooms, premiumRevenue, economyRevenue };
    }
  }
  
  module.exports = LandingPage;
  