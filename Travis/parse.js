var Comment = '<span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This could be yet another comment</div></span>';
var While = '<div class="funcbox whileloop"><i class="fa fa-spinner fa"></i><span class="loopName" contentEditable="false">while</span><span class="args" contentEditable="true">true</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="loopBody" contentEditable="true"><span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This is the inner loop that does something</div></span><div class="line" contentEditable="true">do.something()</div></div></div>';
var forEach = '<div class="funcbox forEachloop"><i class="fa fa-refresh fa"></i><span class="loopName" contentEditable="true">MyArray.forEach</span><span class="args" contentEditable="true">element</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="loopBody" contentEditable="true"><span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This is the inner loop that does something</div></span><div class="line" contentEditable="true">do.something()</div></div></div>';
var forLoop = '<div class="funcbox forloop"><i class="fa fa-refresh fa"></i><span class="loopName" contentEditable="false">for</span><span class="args" contentEditable="true">var j=0; j<50; j++</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="loopBody" contentEditable="true"><span class="comment" spellcheck="true"><i class="fa fa-book"></i><div contentEditable="true">This is the inner loop that does something</div></span><div class="line" contentEditable="true">do.something()</div></div></div>';
var Funct = '<div class="funcbox func"><i class="fa fa-cog fa"></i><span class="funcName" contentEditable="true">MyFunction</span><span class="args" contentEditable="true">args1, arg2</span><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="funcBody" contentEditable="true">:)</div></div>';
var object = '<div class="object"  contentEditable="true"><div class="objectName"  contentEditable="true">SomeObject</div><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="objectBody" contentEditable="true"><div class="line"  contentEditable="true">This: "something",</div><div class="line"  contentEditable="true">That: 3.5,</div><div class="line"  contentEditable="true">The-other: 64</div><div class="line"  contentEditable="true"> </div></div></div>';
var array = '<div class="array"  contentEditable="true"><div class="arrayName"  contentEditable="true">SomeArray</div><div class="close" ><i class="fa fa-trash-o fa"></i></div><div class="arrayBody" contentEditable="true"><div class="line"  contentEditable="true">"something",</div><div class="line"  contentEditable="true"> </div></div></div>';
var sel, range;
var LastSelected;

window.onload=function(){
	var el = document.getElementById('func');
		el.onclick = function(e) {
		    LastSelected = e.target;
		    	LastSelected.focus();
		    	sel = window.getSelection();	 
		    	range = sel.getRangeAt(0);   
		};
	 el = document.getElementById('forloop');
		el.onclick = function() {
		    pasteHtmlAtCaret(forLoop);
		};
	 el = document.getElementById('forEach');
		el.onclick = function() {
		    pasteHtmlAtCaret(forEach);
		};
	 el = document.getElementById('while');
		el.onclick = function() {
		    pasteHtmlAtCaret(While);
		};		
	 el = document.getElementById('function');
		el.onclick = function() {
		    pasteHtmlAtCaret(Funct);
		};

	 el = document.getElementById('Comment');
		el.onclick = function() {
		    pasteHtmlAtCaret(Comment);
		};
	 el = document.getElementById('while');
		el.onclick = function() {
		    pasteHtmlAtCaret(While);
		};
	el = document.getElementById('object');
		el.onclick = function() {
		    pasteHtmlAtCaret(object);
		};
	el = document.getElementById('array');
		el.onclick = function() {
		    pasteHtmlAtCaret(array);
		};
///////////// delete module. ()
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
    if (window.getSelection) {
        // IE9 and non-IE
        //sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            //range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
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
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }

    var el = LastSelected.getElementsByClassName('close')[0];
		    el.onclick = remove;
};

//////////////////////////////////////////////////////////////////////
// Remove html elements.
function remove(e) {
	var element = e.target;
	//alert(element.parentNode.parentNode.parentNode.innerHTML)
	var mod = element.parentNode.parentNode;
	mod.parentNode.removeChild(mod);
}