import { GetWellData } from "./Tools.js";
$(document).ready(() => {
    $("#wellSelect").select2();
    const wellSelect = document.getElementById("wellSelect");
    fetch("/getWells")
        .then((res) => res.json())
        .then((wellList) => {
        for (const wellName of wellList) {
            const el = document.createElement("option");
            el.value = wellName;
            el.innerText = wellName;
            wellSelect.appendChild(el);
        }
    });
    $("#wellSelect").on("change", () => {
        GetWellData(wellSelect.value).then((wellData) => {
            console.log(wellData);
        });
    });
});
