import { TankDataType } from "./Types";
import { Data, newPlot } from "./Plotly";

function CalculatePercentageFilled(tankdata: TankDataType): number {
  const barrelsFilled =
    tankdata.Capacity -
    tankdata.Multiplier *
      (tankdata.LatestReading.top_feet * 12 +
        tankdata.LatestReading.top_inches);
  return barrelsFilled / tankdata.Capacity;
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

function InchesToHeightString(inches: number) {
  const feet = Math.floor(inches / 12);
  const inchesLeft = inches % 12;
  if (feet && inches) {
    return `${feet}' ${inchesLeft}"`;
  } else if (feet && !inches) {
    return `${feet}'`;
  } else if (!feet && inches) {
    return `${inches}"`;
  }
}

function PlotHeight(
  data: TankDataType[],
  divElement: HTMLDivElement,
  chartName: string
) {
  const baseTrace: Data = {
    x: [],
    y: [],
    name: "Base Height Oil",
    type: "bar",
    marker: {
      color: "#008000",
    },
    text: [],
  };
  const topTrace: Data = {
    x: [],
    y: [],
    name: "Top Height Oil",
    type: "bar",
    marker: {
      color: "#79ad79",
    },
    text: [],
  };

  const baseTraceWater: Data = {
    x: [],
    y: [],
    name: "Base Height Water",
    type: "bar",
    marker: {
      color: "#0000ff",
    },
    text: [],
  };
  const topTraceWater: Data = {
    x: [],
    y: [],
    name: "Top Height Water",
    type: "bar",
    marker: {
      color: "#8585ff",
    },
    text: [],
  };

  for (const tankdata of data) {
    if (tankdata.Type == "OIL") {
      (baseTrace.x as string[]).push(`${tankdata.Name}`);
      (baseTrace.y as number[]).push(
        CalculateBaseHeightInches(tankdata) /
          CalculateTotalHeightInches(tankdata)
      );
      (baseTrace.text as string[]).push(
        InchesToHeightString(CalculateBaseHeightInches(tankdata))
      );

      (topTrace.x as string[]).push(`${tankdata.Name}`);
      (topTrace.y as number[]).push(
        CalculateTopHeightInches(tankdata) /
          CalculateTotalHeightInches(tankdata)
      );
      (topTrace.text as string[]).push(
        InchesToHeightString(CalculateTopHeightInches(tankdata))
      );
    } else if (tankdata.Type == "WATER") {
      (baseTraceWater.x as string[]).push(`${tankdata.Name}`);
      (baseTraceWater.y as number[]).push(
        CalculateBaseHeightInches(tankdata) /
          CalculateTotalHeightInches(tankdata)
      );
      (baseTraceWater.text as string[]).push(
        InchesToHeightString(CalculateBaseHeightInches(tankdata))
      );

      (topTraceWater.x as string[]).push(`${tankdata.Name}`);
      (topTraceWater.y as number[]).push(
        CalculateTopHeightInches(tankdata) /
          CalculateTotalHeightInches(tankdata)
      );
      (topTraceWater.text as string[]).push(
        InchesToHeightString(CalculateTopHeightInches(tankdata))
      );
    }
  }

  newPlot(divElement, [baseTrace, topTrace, baseTraceWater, topTraceWater], {
    barmode: "stack",
    title: `${chartName} Tank Levels`,
    xaxis: {
      type: "category",
      title: "Tank Names",
    },
  });
}

function PlotPercentage(
  data: TankDataType[],
  divElement: HTMLDivElement,
  chartName: string
) {
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

  for (const tankdata of data) {
    if (tankdata.Type == "OIL") {
      (oilTrace.x as string[]).push(`${tankdata.Name}`);
      (oilTrace.y as number[]).push(CalculatePercentageFilled(tankdata));
      (oilTrace.text as string[]).push(
        `${Math.round(CalculatePercentageFilled(tankdata) * 100)}%`
      );
    } else if (tankdata.Type == "WATER") {
      (waterTrace.x as string[]).push(`${tankdata.Name}`);
      (waterTrace.y as number[]).push(CalculatePercentageFilled(tankdata));
      (waterTrace.text as string[]).push(
        `${Math.round(CalculatePercentageFilled(tankdata) * 100)}%`
      );
    }
  }
  newPlot(divElement, [oilTrace, waterTrace], {
    title: `${chartName} Tank Percentages`,
    yaxis: {
      range: [0, 1],
      tickformat: ".0%",
    },
    xaxis: {
      type: "category",
      title: "Tank Names",
    },
  });
}

function PlotLoads(
  data: TankDataType[],
  divElement: HTMLDivElement,
  chartName: string
) {
  //print(CalculateBaseHeightInches(data))
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

  for (const tankdata of data) {
    if (tankdata.Type == "OIL") {
      (oilTrace.x as string[]).push(`${tankdata.Name}`);
      const barrels: number =
        CalculatePercentageFilled(tankdata) * tankdata.Capacity;
      (oilTrace.y as number[]).push(barrels);
      (oilTrace.text as string[]).push(`${Math.round(barrels)} Barrels, \n ${Math.floor(barrels/180)} Load(s)`);
    } else if (tankdata.Type == "WATER") {
      (waterTrace.x as string[]).push(`${tankdata.Name}`);
      const barrels: number =
        CalculatePercentageFilled(tankdata) * tankdata.Capacity;

      (waterTrace.y as number[]).push(barrels);
      (waterTrace.text as string[]).push(`${Math.round(barrels)} Barrels, \n ${Math.floor(barrels/180)} Load(s)`);
    }
  }

  newPlot(divElement, [oilTrace, waterTrace], {
    title: `${chartName} Tank Barrels`,
    xaxis: {
      type: "category",
      title: "Tank Names",
    },
  });
}

function PlotData(
  data: TankDataType[],
  divElement: HTMLDivElement,
  chartName: string,
  graphType: string
) {
  if (graphType == "Height") {
    PlotHeight(data, divElement, chartName);
  } else if (graphType == "Percentage") {
    PlotPercentage(data, divElement, chartName);
  } else if (graphType == "Loads") {
    PlotLoads(data, divElement, chartName);
  }
}

async function GetWellData(wellName: string): Promise<TankDataType[]> {
  const res = await fetch(
    `/getWellTankReadings?wellName=${encodeURIComponent(wellName)}`
  );
  const wellTanks = (await res.json()) as TankDataType[];
  console.log(wellTanks)
  return wellTanks;
}

export { GetWellData, PlotData };
