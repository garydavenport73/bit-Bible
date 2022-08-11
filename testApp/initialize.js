      ///////////// INITIALIZE /////////////////////
      function askConfirm() {
        return "Close?";
      }
      function showVersion(local) {
        if (local === true) {
          document.getElementById("btn-download").style.display = "none";
          document.getElementById("version-type").innerHTML = "offline version";
        } else {
          document.getElementById("version-type").innerHTML = "online version";
        }
      }

      if (typeof local === 'undefined'){
        local=false;
      }
      console.log("local",local);

      showVersion(local);
      let showDates = true;
      window.onbeforeunload = askConfirm;
      window.onresize = checkAppsAfterResize;

      let bibleBCSelection = document.getElementById("bible-bc-selection");
      let bibleResult = document.getElementById("bible-result");
      let mapContainer = document.getElementById("map-container");
      let asciiMap = document.getElementById("ascii-map");
      let dictionarySelection = document.getElementById("dictionary-selection");
      let dictionaryResult = document.getElementById("dictionary-result");
      let dictionaryDataList = document.getElementById("dictionary-words");
      let dictionarySearchBox = document.getElementById(
        "dictionary-search-box"
      );
      let chapterSearchBox = document.getElementById("chapter-search-box");
      let bibleChaptersDatalist = document.getElementById(
        "bible-chapters-datalist"
      );
      let commentarySearchBox = document.getElementById(
        "commentary-search-box"
      );
      let commentaryChaptersDatalist = document.getElementById(
        "commentary-chapters-datalist"
      );
      let commentaryResult = document.getElementById("commentary-result");
      buildDictionarySearchOptions();
      buildChapterSearchOptions();
      buildCommentarySearchOptions();
      //   theChapterBible = makeHTMLChapterBible(theChapterBible);
      //   eastons = makeEastons(eastons);
      document.getElementById("reading-plan-table").innerHTML =
        makeReadingTable(readingPlan);
      toggleReadingDates();
      addEventListenersToNestedMenus();

      setSizeOfPre();

      initializeNavButtonsAndCloseApps();
      addEventListenersToMapButtons();
      addEventListenersToOpenVerses();
      addEventListenersToOpenChapters();
      addEventListenersToOpenDictionaryEntries();
      addEventListenersToFoundBibleWords();
      addEventListenersToDictionaryLocations();

      //closeAllApps();
      selectBibleVerse("Gen.1.1");
      document.getElementById("app-bible").style.display = "block";
      document.getElementById("btn-bible").style.backgroundColor =
        "rgb(0,124,207)";
      document.getElementById("ascii-map").innerText = baseMap;