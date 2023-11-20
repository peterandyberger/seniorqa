import { useState, FormEvent } from "react";
import "./App.css";

const GUESTS = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

interface Occupancy {
  premiumOccupancy: number;
  economyOccupancy: number;
  premiumRevenue: number;
  economyRevenue: number;
}

function calculateOccupancy(premiumRooms: number, economyRooms: number): Occupancy {
  const sortedGuests = [...GUESTS].sort((a, b) => b - a);
  let premiumOccupancy = 0;
  let economyOccupancy = 0;
  let premiumRevenue = 0;
  let economyRevenue = 0;

  for (const guest of sortedGuests) {
    if (guest >= 100 && premiumRooms > 0) {
      premiumOccupancy++;
      premiumRevenue += guest;
      premiumRooms--;
    } else if (guest < 100 && economyRooms > 0) {
      economyOccupancy++;
      economyRevenue += guest;
      economyRooms--;
    }
  }

  for (const guest of sortedGuests) {
    if (guest < 100 && premiumRooms > 0 && economyOccupancy > 0) {
      premiumOccupancy++;
      premiumRevenue += guest;
      premiumRooms--;
      economyOccupancy--;
      economyRevenue -= guest;
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
    const result = calculateOccupancy(premiumRooms, economyRooms);
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
              value={premiumRooms}
              onChange={(event) => setPremiumRooms(parseInt(event.target.value, 10))}
            />
          </div>
          <br />
          <div>
            <p>Economy Rooms:</p>
            <input
              type="number"
              value={economyRooms}
              onChange={(event) => setEconomyRooms(parseInt(event.target.value, 10))}
            />
          </div>
          <br />
          <button type="submit">Calculate Occupancy</button>
        </form>
        {occupancy && (
          <div>
            <p>Free Premium rooms: {premiumRooms - occupancy.premiumOccupancy}</p>
            <p>Free Economy rooms: {economyRooms - occupancy.economyOccupancy}</p>
            <p>Usage Premium: {occupancy.premiumOccupancy} (EUR {occupancy.premiumRevenue})</p>
            <p>Usage Economy: {occupancy.economyOccupancy} (EUR {occupancy.economyRevenue})</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
