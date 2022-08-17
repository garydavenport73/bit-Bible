      ///////////////////////COMMENTARY STUFF/////////////////////////////


      function buildCommentarySearchOptions() {
        //bookChapterKeys global bibleBCSelction also global
        let str = "";
        for (let i = 0; i < bookChapterKeys.length; i++) {
          str += "<option value='" + bookChapterKeys[i] + "' />";
        }
        commentaryChaptersDatalist.innerHTML = str;
      }

      function showCommentarySelection() {
        //***************** AJAX function ********************

        if (local === true) {
          //if local do this
          commentaryResult.innerHTML = parseString(
            pulpit[commentarySearchBox.value]
          );
          addEventListenersToOpenVerses();
          //addEventListenersToFoundBibleWords();
          let myWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        //if (myWidth < 450) {
        if (myWidth < 960) {
            processAppSelection("btn-commentary");
          }
        } else {
          let osisRef = commentarySearchBox.value;
          getCommentaryChapterRemote(osisRef);
        }
      }

      function getCommentaryChapterRemote(osisRef) {
        let http = new XMLHttpRequest();
        http.timeout = 3000; // time in milliseconds
        //let url = "https://garydavenport.com/logtime/simpleAccounts.php";
        let url = "getcommentarychapter.php";
        // let params =
        //   "email=" + email + "&password=" + password + "&do-this=test";
        let params = "osisRef=" + osisRef;
        http.ontimeout = function (e) {
          alert("The request timed out.");
        };
        http.open("POST", url, true);
        http.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        http.onreadystatechange = function () {
          if (http.readyState == 4 && http.status == 200) {
            //console.log(http.responseText);
            //alert("Response received:\n" + http.responseText);

            commentaryResult.innerHTML = parseString(http.responseText);
            addEventListenersToOpenVerses();
            //addEventListenersToFoundBibleWords(); not yet needed add later when working
            let myWidth =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
            //if (myWidth < 450) {
            if (myWidth < 960) {
              processAppSelection("btn-commentary");
            }
          }
        };
        http.send(params);
      }
      //getBibleChapterRemote("Gen.1");