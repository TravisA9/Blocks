
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
var codeBlocks = document.getElementsByClassName('Body');
	for (var i = 0; i < codeBlocks.length; i++) {
		  var block = codeBlocks[i];
		  block.onclick = parse;
}
////////////////////////////////////////////////////////////////////// .parentNode
  // OLD: comment = /(^|[^\\])#.*/g; // TODO: lookbehind ...maybe.
  longcomment = /((?:(#=)(?:\s|.)*?(=#))|(#.*))/g;
  comment = /(#.*)/g;
  string = /((?:("""|'''|["'])(?:(?=(\\?))\3.)*?(?:\2)))/g;
  // Linked functions: ((?:[\w]+\.)+(?:[\w]+))\(.+\) //EX: fast.faster.foo_bar(c)
  functions = /([\w]+)(\((?:.)*\))+/g;
	boolean = /\b(true|false)\b/g;
	number = /(\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?\b)/g; //i;
// -?(0[box][\da-f]+)
	operator = /\+=?|-=?|\*=?|\/[\/=]?|\\=?|\^=?|%=?|÷=?|!=?=?|&=?|\|[=>]?|\$=?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/g;
  punctuation = /([{}[\];,.:])/g; // removed these: ()
	newline = /\\n|\\r/g; // removed these: ()
  lines = /(.*)\s/g //(?:(.+?)(?=\\n))(\\n)/g; //
  keyword = /\b(abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|let|local|macro|module|print|println|quote|return|try|type|typealias|using|while)\b/g;
  boolean = /\b(true|false)\b/g;

scopes = /\b(function|while|do|type|struct|for|if|else|elseif|try|catch|finally|end)\b/g;
var content = '# Some numbers \n e123 \n 3.1415926535 \n 0x1234 \n wsh = WebSocketHandler() do req, client \n global connections \n @show connections[client.id] = client \n while true # This is a comment! \n msg = read(client) \n msg = decodeMessage(msg) \n if startswith(msg, "setusername:") \n println("SETTING USERNAME: $msg") \n usernames[client.id] = msg[13:end] \n end \n if startswith(msg, "say:") \n println("EMITTING MESSAGE: $msg") \n for (k,v) in connections \n if k != client.id \n write(v, (usernames[client.id] * ": " * msg[5:end])) \n end \n end \n end \n end \n end \n \n'

// classes: .Body{ .kwd .str .pct .op .num, .bl .fnc .cmt }
////////////////////////////////////////////////////////////////////// .parentNode
function parse(e){
      var node = e.target
      var parent = node.parentNode

    if(node.classList.contains('Body')&& !node.classList.contains('parsed')){
      str = content


        // String parse // strings have to be matched first because adding html tags introduces meta-strings
        var match = string.exec(str);
        //alert(match.index + " " + match)
        if(match != -1){
        str = str.replace(string, '<span class="str">$1</span>'); }

        // Keyword parse
        match = keyword.exec(str);
        if(match != -1){
        str = str.replace(keyword, '<span class="kwd">$1</span>'); }

        // number parse
        match = number.exec(str);
        if(match != -1){
        str = str.replace(number, '<span class="num">$1</span>'); }


        // functions parse
        match = functions.exec(str);
        if(match != -1){
        str = str.replace(functions, '<span class="fnc">$1</span>$2'); }

        // comment parse
        match = comment.exec(str);
        if(match != -1){
        str = str.replace(comment, '<div class="cmt closeComment"><span><i class="fa fa-times fa"></i>$1</span><i class="fa fa-commenting fa"></i></div><br>'); }
        str = str.replace(lines, '<div>$1</div>'); // <div>$1</div>

// boolean parse
var match = boolean.exec(str);

  str = str.replace(boolean, '<span class="bl">$1</span>');
// operator parse
//var match = operator.exec(str); //kwd .str .pct .op .num, .bl .fnc .cmt
//if(match != -1){
//  str = str.replace(operator, '<span class="op">$1</span>'); }
// punctuation parse
var match = punctuation.exec(str);
if(match != -1){
  str = str.replace(punctuation, '<span class="pct">$1</span>'); }


    node.innerHTML = str
    node.className += " " + "parsed"; //.addClassName('parsed');
      event.stopPropagation();
        //alert(match.index + " " + match)
    }




        // 'string': /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/,
}
//////////////////////////////////////////////////////////////////////
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

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
