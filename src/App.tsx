import { useState, FormEvent } from "react";
import "./App.css";
import guests from './guests.json'

interface Occupancy {
  premiumOccupancy: number;
  economyOccupancy: number;
  premiumRevenue: number;
  economyRevenue: number;
}
export function calculateOccupancy(premiumRooms: number, economyRooms: number, guests: number[]): Occupancy {
  const sortedGuests = [...guests].sort((a, b) => b - a);
  let premiumOccupancy = 0;
  let economyOccupancy = 0;
  let premiumRevenue = 0;
  let economyRevenue = 0;

  // Allocate Premium rooms to guests willing to pay EUR 100 or more
  const guestsForPremium = sortedGuests.filter(guest => guest >= 100);
  const guestsForEconomy = sortedGuests.filter(guest => guest < 100);

  for (const guest of guestsForPremium) {
    if (premiumRooms > 0) {
      premiumOccupancy++;
      premiumRevenue += guest;
      premiumRooms--;
    }
  }

  // Check if there are guests for Economy rooms and Premium upgrades
  if (guestsForEconomy.length >= economyRooms + premiumRooms) {
    // Upgrade the highest-paying guests below EUR 100 to Premium
    for (const guest of guestsForEconomy) {
      if (premiumRooms > 0) {
        premiumOccupancy++;
        premiumRevenue += guest;
        premiumRooms--;
      } else if (economyRooms > 0) {
        economyOccupancy++;
        economyRevenue += guest;
        economyRooms--;
      }
    }
  } else {
    // Fill Economy rooms with the remaining guests
    for (const guest of guestsForEconomy) {
      if (economyRooms > 0) {
        economyOccupancy++;
        economyRevenue += guest;
        economyRooms--;
      }
    }
  }

  return {
    premiumOccupancy,
    economyOccupancy,
    premiumRevenue,
    economyRevenue,
  };
}

function App() {
  const [premiumRooms, setPremiumRooms] = useState<number>(0);
  const [economyRooms, setEconomyRooms] = useState<number>(0);
  const [occupancy, setOccupancy] = useState<Occupancy | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = calculateOccupancy(premiumRooms, economyRooms, guests);
    setOccupancy(result);
  };

  return (
    <div className="root">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div>
            <p>Premium Rooms:</p>
            <input
              type="number"
              id="premium-rooms-input" 
              value={premiumRooms}
              onChange={(event) => setPremiumRooms(parseInt(event.target.value, 10))}
            />
          </div>
          <br />
          <div>
            <p>Economy Rooms:</p>
            <input
              type="number"
              id="economy-rooms-input"
              value={economyRooms}
              onChange={(event) => setEconomyRooms(parseInt(event.target.value, 10))}
            />
          </div>
          <br />
          <button type="submit" id="calculate-occupancy-button">Calculate Occupancy</button> 
        </form>
        {occupancy && (
          <div>
            <p id="free-premium-rooms">Free Premium rooms: {premiumRooms - occupancy.premiumOccupancy}</p> 
            <p id="free-economy-rooms">Free Economy rooms: {economyRooms - occupancy.economyOccupancy}</p> 
            <p id="usage-premium">Usage Premium: {occupancy.premiumOccupancy} (EUR {occupancy.premiumRevenue})</p> 
            <p id="usage-economy">Usage Economy: {occupancy.economyOccupancy} (EUR {occupancy.economyRevenue})</p> 
          </div>
        )}
      </div>
    </div>
  );
  
}

export default App;
