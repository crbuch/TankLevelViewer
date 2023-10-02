import { TankDataType } from "./Types";
import { Data, newPlot } from "plotly.js";

function PlotData(data: TankDataType[]) {
  const displayElement: HTMLDivElement = document.getElementById(
    "graphDisplay"
  ) as HTMLDivElement;

  const waterTrace: Data = {
    x: [],
    y: [],
    name: "Water",
    type: "bar",
    marker:{
      
    }
    
  };

  const oilTrace: Data = {
    x: [],
    y: [],
    name: "Oil",
    type: "bar",
  };

  for (const tankdata of data) {
    if (tankdata.Type == "WATER") {
      (waterTrace.x as string[]).push(tankdata.Name);
      (waterTrace.y as number[]).push(tankdata.LatestReading.top_feet);
    }else if(tankdata.Type == "OIL"){
      (oilTrace.x as string[]).push(tankdata.Name);
      (oilTrace.y as number[]).push(tankdata.LatestReading.top_feet);
    }
  }

  newPlot(displayElement, [waterTrace, oilTrace], { barmode: "group" });
}

async function GetWellData(wellName: string): Promise<TankDataType[]> {
  const res = await fetch(
    `/getWellTankReadings?wellName=${encodeURIComponent(wellName)}`
  );
  const wellTanks = (await res.json()) as TankDataType[];

  return wellTanks;
}

export { GetWellData, PlotData };
