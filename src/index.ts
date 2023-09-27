$(document).ready(() => {
  $("#wellSelect").select2();

  fetch("/getWells")
    .then((res) => res.json())
    .then((wellList) => {
      const container: HTMLSelectElement = $(
        "#wellSelect"
      )[0] as HTMLSelectElement;

      for (const wellName of wellList) {
        const el: HTMLOptionElement = document.createElement("option");
        el.value = wellName;
        el.innerText = wellName;
        container.appendChild(el);
      }
    });

  $("#wellSelect").on("change", (eventData) => {
    console.log($("#wellSelect").val());
  });
});
