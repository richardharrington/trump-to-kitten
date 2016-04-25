function onceDOMContentLoaded(f) {
  if (document.readyState === 'interactive') {
    f();
  } else {
    document.addEventListener('DOMContentLoaded', f);
  }
}

function arrayify(quasiArray) {
  var arr = [];
  for (var i = 0; i < quasiArray.length; i++) {
    arr.push(quasiArray[i]);
  }
  return arr;
}

function foundTheDonald(image) {
  var attrs = arrayify(image.attributes);
  return attrs.some(function(attr) {
    return attr.nodeValue.match(/trump|the\s*?donald/i);
  });
}

function getDimensions(image) {
  // Checks to see if there is an attribute that says '462x312'
  // or something, which is sometimes a better indicator of
  // the proper dimensions than clientWidth and clientHeight
  var attrs = arrayify(image.attributes);

  var dimensions;
  attrs.forEach(function(attr) {
    var m = attr.nodeValue.match(/\D(\d+)x(\d+)\b/);
    if (m) {
      dimensions = m.slice(1, 2);
    }
  });
  return dimensions || [image.clientWidth, image.clientHeight];
}


function meowify(image, dimensions) {
  image.removeAttribute('srcset');
  image.removeAttribute('src');
  image.setAttribute('src', 'http://placekitten.com/' + dimensions[0] + '/' + dimensions[1]);
}

function meowifyAllDonalds() {
  var images = document.querySelectorAll('img');
  arrayify(images).forEach(function(image) {
    if (foundTheDonald(image)) {
      meowify(image, getDimensions(image));
    }
  });
}

onceDOMContentLoaded(meowifyAllDonalds);

