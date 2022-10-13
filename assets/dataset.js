// BEGIN SVGS

const checkmarkSVG = '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path class="main" d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';

const infinitySVG = '<svg class="content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path class="main" d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z"/></svg>'

const questionSVG = '<svg class="content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path class="main" d="M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32C0 75 43 32 96 32h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5 0 18.1c0 17.7-14.3 32-32 32s-32-14.3-32-32V301.9c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z"/></svg>';

const clockSVG = '<svg class="content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path class="main" d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>'

// END SVGS


// BEGIN ERR MESSAGE

const typerUnknownError = `<h1>${lang.error.UnknownTitle}</h1><p>${lang.error.UnknownDesc}</p>`;
const typerUnknownErrorSearch = `${lang.error.UnknownTitle}`;

const nothingInListTyper = `<div class='errlist'><em>${lang.error.NothingInList}</em></div>`;
const queryNotMatchTyper = `<div class='errlist'><em>${lang.error.NotFoundFor}</em></div>`;

// END ERR MESSAGE

// BEGIN TYPERS

// not constant because checked mark has to move
let gameModeTyper = [
    {
        text: `<h1>${lang.gamemode.QuestionTitle}</h1><p>${lang.gamemode.QuestionDesc}</p>`,
        searchTerm: `${lang.gamemode.QuestionSearch}`,
        handler: () => {},
        headingimg: questionSVG,
        checked: true
    },
    {
        text: `<h1>${lang.gamemode.TimeTitle}</h1><p>${lang.gamemode.TimeDesc}</p>`,
        searchTerm: `${lang.gamemode.TimeSearch}`,
        handler: () => {},
        headingimg: clockSVG
    },
    {
        text: `<h1>${lang.gamemode.InfinityTitle}</h1><p>${lang.gamemode.InfinityDesc}</p>`,
        searchTerm: `${lang.gamemode.InfinitySearch}`,
        handler: () => {},
        headingimg: infinitySVG
    }
]

let digitsTyper = [
    {
        text: `<p>${lang.gamemode.DigitPrefixSingular} <strong>1</strong> ${lang.gamemode.DigitSuffixSingular}</p>`,
        searchTerm: `1 ${lang.gamemode.DigitSuffixSingular} ${lang.gamemode.DigitPrefixSingular} 1`,
        handler: () => {}
    },
    {
        text: `<p>${lang.gamemode.DigitPrefixPlural} <strong>1-2</strong> ${lang.gamemode.DigitSuffixPlural}</p>`,
        searchTerm: `1-2 ${lang.gamemode.DigitSuffixPlural} ${lang.gamemode.DigitPrefixPlural} 1-2`,
        handler: () => {},
        checked: true
    },
    {
        text: `<p>${lang.gamemode.DigitPrefixPlural} <strong>2</strong> ${lang.gamemode.DigitSuffixPlural}</p>`,
        searchTerm: `2 ${lang.gamemode.DigitSuffixPlural} ${lang.gamemode.DigitPrefixPlural} 2`,
        handler: () => {}
    },
    {
        text: `<p>${lang.gamemode.DigitPrefixPlural} <strong>2-3</strong> ${lang.gamemode.DigitSuffixPlural}</p>`,
        searchTerm: `2-3 ${lang.gamemode.DigitSuffixPlural} ${lang.gamemode.DigitPrefixPlural} 2-3` ,
        handler: () => {}
    },
    {
        text: `<p>${lang.gamemode.DigitPrefixPlural} <strong>3</strong> ${lang.gamemode.DigitSuffixPlural}</p>`,
        searchTerm: `3 ${lang.gamemode.DigitSuffixPlural} ${lang.gamemode.DigitPrefixPlural} 3`,
        handler: () => {}
    },
    {
        text: `<p>${lang.gamemode.DigitPrefixPlural} <strong>3-4</strong> ${lang.gamemode.DigitSuffixPlural}</p>`,
        searchTerm: `3-4 ${lang.gamemode.DigitSuffixPlural} ${lang.gamemode.DigitPrefixPlural} 3-4`,
        handler: () => {}
    },
    {
        text: `<p>${lang.gamemode.DigitPrefixPlural} <strong>4</strong> ${lang.gamemode.DigitSuffixPlural}</p>`,
        searchTerm: `4 ${lang.gamemode.DigitSuffixPlural} ${lang.gamemode.DigitPrefixPlural} 4`,
        handler: () => {}
    }
]

// END TYPERS