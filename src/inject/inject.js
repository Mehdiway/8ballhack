// p5 can not be executed the normal "global" way
// Instead a sketch instance has to be manually created
// This is done with the closure below

// Support zoom : Percent instead of pixels
var tableWidthPerc = 0.7626;
var tableHeightPerc = 0.5403;
// Offset
var tableOffsetTopPerc = 0.32; // %
var tableOffsetLeftPerc = 0.12; // %

var container = document.getElementById('gm-wrap').getBoundingClientRect();

var tableWidth = container.width * tableWidthPerc;
var tableHeight = container.height * tableHeightPerc;

var off_top = container.top + container.height * tableOffsetTopPerc,
	off_left = container.left + container.width * tableOffsetLeftPerc,
	off_right = off_left + tableWidth,
	off_bottom = off_top + tableHeight,
	off_middle = off_left + tableWidth / 2;

var mouseOffset = 8;

var activate = true;

var sketch = function(p5) {
    // setup canvas
    p5.setup = function() {
        console.log('p5 running');
        var c = p5.createCanvas(tableWidth, tableHeight);
        c.style('pointer-events', 'none');
        c.position(off_left, off_top);
		console.log(off_left, off_top);
        p5.clear();
        p5.noFill();
        p5.noLoop();
        p5.stroke(255, 30);
    }
    // draw the guidelines
    p5.draw = function() {
        p5.clear();

		if (!activate) return;
        // set stroke weight
        p5.strokeWeight(2);
        // set transparency
        p5.stroke(255, 30);
        p5.line(0, 0, p5.mouseX - mouseOffset, p5.mouseY - mouseOffset);
        p5.line(tableWidth / 2, 0, p5.mouseX - mouseOffset, p5.mouseY - mouseOffset);
        p5.line(tableWidth, 0, p5.mouseX - mouseOffset, p5.mouseY - mouseOffset);
        p5.line(0, tableHeight, p5.mouseX - mouseOffset, p5.mouseY - mouseOffset);
        p5.line(tableWidth / 2, tableHeight, p5.mouseX - mouseOffset, p5.mouseY - mouseOffset);
        p5.line(tableWidth, tableHeight, p5.mouseX - mouseOffset, p5.mouseY - mouseOffset);
        // increase the transparency of the circle
        p5.strokeWeight(1);
        p5.stroke(255, 255);
        p5.ellipse(p5.mouseX -  mouseOffset, p5.mouseY -  mouseOffset, 18);
    }
    // change the layout if mouse is moved and SHIFT key is pressed
    p5.mouseMoved = function() {
        if (p5.keyIsDown(p5.SHIFT)) {
            p5.draw();
        }
    }
    p5.keyPressed = function() {
        if (p5.keyIsDown(p5.SHIFT)) {
            p5.draw();
        } else if (p5.keyIsDown(80)) { // P
			activate = !activate;
	        p5.draw();
		}
    }
}

// The above function closure is passed into a p5 object constructor
// this starts the sketch.
var myp5 = new p5(sketch);
