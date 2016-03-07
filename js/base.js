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
            AUTHOR = $('meta[name="Author"]'),
            ROW_DETAILED = $('.headers .detailed'),
            ROW_GUTTER = $('#gutter'),
            GUTTER = $('a', ROW_GUTTER),
            GUTTER_GLYPH = $('#glyph'),
            TR_UP_FULL = '&#9650;',
            TR_UP_EMPTY = '&#9651;',
            TR_DOWN_FULL = '&#9660;',
            TR_DOWN_EMPTY = '&#9661;',
            TITLE = $('h1'),
            BODY = $('#body'),
            SPINNER = $('#spinner'),
            TREE = $('.thread'),
            SELECTOR_LINKS = '.thread a';

        var detailsVisible = true,
            cache = {};

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

        const highlightGutter = function(event) {
            if (event && 'mouseenter' === event.type) {
                if (detailsVisible) {
                    GUTTER_GLYPH.html(TR_UP_FULL);
                } else {
                    GUTTER_GLYPH.html(TR_DOWN_FULL);
                }
            } else {
                // ie, 'mouseleave' === event.type
                if (detailsVisible) {
                    GUTTER_GLYPH.html(TR_UP_EMPTY);
                } else {
                    GUTTER_GLYPH.html(TR_DOWN_EMPTY);
                }
            }
        };

        const processMessage = function(url) {
            return function(data) {
                const MESSAGE = $(data),
                    NEW_TITLE = $('h1', MESSAGE).text(),
                    NEW_BODY = $('#body', MESSAGE).text(),
                    NEW_TREE = $('.thread', MESSAGE).html(),
                    STATE = {title: NEW_TITLE, body: NEW_BODY, tree: NEW_TREE};
                history.pushState(STATE, NEW_TITLE, url);
                TITLE.text(NEW_TITLE);
                BODY.text(NEW_BODY);
                TREE.html(NEW_TREE);
                $(SELECTOR_LINKS).click(navigate);
            };
        };

        const handleError = function(data) {
            window.alert('Error: could not load the message.');
        };

        const restore = function() {
            TITLE.removeClass('inactive');
            BODY.removeClass('inactive');
            SPINNER.hide();
            TREE.show();
        };

        const retrieveWithCache = function(url, done, fail, always) {
            if (cache[url]) {
                done(cache[url]);
                always();
            } else {
                setTimeout(function() {
                    $.get(url).done(function(data) {
                        cache[url] = data;
                        done(data);
                    }).fail(fail).always(always);
                }, 1500);
            }
        };

        const toggleDetails = function() {
            detailsVisible = !detailsVisible;
            if (detailsVisible) {
                ROW_DETAILED.removeClass('hidden');
                GUTTER_GLYPH.html(TR_UP_EMPTY);
            } else {
                ROW_DETAILED.addClass('hidden');
                GUTTER_GLYPH.html(TR_DOWN_EMPTY);
            }
            return false;
        };

        const navigate = function(event) {
            const SELF = $(event.target);
            if (!SELF.hasClass('current')) {
                const URL = SELF.data('id') + '.html';
                TITLE.addClass('inactive');
                BODY.addClass('inactive');
                SPINNER.show();
                TREE.hide();
                retrieveWithCache(URL, processMessage(URL), handleError, restore);
            }
            return false;
        };

        const back = function(event) {
            if (!event || !event.state) {
                window.alert('Error: could not navigate back to the previous message.');
            } else {
                TITLE.text(event.state.title);
                BODY.text(event.state.body);
                TREE.html(event.state.tree);
                $(SELECTOR_LINKS).click(navigate);
            }
        };

        const setUp = function() {
            const STATE = {title: TITLE.text(), body: BODY.text(), tree: TREE.html()};
            history.replaceState(STATE, TITLE.text(), document.location.href);
            window.addEventListener('popstate', back);
            $(SELECTOR_LINKS).click(navigate);
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
        GUTTER.hover(highlightGutter);
        GUTTER.click(toggleDetails);
        ROW_GUTTER.removeClass('hidden');
        toggleDetails();
        OPTIONS.addClass('active');
        setUp();

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
