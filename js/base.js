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
 * (CryptoJS extends the global object with the property 'CryptoJS'.)
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
            OPTS_THREAD = $(':radio[name="thread"]'),
            ORIGINAL = MESSAGE.text(),
            ENHANCED = MDIT.render(processOriginal(ORIGINAL)),
            MESSAGE_CONTAINER = $('div#message-container'),
            THREAD_CONTAINER = $('div#thread-container'),
            AUTHOR = $('meta[name="Author"]');

        const toggleThread = function(event) {
            const OPTION = event.target.value;
            if ('no' === OPTION) {
                MESSAGE_CONTAINER.removeClass('col-md-8').addClass('col-md-12');
                THREAD_CONTAINER.removeClass('col-md-4').hide();
            } else if ('flat' === OPTION) {
            } else {
                // ie, 'tree' === OPTION
                MESSAGE_CONTAINER.removeClass('col-md-12').addClass('col-md-8');
                THREAD_CONTAINER.addClass('col-md-4').show();
            }
        };

        const toggleFormatting = function() {
            if (OPT_MD[0].checked) {
                MESSAGE.addClass('rich');
                MESSAGE.html(ENHANCED);
            } else {
                MESSAGE.text(ORIGINAL);
                MESSAGE.removeClass('rich');
            }
        };

        if (AUTHOR && AUTHOR.attr('Content')) {
            const PATTERN_EMAIL = /\b[a-z0-9\._%+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}\b/i, // regex from http://www.regular-expressions.info/email.html
                ADDRESS = PATTERN_EMAIL.exec(AUTHOR.attr('Content'));
            if (ADDRESS) {
                const URL = 'https://www.gravatar.com/avatar/' + CryptoJS.MD5(ADDRESS[0].toLowerCase()) + '?d=404',
                    GRAVATAR = $('#gravatar');
                GRAVATAR.load(function() {
                    GRAVATAR.addClass('active');
                });
                GRAVATAR.attr('src', URL);
            }
        }

        if (OPT_MD.length) toggleFormatting();
        OPT_MD.change(toggleFormatting);
        OPTS_THREAD.change(toggleThread);
        OPTIONS.addClass('active');

    });

};

// Set up RequireJS:
requirejs.config({
    paths: {
        jquery: 'https://www.w3.org/scripts/jquery/2.1/jquery.min',
        'markdown-it': 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/6.0.0/markdown-it.min',
        'cryptojs-md5': '../js/md5' // downloaded from https://code.google.com/archive/p/crypto-js/downloads
    }
});

// Load dependencies asynchronously via RequireJS:
requirejs(['jquery', 'markdown-it', 'cryptojs-md5'], init);
