      ///////////////MAP STUFF

      function addEventListenersToMapButtons() {
        let mapButtons = document.getElementsByClassName("btn-select-map");
        for (let i = 0; i < mapButtons.length; i++) {
          mapButtons[i].style.backgroundColor = "lightgrey";
          mapButtons[i].addEventListener("click", (evt) => {
            processMapButtonClick(evt.target.id);
          });
        }
      }

      function processMapButtonClick(id) {
        let mapButtons = document.getElementsByClassName("btn-select-map");
        for (let i = 0; i < mapButtons.length; i++) {
          mapButtons[i].style.backgroundColor = "lightgrey";
        }
        document.getElementById(id).style.backgroundColor = "rgb(0,124,207)";
        document.getElementById("map-name").innerHTML = id.slice(4);
        plotBackgroundMapLocations(id);
      }
      function openGoogleMap() {
        let location = document.getElementById("map-location").innerText;
        if (location.length > 3) {
          //string is not empty contains at least 3 characters
          window.open("http://maps.google.com/maps?q=" + location);
        }
      }

      function plotOnMap(location) {
        if (document.getElementById("app-map").style.display === "none") {
          //do nothing
        } else {
          let labelText = dictionarySearchBox.value;

          let latitude = parseFloat(location.split(",")[0]);
          let longitude = parseFloat(location.split(",")[1]);
          let x = convertLongitude(longitude);
          let y = convertLatitude(latitude);
          console.log(latitude, longitude);
          console.log(x, y);

          let bullsEye = document.createElement("span");
          bullsEye.classList.add("bulls-eye");
          bullsEye.style.position = "absolute";
          bullsEye.style.left = x.toString() + "px";
          bullsEye.style.top = y.toString() + "px";
          //bullsEye.innerHTML = "o";
          bullsEye.innerHTML = "o<sub>" + labelText + "</sub>";
          mapContainer.appendChild(bullsEye);
        }
      }

      function convertLongitude(longitude) {
        //the map is about 320px wide //get computed width
        //longitude starts at 33.5 and ends at 36.5
        //let width=320;
        //width=parseFloat(asciiMap.width.slice(0,-2));
        let width = asciiMap.offsetWidth;
        console.log("calculated sscii map width", width);
        let x = (width * longitude - width * 33.5) / (36.5 - 33.5);
        console.log(x);
        return x;
      }

      function convertLatitude(latitude) {
        //the map is about 620px high
        //latitude starts at 34 and goes to 29
        //let height=620;
        //height=parseFloat(asciiMap.height.slice(0,-2));
        let height = asciiMap.offsetHeight;
        console.log("calculated ascii map height", height);
        let slope = height / (29 - 34);
        let y = slope * latitude - slope * 34;
        console.log(y);
        return y;
      }

      function clearBullsEyes() {
        let bullsEyes = document.getElementsByClassName("bulls-eye");
        for (let i = bullsEyes.length - 1; i >= 0; i--) {
          bullsEyes[i].remove();
        }
      }

      function clearBackgroundLocations() {
        document.getElementById("map-location").innerHTML = "";
        document.getElementById("coordinates-label").innerHTML = "";

        let existingLocations = document.getElementsByClassName(
          "background-location"
        );
        let existingLocationLabels = document.getElementsByClassName(
          "background-location-label"
        );

        for (let i = existingLocations.length - 1; i >= 0; i--) {
          existingLocations[i].remove();
        }

        for (let i = existingLocationLabels.length - 1; i >= 0; i--) {
          existingLocationLabels[i].remove();
        }

        document.getElementById("map-name").innerHTML = "&nbsp;";

        let mapButtons = document.getElementsByClassName("btn-select-map");
        for (let i = 0; i < mapButtons.length; i++) {
          mapButtons[i].style.backgroundColor = "lightgrey";
        }
      }

      function setSizeOfPre() {
        let pixelWidth = 320; //target width
        asciiMap.style.fontSize = "20px";
        let floatFontSize = 20;

        let myWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        console.log(myWidth);
        // if (myWidth > 960) {
        //     pixelWidth = 480; //matches breakpoints for tablet
        // }




        console.log(asciiMap.offsetWidth); //the width of ascii map
        while (asciiMap.offsetWidth >= pixelWidth) {
          //map to big, above target
          floatFontSize = parseFloat(asciiMap.style.fontSize.slice(0, -2));
          console.log(asciiMap.offsetWidth, floatFontSize);
          floatFontSize = floatFontSize - 0.5;
          asciiMap.style.fontSize = floatFontSize + "px"; //reduce map font size
          if (floatFontSize <= 0.5) {
            //minimum font size;
            break;
          }
        }
      }

      function plotBackgroundLocation(location, locationName) {
        let latitude = parseFloat(location.split(",")[0]);
        let longitude = parseFloat(location.split(",")[1]);
        let x = convertLongitude(longitude);
        let y = convertLatitude(latitude);
        let backgroundLocation = document.createElement("span");
        backgroundLocation.classList.add("background-location");
        backgroundLocation.style.position = "absolute";
        backgroundLocation.style.left = x.toString() + "px";
        backgroundLocation.style.top = y.toString() + "px";
        backgroundLocation.innerHTML = "o<sub>" + locationName + "</sub>";

        //   backgroundLocationLabel = document.createElement("span");
        //   backgroundLocationLabel.classList.add("background-location-label");
        //   backgroundLocationLabel.style.position = "absolute";
        //   backgroundLocationLabel.style.left = (x + 10).toString() + "px";
        //   backgroundLocationLabel.style.top = y.toString() + "px";
        //   backgroundLocationLabel.innerHTML = locationName;

        mapContainer.appendChild(backgroundLocation);
        //   mapContainer.appendChild(backgroundLocationLabel);
      }

      function plotBackgroundMapLocations(id) {
        let existingLocations = document.getElementsByClassName(
          "background-location"
        );
        // let existingLocationLabels = document.getElementsByClassName("background-location-label");

        for (let i = existingLocations.length - 1; i >= 0; i--) {
          existingLocations[i].remove();
        }

        // for (let i = existingLocationLabels.length - 1; i >= 0; i--) {
        //   existingLocationLabels[i].remove();
        // }

        if (id === "map-Abraham") {
          plotBackgroundLocation(
            "31.69352950368834,34.84388288576839",
            "Canaan"
          );
          plotBackgroundLocation("30.9625,46.103056", "Ur");
          plotBackgroundLocation("36.86,39.03139", "Haran");
          plotBackgroundLocation("33.511612,36.309102", "Damascus");
          plotBackgroundLocation("32.22111,35.25444", "Shechem");
          plotBackgroundLocation("31.93053921,35.22103275", "Bethel");
          plotBackgroundLocation("33.24856,35.65252", "Dan");
          // plotBackgroundLocation("33.5,36.466667","Hobah");
          plotBackgroundLocation("31.777444,35.234935", "Salem");
          plotBackgroundLocation("31.38176,34.60698", "Gerar");
          plotBackgroundLocation("31.245,34.84068", "Beersheba");
          plotBackgroundLocation("31.032047,33.854957", "Egypt");
        } else if (id === "map-Moses") {
          plotBackgroundLocation("29.5,34", "Sinai");
          plotBackgroundLocation("31.69352950368834,34.84388288576839", "Zin");
          plotBackgroundLocation("29.306194,32.980924", "Elim");
          plotBackgroundLocation("30.998062,35.498547", "Beer");
          plotBackgroundLocation("29.35,32.933333", "Marah");
          plotBackgroundLocation("19.0,39.5", "Red Sea");
          plotBackgroundLocation("28.838778,33.420573", "Wilderness of Sin");
        } else if (id === "map-12 Tribes") {
          plotBackgroundLocation("32.559061,35.246206", "Kedesh");
          plotBackgroundLocation("32.80007553,35.9373013", "Golan");
          plotBackgroundLocation("32.049953,35.733402", "Ramoth");
          plotBackgroundLocation("32.51613741,36.48829076", "Bezer");
          plotBackgroundLocation("31.524354,35.108539", "Hebron");
          plotBackgroundLocation("32.22111,35.25444", "Shechem");
          plotBackgroundLocation("33.511612,36.309102", "Damascus");
          plotBackgroundLocation("31.95522,35.94503", "Ammon");
          plotBackgroundLocation("31.777444,35.234935", "Jerusalem");
          plotBackgroundLocation("32.280231,35.197929", "Samaria");
        } else if (id === "map-Divided Kingdoms") {
          plotBackgroundLocation("32.22111,35.25444", "Shechem");
          plotBackgroundLocation("32.280231,35.197929", "Samaria");
          plotBackgroundLocation("31.777444,35.234935", "Jerusalem");
          plotBackgroundLocation("31.524354,35.108539", "Hebron");
          plotBackgroundLocation("31.503959,34.46203", "Gaza");
          plotBackgroundLocation("31.38176,34.60698", "Gerar");
          plotBackgroundLocation("33.511612,36.309102", "Damascus");
          plotBackgroundLocation("32.502074,35.50196", "Jezreel");
        } else if (id === "map-Jesus") {
          plotBackgroundLocation("31.70431,35.20746", "Bethlehem");
          plotBackgroundLocation("33.511612,36.309102", "Damascus");
          plotBackgroundLocation("41.01316,24.28409", "Phillipi");
          plotBackgroundLocation("32.701029,35.300148", "Nazareth");
          plotBackgroundLocation("32.502074,35.50196", "Jezreel");
          plotBackgroundLocation("32.280231,35.197929", "Samaria");
          plotBackgroundLocation("32.8138046,35.590564", "Sea Galilee");
          plotBackgroundLocation("31.577850349494952,35.52394311", "Dead Sea");
          plotBackgroundLocation("31.79819,35.80986", "Mt. Ebal");
          plotBackgroundLocation("31.777444,35.234935", "Jerusalem");
          plotBackgroundLocation("31.524354,35.108539", "Hebron");
          plotBackgroundLocation("31.422876,35.132952", "Carmel");
          plotBackgroundLocation("31.503959,34.46203", "Gaza");
          plotBackgroundLocation("31.93053921,35.22103275", "Bethel");
        }
      }