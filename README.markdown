##Tworph JQuery Plugin

Tworph is a jQuery plugin inspired by the [TiddlyWiki](http://www.tiddlywiki.com/) appear effect - a combination of morph, zoom and slide effects.

You can use Tworph as a Lightbox application with all kind of content (Images, Flash movies or the HTML5 Canvas element).

				
### Usage:

	<script type="text/javascript" src="jquery.tworph.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
  			$("#MY_DIV").tworph({      // <div id="MY_DIV" class="tworph">[CONTENT]<div>
    		buttons: '.MY_DIV_LINK',   // <a href="javascript:;" class="MY_DIV_LINK">[LINKNAME]<a>
    		width: '800px',            // Width of MY_DIV
    		height: '340px',           // Height of MY_DIV
    		fontsize: ['0.1em', '1em'] // Font size of MY_DIV (the first value is neccasary for zooming)
  		});
	});
	</script>`
