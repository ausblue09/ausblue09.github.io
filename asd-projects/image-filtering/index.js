// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
function applyFilter() {
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      var pixel = image[i][j];
      var pixelArray = rgbStringToArray(pixel);
      pixelArray[RED] = 200;  
      var updatedPixel = rgbArrayToString(pixelArray);
      image[i][j] = updatedPixel;
    }
  }
}
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO function applyAndRender() 
function applyAndRender() {
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  applyFilterNoBackground(reddify);

  // do not change the below line of code
  render($("#display"), image);
}

function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      var pixel = image[i][j];
      var pixelArray = rgbStringToArray(pixel);
      
      filterFunction(pixelArray);
      
      var updatedPixel = rgbArrayToString(pixelArray);
      image[i][j] = updatedPixel;
    }
  }
}

function reddify(pixelArray) {
  pixelArray[RED] = 200;
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var backgroundColor = image[0][0];
  
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      if (image[i][j] !== backgroundColor) {
        var pixel = image[i][j];
        var pixelArray = rgbStringToArray(pixel);
        
        filterFunction(pixelArray);
        
        var updatedPixel = rgbArrayToString(pixelArray);
        image[i][j] = updatedPixel;
      }
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds(num) {
  if (num < 0) {
    return 0;
  } else if (num > 255) {
    return 255;
  } else {
    return num;
  }
}

// TODO 4: Create reddify filter function
function reddify(pixelArray) {
  pixelArray[RED] = 200;
}

// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray) {
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE] - 50);
}
function increaseGreenByBlue(pixelArray) {
  pixelArray[GREEN] = keepInBounds(pixelArray[GREEN] + pixelArray[BLUE]);
}

// CHALLENGE code goes below here
