interface TankReading {
  Id: number;
  previous_top_feet: number;
  previous_top_inches: number;
  reading_time: number;
  top_feet: number;
  top_inches: number;
  updated_at: number;
}

interface TankDataType {
  Capacity: number;
  Id: number;
  LatestReading: TankReading;
  Multiplier: number;
  Name: string;
  Type: string;
  Updated: number;
}

export { TankDataType };
