import { newPlot } from "plotly.js";
import { TankDataType } from "./Types";

function PlotData(element: HTMLDivElement, data: TankDataType[]) {}

async function GetWellData(wellName: string): Promise<TankDataType[]> {
  const res = await fetch(
    `/getWellTankReadings?wellName=${encodeURIComponent(wellName)}`
  );
  const wellTanks = (await res.json()) as TankDataType[];

  return wellTanks;
}

export {GetWellData}