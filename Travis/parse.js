//   var Comment = '<span class="comment" spellcheck="true"><i class="fa fa-book"></i><span  contentEditable="true"><i class="Remove fa fa-times-circle fa"></i>Comment</span></span>';
//var Comment = '<span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This could be yet another comment</div></span>';
//   var While = '<div class="funcbox whileloop"><i class="fa fa-spinner fa"></i><span class="loopName" contentEditable="false">while</span><span class="args" contentEditable="true">true</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="loopBody" contentEditable="true"><span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This is the inner loop that does something</div></span><div class="line" contentEditable="true">do.something()</div></div></div>';
//   var forEach = '<div class="funcbox forEachloop"><i class="fa fa-refresh fa"></i><span class="loopName" contentEditable="true">MyArray.forEach</span><span class="args" contentEditable="true">element</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="loopBody" contentEditable="true"><span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This is the inner loop that does something</div></span><div class="line" contentEditable="true">do.something()</div></div></div>';
//   var forLoop = '<div class="funcbox forloop"><i class="fa fa-refresh fa"></i><span class="loopName" contentEditable="false">for</span><span class="args" contentEditable="true">var j=0; j<50; j++</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="loopBody" contentEditable="true"><span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This is the inner loop that does something</div></span><div class="line" contentEditable="true">do.something()</div></div></div>';
//   var Funct = '<div class="funcbox func"><i class="fa fa-cog fa"></i><span class="funcName" contentEditable="true">MyFunction</span><span class="args" contentEditable="true">args1, arg2</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="funcBody" contentEditable="true">:)</div></div>';
//var object = '<div class="object"  contentEditable="true"><div class="objectName"  contentEditable="true">SomeObject</div><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="objectBody" contentEditable="true"><div class="line"  contentEditable="true">This: "something",</div><div class="line"  contentEditable="true">That: 3.5,</div><div class="line"  contentEditable="true">The-other: 64</div><div class="line"  contentEditable="true"> </div></div></div>';

//   var object = '<div class="object" contenteditable="true"><div class="Name" contenteditable="true"><span class="type">Point</span><span class="subtypeof"> :> </span><span class="Abstract">GeomAbstract</span></div><div class="close"><i class="fa fa-trash fa"></i></div><div class="Body" contenteditable="true"><div class="line" contenteditable="true">x::Int64</div><div class="line" contenteditable="true">y::Int64</div><div class="line" contenteditable="true">Point(x,y) = new(x,y)</div></div></div>';

//   var array = '<div class="array"  contentEditable="true"><div class="arrayName"  contentEditable="true">SomeArray</div><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="arrayBody" contentEditable="true"><div class="line"  contentEditable="true">"something",</div><div class="line"  contentEditable="true"> </div></div></div>';
//var funct, comment, While, forEach, forLoop, type, array;

/*window.onload = function() {
            var div = document.getElementById('editable');
            div.onclick = function(e) {
                this.contentEditable = true;
                this.focus();
                this.style.backgroundColor = '#E0E0E0';
                this.style.border = '1px dotted black';
            }

            div.onmouseout = function() {
                this.style.backgroundColor = '#ffffff';
                this.style.border = '';
                this.contentEditable = false;
            }
        }
*/
        var sel, range;
        var LastSelected;
        var desktop, desktopSelected = false;
        var x=0, y=0;

window.onload=function(){

      var funct   = document.getElementById('funct_template');
      var comment = document.getElementById('comment_template');
      var While   = document.getElementById('While_template');
      var forEach = document.getElementById('forEach_template');
      var forLoop = document.getElementById('forLoop_template');
      var type    = document.getElementById('type_template');
      var array   = document.getElementById('array_template');

      //alert( comment.classList);



   desktop = document.getElementById('All');
	var el = desktop;
		el.onclick = function(e) {
             x = event.clientX;
             y = event.clientY;

      		    LastSelected = e.target;
              if (LastSelected === desktop){ desktopSelected = true; }
              else{ desktopSelected = false; }

      		    	LastSelected.focus();
      		    	sel = window.getSelection();
      		    	range = sel.getRangeAt(0);
		};
    // funct, comment, type;
	 el = document.getElementById('for');
		el.onclick = function() { pasteHtmlAtCaret(forLoop); };
	 el = document.getElementById('forEach');
		el.onclick = function() { pasteHtmlAtCaret(forEach); };
	 el = document.getElementById('while');
		el.onclick = function() { pasteHtmlAtCaret(While); };
	 el = document.getElementById('function');
		el.onclick = function() { pasteHtmlAtCaret(funct); };
	 el = document.getElementById('comment');
		el.onclick = function() { pasteHtmlAtCaret(comment); };
	 el = document.getElementById('while');
		el.onclick = function() { pasteHtmlAtCaret(While); };
	el = document.getElementById('type');
		el.onclick = function() { pasteHtmlAtCaret(type); };
	el = document.getElementById('array');
		el.onclick = function() { pasteHtmlAtCaret(array); };
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
		//event.stopPropagation();
if (desktopSelected){
  //alert("hello");
  if ( html === Funct || html === object || html === array){
  alert("hello");
  }
}

    if (window.getSelection) {
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
				elem.onclick = remove;
      }
};

//////////////////////////////////////////////////////////////////////
// Remove html elements.
function remove(e) {
	alert("hello")
	var element = e.target;
	//alert(element.parentNode.parentNode.parentNode.innerHTML)
	var mod = element.parentNode.parentNode;
  alert(mod.parentNode.innerHTML)
	mod.parentNode.innerHTML = ""
  //removeChild(mod);
	//event.stopPropagation();
}
