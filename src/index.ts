import { GetWellData, PlotData } from "./Tools";
import { TankDataType } from "./Types";

jQuery(() => {
  $("#wellSelect").select2();
  const wellSelect: HTMLSelectElement = document.getElementById(
    "wellSelect"
  ) as HTMLSelectElement;

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

  $("#wellSelect").on("change", () => {
    document.getElementsByClassName("plot-container")[0]?.remove();

    const graphDisplay = document.getElementById(
      "graphDisplay"
    ) as HTMLDivElement;

    const loadingIcon = document.getElementById(
      "loadingIcon"
    ) as HTMLDivElement;
    loadingIcon.style.display = "inline-block";

    GetWellData(wellSelect.value).then((wellData: TankDataType[]) => {
      console.log(wellData);
      PlotData(wellData, graphDisplay);
      loadingIcon.style.display = "none";
    });
  });
});
