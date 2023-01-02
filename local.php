<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link id="favicon-link" rel="icon" type="image/x-icon" href="">
    <!-- <link rel="stylesheet" href="style.css"> -->
    <style>
        <?php
        include_once("./style.css");
        ?>
    </style>
</head>

<body>
    <h1>bitBible<sub>complete</sub></h1>
    <nav>
        <button id="reading-button">📅</button>
        <button id="bible-button">📖</button>
        <button id="dictionary-button">📘</button>
        <button id="commentary-button">💬</button>
        <button id="map-button">🌍</button>
        <button id="help-button">?</button>
        <nav>
            <nav class="initial-close">
                <button id="courier-button">C</button>
                <button id="sans-button">S</button>
                <button id="times-button">T</button>
                <button id="decrease-font">-</button>
                <button id="increase-font">+</button>
                <button>
                    <input type="checkbox" id="show-all-checkbox">
                    <label id="label-for-show-all-checkbox" for="show-all-checkbox">▦</label>
                </button>
            </nav>
            <button id="initial-second-menu" class="nested-menu">&equiv;</button>
        </nav>
    </nav>
    <div id="main-container">
        <main id="reading">
            <h3>Reading Plan</h3>
            <nav>
                <button id="load-reading-progress">Load Progress&#128194;</button>
                <button id="save-reading-progress">Save&#128193;</button>
            </nav>
            <nav>
                <!-- Currently, toggle-reading-dates controls showing of dates in table, nested-menu controls open and close of each other -->
                <button id="toggle-reading-dates">&equiv; Dates</button>
                <nav id="reading-menu" class="initial-close">
                    <button id="last-check-to-today-button">Today is Last Checked Box</button>
                    <button id="reset-dates">Reset to Defaults</button>
                    <div>
                    <button onclick="_shiftDates();">Shift By:</button><input type="number" id="shift-by-integer" value="0" step="1">
                    </div>
                    <button id="switch-reading-plans">Switch Plans</button>
                </nav>
            </nav>
            <h2 id="reading-plan-name"></h2>
            <table id="reading-plan-table"></table>
        </main>
        <main id="bible">
            <h3>Bible</h3>
            <nav>
                <button class="narrow" id="bible-chapter-previous">&lt;</button>
                <select id="bible-select"></select>
                <button class="narrow" id="bible-chapter-next">&gt;</button>
                <button class="no-margin" id="refresh-bible-chapter">&#10227;</button>
                <button id="see-commentary-button" class="no-margin">↱💬</button>
            </nav>
            <nav>
                <button id="stop-audio">◼</button>
                <button id="play-audio">▶</button>
                <button id="pause-audio"><b>||</b></button>
                &nbsp;&nbsp;
                <button>
                    <input type="checkbox" id="show-red-letters">
                    <label id="label-for-show-red-letters" for="show-red-letters">Red Letters</label>
                </button>
            </nav>
            <div id="bible-contents"></div>
        </main>
        <main id="dictionary">
            <h3>Dictionary</h3>
            <nav> <input type="search" id="dictionary-input" list="bible-words">
                <button id="dictionary-word-load" class="no-margin">🔎</button>
                <datalist id="bible-words"></datalist>
            </nav>
            <div id="dictionary-contents"></div>
        </main>
        <main id="commentary">
            <h3>Commentary</h3>
            <nav>
                <button class="narrow" id="commentary-chapter-previous">&lt;</button>
                <select id="commentary-select"></select>
                <button class="narrow" id="commentary-chapter-next">&gt;</button>
                <button class="no-margin" id="refresh-commentary-chapter">&#10227;</button>
            </nav>
            <div id="commentary-contents"></div>
        </main>
        <datalist id="bible-words"></datalist>
        <main id="map">
            <h3>Map</h3>
            <nav>
                <button class="btn-select-map" id="map-Abraham">&#9398;</button>
                <button class="btn-select-map" id="map-Moses">&#9410;</button>
                <button class="btn-select-map" id="map-12 Tribes">&#9323;</button>
                <button class="btn-select-map" id="map-Divided Kingdoms">&#10208;</button>
                <button class="btn-select-map" id="map-Jesus">&#9407;</button>
                <button id="btn-clear-all-locations">&#8999;</button>
                <button id="btn-open-google-map">&#127760;</button>
            </nav>
            <div id="map-name">&nbsp;</div>
            <div id="map-info">&nbsp;</div>
            <div id="map-container">
                <pre id="ascii-map"></pre>
            </div>
        </main>
        <main id="help">
            <h3>Help</h3>
            <nav>
                <hr>
            </nav>
            <hr>
            <div>
                <h3 class="nested-menu">Main Navigation Buttons</h3>
                <div class="initial-close">
                    <nav class="help-nav">
                        <button>📅</button>
                        <button>📖</button>
                        <button>📘</button>
                        <button>💬</button>
                        <button>🌍</button>
                        <button>?</button>
                    </nav>
                    <ul>
                        <li>📅 - Selects the reading plan.</li>
                        <li>📖 - Selects the Bible.</li>
                        <li>📘 - Selects the Dictionary</li>
                        <li>💬 - Selects the Commentary</li>
                        <li>🌍 - Selects the Map</li>
                        <li>? - Selects the Help Page</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="nested-menu">Custom Menu</h3>
                <div class="initial-close">
                    <nav class="help-nav">
                        <button>C</button>
                        <button>S</button>
                        <button>T</button>
                        <button>-</button>
                        <button>+</button>
                        <button>
                            <input type="checkbox">
                            <label>▦</label>
                        </button>
                        <button>≡</button>
                    </nav>
                    <ul>
                        <li>C - Changes the font to Courier</li>
                        <li>S - Changes the font to Sans</li>
                        <li>T - Changes the font to Serif</li>
                        <li>- - Reduces the font size</li>
                        <li>+ - Increases the font size</li>
                        <li>▦ - Expands all content</li>
                        <li>≡ - Toggles Custom Menu</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="nested-menu">Reading Plan Menu</h3>
                <div class="initial-close">
                    <nav>
                        <button>Load Progress📂</button>
                        <button>Save 📁</button>
                        <button>🔄Dates</button>
                        <button>Switch</button>
                    </nav>
                    <ul>
                        <li>Load Progress📂 - Loads reading progress and custom settings.</li>
                        <li>Save 📁 - Saves reading progress and custome settings.</li>
                        <li>🔄Dates - Will toggle the yearly calendar with the reading plan.</li>
                        <li>Switch - Allows you to switch reading plans from Chronological to Straight through the Bible
                            or Old Testament/New Testament Selectitons.</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="nested-menu">Bible Menu Buttons</h3>
                <div class="initial-close">
                    <nav>
                        <button class="narrow">&lt;</button>
                        <select>Gen 1</select>
                        <button class="narrow">&gt;</button>
                        <button>↱💬</button>
                        <button>
                            <input type="checkbox">
                            <label>Red Letters</label>
                        </button>
                    </nav>
                    <nav>
                        <button>◼</button>
                        <button>▶</button>
                        <button><b>||</b></button>
                    </nav>
                    <ul>
                        <li>&lt; - previous chapter</li>
                        <li>&gt; - next chapter</li>
                        <li><input type="checkbox"><label>Red Letters</label> - Verses that contain Jesus's words shown in red.</li>
                        <li>↱💬 - Will select and open the commentary corresponding to the current Bible book and
                            chapter.</li>
                        <li>◼ - Will stop audio from playing and reset to the beginning of the chapter.</li>
                        <li>▶ - Will play or resume audio if paused.</li>
                        <li><b>||</b> - Will pause audio at current position in the chapter.</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="nested-menu">Dictionary Search Box</h3>
                <div class="initial-close">
                    <nav>
                        <input type="search" disabled value="Jesus">
                        <button>🔎</button>
                        <div id="dictionary-contents">
                            <div><span class="definition-entry nested-menu">Salem</span>
                                <div id="Salem-refs-Gen.14.18,Ps.76.2,Heb.7.1,Heb.7.2"><br><b>References</b>: <span class="osis">Gen.14.18</span>, <span class="osis">Ps.76.2</span>, <span class="osis">Heb.7.1</span>, <span class="osis">Heb.7.2</span><br><b>Definition</b>:
                                    Peace, commonly supposed to be another name of <span class="word">Jerusalem</span>
                                    (<span class="osis">Gen.14.18</span>); (<span class="osis">Ps.76.2</span>); (<span class="osis">Heb.7.1</span>), (<span class="osis">Heb.7.2</span>).<br><b>Location</b>:
                                    <span class="definition-location">31.777444,35.234935</span><br><br>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <ul>
                        <li>
                            <em>
                                <b>References:</b> some references in the Bible where the word is found. This is not an
                                exhaustive list.
                            </em>
                        </li>
                        <li><em>
                                <b>Definition.</b>
                            </em>
                        </li>
                        <li>
                            <em>
                                <b>Location:</b> Approximate Latitude and Longitude of the location.
                                When clicked, the map is opened and the location is plotted on the map.
                            </em>
                        </li>
                    </ul>
                    <hr>
                    <h3>Highlighted Items</h3>
                    <ul>
                        <li>
                            <span class="osis">John.3.16</span><em>- an example of a highlighted link. Opens up to a
                                Bible book
                                and chapter.</em>
                        </li>
                        <li><span class="word">God</span><em>- an example of a highlighted dictionary entry. Opens up
                                the
                                dictionary to the highlighted word.
                                It will attempt to open up to the best dictionary entry of that word if possible.
                            </em>
                        </li>
                    </ul>
                    <hr>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="nested-menu">Map Menu</h3>
                <div class="initial-close">
                    <nav>
                        <button>Ⓐ</button>
                        <button>Ⓜ</button>
                        <button>⑫</button>
                        <button>⟠</button>
                        <button>Ⓙ</button>
                        <button>⌧</button>
                        <button>🌐</button>
                    </nav>
                    <ul>
                        <li>Ⓐ - Overlays places during Abraham's time.</li>
                        <li>Ⓜ - Overlays places during Moses's time.</li>
                        <li>⑫ - Overlays places during the 12 Tribes of Israel.</li>
                        <li>⟠ - Overlays places during the divided Kingdoms of Israel and Judah</li>
                        <li>Ⓙ - Overlays places during Jesus's time.</li>
                        <li>⌧ - Removes plotted places from the map.</li>
                        <li>🌐 - Will launch a web page showing the last plotted location on a map.</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="nested-menu">References</h3>
                <div class="initial-close">
                    <ul>
                        <li><a href="https://viz.bible/" target="_blank">Robert Rouse's (viz.)BIBLE - Inspiring
                                curiosity about the Bible through data visualization</a>
                        </li>
                        <li>.</li>
                        <li>
                            <a href="https://github.com/openbibleinfo/Bible-Geocoding-Data" target="_blank">openbibleinfo/Bible-Geocoding-Data Public</a>
                        </li>
                        <li>.</li>
                        <li>
                            <a href="https://www.openbible.info/geo/" target="_blank">Bible Geocoding</a>
                        </li>
                        <li>.</li>
                        <li>
                            <a href="https://berean.bible" target="_blank">The Holy Bible, Berean Study Bible, BSB</a>
                            Copyright ©2016, 2020 by Bible Hub
                            Used by Permission.
                            All Rights Reserved Worldwide.
                        </li>
                        <li>.</li>
                        <li>
                            <a href="https://en.wikipedia.org/wiki/Easton%27s_Bible_Dictionary" target="_blank">Easton's
                                Bible Dictionary (Fair Use)</a>
                        </li>
                        <li>.</li>
                        <li>
                            <a href="https://en.wikipedia.org/wiki/Jamieson-Fausset-Brown_Bible_Commentary" target="_blank">Jamieson-Fausset-Brown Bible Commentary (Fair Use)</a>
                        </li>
                        <li>.</li>
                        <li>
                            <a href="https://github.com/garydavenport73/bitBible" target="_blank">Author: Gary Davenport
                                bitBible &copy;2022</a>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
    <!-- Load Bible, Dictionary, and Commentary, and other Constant Arrays-->
    <!-- constants.js contains OSISBOOKS, OSISTOFULLNAME, HEADINGS, PARAGRAPHLOCATIONS -->
    <script>
        let commentaryBook = "JFB";
        let bibleVersion = "BSB";
    </script>
    <script>
        <?php

        if (isset($_GET["commentary"])) {
            echo ("commentaryBook='" . $_GET["commentary"] . "';");
            $commentaryBook = $_GET["commentary"];
        }
        if (isset($_GET["bible"])) {
            echo ("bibleVersion='" . $_GET["bible"] . "';");
            $bibleVersion = $_GET["bible"];
        }

        echo ("let nestedBible=");
        include_once("./bibles/" . $bibleVersion . ".json");
        echo (";");

        echo ("let eastons=");
        include_once("./eastons.json");
        echo (";");

        echo ("let jfb=");
        include_once("./" . $commentaryBook . ".json");
        echo (";");

        echo ("let REDLETTERREFERENCES=");
        include_once("./REDLETTERREFERENCES.json");
        echo (";");

        echo ("let BASEMAP=");
        include_once("./BASEMAP.txt");
        echo (";");

        echo ("let HEADINGS=");
        include_once("./HEADINGS.json");
        echo (";");

        echo ("let OSISTOFULLNAME=");
        include_once("./OSISTOFULLNAME.json");
        echo (";");

        echo ("let OSISBOOKS=");
        include_once("./OSISBOOKS.json");
        echo (";");

        echo ("let PARAGRAPHLOCATIONS=");
        include_once("./PARAGRAPHLOCATIONS.json");
        echo (";");

        echo ("let CHRONOLOGICALREADINGPLAN=");
        include_once("./CHRONOLOGICALREADINGPLAN.json");
        echo (";");

        echo ("let OTNTREADINGPLAN=");
        include_once("./OTNTREADINGPLAN.json");
        echo (";");

        echo ("let STRAIGHTREADINGPLAN=");
        include_once("./STRAIGHTREADINGPLAN.json");
        echo (";");

        echo ("let CHRONOLOGICALNT260=");
        include_once("./CHRONOLOGICALNT260.json");
        echo (";");

        include_once("./javascriptLocal.js");
        include_once("./javascriptCommon.js");
        ?>
    </script>
</body>

</html>