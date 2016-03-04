'use strict';

/**
 * Try to find URLs and turn them into Markdown links.
 *
 * @param {String} the original text.
 * @returns {String} the same text, with URLs as links.
 */

const processOriginal = function(original) {

    const PATTERN_URL = /(\s)(https?:\/\/[^\s]+)(\s)/gi;

    const ADD_LINKS = function(foo, p1, p2, p3) {
        return p1 + '[`' + p2 + '`](' + p2 + ')' + p3;
    };

    return original.replace(PATTERN_URL, ADD_LINKS);

};

/**
 * Set up the page.
 *
 * @param {Function} $ the jQuery object.
 * @param {Function} markdownit the markdown-it object.
 */

const init = function($, markdownit) {

    $(document).ready(function() {

        const MDIT = markdownit(),
            MESSAGE = $('#body'),
            OPTIONS = $('form#options'),
            OPT_MD = $('input#markdown'),
            ORIGINAL = MESSAGE.text(),
            ENHANCED = MDIT.render(processOriginal(ORIGINAL));

        const toggleFormatting = function() {
            if (OPT_MD[0].checked) {
                MESSAGE.addClass('rich');
                MESSAGE.html(ENHANCED);
            } else {
                MESSAGE.text(ORIGINAL);
                MESSAGE.removeClass('rich');
            }
        };

        toggleFormatting();
        OPT_MD.change(toggleFormatting);
        OPTIONS.addClass('active');

    });

};

// Set up RequireJS:
requirejs.config({
    paths: {
        jquery: 'https://www.w3.org/scripts/jquery/2.1/jquery.min',
        'markdown-it': 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/6.0.0/markdown-it.min'
    }
});

// Load dependencies asynchronously via RequireJS:
requirejs(['jquery', 'markdown-it'], init);
