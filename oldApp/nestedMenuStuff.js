      ////////////////////////////////////////////
      ////////// NESTED MENU STUFF ////////////////
      ///////////////////////////////////////
      function toggleNest(menu) {
        let siblings = menu.parentElement.children;
        for (let sibling of siblings) {
          if (sibling === menu) {
            //alert("found self!");
          } else {
            if (sibling.style.display === "none") {
              sibling.style.display = "inherit";
            } else {
              sibling.style.display = "none";
            }
          }
        }
      }

      function addEventListenersToNestedMenus() {
        let nestedMenues = document.getElementsByClassName("nested-menu");
        for (let nestedmenu of nestedMenues) {
          nestedmenu.addEventListener("click", (evt) => {
            toggleNest(evt.target);
          });
        }
      }

      function openSiblings(id) {
        let menu = document.getElementById(id);
        let siblings = menu.parentElement.children;
        for (let sibling of siblings) {
          if (sibling === menu) {
          } else {
            sibling.style.display = "inherit";
          }
        }
      }

      function closeSiblings(id) {
        let menu = document.getElementById(id);
        let siblings = menu.parentElement.children;
        for (let sibling of siblings) {
          if (sibling === menu) {
            //do nothing
          } else {
            sibling.style.display = "none";
          }
        }
      }
      ///////////////////////NESTED MENU STUFF ENDS///////////////