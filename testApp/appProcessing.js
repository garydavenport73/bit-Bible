      //////////////////////////////////////////////////////////////
      //
      //  PROCESSING APP SELECTIONS, ATTACHING EVENTS TO BUTTONS
      //
      //////////////////////////////////////////////////////////////

      function initializeNavButtonsAndCloseApps() {
        let navButtons = document.getElementsByClassName("nav-button");
        for (let i = 0; i < navButtons.length; i++) {
          navButtons[i].addEventListener("click", (evt) => {
            processAppSelection(evt.target.id);
          });
        }
        let apps = document.getElementsByClassName("app");
        for (let i = 0; i < apps.length; i++) {
          apps[i].style.display = "none";
        }
      }

      function processAppSelection(id) {
        let myWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        console.log(myWidth);
        let appId = "app-" + id.split("btn-").join("");
        if (myWidth > 450) {
          let app = document.getElementById(appId);
          //console.log(app.style.display.toString());
          if (app.style.display === "none") {
            app.style.display = "block";
            document.getElementById(id).style.backgroundColor =
              "rgb(0,124,207)";
          } else {
            app.style.display = "none";
            document.getElementById(id).style.backgroundColor = "lightgrey";
          }
        } else {
          closeAllApps();
          let app = document.getElementById(appId);
          app.style.display = "block";
          document.getElementById(id).style.backgroundColor = "rgb(0,124,207)";
        }
        if (appId === "app-map") {
          setSizeOfPre();
        }
      }

      function closeAllApps() {
        let apps = document.getElementsByClassName("app");
        let appButtons = document.getElementsByClassName("nav-button");
        for (let i = 0; i < apps.length; i++) {
          apps[i].style.display = "none";
        }
        for (let i = 0; i < appButtons.length; i++) {
          appButtons[i].style.backgroundColor = "lightgrey";
        }
      }
      ////////////////////// SECTION ENDS /////////////////////////