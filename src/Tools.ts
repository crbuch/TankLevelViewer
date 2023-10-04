import { TankDataType } from "./Types";
import { Data, newPlot } from "./Plotly";

function CalculatePercentageFilled(tankdata: TankDataType): number {
  const barrelsFilled =
    (tankdata.Capacity -
      tankdata.Multiplier *
        (tankdata.LatestReading.top_feet * 12 +
          tankdata.LatestReading.top_inches)) /
    tankdata.Multiplier;
  return barrelsFilled / tankdata.Capacity;
}

function GetReadingDate(tankdata: TankDataType): string {
  const dateObject = new Date(tankdata.LatestReading.updated_at * 1000);
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  return month + "/" + day + "/" + year;
}
function CalculateTotalHeightInches(tankdata: TankDataType): number {
  const topHeight: number =
    tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches;
  const topHeightPercentage = 1 - CalculatePercentageFilled(tankdata);
  return Math.round(topHeight / topHeightPercentage);
}

function CalculateBaseHeightInches(tankdata: TankDataType): number {
  return (
    CalculateTotalHeightInches(tankdata) -
    (tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches)
  );
}
function CalculateTopHeightInches(tankdata: TankDataType): number {
  return (
    tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches
  );
}

function InchesToHeightString(inches:number){
  const feet = Math.floor(inches/12);
  const inchesLeft = inches%12;
  return `${feet}' ${inchesLeft}"`
}

function PlotData(data: TankDataType[], divElement: HTMLDivElement) {
  const baseTrace: Data = {
    x: [],
    y: [],
    name: "Base Height",
    type: "bar",
    marker: {
      color: "#008000",
    },
    text: [],
  };

  const topTrace: Data = {
    x: [],
    y: [],
    name: "Top Height",
    type: "bar",
    marker: {
      color: "#79ad79",
    },
    text: [],
  };

  for (const tankdata of data) {
    if (tankdata.Type == "OIL") {
      (baseTrace.x as string[]).push(tankdata.Name);
      (baseTrace.y as number[]).push(CalculateBaseHeightInches(tankdata)/CalculateTotalHeightInches(tankdata));
      (baseTrace.text as string[]).push(InchesToHeightString(CalculateBaseHeightInches(tankdata)));

      (topTrace.x as string[]).push(tankdata.Name);
      (topTrace.y as number[]).push(CalculateTopHeightInches(tankdata)/CalculateTotalHeightInches(tankdata));
      (topTrace.text as string[]).push(InchesToHeightString(CalculateTopHeightInches(tankdata)));

    }
  }

  newPlot(divElement, [baseTrace, topTrace], {
    barmode: "stack",
   
  });
}

async function GetWellData(wellName: string): Promise<TankDataType[]> {
  const res = await fetch(
    `/getWellTankReadings?wellName=${encodeURIComponent(wellName)}`
  );
  const wellTanks = (await res.json()) as TankDataType[];
  return wellTanks;
}

export { GetWellData, PlotData };
