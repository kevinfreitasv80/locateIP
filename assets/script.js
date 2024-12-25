const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const modal = document.querySelector("#modal");
const infors = document.querySelector("#infors");
const country = document.querySelector("#country");
const countryCode = document.querySelector("#countryCode");
const region = document.querySelector("#region");
const regionName = document.querySelector("#regionName");
const city = document.querySelector("#city");
const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const zip = document.querySelector("#zip");
const timezone = document.querySelector("#timezone");

btn.addEventListener("click", () => getInfors(input.value));

/**
 * Show the modal in each situation
 * @param {string} type
 * @param {string} message
 */
function showModal(type, message) {
  let types = ["success", "error"];

  switch (type) {
    case types[0]:
      insertClassModal(type);
      break;
    case types[1]:
      insertClassModal(type);
      break;
  }

  modal.textContent = message;
}

/**
 * Get the informations of IP
 * @param {string} IP
 */
async function getInfors(IP) {
  let ip = IP;
  let link = "http://ip-api.com/json/";

  if (
    !RegExp(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    ).test(ip)
  ) {
    showModal("error", "Not is a IP");
    return;
  }

  let data;
  try {
    data = await fetch(`${link}${ip}`)
      .then((r) => r.json())
      .then((d) => d);
  } catch (err) {
    showModal("error", "Can't possible do the request");
    console.error(err);
    return;
  }

  if (data.status === "fail") {
    showModal("error", "Error in request");
    return;
  }

  infors.style.display = "flex";

  country.textContent = data.country ?? "Not found";
  countryCode.textContent = data.countryCode ?? "Not found";
  region.textContent = data.region ?? "Not found";
  regionName.textContent = data.regionName ?? "Not found";
  city.textContent = data.city ?? "Not found";
  lat.textContent = data.lat ?? "Not found";
  lon.textContent = data.lon ?? "Not found";
  zip.textContent = data.zip ?? "Not found";
  timezone.textContent = data.timezone ?? "Not found";

  console.log([
    country,
    countryCode,
    region,
    regionName,
    city,
    lat,
    lon,
    zip,
    timezone,
  ]);

  showModal("success", "Success in request the IP");
}

/**
 * Insert the type of modal
 * @param {string} type
 */
function insertClassModal(type) {
  modal.classList.remove("hidden");
  modal.classList.add(type);
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 2500);
}
