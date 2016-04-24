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

function meowify(image) {
  image.removeAttribute('srcset');
  image.removeAttribute('src');
  image.setAttribute('src', 'http://placekitten.com/' + image.clientWidth + '/' + image.clientHeight);
}

function meowifyAllDonalds() {
  var images = document.querySelectorAll('img');
  arrayify(images).forEach(function(image) {
    if (foundTheDonald(image)) {
      meowify(image);
    }
  });
}

onceDOMContentLoaded(meowifyAllDonalds);

