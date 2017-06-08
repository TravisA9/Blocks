
        var sel, range;
        var LastSelected;
        var desktop, desktopSelected = false;
        var x=0, y=0;

window.onload=function(){
     // Grab templatete
      var funct   = document.getElementById('funct_template');
      var comment = document.getElementById('comment_template');
      var While   = document.getElementById('While_template');
      var forEach = document.getElementById('forEach_template');
      var forLoop = document.getElementById('forLoop_template');
      var type    = document.getElementById('type_template');
      var array   = document.getElementById('array_template');


   desktop = document.getElementById('All');
	var el = desktop;
		el.onclick = function(e) {
             x = event.clientX;
             y = event.clientY;

      		    LastSelected = e.target;
                // if (LastSelected.id == "all"){ alert(LastSelected.id); }
                LastSelected.focus();

              if (LastSelected === desktop){ desktopSelected = true;  }
              else{ desktopSelected = false; }

      		    	sel = window.getSelection();
      		    	range = sel.getRangeAt(0);
		};
    // funct, comment, type;
	 el = document.getElementById('for');
		el.onclick = function() { pasteHtmlAtCaret(forLoop.cloneNode(true)); };
	 el = document.getElementById('forEach');
		el.onclick = function() { pasteHtmlAtCaret(forEach.cloneNode(true)); };
	 el = document.getElementById('while');
		el.onclick = function() { pasteHtmlAtCaret(While.cloneNode(true)); };
	 el = document.getElementById('function');
		el.onclick = function() { pasteHtmlAtCaret(funct.cloneNode(true)); };
	 el = document.getElementById('comment');
		el.onclick = function() { pasteHtmlAtCaret(comment.cloneNode(true)); };
	 el = document.getElementById('while');
		el.onclick = function() { pasteHtmlAtCaret(While.cloneNode(true)); };
	el = document.getElementById('type');
		el.onclick = function() { pasteHtmlAtCaret(type.cloneNode(true)); };
	el = document.getElementById('array');
		el.onclick = function() { pasteHtmlAtCaret(array.cloneNode(true)); };
///////////// delete module. ()
var elem = document.getElementsByClassName('remove');
		for (var i = 0; i < elem.length; i++) {
				var link = elem[i];
				link.onclick = remove;
			}
var links = document.getElementsByClassName('close');
	for (var i = 0; i < links.length; i++) {
		  var link = links[i];
		  link.onclick = remove;
		}
};

//Comment, while, forEach forLoop, function
//var comment = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g;



function pasteHtmlAtCaret(html) {
    //alert(range);
    //alert(sel);
		//event.stopPropagation();   classList.contains("func")
if (desktopSelected){
    // Insert Object into desktop.
     var list = html.firstElementChild.classList;
  if ( list.contains("func") || list.contains("type") || list.contains("array")){
     var win =  html.getElementsByClassName('funcbox')[0];
        win.className += " global";
     var head =  win.getElementsByClassName('head')[0];
        head.className += " draggable";
        head.onmousedown = function () { _drag_init(this.parentNode); }; // Draggable.
     var close = head.getElementsByClassName('close');
            close[0].onclick = remove;  // Deletable.
     var desk = document.getElementById('All');
      desk.append(win);
      desktopSelected = false;

  }
  // The following is for text insertion/editing.
}else if (window.getSelection) {
        // IE9 and non-IE
        //sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            //range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html.innerHTML;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } //else if (document.selection && document.selection.type != "Control") { // IE < 9 //document.selection.createRange().pasteHTML(html); }

    var el = LastSelected.getElementsByClassName('close');
		    if (el.length >0){el[0].onclick = remove;}
        else{
		var elem = LastSelected.getElementsByClassName('remove')[0];
				elem.onclick = removeComment;
      }
};

//////////////////////////////////////////////////////////////////////
// Remove html elements.
function remove(e) {
	var element = e.target;
	var mod = element.parentNode;
	mod.parentNode.remove()
}
function removeComment(e) {
	var element = e.target;
	var mod = element.parentNode.parentNode;
    //mod.getElementsByClassName('comment')[0];
    if (mod.parentNode.classList.contains("comment")){
	       mod.parentNode.remove();
    }
    //else if (mod.parentNode.classList.contains("comment")){
    //    mod.parentNode.parentNode.remove(); }
}
