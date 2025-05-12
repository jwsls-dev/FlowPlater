FlowPlater.on("afterSwap", function (data) {
  const instanceName = data.instanceName;
  if (!instanceName) {
    console.warn("No instance name in event data");
    return;
  }

  const instance = FlowPlater.getInstance(instanceName);
  if (!instance || !instance.data) {
    console.warn("No instance or data found for:", instanceName);
    return;
  }

  // Transform your data here
  if (instance.data.location) {
    if (!Array.isArray(instance.data.location)) {
      instance.data.location = [instance.data.location];
    }

    // Process each location
    instance.data.location = instance.data.location.map((location) => {
      // Set game-master from first session
      if (location.sessions && location.sessions.length > 0) {
        location["game-master"] = location.sessions[0]["game-master"];
      }

      // Create array of unique days played
      if (location.sessions) {
        if (!Array.isArray(location.sessions)) {
          location.sessions = [location.sessions];
        }
        location["days-played"] = [
          ...new Set(location.sessions.map((session) => session.day)),
        ].join(", ");
        location.image = location.sessions[0].image;
      }

      return location;
    });

    instance.refresh();
  }
});

let mapMarkers = [];
let mapInstance = null;
let pendingLocationData = null;
let activeMarker = null;
let clickOrigin = null;

function addMarkerToMap(map, location) {
  // console.log("Adding marker to map for location:", location);

  if (
    !location ||
    typeof location.long !== "number" ||
    typeof location.lat !== "number" ||
    !isFinite(location.long) ||
    !isFinite(location.lat) ||
    location.long < -180 ||
    location.long > 180 ||
    location.lat < -90 ||
    location.lat > 90
  ) {
    console.warn("Invalid coordinates for location:", location);
    return null;
  }

  const el = document.createElement("div");
  el.className = "location-marker";
  el.setAttribute("data-lng", location.long);
  el.setAttribute("data-lat", location.lat);
  el.setAttribute("data-location-name", location.name || "");
  el.setAttribute("data-location-id", location.id || "");

  // console.log("Created marker element:", el);

  el.addEventListener("click", function () {
    if (activeMarker) {
      activeMarker.classList.remove("is-active");
    }
    if (activeMarker !== el) {
      el.classList.add("is-active");
      activeMarker = el;
    } else {
      activeMarker = null;
    }

    if (clickOrigin === "listItem") {
      clickOrigin = null;
      return;
    }

    const listItem = document.querySelector(
      `[location-item][data-id="${location.id}"]`,
    );
    if (listItem) {
      listItem.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      clickOrigin = "marker";
      listItem.dispatchEvent(event);
    }
  });

  const marker = new mapboxgl.Marker(el)
    .setLngLat([location.long, location.lat])
    .addTo(map);

  // console.log("Added marker to map:", marker);
  mapMarkers.push(marker);
  return marker;
}

function updateMarkers(locationList) {
  console.log("Updating markers with location list:", locationList);

  if (!mapInstance) {
    console.log("Map not initialized yet, storing location data for later");
    pendingLocationData = locationList;
    return;
  }

  // Clear existing markers if they exist
  if (mapMarkers && mapMarkers.length > 0) {
    console.log("Clearing existing markers:", mapMarkers.length);
    mapMarkers.forEach((marker) => marker.remove());
    mapMarkers = [];
  }

  // Create bounds object for fitting the map
  const bounds = new mapboxgl.LngLatBounds();
  let hasValidCoordinates = false;

  // Add new markers for each location
  if (locationList && Array.isArray(locationList)) {
    console.log("Processing locations:", locationList.length);
    locationList.forEach((location) => {
      // console.log("Creating marker for location:", location);
      const marker = addMarkerToMap(mapInstance, location);
      if (marker) {
        // console.log("Marker created successfully");
        bounds.extend([location.long, location.lat]);
        hasValidCoordinates = true;
      } else {
        console.log("Failed to create marker for location:", location);
      }
    });

    // Fit bounds if we have valid coordinates
    if (hasValidCoordinates && locationList.length > 1) {
      console.log("Fitting bounds for markers");
      mapInstance.fitBounds(bounds, {
        padding: 32,
        maxZoom: 12.5,
      });
    }
  } else {
    console.log("Invalid location list:", locationList);
  }
}

function initMap() {
  if (!$("#map").length) {
    console.log("map not found");
    return;
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmMtdXJiYW4iLCJhIjoiY2w5b2l6ajJkMDVrdDNxbjdibXR5dWllMyJ9.y-z_EF7AeANv8x_tLdP-gg";
  mapInstance = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/fc-urban/cl9ojf9x6000614n2txdgzzd5",
    center: [4.851656, 52.357355],
    zoom: 9,
    fitBoundsOptions: { padding: { top: 32, bottom: 32, left: 32, right: 32 } },
  });

  // Wait for map to load before setting up events
  mapInstance.on("load", function () {
    // Add your map.once calls here
    if (pendingLocationData) {
      console.log("Map initialized, applying pending location data");
      updateMarkers(pendingLocationData);
      pendingLocationData = null;
    }
  });

  mapInstance.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
      showUserHeading: false,
    }),
  );

  mapInstance.once("idle", () => {
    setInitialLocation();
  });

  $(".close_icon").on("click", () => {
    setTimeout(removeActive, 50);

    function removeActive() {
      $(".map_list-item.is-active").removeClass("is-active");
      $(".location-marke.is-activer").removeClass("is-active");
    }
  });

  let isDistrict =
    window.location.pathname.includes("district/") ||
    (typeof isStaticDistrict !== "undefined" ? isStaticDistrict : false);
  const isDistrictPage = isDistrict;
  districtName = isDistrict
    ? districtName ??
      window.location.pathname
        .replace("/district/", "")
        .split("/")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("")
    : null;
  let isDistrictPopulated = false;

  // map.scrollZoom._aroundCenter = true
  mapInstance.touchZoomRotate._touchZoom._aroundCenter = true;

  $(".map_list-item").on("click", function () {
    var currentItem = $(this);

    // Remove .is-active class from other .map_list-item elements
    $(".map_list-wrapper .map_list-item").each(function () {
      if ($(this).is(currentItem)) return; // Skip the current item
      $(this).removeClass("is-active");
      $(this).find(".map_list-data-bottom").removeClass("is-active");
    });

    // Toggle .is-active class on the clicked .map_list-item element and its descendant
    currentItem.toggleClass("is-active");
    currentItem.find(".map_list-data-bottom").toggleClass("is-active");
  });

  $("#Location").on("change", function () {
    if ($("#Location").val() == null) {
      $("#Location").val("London");
    }

    $(".map_list-heading").remove();
    mapMarkers.forEach(function (marker) {
      marker.remove();
    });
    mapMarkers = [];
    // Get the value from the element with ID 'Location'
    var locationValue = $(this).val() || "London";

    // getLocationsForArea(locationValue); // map markers

    //clickOrigin = 'listItem';

    // Use that value to select the desired element
    var targetElement = $('[data-location="' + locationValue + '"]');

    // Fetch the 'data-lat', 'data-long', and 'data-zoom' attributes and convert them to numbers
    var lat =
      targetElement.data("lat") !== null
        ? Number(targetElement.data("lat"))
        : null;
    var long =
      targetElement.data("long") !== null
        ? Number(targetElement.data("long"))
        : null;
    var zoom =
      targetElement.data("zoom") !== null
        ? Number(targetElement.data("zoom"))
        : null;

    function hideAmsterdam() {
      var $firstItemWithAmsterdam = $(
        '.map_select-item:has(div:contains("Amsterdam")):first',
      );

      // Check if an element was found
      if ($firstItemWithAmsterdam.length > 0) {
        // Hide the element
        $firstItemWithAmsterdam.hide();
      }
    }

    setTimeout(hideAmsterdam, 50);
    setTimeout(hideAmsterdam, 500);

    // Check if lat, long, and zoom are valid numbers
    if (lat !== null && long !== null && zoom !== null) {
      // Set the map's center and zoom level
      mapInstance.jumpTo({
        center: [long, lat],
        zoom: zoom,
      });
    } else {
      console.error("Invalid or missing lat, long, or zoom values");
    }
  });

  setTimeout(setIconsToCountries, 1000);

  function setInitialLocation() {
    let locationName;

    if (typeof regionCityName != "undefined" && regionCityName != null) {
      locationName = regionCityName;
    } else {
      if (window.location.pathname.replace(/^\/(nl|de)\//, "") != "/pricing") {
        let path = window.location.pathname
          .replace(/^\/(nl|de)\//, "")
          .slice(1);
        locationName = path
          .split("-") // Split the string into an array on dashes
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1)) // Capitalize the first letter of each part
          .join(" "); // Join the parts back together with a space
      } else {
        locationName =
          JSON.parse(localStorage.urlParams).params.location || "London";
      }
    }

    if (locationName == "Amsterdam East") {
      locationName = "Amsterdam";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const locationParam = urlParams.get("location");

    if (locationName) {
      $("#Location").val(locationName);

      // Only set localStorage if not on the pricing page
      if (window.location.pathname != "/pricing") {
        let storedParams;
        if (localStorage.urlParams) {
          storedParams = JSON.parse(localStorage.urlParams);
        } else {
          storedParams = {
            params: {
              location: "",
            },
          };
        }
        storedParams.params.location = locationName;
        localStorage.setItem("urlParams", JSON.stringify(storedParams));
      }
    } else if (locationParam) {
      $("#Location").val(locationParam);
    } else {
      // Default to Amsterdam if parameter is not present
      $("#Location").val("Amsterdam");
    }
    removeLocationParam();
    $("#Location").trigger("change");
  }

  $("#Location").on("change", () => {
    $(".map_select-location_selected").text($("#Location").val());
  });

  function removeLocationParam() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("location");
    urlParams.delete("city");

    const newQueryString = urlParams.toString();
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      (newQueryString ? "?" + newQueryString : "");

    history.replaceState(null, "", newUrl);
  }

  let locationList;

  function getLocationsForArea(area) {
    if (area == null) {
      area = "London";
    }

    console.log(
      "Getting locations for " + area + ", isDistrict is " + isDistrict,
    );

    console.log(
      "isDistrict is ",
      isDistrict && !$("#district-switch").prop("checked"),
    );
    let url = apiUrl + area;
    if (isDistrict && districtName && !$("#district-switch").prop("checked")) {
      console.log("adding district to url");
      url += `&district=${districtName}`;
    }

    function handleGetLocations() {
      if (mapInstance.getLayer("locations")) {
        mapInstance.removeLayer("locations");
        mapInstance.removeSource("locations");
      }

      // Clear existing markers
      if (mapMarkers) {
        mapMarkers.forEach((marker) => marker.remove());
      }
      mapMarkers = [];

      // If we have a selected location, center on it regardless of search results
      const selectedLocation = $('[data-location="' + area + '"]');
      if (selectedLocation.length) {
        const selectedLat = selectedLocation.data("lat");
        const selectedLng = selectedLocation.data("lng");
        const zoomLevel = selectedLocation.data("zoom") || 12.5;

        if (
          typeof selectedLat === "number" &&
          typeof selectedLng === "number" &&
          isFinite(selectedLat) &&
          isFinite(selectedLng) &&
          selectedLat >= -90 &&
          selectedLat <= 90 &&
          selectedLng >= -180 &&
          selectedLng <= 180
        ) {
          mapInstance.flyTo({
            center: [selectedLng, selectedLat],
            zoom: zoomLevel,
            essential: true,
          });

          // If no locations found, we can return here
          if (!locationList || locationList.length === 0) {
            console.log(
              "No locations in response, centered on selected location",
            );
            return;
          }
        }
      }

      // If no locations found and no selected location, just return
      if (!locationList || locationList.length === 0) {
        console.log("No locations in response");
        return;
      }

      // Create bounds object
      var bounds = new mapboxgl.LngLatBounds();
      var hasValidCoordinates = false;

      if (performGetUniqueLocations) {
        locationList = getUniqueLocations(locationList);
      }

      if (isDistrictPage && !isDistrictPopulated) {
        renderLocationsForDistrict(locationList);
      }

      // Iterate over each location
      locationList.forEach(function (location) {
        const marker = addMarkerToMap(mapInstance, location);
        if (marker) {
          bounds.extend([location.long, location.lat]);
          hasValidCoordinates = true;
        }
      });

      // Only fit bounds if we have valid coordinates and more than one location
      if (hasValidCoordinates && locationList.length > 1) {
        // Get zoom level with fallback
        var zoomElement = $('[data-location="' + area + '"]');
        var maxZoomLevel = zoomElement.length
          ? Number(zoomElement.data("zoom"))
          : 12.5;
        maxZoomLevel = isFinite(maxZoomLevel) ? maxZoomLevel : 12.5;

        // Fit bounds with padding
        mapInstance.fitBounds(bounds, {
          padding: 32,
          maxZoom: Math.max(maxZoomLevel, 12.5),
        });
      }
    }
  }

  function checkOverlappingMarkers() {
    const markers = document.querySelectorAll(
      ".location-marker:not(.is-hidden)",
    );
    const processedMarkers = [];

    markers.forEach((marker) => {
      if (processedMarkers.includes(marker)) return;

      const boundingBox = marker.getBoundingClientRect();
      let overlappingCount = 0;

      markers.forEach((otherMarker) => {
        if (processedMarkers.includes(otherMarker) || marker === otherMarker)
          return;

        const otherBox = otherMarker.getBoundingClientRect();
        if (
          !(
            boundingBox.right < otherBox.left ||
            boundingBox.left > otherBox.right ||
            boundingBox.bottom < otherBox.top ||
            boundingBox.top > otherBox.bottom
          )
        ) {
          overlappingCount++;
          otherMarker.classList.add("is-hidden");
          processedMarkers.push(otherMarker);
        }
      });

      if (overlappingCount > 0) {
        marker.classList.add("is-combined");
        marker.textContent =
          parseInt(marker.textContent || "1") + overlappingCount;
      }

      processedMarkers.push(marker);
    });
  }

  var allMarkers;
  // Attach the function to the map's zoom event
  mapInstance.on("zoomend", function () {
    // First, reset by removing all classes and text
    allMarkers = document.querySelectorAll(".location-marker");
    allMarkers.forEach((marker) => {
      marker.classList.remove("is-hidden", "is-combined");
      marker.textContent = "";
    });

    // Now, recheck the overlapping markers
    checkOverlappingMarkers();
  });

  // Call this initially as well to set things up
  checkOverlappingMarkers();

  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("is-combined")) {
      const lng = parseFloat(e.target.getAttribute("data-lng"));
      const lat = parseFloat(e.target.getAttribute("data-lat"));

      // Zoom in by 1.5 levels to the marker's coordinates
      mapInstance.flyTo({
        center: [lng, lat],
        zoom: mapInstance.getZoom() + 1.5,
      });
    }
  });

  console.log("Setting up map_list-item click handler");
  $("body").on("click", ".map_list-item", function (event) {
    console.log("map_list-item clicked:", this);
    const currentItem = $(this);

    // Remove .is-active class from other .map_list-item elements
    $(".map_list-wrapper .map_list-item").each(function () {
      if ($(this).is(currentItem)) return; // Skip the current item
      $(this).removeClass("is-active");
      $(this).find(".map_list-data-bottom").removeClass("is-active");
    });

    // Toggle .is-active class on the clicked .map_list-item element and its descendant
    currentItem.toggleClass("is-active");
    currentItem.find(".map_list-data-bottom").toggleClass("is-active");

    if (clickOrigin === "marker") {
      clickOrigin = null; // Reset the flag
      return; // Exit the function early if the click originated from the marker
    }

    const locationID = this.getAttribute("data-id");
    console.log("Looking for marker with location ID:", locationID);
    const markerEl = document.querySelector(
      `.location-marker[data-location-id="${locationID}"]`,
    );

    if (markerEl) {
      console.log("Found marker element:", markerEl);
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      clickOrigin = "listItem";
      markerEl.dispatchEvent(event);

      const markerBounds = markerEl.getBoundingClientRect();
      const mapBounds = mapInstance.getContainer().getBoundingClientRect();

      if (
        markerBounds.right < mapBounds.left ||
        markerBounds.left > mapBounds.right ||
        markerBounds.top > mapBounds.bottom ||
        markerBounds.bottom < mapBounds.top
      ) {
        const markerCoordinates = new mapboxgl.LngLat(
          parseFloat(markerEl.getAttribute("data-lng")),
          parseFloat(markerEl.getAttribute("data-lat")),
        );

        mapInstance.flyTo({
          center: markerCoordinates,
          zoom: mapInstance.getZoom() - 1,
          speed: 0.8,
        });
      }
    } else {
      console.log("No marker found for location ID:", locationID);
    }
  });

  function setIconsToCountries() {
    // Get all .map_select-item elements
    const selectItems = document.querySelectorAll(".map_select-item");

    // Get all .locations_cms elements
    const cmsLocations = document.querySelectorAll(".locations_cms-item");

    // Iterate through each .map_select-item
    selectItems.forEach((selectItem) => {
      // Get the text content of the .map_select-item_text
      const selectItemText = selectItem
        .querySelector(".map_select-item_text")
        .textContent.trim();

      // Iterate through each .locations_cms
      cmsLocations.forEach((cmsLocation) => {
        // Get the text content of the .locations_cms-text
        const cmsLocationText = cmsLocation
          .querySelector(".locations_cms-text")
          .textContent.trim();

        // Check if the text contents match
        if (selectItemText === cmsLocationText) {
          // Find the .map_select-item_icon within the selectItem and set its src attribute
          const icon = selectItem.querySelector(".map_select-item_icon");
          if (icon) {
            // Set the src attribute to the relative image path of the matching .locations_cms
            const imagePath = cmsLocation
              .querySelector("img")
              .getAttribute("src");
            icon.setAttribute("src", imagePath);
          }
        }
      });
    });
  }

  function toggleMarkerVisibility(marker, isVisible) {
    if (!marker) return;

    const markerElement = marker.getElement();
    if (isVisible) {
      markerElement.classList.remove("is-hidden");
    } else {
      markerElement.classList.add("is-hidden");
    }
  }
}

let initialDataUpdate = false;
FlowPlater.on("updateData", function (data) {
  if (initialDataUpdate) {
    return;
  }
  initialDataUpdate = true;
  console.log("Received updateData event:", data);
  const newData = JSON.parse(JSON.stringify(data.newData));
  const locationList = newData.location;
  console.log("Extracted location list:", locationList);
  updateMarkers(locationList);
});

// let performGetUniqueLocations = false;
// let apiUrl =
//   "https://europe-west1-fcurban-production.cloudfunctions.net/locations-getLocationsPerArea?area=";
// if (typeof isWomenOnly != "undefined" && isWomenOnly == true) {
//   apiUrl =
//     "https://europe-west1-fcurban-production.cloudfunctions.net/sessions-womenSessionsForArea?area=";
//   performGetUniqueLocations = true;
// }

function getUniqueLocations(sessions) {
  // Create an empty array to store the locations
  const locations = [];
  // Iterate over each session to extract the location
  sessions.forEach((session) => {
    const location = session.location;
    // Check if the location is not already in the array, then add it
    if (!locations.some((l) => l.id === location.id)) {
      locations.push(location);
    }
  });
  return locations;
}

FlowPlater.on("afterDomUpdate", function () {
  console.log("DOM updated, setting up handlers");

  $("body")
    .off("click", ".map_list-item")
    .on("click", ".map_list-item", function (event) {
      console.log("map_list-item clicked:", this);
      const currentItem = $(this);

      // Remove .is-active class from other .map_list-item elements
      $(".map_list-wrapper .map_list-item").each(function () {
        if ($(this).is(currentItem)) return; // Skip the current item
        $(this).removeClass("is-active");
        $(this).find(".map_list-data-bottom").removeClass("is-active");
      });

      // Toggle .is-active class on the clicked .map_list-item element and its descendant
      currentItem.toggleClass("is-active");
      currentItem.find(".map_list-data-bottom").toggleClass("is-active");

      if (clickOrigin === "marker") {
        clickOrigin = null; // Reset the flag
        return; // Exit the function early if the click originated from the marker
      }

      const locationID = this.getAttribute("data-id");
      console.log("Looking for marker with location ID:", locationID);
      const markerEl = document.querySelector(
        `.location-marker[data-location-id="${locationID}"]`,
      );

      if (markerEl) {
        console.log("Found marker element:", markerEl);

        // Remove active class from previous active marker
        if (activeMarker && activeMarker !== markerEl) {
          activeMarker.classList.remove("is-active");
        }

        // Toggle active state on current marker
        markerEl.classList.toggle("is-active");
        activeMarker = markerEl.classList.contains("is-active")
          ? markerEl
          : null;

        // Always move map to the marker when clicking on a card
        const markerCoordinates = new mapboxgl.LngLat(
          parseFloat(markerEl.getAttribute("data-lng")),
          parseFloat(markerEl.getAttribute("data-lat")),
        );

        mapInstance.flyTo({
          center: markerCoordinates,
          zoom: mapInstance.getZoom(),
          speed: 0.8,
        });

        clickOrigin = "listItem";
      } else {
        console.log("No marker found for location ID:", locationID);
      }
    });
});

initMap();

/* Filter functionality */

function filterLocations(locationList) {
  let filteredLocations = locationList;

  const filterData = $("#wf-form-Filters").serializeArray();

  console.log(
    "transformDataBeforeRender: filterLocations: filterData",
    filterData,
  );

  // Example filterData:
  // [
  //   {name: 'Location', value: 'London'},
  //   {name: 'Indoor', value: 'on'},
  //   {name: 'Outdoor', value: 'on'},
  //   {name: 'Monday', value: 'on'}
  //   days that are off will not be in the filterData array
  // ]

  const daysPlayed = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Handle location filter
  const locationFilter = filterData.find(
    (filter) => filter.name === "Location",
  );
  if (locationFilter) {
    console.log(
      "transformDataBeforeRender: filterLocations: filter.name === Location",
      locationFilter.value,
    );
    filteredLocations = filteredLocations.filter(
      (location) => location.area === locationFilter.value,
    );
  }

  // Handle indoor/outdoor filters together
  const hasIndoor = filterData.some((filter) => filter.name === "Indoor");
  const hasOutdoor = filterData.some((filter) => filter.name === "Outdoor");

  if (hasIndoor || hasOutdoor) {
    console.log("transformDataBeforeRender: filterLocations: venue filters", {
      indoor: hasIndoor,
      outdoor: hasOutdoor,
    });

    // If both are selected or neither is selected, don't filter
    if (hasIndoor !== hasOutdoor) {
      // Only filter if one is selected but not the other
      const venueType = hasIndoor ? "indoor" : "outdoor";
      filteredLocations = filteredLocations.filter(
        (location) => location.venue === venueType,
      );
    }
  }

  // Handle day filters
  filterData.forEach((filter) => {
    if (daysPlayed.includes(filter.name)) {
      console.log(
        "transformDataBeforeRender: filterLocations: filter.name in daysPlayed",
        filter.name,
      );
      filteredLocations = filteredLocations.filter((location) => {
        if (location["days-played"]) {
          return location["days-played"].split(", ").includes(filter.name);
        }
        return false;
      });
    }
  });

  updateMarkers(filteredLocations);
  return filteredLocations;
}

FlowPlater.addTransformer(
  "transformDataBeforeRender",
  (instance, data, dataType) => {
    console.log("transformDataBeforeRender", instance, data, dataType);
    const locationData = data.location;
    console.log("transformDataBeforeRender:locationData", locationData);
    const filteredLocations = filterLocations(locationData);
    console.log(
      "transformDataBeforeRender:filteredLocations",
      filteredLocations,
    );
    // data.location = filteredLocations;
    return { location: filteredLocations };
  },
);

$("#wf-form-Filters").on("change", function () {
  console.log("wf-form-Filters changed");
  FlowPlater.getInstance("map_list-wrapper").refresh({ remote: false });
});
