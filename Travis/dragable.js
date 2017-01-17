var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    var rect = elem.getBoundingClientRect();
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
//  alert(rect.top, rect.right, rect.bottom, rect.left)
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px'; // not sure yet why I had to subtract 35!
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

}

// Bind the functions...
var elems = document.getElementsByClassName('draggable-element');
for (var i = 0; i < elems.length; i++) {
          var elem = elems[i];
            elem.onmousedown = function () {
              _drag_init(this.parentNode);
              //  return false;
            };
};



//document.getElementById('draggable-element').onmousedown = function () {    _drag_init(this);    return false;};

document.onmousemove = _move_elem;
document.onmouseup = _destroy;
