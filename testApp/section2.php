</head>

<body>
    <h1>bitBible<sub id="version-type"></sub></h1>
    <nav id="top-nav">
        <button class="nav-button" id="btn-reading">&#128197;</button>
        <button class="nav-button" id="btn-bible">&#128214;</button>
        <button class="nav-button" id="btn-dictionary">&#128216;</button>
        <button class="nav-button" id="btn-commentary">&#128172;</button>
        <button class="nav-button" id="btn-map">&#127757;</button>
        <button class="nav-button" id="btn-download">&#10515;</button>
    </nav>
    <main>

        <div class="app" id="app-reading">
            <h3 id="reading-plan-name">Loading...</h3>
            <nav>
                <button onclick="loadReadingProgress();">
                    Load Progress&#128194;
                </button>
                <button onclick="saveReadingProgress();">Save&#128193;</button>
                <button onclick="toggleReadingDates();">&#128260;Dates</button>
            </nav>
            <table id="reading-plan-table"></table>
        </div>

        <div class="app" id="app-bible">
            <h3 id="bible-name">Loading...</h3>
            <span id="go-back-chapter" class="color-hover">&#9665;</span>
            <input id="chapter-search-box" type="search" list="bible-chapters-datalist" placeholder="Bible Chapters" s value="Gen.1" />
            <datalist id="bible-chapters-datalist"> </datalist>
            <span id="go-forward-chapter" class="color-hover">&#9655;</span>
            <button onclick="showBibleSelection();">Go</button>
            <button onclick="openBibleChapterCommentary()" ;>
                &#8625;&#128172;
            </button>
            <div id="bible-result">LOADING...</div>
        </div>

        <div class="app" id="app-dictionary">
            <h3 id="dictionary-name">Easton's Dictionary</h3>
            <input id="dictionary-search-box" type="search" list="dictionary-words" placeholder="dictionary words" />
            <!-- value="Jesus"
      /> -->
            <datalist id="dictionary-words"> </datalist>
            <button onclick="showDictionarySelection();">&#128269;</button>
            <div id="dictionary-result">
                Type in the search box to look for words in the Bible Dictionary.
            </div>
        </div>

        <div class="app" id="app-commentary">
            <h3 id="commentary-name">Pulpit Commentary</h3>
            <span id="go-back-commentary" class="color-hover">&#9665;</span>
            <input id="commentary-search-box" type="search" list="commentary-chapters-datalist" placeholder="Bible Chapters" value="Gen.1" />
            <!-- value="John.3"
      /> -->
            <datalist id="commentary-chapters-datalist"> </datalist>
            <span id="go-forward-commentary" class="color-hover">&#9655;</span>
            <button onclick="showCommentarySelection();">Go</button>
            <div id="commentary-result">
                Type a chapter in the search box to see commentary.
            </div>
        </div>

        <div class="app" id="app-map">
            <nav>
                <button class="btn-select-map" id="map-Abraham">&#9398;</button>
                <button class="btn-select-map" id="map-Moses">&#9410;</button>
                <button class="btn-select-map" id="map-12 Tribes">&#9323;</button>
                <button class="btn-select-map" id="map-Divided Kingdoms">&#10208;</button>
                <button class="btn-select-map" id="map-Jesus">&#9407;</button>
                <button onclick="clearBullsEyes();clearBackgroundLocations();">
                    &#8999;
                </button>
                <button onclick="openGoogleMap()">&#127760;</button>
            </nav>
            <div id="map-name">&nbsp;</div>
            <div id="location-display-info">
                <span id="coordinates-label"></span>&nbsp;<span id="map-location"></span>
            </div>
            <div id="map-container">
                <pre id="ascii-map"></pre>
            </div>
        </div>

        <div class="app" id="app-download">
            <hr>
            <hr>
            <hr>
            <h3>Download offline version (50MB) for Android/Linux/Windows</h3>
            <p>
                <button>
                    <a id="android-download-address" href="bitbibleOffline.php" download="">Download</a>
                </button>
            </p>
            <hr>
            <hr>
            <hr>
            <h3>Download for IPhone</h3>
            <p>
                For IPhone users, you'll need to add the webpage to your "Reading
                List", and make sure "Automatically Save Offline is on".
            </p>
            <p>
                See instructions below. This will allow for offline use on your
                IPhone.
            </p>
            <div id="iphone-instructions">
                <p>
                    1) Open the
                    <a id="iphone-download-address" href="bitbibleOfflineIPhone.php" target="_blank"><u><b>iPhone offline webpage (50MB)</b></u></a>in Safari on your iPhone.
                </p>
                <p>2) Tap Safari's Share button then tap "Add to Reading List".</p>
                <p>3) Safari will save the link and the webpage.&nbsp;</p>
                <p>
                    4) To access the bitBible even if you're offline, go to Settings
                    &gt; Safari and scroll down to "Reading List" and make sure
                    "Automatically Save Offline" is on.
                </p>
            </div>
            <p>
                More detailed instructions are available at this
                <a href="https://support.apple.com/en-us/HT200294" target="_blank"><u><b>Apple Support</b></u></a>
                page.
            </p>
            <hr>
            <hr>
            <hr>
        </div>
    </main>
    <!--//////////////////////////////////////////////////////////////// // //
  READING IN ARRAYS, KEY/VALUES/BIBLE/READINGPLAN/EASTONS/MAP/FUNCTIONS etc //
  ////////////////////////////////////////////////////////////////-->