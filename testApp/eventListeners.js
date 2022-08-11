     ///////////////POPULATING THE SELECT OPTIONS OF THE BIBLE CHAPTER SELECTIONS //////////////////

      /////// FUNCTIONS TO ADD EVENT LISTENERS TO VERSES, CHAPTERS, DICTIONARY
      /////// AND LOCATION SPANS

      function addEventListenersToOpenVerses() {
        let openVerses = document.getElementsByClassName("open-verse");
        for (let i = 0; i < openVerses.length; i++) {
          openVerses[i].addEventListener("click", (evt) => {
            selectBibleVerse(evt.target.innerText);
          });
        }
      }

      function addEventListenersToOpenChapters() {
        let openChapters = document.getElementsByClassName("open-chapter");
        for (let i = 0; i < openChapters.length; i++) {
          openChapters[i].addEventListener("click", (evt) => {
            selectBibleChapter(evt.target.innerText);
          });
        }
      }

      function addEventListenersToOpenDictionaryEntries() {
        //doesn't use word, but uses subentry under word
        let openDictionaryEntries = document.getElementsByClassName(
          "open-dictionary-entry"
        );
        for (let i = 0; i < openDictionaryEntries.length; i++) {
          openDictionaryEntries[i].addEventListener("click", (evt) => {
            openDictionaryEntry(
              getWordFromEntry(evt.target.innerText),
              evt.target.innerText
            );
          });
        }
      }

      function getWordFromEntry(dictLookup) {
        //************* NEEDS A PREPROCESSED ARRAY HERE OR SIMPLY TEST AND SPLICE ********************
        let tempArr = dictLookup.split(" ");
        if (tempArr[tempArr.length - 1] === NaN) {
          console.log("word ", dictLookup);
          return dictLookup;
        } else {
          tempArr.pop();
          console.log("word", tempArr.join(" "));
          return tempArr.join(" ");
        }
      }

      function addEventListenersToFoundBibleWords() {
        let foundBibleWords =
          document.getElementsByClassName("found-bible-word");
        for (let i = 0; i < foundBibleWords.length; i++) {
          foundBibleWords[i].addEventListener("click", (evt) => {
            openDictionaryEntry(evt.target.innerText);
          });
        }
      }

      function addEventListenersToDictionaryLocations() {
        let dictionaryLocations = document.getElementsByClassName(
          "dictionary-location"
        );
        for (let i = 0; i < dictionaryLocations.length; i++) {
          dictionaryLocations[i].addEventListener("click", (evt) => {
            let myWidth =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
            if (myWidth < 960) {
              //document.getElementById('btn-map').click();
              processAppSelection("btn-map");
            } else {
              document.getElementById("app-map").style.display = "block";
              document.getElementById("btn-map").style.backgroundColor =
                "rgb(0,124,207)";
            }
            setSizeOfPre();
            document.getElementById("map-location").innerHTML =
              evt.target.innerText;
            document.getElementById("coordinates-label").innerHTML =
              dictionarySearchBox.value;
            plotOnMap(evt.target.innerText);
          });
        }
      }