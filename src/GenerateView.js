function BuildWindow(item){

var view = document.getElementById("All")

var win = document.createElement("div");
win.setAttribute("class", "funcbox func global")
win.setAttribute("style", "z-index: 800; left: 39px; top: 612px;")
win.setAttribute("contenteditable", "false")
var head = document.createElement("div");
head.setAttribute("class", "head draggable")

  var one = document.createElement("i");
  one.setAttribute("class", "fa fa-cog fa")
  head.appendChild(one);

  var two = document.createElement("span");
  two.setAttribute("class", "name")
  two.setAttribute("contenteditable", "true")
  two.innerHTML = item.name;
  head.appendChild(two);

  var three = document.createElement("span");
  three.setAttribute("class", "args")
  three.setAttribute("contenteditable", "true")
  three.innerHTML = item.args;
  head.appendChild(three);

  var four = document.createElement("i");
  four.setAttribute("class", "close fa fa-trash fa")
  head.appendChild(four);

var body = document.createElement("div");
body.setAttribute("class", "Body")
body.setAttribute("contenteditable", "true")
for (var i = 0; i < item.code.length; i++) {
  if( item.code[i]["text"] ){
    body.innerHTML = item.code[i]["text"]
  }else{
    body.innerHTML = "CODE BLOCK!"
  }

}


win.appendChild(head);
win.appendChild(body);
win.onmousedown = function () { _drag_init(this); };
win.onclick = function () { FocusWindow(this); };
// win.addEventListener('mousedown', function(){alert("hello")});
view.appendChild(win);

}

/*
<div class="funcbox func global" style="z-index: 800; left: 39px; top: 612px;">

<div class="funcbox func">
      <div class="head" contenteditable="false">
          <i class="fa fa-cog fa"></i>
          <span class="name" contenteditable="true">MyFunction</span>
          <span class="args" contenteditable="true">X::Int64, p::Point</span>
          <i class="close fa fa-trash fa"></i>
      </div>
  <div class="Body" contenteditable="true"><br>p.x += X<br></div>
  </div>*/



////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
  $('#get-data').click(function () {
    var showData = $('#show-data');

    $.getJSON('Program.json', function (data) {


      var items = data.items.map(function (item) {
        //if item.type == ""
        BuildWindow(item)
        return item.key + ': ' + item.value;
      });

      showData.empty();

      if (items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
    });

    showData.text('Loading the JSON file.');
  });
});
////////////////////////////////////////////////////////////////////////////////
