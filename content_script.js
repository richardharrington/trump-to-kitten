function meowify(image) {
  var attrs = image.attributes;
  for (var i = 0; i < attrs.length; i++) {
    if (attrs[i].nodeValue.match(/trump|the\s*?donald/i)) {
      image.removeAttribute('srcset');
      image.setAttribute('src', 'http://placekitten.com/' + image.clientWidth + '/' + image.clientHeight);
      return;
    }
  }
}

function meowifyAllImages() {
  var images = document.querySelectorAll('img');
  for (var i = 0; i < images.length; i++){
    var img = images[i];

    if (img.complete) {
      meowify(img);
      continue;
    }

    (function(image){
      image.addEventListener('load', function(){
        meowify(image);
      });
    })(img);
  }
}

if (document.readyState === 'interactive') {
  meowifyAllImages();
} else {
  document.addEventListener('DOMContentLoaded', meowifyAllImages);
}

