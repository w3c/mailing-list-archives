'use strict';

$(document).ready(function() {

    const URL = /(\s)(https?:\/\/[^\s]+)(\s)/gi;
    var md = window.markdownit();
    var container = $('#body');
    var link = $('#overlay > a');
    var original = container.text();
    var enhanced;
    var formatted = false;

    var processOriginal = function() {
	return original.replace(URL, function(foo, p1, p2, p3) {
	    return p1 + '[`' + p2 + '`](' + p2 + ')' + p3;
	});
    };

    var toggleFormatting = function() {

	if (formatted) {
            container.text(original);
	    container.removeClass('rich').addClass('plain');
	    link.text('Format');
	} else {
            container.html(md.render(enhanced));
	    container.removeClass('plain').addClass('rich');
	    link.text('Plain');
	}

	formatted = !formatted;
    };

    link.click(toggleFormatting);
    enhanced = processOriginal(original);
    toggleFormatting();

});
