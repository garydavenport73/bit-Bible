      /////////////DICTIONARY STUFF /////////////////////
      /////////////////////////////////////////////////////////////////////
      //
      /////////////////// DICTIONARY ENTRY OPENING ETC ////////////////////
      //
      ///////////////////////////////////////////////////////////////////
      function buildDictionarySearchOptions() {
        if (local === true) {
          _buildDictionarySearchOptionsLocal();
        } else {
          _buildDictionarySearchOptionsRemote();
        }
      }

      function _buildDictionarySearchOptionsLocal() {
        //***************** NEEDS EASTONS WORD INDEX ARRAY ********************
        let str = "";
        for (let i = 0; i < eastons.length; i++) {
          str += "<option value='" + eastons[i]["word"] + "' />";
        }
        dictionaryDataList.innerHTML = str;
        //   openDictionaryEntry("Jesus", "Jesus 2");
      }

      ////////////////////////////////////////////
      //    HANDLING THE OPENING OF A WORD AND ENTRY
      //
      function openDictionaryEntry(word, entry) {
        //opens the word in dictionary and subentry if given
        //_selectDictionaryWord(word); //setting the index correctly in the select element
        console.log("entry", entry);

        word = word.charAt(0).toUpperCase() + word.slice(1); //capitalizes first letter
        dictionarySearchBox.value = word;

        console.log(word);

        //showDictionarySelection(); //builds the dictionary innerHTML content and adds event listeners
        //takes the word not subword from the selection element
        //note will be closed unless there is only one definition then it is opened
        //let selectedWord = dictionarySelection.options[dictionarySelection.selectedIndex].text;

        let index = getIndexOfWord(word);

        if (local === true) {
          let resultEntries = JSON.parse(
            parseString(JSON.stringify(eastons[index]["entries"]))
          );
          _buildDictionaryResult(resultEntries, entry);
        } else {
          getDictionaryWordDataRemote(index, entry);
        }
      }

      function showDictionarySelection() {
        let word = dictionarySearchBox.value.trim();
        openDictionaryEntry(word);
      }

      function closeWordEntries() {
        let wordEntries = document.getElementsByClassName("word-entry");
        for (let i = 0; i < wordEntries.length; i++) {
          closeSiblings(wordEntries[i].id);
        }
      }

      function getIndexOfWord(word) {
        ////NEEDS ARRAY HERE

        if (local === true) {
          for (let i = 0; i < eastons.length; i++) {
            if (eastons[i]["word"] === word) {
              //console.log("found at",i);
              return i;
            }
          }
          return -1;
        } else {
          for (let i = 0; i < wordList.length; i++) {
            if (wordList[i] === word) {
              //console.log("found at",i);
              return i;
            }
          }
          return -1;
        }
      }

      function _buildDictionarySearchOptionsRemote() {
        console.log("using remote");
        let http = new XMLHttpRequest();
        http.timeout = 3000; // time in milliseconds
        let url = "getdictionarywordlist.php";
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
            wordList = JSON.parse(parseString(http.responseText));
            //console.log("*****!!!!!!!!!!!!WORD LIST !!!!!!!!!!!!*****");
            //console.log(wordList);
            let str = "";
            for (let i = 0; i < wordList.length; i++) {
              str += "<option value='" + wordList[i] + "' />";
            }
            dictionaryDataList.innerHTML = str;
            // openDictionaryEntry("Jesus", "Jesus 2");
          }
        };
        http.send();
      }

      function getDictionaryWordDataRemote(index, entry) {
        console.log("INDEX", index);
        console.log("using remote defnitions");
        let http = new XMLHttpRequest();
        http.timeout = 3000; // time in milliseconds
        let url = "getdictionaryworddata.php";
        let params = "index=" + index;
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
            console.log(http.responseText);
            {
              let wordData = JSON.parse(parseString(http.responseText));
              let resultEntries = wordData["entries"];
              _buildDictionaryResult(resultEntries, entry);
            }
          }
        };
        http.send(params);
      }

      function _buildDictionaryResult(resultEntries, entry) {
        if (resultEntries != undefined) {
          //loop through entries
          let str = "";
          for (let i = 0; i < resultEntries.length; i++) {
            str += "<hr>";
            //loopp through keys
            str += "<div>";
            for (const key in resultEntries[i]) {
              //handle every key type lookup here
              //dictLookup
              //dictText
              //verseReferences
              //location
              //mother
              //father
              //partners
              //children
              //siblings
              //halfSiblingsSameMother
              //halfSiblingsSameFather
              if (key === "dictLookup") {
                let id = resultEntries[i][key];
                str +=
                  "<h3 class='nested-menu word-entry color-hover' id='" +
                  id +
                  "'>" +
                  resultEntries[i][key] +
                  "</h3>";
              }
              //handl
              else if (key == "dictText") {
                str += "<h3>Text:</h3>";
                str += "<p>";
                str += resultEntries[i][key];
                str += "</p>";
                //str += "<h3>" + key + "</h3>";
                //str += "<p>";
                //str += resultEntries[i][key];
                //str += "</p>";
              } else if (key == "verseReferences") {
                str += "<h3>References:</h3>";
                str += "<p>";

                //let versesArray=resultEntries[i][key].split(",");
                //str+="<span class='open-verse color-hover'>";
                //str+=resultEntries[i][key].split(",").join("</span>,<span class='open-verse color-hover'>");
                //str+="</span>";
                str += resultEntries[i][key];

                str += "</p>";
              } else if (
                key === "mother" ||
                key === "father" ||
                key === "partners" ||
                key === "children" ||
                key === "siblings" ||
                key === "halfSiblingsSameMother" ||
                key === "halfSiblingsSameFather"
              ) {
                if (key === "mother") {
                  str += "<h3>Mother:</h3>";
                } else if (key === "father") {
                  str += "<h3>Father:</h3>";
                } else if (key === "partners") {
                  str += "<h3>Partner:</h3>";
                } else if (key === "children") {
                  str += "<h3>Children:</h3>";
                } else if (key === "siblings") {
                  str += "<h3>Siblings:</h3>";
                } else if (key === "halfSiblingsSameMother") {
                  str += "<h3>Half-Sibling (same mother):</h3>";
                } else if (key === "halfSiblingsSameFather") {
                  str += "<h3>Half-Sibling (same father):</h3>";
                }

                //mother
                //father
                //partners
                //children
                //siblings
                //halfSiblingsSameMother
                //halfSiblingsSameFather

                str += "<p>";
                let peopleArray = resultEntries[i][key].split(",");

                for (let j = 0; j < peopleArray.length; j++) {
                  if (peopleArray[j].indexOf("no entry") == -1) {
                    //no entry in dictionary
                    str += "<span class='open-dictionary-entry color-hover'>";
                    str += peopleArray[j];
                    str += "</span>,";
                  } else {
                    //entry in dictionary
                    str += "<span>";
                    str += peopleArray[j];
                    str += "</span>,";
                  }
                }
                str = str.slice(0, -1);

                str += "</p>";
              } else if (key === "location") {
                str += "<h3>Location:</h3>";
                str += "<p>";
                str +=
                  "<span class='dictionary-location color-hover'>" +
                  resultEntries[i][key] +
                  "</span>";
                str += "</p>";

                // let tempStr="";
                // tempStr += "<h3>Location:</h3>";
                // tempStr += "<p>";
                // tempStr +=
                //   "<span class='dictionary-location color-hover'>" +
                //   resultEntries[i][key] +
                //   "</span>";
                // tempStr += "</p>";
                // str=tempStr+str;
              } else {
                str += "<h3>" + key + "</h3>";
                str += "<p>";
                str += resultEntries[i][key];
                str += "</p>";
              }
            }
            str += "</div>";
          }
          //   str = "<hr>"+str+"<hr>";
          str += "<hr>";

          dictionaryResult.innerHTML = str;
          //console.log(resultEntries);
          addEventListenersToNestedMenus();
          addEventListenersToOpenVerses();
          addEventListenersToOpenChapters();
          addEventListenersToOpenDictionaryEntries();
          addEventListenersToDictionaryLocations();
          //if there is just one leave open
          if (resultEntries.length > 1) {
            closeWordEntries();
          }
        } else {
          dictionaryResult.innerHTML = "<h3>Word not found</h3>";
        }
        //add code here to look for best entry if undefined**************
        //console.log(entry);
        if (entry != undefined) {
          openSiblings(entry);
        } else {
          //get the opened Bible Chapter in the search box
          let osisChapter = chapterSearchBox.value;

          //go through each entry
          for (let i = 0; i < resultEntries.length; i++) {
            let verseReferences = resultEntries[i]["verseReferences"]
              .split("<span class='open-verse color-hover'>")
              .join("")
              .split("</span>")
              .join("")
              .split(",");
            //console.log(verseReferences);
            //go through each entries verses
            for (let j = 0; j < verseReferences.length; j++) {
              //it the verse chapter matches the opened bible chapter
              //that is the sibling
              //open that sibling
              //(must take off verse at end to leave only book and chapter)
              console.log(
                osisChapter,
                verseReferences[j].split(".")[0] +
                  "." +
                  verseReferences[j].split(".")[1]
              );
              if (
                osisChapter ===
                verseReferences[j].split(".")[0] +
                  "." +
                  verseReferences[j].split(".")[1]
              ) {
                //console.log("match found", resultEntries[i]);
                openSiblings(resultEntries[i]["dictLookup"]);
              }
            }
          }
        }
        ////FORCE APP TO EVALUATE OPENING OR CLOSING WINDOWS IF SMALL SCREEN
        let myWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        //if (myWidth < 450) {
        if (myWidth < 960) {
          //document.getElementById('btn-dictionary').click();
          processAppSelection("btn-dictionary");
        }
      }
      //getDictionaryWordDataRemote(0);

      //////////////////BIBLE STUFF HERE/////////////////////////////


      function selectBibleChapter(osisRef) {
        chapterSearchBox.value = osisRef;
        showBibleSelection();
      }

      ////// SIMPLY PARSES FULL BIBLE VERSE TO CHAPTER 0NLY AND CALLS
      ////// selectBibleChapter
      function selectBibleVerse(osisRef) {
        osisRefArray = osisRef.split(".");
        if (osisRefArray.length===3){
            osisRefArray.pop();
            osisRef = osisRefArray.join(".");
            selectBibleChapter(osisRef);
        }
        else{
            osisRef = osisRefArray.join(".");
            selectBibleChapter(osisRef);  
        }
      }

      function showBibleSelection() {
        //***************** AJAX function ********************

        if (local === true) {
          //if local do this
          bibleResult.innerHTML = parseString(
            theChapterBible[chapterSearchBox.value]
          );
          addEventListenersToFoundBibleWords();
          let myWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        //if (myWidth < 450) {
        if (myWidth < 960) {
            processAppSelection("btn-bible");
          }
        } else {
          let osisRef = chapterSearchBox.value;
          getBibleChapterRemote(osisRef);
        }
      }

      function buildChapterSearchOptions() {
        //bookChapterKeys global bibleBCSelction also global
        let str = "";
        for (let i = 0; i < bookChapterKeys.length; i++) {
          str += "<option value='" + bookChapterKeys[i] + "' />";
        }
        bibleChaptersDatalist.innerHTML = str;
      }

      function openBibleChapterCommentary() {
        commentarySearchBox.value = chapterSearchBox.value;
        showCommentarySelection();
      }

      function getBibleChapterRemote(osisRef) {
        let http = new XMLHttpRequest();
        http.timeout = 3000; // time in milliseconds
        //let url = "https://garydavenport.com/logtime/simpleAccounts.php";
        let url = "getchapter.php";
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

            bibleResult.innerHTML = parseString(http.responseText);
            addEventListenersToFoundBibleWords();
            let myWidth =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
            //if (myWidth < 450) {
            if (myWidth < 960) {
              processAppSelection("btn-bible");
            }
          }
        };
        http.send(params);
      }