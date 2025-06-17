var Webflow = Webflow || [];

Webflow.push(function () {
  window.__defineGetter__("isMobile", () => {
    return window.innerWidth < 768;
  });

  window.dataLayer = window.dataLayer || [];

  const isFullPageMap = window.location.pathname.match(
    /^\/(de\/|nl\/)?locations\/?$/,
  );

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
            ...new Set(
              location.sessions.map((session) =>
                session.day ? session.day.substring(0, 3) : "",
              ),
            ),
          ].join(", ");
          location.image = location.sessions[0].image;
        }

        if (location.page && location.page.href) {
          location.page.href = new URL(location.page.href).pathname;
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
        // If on mobile and list is hidden, show it first
        if (window.isMobile && mapListState === "hidden") {
          // simulate toggle map list using click on .locations_display-switch
          document.querySelector(".locations_display-switch").click();
          // Wait for the list to be visible before scrolling
          setTimeout(() => {
            listItem.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 50);
        } else {
          listItem.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

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

      // Reset all markers before checking overlaps
      const allMarkers = document.querySelectorAll(".location-marker");
      allMarkers.forEach((marker) => {
        marker.classList.remove("is-hidden", "is-combined");
        marker.textContent = "";
      });

      // Check for overlapping markers
      checkOverlappingMarkers();
    } else {
      console.log("Invalid location list:", locationList);
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
      fitBoundsOptions: {
        padding: { top: 32, bottom: 32, left: 32, right: 32 },
      },
      trackResize: true,
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

    mapInstance.once("load", () => {
      setInitialLocation();
    });

    $(".close_icon").on("click", () => {
      setTimeout(removeActive, 50);

      function removeActive() {
        $(".map_list-item.is-active").removeClass("is-active");
        $(".location-marke.is-active").removeClass("is-active");
      }
    });

    let isDistrict =
      window.location.pathname.includes("district/") ||
      (typeof isStaticDistrict !== "undefined" ? isStaticDistrict : false);
    const isDistrictPage = isDistrict;
    districtName = isDistrict
      ? (districtName ??
        window.location.pathname
          .replace("/district/", "")
          .split("/")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(""))
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

    $("#map-location").on("change", function () {
      if ($("#map-location").val() == null) {
        $("#map-location").val("London");
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
        if (
          window.location.pathname.replace(/^\/(nl|de)\//, "") != "/pricing"
        ) {
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
        $("#map-location").val(locationName);

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
        $("#map-location").val(locationParam);
      } else {
        // Default to Amsterdam if parameter is not present
        $("#map-location").val("Amsterdam");
      }
      removeLocationParam();
      $("#map-location").trigger("change");
    }

    $("#map-location").on("change", () => {
      $(".map_select-location_selected").text($("#map-location").val());
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
      if (
        isDistrict &&
        districtName &&
        !$("#district-switch").prop("checked")
      ) {
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
    // checkOverlappingMarkers(); // Removed since it's now part of updateMarkers

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

  /* Helper functions for filtering */
  function matchValueAtProperty(object, propKey, value) {
    // If value is true, just check if property exists and is not null/undefined
    if (value === true) {
      return object.hasOwnProperty(propKey) && object[propKey] != null;
    }

    // If value is array, check if property value is in array
    if (Array.isArray(value)) {
      return object.hasOwnProperty(propKey) && value.includes(object[propKey]);
    }

    // Otherwise do direct comparison
    return object.hasOwnProperty(propKey) && object[propKey] === value;
  }

  function hasSessionsWithProperty(location, propKey, value) {
    if (!location.sessions || !Array.isArray(location.sessions)) {
      return false;
    }
    return location.sessions.some((session) =>
      matchValueAtProperty(session, propKey, value),
    );
  }

  function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes; // Convert to minutes since midnight
  }

  function getTimeCategory(timeStr) {
    const minutes = parseTime(timeStr);
    if (minutes < parseTime("18:00")) return "day";
    if (minutes < parseTime("20:00")) return "evening";
    return "night";
  }

  function hasSessionsInTimeRange(location, timeCategories) {
    if (!location.sessions || !Array.isArray(location.sessions)) {
      return false;
    }

    return location.sessions.some((session) => {
      if (!session.time) return false;
      const category = getTimeCategory(session.time);
      return timeCategories.includes(category);
    });
  }

  // Add debounce function at the top level
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Add function to get active filters
  function getActiveFilters() {
    const filterData = $("#wf-form-Filters").serializeArray();
    const activeFilters = {};

    filterData.forEach((filter) => {
      const name = filter.name.toLowerCase().replace(/-\d+$/, "");
      if (filter.value === "on" || filter.value === "true") {
        activeFilters[name] = true;
      } else if (filter.value) {
        activeFilters[name] = filter.value;
      }
    });

    return activeFilters;
  }

  // Add function to push to dataLayer
  const pushFilterUpdate = debounce((filteredLocations) => {
    // Count locations that are actually in the district
    const locationsFromDistrict =
      typeof isDistrict !== "undefined" && isDistrict && districtName
        ? filteredLocations.filter(
            (location) => location.district === districtName,
          ).length
        : 0;

    window.dataLayer.push({
      event: "filter_update",
      filter_results: {
        total_locations: filteredLocations.length,
        locations_from_district: locationsFromDistrict,
        active_filters: getActiveFilters(),
        district:
          typeof isDistrict !== "undefined" && isDistrict && districtName
            ? districtName
            : null,
      },
    });
  }, 1000); // 1000ms debounce

  function filterLocations(locationList) {
    let filteredLocations = locationList;

    const filterData = $("#wf-form-Filters").serializeArray();
    // set all names to lowercase
    filterData.forEach((filter) => {
      filter.name = filter.name.toLowerCase().replace(/-\d+$/, "");
    });

    console.log(
      "transformDataBeforeRender: filterLocations: filterData",
      filterData,
    );

    // Handle location filter
    const locationFilter = filterData.find(
      (filter) => filter.name == "map-location",
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

    // Handle time filters together
    const hasDay = filterData.some((filter) => filter.name === "day");
    const hasEvening = filterData.some((filter) => filter.name === "evening");
    const hasNight = filterData.some((filter) => filter.name === "night");

    if (hasDay || hasEvening || hasNight) {
      console.log("Filtering locations by time", {
        day: hasDay,
        evening: hasEvening,
        night: hasNight,
      });

      // Create array of selected time categories
      const selectedTimes = [];
      if (hasDay) selectedTimes.push("day");
      if (hasEvening) selectedTimes.push("evening");
      if (hasNight) selectedTimes.push("night");

      filteredLocations = filteredLocations.filter((location) =>
        hasSessionsInTimeRange(location, selectedTimes),
      );
    }

    // Handle has-sessions filter
    if (filterData.some((filter) => filter.name === "has-sessions")) {
      console.log("Filtering locations with sessions");
      filteredLocations = filteredLocations.filter((location) =>
        matchValueAtProperty(location, "sessions", true),
      );
    }

    // Handle women-only filter
    if (filterData.some((filter) => filter.name === "women-only")) {
      console.log("Filtering women-only sessions");
      filteredLocations = filteredLocations.filter((location) =>
        hasSessionsWithProperty(location, "women-only", "true"),
      );
    }

    // Handle showers filter
    if (filterData.some((filter) => filter.name === "showers")) {
      console.log("Filtering locations with showers");
      filteredLocations = filteredLocations.filter((location) =>
        matchValueAtProperty(location, "showers", true),
      );
    }

    // Handle lockers filter
    if (filterData.some((filter) => filter.name === "lockers")) {
      console.log("Filtering locations with lockers");
      filteredLocations = filteredLocations.filter((location) =>
        matchValueAtProperty(location, "lockers", true),
      );
    }

    // Handle grass surface filter
    if (filterData.some((filter) => filter.name === "grass")) {
      console.log("Filtering locations with grass surface");
      filteredLocations = filteredLocations.filter((location) =>
        matchValueAtProperty(location, "surface", "grass"),
      );
    }

    // Handle lighting filter
    if (filterData.some((filter) => filter.name === "light")) {
      console.log("Filtering locations with lighting");
      filteredLocations = filteredLocations.filter((location) => {
        // If lighting property doesn't exist, exclude the location
        if (!location.hasOwnProperty("lighting")) return false;
        // Include location if lighting is anything except "nolight"
        return location.lighting !== "nolight";
      });
    }

    // Handle size filters together
    const hasSmall = filterData.some((filter) => filter.name === "small");
    const hasMedium = filterData.some((filter) => filter.name === "medium");
    const hasLarge = filterData.some((filter) => filter.name === "large");

    if (hasSmall || hasMedium || hasLarge) {
      console.log("Filtering locations by size", {
        small: hasSmall,
        medium: hasMedium,
        large: hasLarge,
      });

      // Create array of selected sizes
      const selectedSizes = [];
      if (hasSmall) selectedSizes.push("small");
      if (hasMedium) selectedSizes.push("medium");
      if (hasLarge) selectedSizes.push("large");

      filteredLocations = filteredLocations.filter((location) =>
        matchValueAtProperty(location, "size", selectedSizes),
      );
    }

    // Handle indoor/outdoor filters together
    const hasIndoor = filterData.some((filter) => filter.name === "indoor");
    const hasOutdoor = filterData.some((filter) => filter.name === "outdoor");

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
    const daysPlayed = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const dayMap = {
      sunday: "sun",
      monday: "mon",
      tuesday: "tue",
      wednesday: "wed",
      thursday: "thu",
      friday: "fri",
      saturday: "sat",
    };

    // Get all selected days - filter for any day checkbox that is checked ('on')
    const selectedDays = filterData
      .filter((filter) => {
        const dayName = filter.name.toLowerCase();
        return dayName in dayMap && filter.value === "on";
      })
      .map((filter) => {
        const dayName = filter.name.toLowerCase();
        return dayMap[dayName];
      });

    if (selectedDays.length > 0) {
      console.log("Filtering locations by days:", selectedDays);
      filteredLocations = filteredLocations.filter((location) => {
        if (!location["days-played"]) return false;

        const locationDays = location["days-played"]
          .split(", ")
          .map((day) => day.toLowerCase());

        console.log(
          "Location days:",
          locationDays,
          "Selected days:",
          selectedDays,
        );

        // Return true if any selected day matches any of the location's days
        return selectedDays.some((selectedDay) =>
          locationDays.includes(selectedDay),
        );
      });
    }

    updateMarkers(filteredLocations);
    pushFilterUpdate(filteredLocations);
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

    // Add a small delay to ensure DOM has updated
    setTimeout(() => {
      updateFilterCounts();
    }, 10);
  });

  document.querySelectorAll(".filter_dropdown-wrap").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".filter_dropdown-toggle");
    const content = dropdown.querySelector(".filter_dropdown-content");

    // Set initial state
    gsap.set(content, { height: 0, overflow: "hidden", display: "none" });
    let isOpen = false;

    toggle.addEventListener("click", () => {
      if (isOpen) {
        gsap.to(content, {
          height: 0,
          duration: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            content.style.display = "none";
          },
        });
      } else {
        content.style.display = "block";
        gsap.to(content, {
          height: content.scrollHeight,
          duration: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            content.style.height = "auto";
          },
        });
      }
      isOpen = !isOpen;
    });
  });

  // Helper function to update counts
  function updateFilterCounts() {
    // Update counts for individual filter groups (excluding the main one for hiding logic)
    document.querySelectorAll("[data-filter-group]").forEach((group) => {
      // Find the count element within the current group
      const countElem = group.querySelector("[data-filter-count]");
      if (!countElem) return; // Skip if no count element is found

      // Find all checked inputs within this group (including nested groups)
      const checkedInputs = group.querySelectorAll(
        '.filter_dropdown-content input[type="checkbox"]:checked, .filter_dropdown-content input[type="radio"]:checked',
      );

      const count = checkedInputs.length;

      // Update the count text
      countElem.textContent = count;

      // Determine if this is the main filter count at the top
      const isMainFilterCount =
        group.parentElement &&
        group.parentElement.classList.contains("map_select-toggle");

      // For individual filter groups (not the main one), hide the count parent if the count is 0
      if (!isMainFilterCount) {
        const parent = countElem.parentElement;
        if (parent) {
          parent.style.display = count === 0 ? "none" : "";
        }
      }
    });

    // Now, update the main filter count at the very top
    const mainFilterGroup = document.querySelector(
      ".map_select[data-filter-group]",
    );
    if (mainFilterGroup) {
      const mainCountElem = mainFilterGroup.querySelector(
        "[data-filter-count]",
      );
      if (mainCountElem) {
        // Count all checked inputs within ALL filter groups
        const allCheckedInputs = document.querySelectorAll(
          "[data-filter-group] .filter_dropdown-content input[type='checkbox']:checked, [data-filter-group] .filter_dropdown-content input[type='radio']:checked",
        );
        mainCountElem.textContent = allCheckedInputs.length;
      }
    }
  }

  // Initial count on page load
  updateFilterCounts();

  document.querySelectorAll("[data-filter-reset]").forEach((resetButton) => {
    resetButton.addEventListener("click", () => {
      document
        .querySelectorAll("label:not([data-keep-checked]):has(:checked)")
        .forEach((label) => {
          label.click();
        });
    });
  });

  const FILTER_TOGGLE_DURATION = 0.3;
  const FILTER_WIDTH = 15.5;
  let filterState = "hidden";

  const filterAnimationStates = {
    "desktop-hidden": {
      y: 0,
      x: isFullPageMap ? "-100%" : "15.75rem",
      scaleX: 0.875,
      scaleY: 1,
      opacity: 0,
    },
    "desktop-visible": {
      y: 0,
      x: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    },
    "mobile-hidden": {
      y: "-2rem",
      x: 0,
      scaleX: 1,
      scaleY: 0.875,
      opacity: 0,
    },
    "mobile-visible": {
      y: 0,
      x: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    },
  };

  const filterContainer = isFullPageMap
    ? ".location_filter_static"
    : ".location_filter-popup";

  gsap.set(filterContainer, {
    ...filterAnimationStates[
      `${window.isMobile ? "mobile" : "desktop"}-hidden`
    ],
  });

  // function showFilter: animate .location_filter-popup from x 100% to x 0%
  function showFilter(mobile = window.isMobile) {
    filterState = "visible";
    gsap.set(filterContainer, { display: "flex" });

    if (!mobile) {
      gsap.set(".map_wrapper canvas", { width: "100%" });
    }

    gsap.to(filterContainer, {
      ...filterAnimationStates[`${mobile ? "mobile" : "desktop"}-visible`],
      duration: FILTER_TOGGLE_DURATION,
      ease: "power2.inOut",
    });

    if (!mobile) {
      if (isFullPageMap) {
        gsap.to(".map_list-wrapper", {
          marginLeft: "calc(50% - 2.25rem)",
          ease: "power2.inOut",
          duration: FILTER_TOGGLE_DURATION,
        });
      } else {
        gsap.to(".map_wrapper", {
          width: `calc(100% - ${FILTER_WIDTH}rem)`,
          ease: "power2.inOut",
          duration: FILTER_TOGGLE_DURATION,
          onComplete: () => {
            mapInstance.resize();
          },
        });
      }
    }
  }

  function hideFilter(mobile = window.isMobile) {
    filterState = "hidden";

    if (!mobile) {
      gsap.set(".map_wrapper canvas", { width: "100%" });
    }

    gsap.to(filterContainer, {
      ...filterAnimationStates[`${mobile ? "mobile" : "desktop"}-hidden`],
      duration: FILTER_TOGGLE_DURATION,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(filterContainer, { display: "none" });
      },
    });

    if (!mobile) {
      if (isFullPageMap) {
        gsap.to(".map_list-wrapper", {
          marginLeft: "0%",
          ease: "power2.inOut",
          duration: FILTER_TOGGLE_DURATION,
        });
      } else {
        gsap.to(".map_wrapper", {
          width: "100%",
          ease: "power2.inOut",
          duration: FILTER_TOGGLE_DURATION,
          onComplete: () => {
            mapInstance.resize();
          },
        });
      }
    }
  }

  function toggleFilter() {
    if (filterState === "hidden") {
      showFilter();
    } else {
      hideFilter();
    }
  }

  document
    .querySelector("[data-filter-toggle]")
    .addEventListener("click", (e) => {
      // prevent when inside filter group
      if (e.target.closest(filterContainer)) return;
      toggleFilter();
    });

  //[filter-submit] close filter
  document.querySelector("[filter-submit]").addEventListener("click", () => {
    hideFilter();
  });

  // if on mobile and on .locations_display-switch click, show or hide .map_list-wrapper. Initial state is hidden. Use gsap. set initial state to hidden.
  let mapListState = "hidden";
  if (window.isMobile) {
    gsap.set(".map_list-wrapper", { display: "none" });
  }

  function toggleMapList() {
    if (window.isMobile) {
      mapListState = mapListState === "hidden" ? "visible" : "hidden";
      let flexOrGrid =
        isFullPageMap && window.innerWidth < 576 ? "flex" : "grid";
      gsap.set(".map_list-wrapper", {
        display: mapListState === "visible" ? flexOrGrid : "none",
      });
    }
  }

  document
    .querySelector(".locations_display-switch")
    .addEventListener("click", () => {
      toggleMapList();
    });

  $(".filter_dropdown-content_line:has(input[type='checkbox'])").on(
    "click",
    function (e) {
      // If the click is on a label or inside a label, do nothing
      if ($(e.target).closest("label").length) {
        return;
      }
      // Otherwise, trigger a click on the nested label
      $(this).find("label").first().trigger("click");
    },
  );
});
