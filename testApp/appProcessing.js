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
        if (myWidth > 960) {
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

      function checkAppsAfterResize(){
        //alert("called!");
        //if size is small
        //and there are more than one open
        //just open the last that is open
        let myWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
        console.log(myWidth);
        if (myWidth<=960){ //size is small
            let keepOpenId="";
            let apps = document.getElementsByClassName("app");
            let openCount=0;
            for (let i=apps.length-1;i>=0;i--){
                console.log(apps[i]);

                if (apps[i].style.display!="none"){
                    openCount+=1;
                    keepOpenId=apps[i].id;
                    console.log(keepOpenId);
                }
            }
            if (openCount>1){
                closeAllApps();
                let btnId="btn"+keepOpenId.slice(3);
                console.log(btnId);
                document.getElementById(btnId).click();
            }
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