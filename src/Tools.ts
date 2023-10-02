import { TankDataType } from "./Types";
import * as Plotly from "plotly.js"




function PlotData(data: TankDataType[]) {
    const displayElement:HTMLDivElement = document.getElementById("graphDisplay") as HTMLDivElement


    const plotData:Plotly.Data[] = [{
        x:[1, 2, 7, 4],
        y:["p1", "p2", "p3", "p4"],
        name:"Top-Height",
        type:"bar"

    }]


    Plotly.newPlot(displayElement, plotData, {barmode: 'group'})
}

async function GetWellData(wellName: string): Promise<TankDataType[]> {

  const res = await fetch(
    `/getWellTankReadings?wellName=${encodeURIComponent(wellName)}`
  );
  const wellTanks = (await res.json()) as TankDataType[];

  return wellTanks;
}


export {GetWellData, PlotData}