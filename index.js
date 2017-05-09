var cols = 10;
var rows = 10;
var w = 40;
var fps = 60;
var grid = [];
var canvas;

var current;

var stack = [];

var myp5;

$(document).ready(function () {
  frameRateSlider = $('#frameRate');
  columnsSlider = $('#columns');
  rowsSlider = $('#rows');

  frameRateSlider.on('change input', function () {
    fps = this.value;
  });

  columnsSlider.on('change input', function () {
    cols = this.value;
  });

  rowsSlider.on('change input', function () {
    rows = this.value;
  });

  $('#init').on('click', function(){
    myp5 = new p5(config, 'p5Canvas');
    myp5.background(51);
  });

  $('#reset').on('click', function(){
    myp5 = null;
  });
});
