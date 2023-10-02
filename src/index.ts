import { GetWellData } from "./Tools.js";
import { TankDataType } from "./Types.js";

$(document).ready(() => {
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
    GetWellData(wellSelect.value).then((wellData: TankDataType[]) => {
      console.log(wellData);
    });
  });
});
