import { calculateOccupancy } from './App';

describe('App Tests', () => {
  
 
  it('Test 1: 3 Premium, 3 Economy Rooms', () => {
    const result = calculateOccupancy(3, 3);
    expect(result).toEqual({
      premiumOccupancy: 3,
      economyOccupancy: 3,
      premiumRevenue: 738,
      economyRevenue: 167,
    });
  });

  it('Test 2: 7 Premium, 5 Economy Rooms', () => {
    const result = calculateOccupancy(7, 5);
    expect(result).toEqual({
      premiumOccupancy: 6,
      economyOccupancy: 4,
      premiumRevenue: 1054,
      economyRevenue: 189,
    });
  });

  it('Test 3: 2 Premium, 7 Economy Rooms', () => {
    const result = calculateOccupancy(2, 7);
    expect(result).toEqual({
      premiumOccupancy: 2,
      economyOccupancy: 4,
      premiumRevenue: 583,
      economyRevenue: 189,
    });
  });

  it('Test 4: 7 Premium, 1 Economy Room', () => {
    const result = calculateOccupancy(7, 1);
    expect(result).toEqual({
      premiumOccupancy: 7,
      economyOccupancy: 1,
      premiumRevenue: 1153,
      economyRevenue: 45,
    });
  });


  it('Test with Negative Room Numbers', () => {
    const result = calculateOccupancy(-1, -1);
    expect(result).toEqual({
      premiumOccupancy: 0,
      economyOccupancy: 0,
      premiumRevenue: 0,
      economyRevenue: 0,
    });
  });

 
  it('Test with More Guests Than Rooms', () => {
    const result = calculateOccupancy(1, 1);
    expect(result).toEqual({
      premiumOccupancy: 1,
      economyOccupancy: 1,
      premiumRevenue: 374,
      economyRevenue: 99,
    });
  });

  it('Test with No Available Rooms', () => {
    const result = calculateOccupancy(0, 0);
    expect(result).toEqual({
      premiumOccupancy: 0,
      economyOccupancy: 0,
      premiumRevenue: 0,
      economyRevenue: 0,
    });
  });
});
