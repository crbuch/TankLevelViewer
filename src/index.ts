import { GetWellData, PlotData } from "./Tools";
import { TankDataType } from "./Types";

jQuery(() => {
  $("#wellSelect").select2();

  $("#graphTypeSelect").select2();

  const wellSelect: HTMLSelectElement = document.getElementById(
    "wellSelect"
  ) as HTMLSelectElement;

  const graphTypeSelect: HTMLSelectElement = document.getElementById(
    "graphTypeSelect"
  ) as HTMLSelectElement;
  const graphDisplay = document.getElementById(
    "graphDisplay"
  ) as HTMLDivElement;

  const loadingIcon = document.getElementById("loadingIcon") as HTMLDivElement;

  let CURRENT_DATA: TankDataType[];

  fetch("/getWells")
    .then((res) => res.json())
    .then((wellList: string[]) => {
      for (const wellName of wellList) {
        const el: HTMLOptionElement = document.createElement("option");
        el.value = wellName;
        el.innerText = wellName;
        wellSelect.appendChild(el);
      }
    });

  $("#graphTypeSelect").on("change", () => {
    if (CURRENT_DATA) {
      document.getElementsByClassName("plot-container")[0]?.remove();
      loadingIcon.style.display = "inline-block";

      PlotData(
        CURRENT_DATA,
        graphDisplay,
        wellSelect.value,
        graphTypeSelect.value
      );
      loadingIcon.style.display = "none";
    }
  });

  $("#wellSelect").on("change", () => {
    document.getElementsByClassName("plot-container")[0]?.remove();

    loadingIcon.style.display = "inline-block";

    GetWellData(wellSelect.value).then((wellData: TankDataType[]) => {
      CURRENT_DATA = wellData;

      PlotData(
        CURRENT_DATA,
        graphDisplay,
        wellSelect.value,
        graphTypeSelect.value
      );

      loadingIcon.style.display = "none";
    });
  });
});
