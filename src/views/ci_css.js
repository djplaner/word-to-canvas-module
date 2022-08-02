
const CI_CSS = `

.apa,
.apa ul,
.apa ol,
.apa dl {
  padding-left: 0 !important;
  margin-left: 0 !important;
  /*font-size: 80% !important;*/
}

.apa li {
  list-style-type: none !important;
}

.apa p,
.apa li,
.apa dd,
p.apa {
  margin-bottom: 1em !important;
  margin-left: 2em !important;
  margin-top: 1em !important;
  text-indent: -2em !important;
}

/*****************************************************/
/* Main body elements */

/** Base Styles **/
code {
  font-size: 95%;
  color: #347ea4;
  background: #f8f8f8;
  padding: 0.4em;
  margin: 0.5vw;
}

p code {
  padding: 0.125em;
  margin: 0;
}

.blackboardContentLink,
.blackboardMenuLink {
  text-decoration: underline;
  color: #347ea4 !important;
}

cite {
  font-size: 80%;
}

cite:before {
  margin-left: 1em;
}

hr {
  border-top: 2px solid;
  width: 98%;
}

/** Tables **/
.table {
  /*width: 99%;*/
  border-collapse: collapse;
  margin: 1em 0;
}

.table th {
  font-weight: bold;
}

.table td,
.table th {
  padding: 6px;
  text-align: left;
  vertical-align: top;
}

.table tbody tr:nth-child(odd) {
  border: 1px solid #757575;
  border-width: 1px 0;
}

.table caption,
.table .caption {
  text-align: center;
  font-style: italic;
  color: #757575;
  border-bottom: 1px solid #757575;
  background: #f8f8f8;
  padding: 0.5em 0;
}

/*.table .flex-row {
width: 99%;
margin: 0;
border-collapse: collapse; }*/

.table.stripe-row-odd tbody tr:nth-child(odd),
.table.striped-odd .flex-row:nth-child(odd) {
  background: #f0f0f0;
  border: 1px solid #757575;
  border-width: 1px 0;
}

/** Activity **/

.action-box {
  border-radius: 1em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em auto;
  width: 80%;
}

.activity {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  border-radius: 1em;
  border-style: outset;
  padding: 1em;
}

.ael-note {
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
  padding: 1em;
  background-color: #ffdc0b !important;
  color: #000000 !important;
}

.filmWatchingOptions {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  border-radius: 1em;
  padding: 1em;
}

.activityImage {
  width: 5%;
  background-repeat: no-repeat;
  background-size: contain; 
  margin-right: 1em;
  float: left;
}

.readingImage {
  width: 5%;
  background-repeat: no-repeat;
  background-size: contain; 
  margin-right: 1em;
  float: left;
}

.noteImage {
  width: 5%;
  margin-top: 1em;
  margin-bottom: 1em;
  background-image: url('https://filebucketdave.s3.amazonaws.com/banner.js/images/Blk-Warning.png');
  background-repeat: no-repeat;
  background-size: contain;
/*  margin-top: 1em; */
}

.noteImage img {
  max-width: 100%;
  max-height: 100%;
}

.filmWatchingOptionsImage {
  width: 5%;
  background-image: url('https://filebucketdave.s3.amazonaws.com/banner.js/images/icons8-movie-beginning-64.png');
background-repeat: no-repeat;
background-size: contain; 
}

.filmWatchingOptionsImage img {
  max-width: 100%;
  max-height: 100%;
}

.activityNarrow {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  flex: 1 1 auto;
  display: flex;

  /*  flex-direction: row;
flex-wrap: wrap;*/
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
}

.invisible {
  display: none;
}

.reading {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  padding: 1em;
  border-radius: 1em;
  border-style: outset;
}

.icon {
  flex: 1 !important;
  display: flex;
  /*align-items: flex-start;*/
  padding: 0.25em;
  margin: 1em 0.5em;
  justify-content: center;
  align-items: flex-start;
}

.icon img {
  max-width: 75%;
  height: auto;
  justify-content: center;
  align-items: center;
}

/*#GU_ContentInterface .icon svg {
width: 100%; }*/

.instructions {
  flex: 6;
  margin-left: 1em;
}

.audio-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table.stripe-row-even tbody tr:nth-child(even),
.table.striped-even .flex-row:nth-child(even) {
  background: #f8f8f8;
  border: 1px solid #757575;
  border-width: 1px 0;
}

.table .header .flex-column {
  font-weight: bold;
}

.table .flex-row .flex-column {
  padding: 6px;
  text-align: left;
}

.table .flex-row.boxes > * {
  box-shadow: 1px 0 0 0 #888, 0 1px 0 0 #888, 1px 1px 0 0 #888,
    1px 0 0 0 #888 inset, 0 1px 0 0 #888 inset;
}

.table.boxes td {
  border: 1px solid #757575 !important;
}

.table.boxes th {
  border: 1px solid #757575 !important;
}

.table.stripe-col-first th:nth-of-type(1) {
  background: #f8f8f8;
}

.table.stripe-col-odd td:nth-child(odd),
.table.col-odd th:nth-child(odd) {
  background: #f8f8f8;
}

.table.stripe-col-even td:nth-child(even),
.table.col-even th:nth-child(even) {
  background: #f8f8f8;
}

.table .flex-row + .flex-row {
  margin-top: 0em !important;
}

.table .flex-row {
  padding: 0.3em;
}

.table.table-bg,
.table tr.table-bg {
  opacity: 0.2;
  color: #000000;
}

.video iframe,
.video object,
.video embed {
  position: absolute;
  top: 0;
  left: 0;
  /*width: 100%;
height: 100%;*/
}

/** timeline **/

.timeline {
  list-style-type: none !important;
  min-width: 75%;
  max-width: 75%;
}

.timeline li {
  padding: 0.5em 1em;
  border-left: 4px solid #e0e0e0;
}

.timeline h2 {
  text-transform: uppercase;
  font-size: 100%;
  font-weight: bold;
  margin: -1.25em 0 0.2em !important;
  padding: 0;
}

.timeline h3 {
  text-transform: uppercase;
  font-size: 70%;
  font-weight: bold;
  color: #757575;
  margin: -1.5em 0 0.2em !important;
  padding: 0;
}

.timeline p {
  padding: 0;
}

.timeline p span {
  font-style: italic;
  color: #757575;
}

.timeline li:before {
  content: "";
  text-transform: uppercase;
  font-size: 50%;
  background: #757575;
  color: #ffffff;
  display: inline-block;
  text-align: center;
  margin-left: -2.9em;
  margin-right: 1em;
  line-height: 2em;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
}

/** Profle **/
.flex-row .profile {
  justify-content: center;
}

.profile h6,
.profile p {
  padding: 0;
}

.profile {
  margin: 0 0.25vw;
  padding: 0 0.25em;
}

.profile:not(:first-child) {
  border-left: 1px solid #e0e0e0;
}

.profile figure {
  margin: 0;
}

/** Flex Grid **/
/* Use flex row as the container */
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em auto;
  width: 98%;
}

/** Colums set all items inside to stack on top of each other as the default **/
.flex-column {
  flex-direction: column;
}

.flex-column,
.flex-column-quarter,
.flex-column-half,
.flex-column-2,
.flex-column-3,
._2up,
._3up,
._4up,
._5up {
  flex: 1 0 100%;
  flex-direction: column;
}

/** Sets the dsplay of columns on 600px + displays **/
@media screen and (min-width: 600px) {
  .flex-column {
    flex: 1;
  }

  .flex-column-quarter {
    flex: 0.25;
  }

  .flex-column-half {
    flex: 0.5;
  }

  .flex-column-2 {
    flex: 2;
  }

  .flex-column-3 {
    flex: 3;
  }

  ._2up {
    flex: 0.5 1 48%;
  }

  ._3up {
    flex: 0.3 1 28%;
  }

  ._4up {
    flex: 0.25 1 23%;
  }

  ._5up {
    flex: 0.2 1 18%;
  }
}
/* Helpers for internal items and spacing */
.flex-row img {
  max-width: 100% !important;
}

.flex-row:first-child,
:not(.flex-row) + .flex-row {
  margin-top: 1em !important;
}

.flex-row + .flex-row {
  margin-top: -1em !important;
}

.flex-row:last-child {
  margin-bottom: 1em !important;
}

/* Flex Alignment */
.flex-start {
  justify-content: flex-start;
}

.flex-end {
  justify-content: flex-end;
}

.flex-center {
  justify-content: center;
}

.flex-align-start {
  align-items: flex-start;
}

.flex-align-end {
  align-items: flex-end;
}

.flex-align-center {
  align-items: center;
}

.center-items {
  align-items: center;
}

.center-self {
  align-self: center;
}

.center-text {
  text-align: center;
}

/* Add Flex to container or change direction */
.flex-container {
  display: flex;
}

.flex-direction-row {
  flex-direction: row;
}

.flex-direction-column {
  flex-direction: column;
}

.featured {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Tile settings */
.flex-tiles {
  margin: 0;
  align-items: stretch;
  min-height: calc(100vh / 5);
}

.flex-tiles:first-child,
:not(.flex-tiles) + .flex-tiles {
  margin-top: 1em !important;
}

.flex-tiles:last-child {
  margin-bottom: 1em !important;
}

.flex-tile-grout > * {
  box-shadow: 2px 0 0 0 #fff, 0 2px 0 0 #ffffff, 2px 2px 0 0 #fff,
    2px 0 0 0 #fff inset, 0 2px 0 0 #fff inset;
}

.flex-tile-fill {
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.flex-tile-fill img {
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
}

/** Figure **/
figure {
  max-width: 98% !important;
  display: flex;
  flex-flow: column;
  border-radius: 1em;
  align-items: center;
  background: #f8f8f8;
  padding: 0.15em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
}

figure figcaption {
  align-self: center;
  text-align: center;
  font-size: 60%;
  color: #757575;
  font-style: italic;
  padding: 0.25em;
}

figure img {
  max-width: 100%;
  border-radius: 1em;
}

figure._30 {
  width: 30%;
  margin: 1vw 2.25vw !important;
}

figure._50 {
  width: 50%;
  margin: 1vw 2.25vw !important;
}

figure._60 {
  width: 60%;
  margin: 1vw 2.25vw !important;
}

.icon {
  flex: 1 !important;
  display: flex;
  flex-direction: row;
  align-items: top;
  padding: 0.25em;
  margin: 1em 0.5em;
}

.icon img {
  width: 100%;
}

.icon svg {
  width: 100%;
}

/* DJ kludges */

.gu-red {
  background-color: #c02424 !important;
  color: #ffffff !important;
}

/** picture **/

.pictureRight {
  float: right;
  font-size: 75%;
  text-align: center;
  margin-left: 2em;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 5px;
  border: solid 2px #efefef;
  border-radius: 4px;
  background-color: #dfdfdf;
  /*  display: inline-block; */
}

.ci_container {
  display: flex;
  justify-content: center;
}

.picture {
  margin: 2em;
  font-size: 75%;
  text-align: center;
  padding: 5px;
  border: solid 2px #cfcfcf;
  border-radius: 4px;
  background-color: #dfdfdf;
  display: inline-block;
  background-color: #dfdfdf;
}

.picture img {
  width: 95%;
  margin-bottom: 1em;
}

.example {
  border-radius: 3px;
  /*position: relative;  /*  <--- */
  padding: 1rem 1.2rem;
  max-width: 80%;
  color: #4a4a4a;
  margin: 1rem 1em 1em 2rem;
  color: #4a4a4a;
  background: #e8e8e8;
  overflow: hidden;
}

aside {
  margin: 2em;
  background-color: lightgray;
  padding: 0.5em;
  font-style: italic;
}

.exampleCentered {
  text-align: center;
  border-radius: 3px;
  /*position: relative;  /*  <--- */
  padding: 1rem 1.2rem;
  max-width: 80%;
  color: #4a4a4a;
  margin: 1rem 1em 1em 2rem;
  color: #4a4a4a;
  background: #e8e8e8;
  overflow: hidden;
}

@media print {
  .ui-accordion .ui-accordion-content {
    display: block !important;
  }
}

.poem {
  border-radius: 3px;
  padding: 1rem 1.2rem;
  max-width: 80%;
  margin: 1rem 1em 1em 2rem;
  background: #daf7a6;
  overflow: hidden;
}

.poemRight {
  text-align: right;
  border-radius: 3px;
  padding: 1rem 1.2rem;
  max-width: 80%;
  margin: 1rem 1em 1em 2rem;
  background: #daf7a6;
  overflow: hidden;
}

.goStartHere {
  float: left;
  width: 10%;
  margin-top: 0.5em;
  margin-right: 2em;
  margin-bottom: 1em;
}

.goStartHere img {
  max-width: 100%;
  max-height: 100%;
}

.goReading {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  padding: 1em;
}
.goReadingImage {
  width: 5%;
}

.goActivity {
  float: left;
  width: 10%;
  margin-top: 0.5em;
  margin-right: 2em;
  margin-bottom: 1em;
}

.goActivity img {
  max-width: 100%;
  max-height: 100%;
}

.goReflect {
  float: left;
  width: 10%;
  margin-top: 0.5em;
  margin-right: 2em;
  margin-bottom: 1em;
}

.goReflect img {
  max-width: 100%;
  max-height: 100%;
}

.goWatch {
  float: left;
  width: 10%;
  margin-top: 0.5em;
  margin-right: 2em;
  margin-bottom: 1em;
}

.goWatch img {
  max-width: 100%;
  max-height: 100%;
}

.goDownload {
  float: left;
  width: 10%;
  margin-top: 0.5em;
  margin-right: 2em;
  margin-bottom: 1em;
}

.goDownload img {
  max-width: 100%;
  max-height: 100%;
}

.goNumberedList {
  float: left;
  width: 10%;
  margin-top: 0.5em;
  margin-right: 2em;
  margin-bottom: 1em;
}

.goNumberedList img {
  max-width: 100%;
  max-height: 100%;
}

.ael-indent {
  margin-left: 5em;
}


/* FAQ style accordion */

 /* Style the buttons that are used to open and close the accordion panel */
/* .faqQuestion { */
button.faqQuestion {
   font-weight: bold;
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 1em;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

.faqQuestion:after {
  content: '&#43;'; /* Unicode character for "plus" sign (+) */
  font-size: 1em;
  color: #777;
  float: right;
  margin-left: 5px;
}

.faqActive:after { 
  content: "&#8722;"; /* Unicode character for "minus" sign (-) */
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.faqActive, .faqQuestion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.faqAnswer {
  padding: 0 2em;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
} 

/****** Add the COM14 styles **************/

.flashback { 
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  margin: 1em 0;
  margin-left: auto;
  margin-right:auto;
  width: 95%;
  border-radius: 1em;
  padding: 1em;
  background: #ffd266;
  overflow: hidden;
}

.flashbackImage {
  width: 25%;
  float: right;
  background-image: url('https://s3.amazonaws.com/filebucketdave/banner.js/images/com14/flashback.png');
  background-repeat: no-repeat;
  background-size: contain; 
}

.flashbackImage img {
 width: 95%;
}

.canaryImage {
  width: 10%;
  float: right;
}

.canaryImage img {
  width: 95%;
}

.weeklyWorkoutImage {
  width: 30%;
  float: right;
}

.weeklyWorkoutImage img {
  width: 95%;
}


.canaryExercise  {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%; 
    border-radius: 1em;
    padding: 1em;
  background-color: #efd25c;
  overflow: hidden;
}

.weeklyWorkout  {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%; 
    border-radius: 1em;
    padding: 1em;
  background-color: #cafafe;
  overflow: hidden;
}

.comingSoon  {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) ;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  padding: 1em;
  border-radius: 1em;
  overflow: hidden;
  border-style: outset;
}

.comingSoonImage {
  float: left;
  width: 15%;
  background-repeat: no-repeat;
  background-size: contain; 
}

.printCourseName {
  font-size: 80%;
}
.printPageTitle {
  font-size: 160%;
  font-weight:bolder;
}

.guAddedAdvice {
	font-size:80%;
}

.quote {
  border-left: 4px solid;
  color: #757575;
  margin: .5em 5vw !important;
  padding: 1em;
}

    `;


export default CI_CSS;