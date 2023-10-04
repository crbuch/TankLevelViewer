import { TankDataType } from "./Types";
import { Data, newPlot } from "./Plotly";


function PlotData(data: TankDataType[], divElement: HTMLDivElement) {
  const waterTrace: Data = {
    x: [],
    y: [],
    name: "Water",
    type: "bar",
    marker: {
      color: "#0000ff",
    },
    text: [],
  };

  const oilTrace: Data = {
    x: [],
    y: [],
    name: "Oil",
    type: "bar",
    marker: {
      color: "#008000",
    },
    text: [],
  };

  for (const tankdata of data) {
    const h: number =
      tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches;
    const c = tankdata.Capacity;
    const m = tankdata.Multiplier;
    const barrelsFilled = (c - m * h) / m;
    const tankLevel = barrelsFilled / c;




    const dateObject = new Date(tankdata.LatestReading.updated_at*1000);

    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const date = month + "/" + day + "/" + year;


    if (tankdata.Type == "WATER") {
      (waterTrace.x as string[]).push(tankdata.Name);
      (waterTrace.y as number[]).push(tankLevel);
      (waterTrace.text as string[]).push(`Updated at: ${date}`);
    } else if (tankdata.Type == "OIL") {
      (oilTrace.x as string[]).push(tankdata.Name);
      (oilTrace.y as number[]).push(tankLevel);
      (oilTrace.text as string[]).push(`Updated at: ${date}`);
    }
  }

  newPlot(divElement, [waterTrace, oilTrace], { barmode: "group" });
}

async function GetWellData(wellName: string): Promise<TankDataType[]> {
  const res = await fetch(
    `/getWellTankReadings?wellName=${encodeURIComponent(wellName)}`
  );
  const wellTanks = (await res.json()) as TankDataType[];
  return wellTanks;
}

export { GetWellData, PlotData };
