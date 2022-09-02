      ///////PROCESSING BIBLE AND ADDING CLASSES FOR EVENT LISTENERS //////
      /////// IN VERSES, CHAPTERS AND WORDS ///////////////////////
      //////////////// FOR WHOLE BIBLE AT LOAD ///////////////////////

      //   function makeHTMLChapterBible(theChapterBible) {
      //     //return theChapterBible;
      //     let tempStr = JSON.stringify(theChapterBible);
      //     tempStr = tempStr.split("HEADINGSTART").join("<h2>");
      //     tempStr = tempStr.split("HEADINGEND").join("</h2>");
      //     tempStr = tempStr.split("HEADINGEND").join("</h2>");
      //     tempStr = tempStr.split("PARAGRAPHSTARTS").join("<p>");
      //     tempStr = tempStr.split("PARAGRAPHENDS").join("</p>");
      //     tempStr = tempStr.split("VERSESTART").join("<sup>");
      //     tempStr = tempStr.split("VERSEEND").join("</sup>");
      //     tempStr = tempStr
      //       .split("FOUNDWORDSTART")
      //       .join("<span class='color-hover found-bible-word'>");
      //     tempStr = tempStr.split("FOUNDWORDEND").join("</span>");
      //     return JSON.parse(tempStr);
      //   }

      //   function makeEastons(eastons) {
      //     //return eastons;
      //     let tempStr = JSON.stringify(eastons);
      //     tempStr = tempStr
      //       .split("VERSEREFSTART")
      //       .join("<span class='open-verse color-hover'>");
      //     tempStr = tempStr.split("VERSEREFEND").join("</span>");
      //     tempStr = tempStr
      //       .split("CHAPTERREFSTART")
      //       .join("<span class='open-chapter color-hover'>");
      //     tempStr = tempStr.split("CHAPTERREFEND").join("</span>");
      //     return JSON.parse(tempStr);
      //   }

      //////////////////STRING PARSER USED BY POTENTIALLY ANYTHING READ IN //////////////

      function parseString(str) {
        str = str.split("HEADINGSTART").join("<h2>");
        str = str.split("HEADINGEND").join("</h2>");
        str = str.split("HEADINGEND").join("</h2>");
        str = str.split("PARAGRAPHSTARTS").join("<p>");
        str = str.split("PARAGRAPHENDS").join("</p>");
        str = str.split("VERSESTART").join("<sup>");
        str = str.split("VERSEEND").join("</sup>");
        str = str
          .split("FOUNDWORDSTART")
          .join("<span class='color-hover found-bible-word'>");
        str = str.split("FOUNDWORDEND").join("</span>");
        str = str
          .split("VERSEREFSTART")
          .join("<span class='open-verse color-hover'>");
        str = str.split("VERSEREFEND").join("</span>");
        str = str
          .split("CHAPTERREFSTART")
          .join("<span class='open-chapter color-hover'>");
        str = str.split("CHAPTERREFEND").join("</span>");

        //pulpit commentary
        str = str
          .split("PULPITSTART")
          .join("<h2 class='pulpit-commentary-heading'>");
        str = str.split("PULPITEND").join("</h2>");
        str = str.split("NEWLINE").join("<br>");
        str = str.split("PULPITVERSEBEGIN").join("<h4><i>");
        str = str.split("PULPITVERSEFINISH").join("</i></h4>");
        str = str
          .split("VERSETITLESTART")
          .join("<br><h3><span class='open-verse color-hover'>"); //<span class='open-verse color-hover'>
        str = str.split("VERSETITLEEND").join("</span></h3>");
        //str = str.split("<br><br>").join("<br>");

        //VERSESTART and VERSEEND made into <sup></sup> already
        //
        return str;
      }

      ////////////////////////////////////////////////////////////////