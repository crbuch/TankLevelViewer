//defines the response from the api
interface TankDataType {
  Capacity: number;
  Id: number;
  LatestReading: {
    Id: number;
    reading_time: number;
    top_feet: number;
    top_inches: number;
    updated_at: number;
  };
  Multiplier: number;
  Name: string;
  Type: string;
  Updated: number;
}

export { TankDataType };
