
// Toggles the Flex dimension section 
function showHideFlexDimensionsDiv() {
	var x = document.getElementById("flexDimensionsDiv");
	if (x.style.display == "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
  }
  
// Toggles the Material section 
  function showHideMaterialDiv() {
	var x = document.getElementById("materialDiv");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
  }
  // Toggles the Hole Parameters section 
  function showHideHoleParameters() {
	var x = document.getElementById("holeParameters");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
  }
    // Toggles the Individual hole section 
  function showHideIndividualHolesDiv() {
	var x = document.getElementById("individualHoles");
	var y = document.getElementById("patternedHoles");
  
	if (x.style.display === "none") {
	  x.style.display = "block";
	  y.style.display = "none";
	  /*
	  document.getElementById("chkPreview").checked = "";
	  */
	} else {
	  x.style.display = "none";
	  /*
	  document.getElementById("chkPatternPreview").checked = "";
	  document.getElementById("chkPreview").checked = "checked";
	  */
	}
	updatePreview()
  }
  // Toggles the Hole patterns section 
  function showHidePatternedHolesDiv() {
	 var x = document.getElementById("patternedHoles");
	var y = document.getElementById("individualHoles");

	if (x.style.display === "none") {
	  x.style.display = "block";
	  y.style.display = "none";
	  /*
	  document.getElementById("chkPatternPreview").checked = "";
	  */
	} else {
	  x.style.display = "none";
	  /*
	  document.getElementById("chkPreview").checked = "";
	  document.getElementById("chkPatternPreview").checked = "checked";
	  */
	}
	updatePreview()
  }

//data from user input
var flexLength
var flexWidth
var contactLength1
var contactLength2
var flexThk

var holeList = new Array(0);



//function to get data from user input
function getInputData(){
flexLength = document.getElementById("flexLength").value
flexWidth = document.getElementById("flexWidth").value
contactLength1 = document.getElementById("contactLength1").value
contactLength2 = document.getElementById("contactLength2").value
flexThk = document.getElementById("flexThk").value
}
getInputData()




//color of flex
var flexColor 
function flexClr(){
var tinPlated = document.getElementById("coatingTinplated").checked
var silverPlated = document.getElementById("coatingSilverplated").checked

if (tinPlated===true) {
	flexColor = "grey";
} else {
	if (silverPlated===true) {
	flexColor = "silver";
	} else {
	flexColor = "chocolate";
}	
}

}
flexClr()




var outLineColor = "#235059"
// Make an instance of two and place it on the page for the side view.
//var elem = document.getElementById('draw-animation');
const two = new Two
({
	width: 635,
	height: 700,
	
	type: Two.Types.canvas
});

const graphicsWindow = document.getElementById('graphicsWindow');

two.appendTo(graphicsWindow);

const canvas = graphicsWindow.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

function clearCanvas(){


context.clearRect(0, 0, canvas.width, canvas.height);	
}

var titleBlockLineGroup = two.makeGroup();
var titleBlockDataGroup = two.makeGroup();

var titleBlockField1
var titleBlockField2
var titleBlockField3

function titleBlockAndBorder(){

bkgr = two.makeRectangle(two.width/2,two.height/2,two.width,two.height)
bkgr.fill = "white"
titleBlockLineGroup.add(bkgr);

sheetBorder = two.makeRectangle(two.width/2,two.height/2,two.width-20,two.height-20)
titleBlockLineGroup.add(sheetBorder);

txtDesignation 

titleBlockLineGroup.add(txtDesignation);
titleBlockDataGroup.add(txtDesignation);


titleBlockLineGroup.add(txtMaterial);
titleBlockDataGroup.add(txtMaterial);

titleBlockField1 = two.makeRectangle(two.width/2,two.height-100+45,two.width-20,90)
titleBlockLineGroup.add(titleBlockField1);
titleBlockField2 = two.makeRectangle((two.width/2)-((two.width-20)/3),two.height-100+45,(two.width-20)/3,90)
titleBlockLineGroup.add(titleBlockField2);
titleBlockField3 = two.makeRectangle((two.width/2)+((two.width-20)/3),two.height-100+45,(two.width-20)/3,90)
titleBlockLineGroup.add(titleBlockField3);

titleBlockLineGroup.stroke = "white"
titleBlockDataGroup.stroke = "white"

//titleBlockDataGroup.add(txt); 
}
//titleBlockAndBorder()

function refreshCompleteDrawing() {
	getInputData()
	createFlex()
	createDimL()
	createHolesFromList()
}


function createWEBLayout() {
two.clear()
refreshCompleteDrawing()
two.update()
}

function createPDFLayout() {
two.clear()

var bkgr
var sheetBorder
var txtDesignation
var txtMaterial
var matText
var titleBlockLine 

bkgr = two.makeRectangle(two.width/2,two.height/2,two.width,two.height)

sheetBorder = two.makeRectangle(two.width/2,two.height/2,two.width-20,two.height-20)
refreshCompleteDrawing()


if (document.getElementById("coatingTinplated").checked) {
	matText = "Tin plated copper";
}else{
	if (document.getElementById("coatingSilverplated").checked) {
	matText = "Silver plated copper";
	}else{
		matText = "Copper, no coating";
	}
}

txtDesignation = two.makeText("FLEX " + flexLength + "x" + flexWidth + "x" + flexThk,(two.width/2)-((two.width-20)/3),two.height-100+45)
txtDesignation.size = 18
txtMaterial = two.makeText(matText,(two.width/2)+((two.width-20)/3),two.height-100+45)
txtMaterial.size = 18

titleBlockLine = two.makeLine(10,two.height-100,two.width-10,two.height-100)



two.update()

}









function clearTitleBlockAndBorder(){
bkgr.remove()
sheetBorder.remove()
txtDesignation.remove()
txtMaterial.remove()
titleBlockField1.remove()
titleBlockField2.remove()
titleBlockField3.remove()
}


download.addEventListener("click", function() {
	
	createPDFLayout()
	
  // only jpeg is supported by jsPDF
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new jsPDF();

  pdf.addImage(imgData, 'JPEG', 0, 0);
  pdf.save("FLEX " + flexLength + "x" + flexWidth + "x" + flexThk + ".pdf");
  
  createWEBLayout()
  
}, false);










//create top of the terminal body
var flexBody
var contactSurface1
var contactSurface2




function createFlex() {
flexBody = two.makeRectangle(flexWidth/2+50,50+flexLength/2, flexWidth, flexLength);
flexBody.fill = flexColor;
flexBody.opacity = 1;
flexBody.stroke = outLineColor;
flexBody.linewidth = 1

contactSurface1 = two.makeRectangle(flexWidth/2+50,50+contactLength1/2, flexWidth, contactLength1);
contactSurface1.fill = flexColor;
contactSurface1.opacity = 1;
contactSurface1.stroke = outLineColor;
contactSurface1.linewidth = 1;

contactSurface2 = two.makeRectangle(flexWidth/2+50,flexLength-contactLength2/2+50, flexWidth, contactLength2);
contactSurface2.fill = flexColor;
contactSurface2.opacity = 1;
contactSurface2.stroke = outLineColor;
contactSurface2.linewidth = 1;

drawSideView()
}

function refreshFlex() {
	
	two.clear()
	flexBody.remove()
	contactSurface1.remove
	contactSurface2.remove

	createFlex()
	
	refreshSideView()
	refreshDimL()
	
	
}
createFlex()



var previewLine1
var previewLine2
var previewDim1
var previewDim2

function createPreviewOnPoint(inputX,inputY){
	
	var dimX
	var dimY

	
	
		
		if (document.getElementById("contactTop").checked) {
			dimX = inputX + 50;
			dimY = inputY + 50;
			previewLine1 = two.makeLine(contactSurface1.translation.x-contactSurface1.width/2-5,dimY,dimX+5,dimY);
			previewLine1.stroke = "lime";
			previewLine1.linewidth = 1
			previewDim1 = two.makeText((inputY),previewLine1.translation.x-previewLine1.length/2-5,dimY)
			previewDim1.stroke = "lime";
			previewLine2 = two.makeLine(dimX,dimY+5,dimX,contactSurface1.translation.y-contactSurface1.height/2-5)
			previewLine2.stroke = "lime";
			previewLine2.linewidth = 1
			previewDim2 = two.makeText((inputX),dimX,previewLine2.translation.y-previewLine2.length/2-5)
			previewDim2.stroke = "lime";
		}else{
			dimX = inputX + 50
			dimY = parseFloat(flexLength)-inputY + 50
			previewLine1 = two.makeLine(contactSurface2.translation.x-contactSurface2.width/2-5,dimY,dimX+5,dimY)
			previewLine1.stroke = "lime";
			previewLine1.linewidth = 1
			previewDim1 = two.makeText((inputY),previewLine1.translation.x-previewLine1.length/2-5,dimY)
			previewDim1.stroke = "lime";
			previewLine2 = two.makeLine(dimX,dimY-5,dimX,contactSurface2.translation.y+contactSurface2.height/2+5)
			previewLine2.stroke = "lime";
			previewLine2.linewidth = 1
			previewDim2 = two.makeText((inputX),dimX,previewLine2.translation.y+previewLine2.length/2+5)
			previewDim2.stroke = "lime";
		}
		

	
	
	two.update()
}


function createHolePreview() {
	if (document.getElementById("chkPreview").checked) {
	createPreviewOnPoint(parseFloat(document.getElementById("slotCenterX").value),parseFloat(document.getElementById("slotCenterY").value))
	}
}

function createPatternPreview() {
var patternFromEnd 
var patternWidth
var patternLength
var inputX
var inputY



patternFromEnd = document.getElementById("patternFromEnd").value
patternWidth = document.getElementById("patternWidth").value
patternLength = document.getElementById("patternLength").value
	
if (document.getElementById("chkPreview").checked) {
for (var i = 0; i < 2; i++) { 
inputY = parseFloat(patternFromEnd) + i*parseFloat(patternLength)
for (var j = 0; j < 2; j++)    { 
	inputX = parseFloat(flexWidth/2)-parseFloat(patternWidth/2)+ j*parseFloat(patternWidth) 
	createPreviewOnPoint(inputX,inputY)
} 
}
}

}
createPatternPreview()



//create dimensions
var dimExtLine1DimL
var dimExtLine2DimL
var dimLineDimL
var textDimL
var dimExtLine1DimL1
var dimLineDimL1
var textDimL1
var dimExtLine1DimL2
var dimLineDimL2
var textDimL2
var dimTHK
var dimTHKText
var dimLineWidth
var dimExtLineWidth1
var dimExtLineWidth2
var dimWidthText
function createDimL() {



//create dimension line for dimL
dimLineDimL = two.makeLine(parseFloat(flexWidth)+200,50,parseFloat(flexWidth)+200,parseFloat(flexLength)+50)
dimLineDimL.stroke = "black";
dimLineDimL.linewidth = 1
textDimL =  two.makeText("L = "+flexLength,dimLineDimL.translation.x+10,dimLineDimL.translation.y)
textDimL.rotation = -Math.PI/2
createDimArrow(dimLineDimL.translation.x,dimLineDimL.translation.y-dimLineDimL.length/2,0)
createDimArrow(dimLineDimL.translation.x,dimLineDimL.translation.y+dimLineDimL.length/2,180)

//create dimension extension lines for dimL
dimExtLine1DimL = two.makeLine(contactSurface1.translation.x+contactSurface1.width/2+5,dimLineDimL.translation.y-dimLineDimL.length/2,dimLineDimL.translation.x+5,dimLineDimL.translation.y-dimLineDimL.length/2)
dimExtLine1DimL.stroke = "black";
dimExtLine1DimL.linewidth = 1


dimExtLine2DimL = two.makeLine(contactSurface2.translation.x+contactSurface2.width/2,dimLineDimL.translation.y+dimLineDimL.length/2,dimLineDimL.translation.x+5,dimLineDimL.translation.y+dimLineDimL.length/2)
dimExtLine2DimL.stroke = "black";
dimExtLine1DimL.linewidth = 1



//create dimension line for dimL1
dimLineDimL1 = two.makeLine(dimLineDimL.translation.x-40,50,dimLineDimL.translation.x-40,parseFloat(contactLength1)+50)
dimLineDimL1.stroke = "black";
dimLineDimL1.linewidth = 1
textDimL1 =  two.makeText("L1 = "+contactLength1,dimLineDimL1.translation.x+10,dimLineDimL1.translation.y)
textDimL1.rotation = -Math.PI/2
createDimArrow(dimLineDimL1.translation.x,dimLineDimL1.translation.y-dimLineDimL1.length/2,0)
createDimArrow(dimLineDimL1.translation.x,dimLineDimL1.translation.y+dimLineDimL1.length/2,180)



//create dimension extension line for dimL1
dimExtLine1DimL1 = two.makeLine(contactSurface1.translation.x+contactSurface1.width/2+5,dimLineDimL1.translation.y+dimLineDimL1.length/2,dimLineDimL1.translation.x+5,dimLineDimL1.translation.y+dimLineDimL1.length/2)
dimExtLine1DimL1.stroke = "black";
dimExtLine1DimL1.linewidth = 1

//create dimension line for dimL2
dimLineDimL2 = two.makeLine(dimLineDimL1.translation.x,parseFloat(flexLength)+50,dimLineDimL1.translation.x,parseFloat(flexLength)-parseFloat(contactLength2)+50)
dimLineDimL2.stroke = "black";
dimLineDimL2.linewidth = 1
textDimL2 =  two.makeText("L2 = "+contactLength2,dimLineDimL2.translation.x+10,dimLineDimL2.translation.y)
textDimL2.rotation = -Math.PI/2
createDimArrow(dimLineDimL2.translation.x,dimLineDimL2.translation.y-dimLineDimL2.length/2,0)
createDimArrow(dimLineDimL2.translation.x,dimLineDimL2.translation.y+dimLineDimL2.length/2,180)



//create dimension extension line for dimL2
dimExtLine1DimL2 = two.makeLine(contactSurface2.translation.x+contactSurface2.width/2+5,dimLineDimL2.translation.y-dimLineDimL2.length/2,dimLineDimL2.translation.x+5,dimLineDimL2.translation.y-dimLineDimL2.length/2)
dimExtLine1DimL2.stroke = "black";
dimExtLine1DimL2.linewidth = 1


//create dimension line for width
dimLineWidth = two.makeLine(contactSurface2.translation.x-contactSurface2.width/2,contactSurface2.translation.y+contactSurface2.height/2+80,contactSurface2.translation.x+contactSurface2.width/2,contactSurface2.translation.y+contactSurface2.height/2+80)
dimLineWidth.stroke = "black";
dimLineWidth.linewidth = 1
dimWidthText = two.makeText("W= "+flexWidth,dimLineWidth.translation.x,dimLineWidth.translation.y+10)
createDimArrow(dimLineWidth.translation.x-dimLineWidth.length/2,dimLineWidth.translation.y,270)
createDimArrow(dimLineWidth.translation.x+dimLineWidth.length/2,dimLineWidth.translation.y,90)

//create dimension extension line for width
dimExtLineWidth1 = two.makeLine(dimLineWidth.translation.x-dimLineWidth.length/2,contactSurface2.translation.y+contactLength2/2+5,dimLineWidth.translation.x-dimLineWidth.length/2,dimLineWidth.translation.y+5)
dimExtLineWidth1.stroke = "black";
dimExtLineWidth1.linewidth = 1

dimExtLineWidth2 = two.makeLine(dimLineWidth.translation.x+dimLineWidth.length/2,contactSurface2.translation.y+contactLength2/2+5,dimLineWidth.translation.x+dimLineWidth.length/2,dimLineWidth.translation.y+5)
dimExtLineWidth2.stroke = "black";
dimExtLineWidth2.linewidth = 1

//create dimension line for flex thickness
dimTHK = two.makeLine(contactSurfaceTopLine.translation.x-parseFloat(flexThk)/2-5, contactSurfaceTopLine.translation.y,contactSurfaceTopLine.translation.x+parseFloat(flexThk)+20, contactSurfaceTopLine.translation.y)
dimTHKText = two.makeText(flexThk,dimTHK.translation.x+dimTHK.length/2-10,dimTHK.translation.y-10)
createDimArrow(contactSurfaceTopLine.translation.x-flexThk/2,dimTHK.translation.y,90)
createDimArrow(contactSurfaceTopLine.translation.x+flexThk/2,dimTHK.translation.y,270)



}



function refreshDimL() {
	
	dimExtLine1DimL.remove()
	dimExtLine2DimL.remove()
	dimLineDimL.remove()
	textDimL.remove()
	
	dimExtLine1DimL1.remove()
	dimLineDimL1.remove()
	textDimL1.remove()
	
	dimExtLine1DimL2.remove()
	dimLineDimL2.remove()
	textDimL2.remove()
	
	createDimL()
	two.update()
	
}
createDimL()


function createHoleDimension(inputX,inputY,width,length){
	var dimLine1
	var dimLine2
	var dimText
	var dimTextString
	var posX = parseFloat(inputX)+50
	var posY = parseFloat(inputY)+50
	if (width == length) {
		dimTextString = "⌀" + width
	}else{
		dimTextString = length + "x" + width
	}
	dimLine1 = two.makeLine(parseFloat(posX),parseFloat(posY),parseFloat(posX)+parseFloat(flexWidth)/2+15,parseFloat(posY)+parseFloat(contactLength1)/2)
	dimLine2 = two.makeLine(parseFloat(posX)+parseFloat(flexWidth)/2+15,parseFloat(posY)+parseFloat(contactLength1)/2,parseFloat(posX)+parseFloat(flexWidth)/2+50,parseFloat(posY)+parseFloat(contactLength1)/2)
	dimText = two.makeText(dimTextString,dimLine2.translation.x,dimLine2.translation.y-10)
	dimText.stroke = "red"

	

	two.update()
}

function createDimArrow(posX,posY,angle){
	
	var radius = 2
	var deg = parseFloat(angle)
	var rot = Math.PI/(180/deg)
	var ox = parseFloat(posX)-Math.sin(rot)*radius*2
	var oy = parseFloat(posY)+Math.cos(rot)*radius*2
	
	var triangle 
	triangle = two.makePolygon(ox, oy, radius, 3);
	triangle.fill = "black";
	triangle.rotation = rot;
	two.update()
}

function createTriangle(){


	var triangle 
	triangle = two.makePolygon(parseFloat(flexWidth)+50, 50, 2, 3);
	triangle.fill = "black";
	triangle.rotation = Math.PI/2;
	two.update()
}




var contactSurfaceTopLine
var contactSurfaceBottomLine
var arcSegment1
var arcSegment2
var arcSegment3
function drawSideView(){
	

contactSurfaceTopLine = two.makeLine(parseInt(flexWidth)+250,50,parseInt(flexWidth)+250,parseInt(contactLength1)+parseInt(50))
contactSurfaceTopLine.stroke = flexColor;
contactSurfaceTopLine.linewidth = flexThk;


contactSurfaceBottomLine = two.makeLine(contactSurfaceTopLine.translation.x,parseInt(flexLength)-parseInt(contactLength2)+parseInt(50),contactSurfaceTopLine.translation.x,parseInt(flexLength)+parseInt(50))
contactSurfaceBottomLine.stroke = flexColor;
contactSurfaceBottomLine.linewidth = flexThk;

var ox = (parseFloat(flexLength)-parseFloat(contactLength1)-parseFloat(contactLength2))/2 + contactSurfaceTopLine.translation.x
var oy = contactSurfaceTopLine.translation.y+contactSurfaceTopLine.length/2
var rad = (parseFloat(flexLength)-parseFloat(contactLength1)-parseFloat(contactLength2))/2
var sa = Math.PI
var ea = Math.PI-Math.PI/6

arcSegment1 = two.makeArcSegment(ox,oy,rad,rad,sa,ea)
arcSegment1.stroke = flexColor;
arcSegment1.linewidth = flexThk;

oy = oy + parseFloat(flexLength)-parseFloat(contactLength1)-parseFloat(contactLength2)
sa = Math.PI+Math.PI/6
ea = Math.PI
arcSegment3 = two.makeArcSegment(ox,oy,rad,rad,sa,ea)
arcSegment3.stroke = flexColor;
arcSegment3.linewidth = flexThk;

ox = contactSurfaceTopLine.translation.x - rad*(Math.sqrt(3) - 1) 
oy = (parseFloat(flexLength)-parseFloat(contactLength1)-parseFloat(contactLength2))/parseFloat(2)+parseFloat(contactLength1)+parseFloat(50)
sa = Math.PI/6
ea = -Math.PI/6
arcSegment2 = two.makeArcSegment(ox,oy,rad,rad,sa,ea)
arcSegment2.stroke = flexColor;
arcSegment2.linewidth = flexThk;




two.update()
}

function refreshSideView() {
	
	contactSurfaceBottomLine.remove()
	contactSurfaceTopLine.remove()
	arcSegment1.remove()
	arcSegment2.remove()
	arcSegment3.remove()
	
	drawSideView()
}





	


function createSlot(slX,slY,width,length,vertical,slP){
	
var slot 


if (slP == "bottom") {
	slXgraphic = slX+parseInt(50)
	slYgraphic = parseInt(flexLength)-slY+parseInt(50)		
} else {
	slXgraphic = slX+parseInt(50)
	slYgraphic = slY+parseInt(50)
}	


if (vertical)  {
slot = two.makeRoundedRectangle(slXgraphic,slYgraphic,width,length,width/2)
} else {
	slot = two.makeRoundedRectangle(slXgraphic,slYgraphic,length,width,width/2)
}

slot.stroke = "white";

	
	
	
	




var dimLineV
var dimTextV
var dimLineH
var dimTextH

dimLineH = two.makeLine(slXgraphic+5,slYgraphic,45,slYgraphic)
dimTextH =  two.makeText(slY,40,slYgraphic)


if (slP == "bottom") {
	dimTextV = two.makeText(slX,slXgraphic,contactSurface2.translation.y+contactSurface2.height/2+10)
	dimLineV = two.makeLine(slXgraphic,slYgraphic-5,slXgraphic,contactSurface2.translation.y+contactSurface2.height/2+5)
} else {
	dimLineV = two.makeLine(slXgraphic,slYgraphic+5,slXgraphic,45)
	dimTextV = two.makeText(slX,slXgraphic,40)
}	






two.update()
}


//create function to refresh the entire view
function refreshView() {
refreshFlex()
//two.width = flexWidth+200
//two.height = flexLength+100

//two.update()

}

//create function to get input data and refresh the entire view
function getInputAndRefreshView() {
getInputData()
refreshView()
updatemd5()
}


// render everything to the screen
two.update();


function coatingColoring() {
flexClr();

	flexBody.fill = flexColor;
	contactSurface1.fill = flexColor;	
	contactSurface2.fill = flexColor;
	contactSurfaceTopLine.stroke = flexColor;
	contactSurfaceBottomLine.stroke = flexColor;	
	arcSegment1.stroke = flexColor;
	arcSegment2.stroke = flexColor;
	arcSegment3.stroke = flexColor;

updatemd5()
two.update()
}



function updatemd5(){
var holeListSorted = [...holeList]
holeListSorted.sort();

var FL = document.getElementById("flexLength").value
var FW = document.getElementById("flexWidth").value
var CL1 = document.getElementById("contactLength1").value
var CL2 = document.getElementById("contactLength2").value
var FT = document.getElementById("flexThk").value
var mat 
if (document.getElementById("coatingTinplated").checked == true) {
	mat = "tin"
}else{
	if (document.getElementById("coatingSilverplated").checked == true){
		mat = "sil"
	}else{
		mat = "cop"
	}
}
	
var sourceString = FL + FW + CL1 + CL2 + FT + mat

for (var i = 0; i < holeListSorted.length; i++) { 
    for (var j = 0; j < 6; j++)    { 
        sourceString = sourceString + holeListSorted[i][j]  
    } 
}

var md5gen = hex_md5(sourceString)

document.getElementById("md5").value = md5gen
}


function updateHoles(){
two.clear();
getInputAndRefreshView(); 
createHolesFromList();	
updatemd5();
}

updatemd5();

document.getElementById("contactLength1").onchange = function() {

	updatePreview()
	//getInputAndRefreshView() 
}

document.getElementById("contactLength2").onchange = function() {
	updatePreview()
	//getInputAndRefreshView() 
}

document.getElementById("flexLength").onchange = function() {
	updatePreview()
	//getInputAndRefreshView() 
}

document.getElementById("flexWidth").onchange = function() {
	
	updatePreview()
	//getInputAndRefreshView() 
	
}

document.getElementById("flexThk").onchange = function() {
	
	updatePreview()
	//getInputAndRefreshView() 

}

document.getElementById("coatingTinplated").onclick = function() {
coatingColoring()

}

document.getElementById("coatingSilverplated").onclick = function() {
coatingColoring()

}


document.getElementById("coatingBlank").onclick = function() {

coatingColoring()
}


document.getElementById("slotCenterX").onchange = function() {

updateHoles()
createHolePreview()
}



document.getElementById("slotCenterY").onchange = function() {

updateHoles()
createHolePreview()
}






document.getElementById("patternLength").onchange = function() {

updateHoles()
createPatternPreview()
}

document.getElementById("patternWidth").onchange = function() {
updateHoles()
createPatternPreview()
}

document.getElementById("patternFromEnd").onchange = function() {
updateHoles()
createPatternPreview()
}

function updatePreview() {
createWEBLayout()
if (document.getElementById("individualHoles").style.display == "block") {
createHolePreview()
}
if (document.getElementById("patternedHoles").style.display == "block") {
createPatternPreview()

}	

}


document.getElementById("chkPreview").onchange = function() {

updatePreview()

}


document.getElementById("contactTop").onchange = function() {
updatePreview()
}

document.getElementById("contactBottom").onchange = function() {

updatePreview()
}




document.getElementById("addSlot").onclick = function() {
	
var slW
var slL
var slO
var slP
var slX
var slY

slW = document.getElementById("slotWidth").value
slL = document.getElementById("slotLength").value
if(document.getElementById("slotVertical").checked == true) {
slO = "vertical";
}else{
slO = "horizontal";
}	
if(document.getElementById("contactTop").checked == true) {
slP = "top";
}else{
slP = "bottom";
}	

slX = document.getElementById("slotCenterX").value
slY = document.getElementById("slotCenterY").value


var holeParams = [slW, slL, slO, slP, slX, slY, "p0"];
holeList.push(holeParams);
updateHoles()





}



document.getElementById("addPatternedSlot").onclick = function() {
	
var slW
var slL
var slO
var slP
var slX
var slY
var patternFromEnd 
var patternWidth
var patternLength


patternFromEnd = document.getElementById("patternFromEnd").value
patternWidth = document.getElementById("patternWidth").value
patternLength = document.getElementById("patternLength").value

slW = document.getElementById("slotWidth").value
slL = document.getElementById("slotLength").value
if(document.getElementById("slotVertical").checked == true) {
slO = "vertical";
}else{
slO = "horizontal";
}	
if(document.getElementById("contactTop").checked == true) {
slP = "top";
}else{
slP = "bottom";
}	

var k
for (var i = 0; i < 2; i++) { 
    slY = parseFloat(patternFromEnd) + i*parseFloat(patternLength)
	for (var j = 0; j < 2; j++)    { 
        k = i + j + 1
		slX = parseFloat(flexWidth/2)-parseFloat(patternWidth/2)+ j*parseFloat(patternWidth) 
		var holeParams = [slW, slL, slO, slP, slX, slY, "p"+k];
		holeList.push(holeParams);
		updateHoles()
    } 
}




}

document.getElementById("addPatternedHole").onclick = function() {
	
var slW
var slL
var slO
var slP
var slX
var slY
var patternFromEnd 
var patternWidth
var patternLength


patternFromEnd = document.getElementById("patternFromEnd").value
patternWidth = document.getElementById("patternWidth").value
patternLength = document.getElementById("patternLength").value

slW = document.getElementById("holeDia").value
slL = document.getElementById("holeDia").value
if(document.getElementById("slotVertical").checked == true) {
slO = "vertical";
}else{
slO = "horizontal";
}	
if(document.getElementById("contactTop").checked == true) {
slP = "top";
}else{
slP = "bottom";
}	

var k 
for (var i = 0; i < 2; i++) { 
    slY = parseFloat(patternFromEnd) + i*parseFloat(patternLength)
	for (var j = 0; j < 2; j++)    { 
        k = i+j+1
		slX = parseFloat(flexWidth/2)-parseFloat(patternWidth/2)+ j*parseFloat(patternWidth) 
		var holeParams = [slW, slL, slO, slP, slX, slY, "p"+k];
		holeList.push(holeParams);
		updateHoles()
    } 
}






}


document.getElementById("addHole").onclick = function() {

var slW
var slL
var slO
var slP
var slX
var slY

slW = document.getElementById("holeDia").value
slL = document.getElementById("holeDia").value
if(document.getElementById("slotVertical").checked == true) {
slO = "vertical";
}else{
slO = "horizontal";
}	
if(document.getElementById("contactTop").checked == true) {
slP = "top";
}else{
slP = "bottom";
}	
slX = document.getElementById("slotCenterX").value
slY = document.getElementById("slotCenterY").value


var holeParams = [slW, slL, slO, slP, slX, slY, "p0"];
holeList.push(holeParams);
updateHoles()




}

/*
document.getElementById("addSlotBottom").onclick = function() {

var slW
var slL
var slO
var slP
var slX
var slY

slW = document.getElementById("slotWidth").value
slL = document.getElementById("slotLength").value
if(document.getElementById("slotVertical").checked == true) {
slO = "vertical";
}else{
slO = "horizontal";
}	
slP = "bottom"
slX = document.getElementById("slotCenterXBottom").value
slY = document.getElementById("slotCenterYBottom").value


var holeParams = [slW, slL, slO, slP, slX, slY];
holeList.push(holeParams);
updateHoles()

}


document.getElementById("addHoleBottom").onclick = function() {

var slW
var slL
var slO
var slP
var slX
var slY

slW = document.getElementById("holeDia").value
slL = document.getElementById("holeDia").value
if(document.getElementById("slotVertical").checked == true) {
slO = "vertical";
}else{
slO = "horizontal";
}	
slP = "bottom"
slX = document.getElementById("slotCenterXBottom").value
slY = document.getElementById("slotCenterYBottom").value


var holeParams = [slW, slL, slO, slP, slX, slY];
holeList.push(holeParams);
updateHoles()

}
*/
function createHolesFromList() {
var slW
var slL	
var slO	
var slP
var slX
var slXgraphic
var slY
var slYgraphic

for (var i = 0; i < holeList.length; i++)    { 
		
		slW = parseFloat(holeList[i][0])
		
		slL = parseFloat(holeList[i][1])
		
		slP = holeList[i][3]
		slX = parseFloat(holeList[i][4])
		slY = parseFloat(holeList[i][5])
		if (holeList[i][2] == "vertical") {
			slO = true
		
		} else {
			slO = false
	
		}


		var dimPosX
		var dimPosY

		if(slP == "top") {
			dimPosX = slX
			dimPosY = slY
		}else{
			dimPosX = slX
			dimPosY = parseFloat(flexLength) - parseFloat(slY)
		}	


  
		createSlot(slX,slY,slW,slL,slO,slP)
		if (holeList[i][6] == "p0" || holeList[i][6] == "p3"){
			createHoleDimension(dimPosX,dimPosY,slW,slL)
		}
    } 
}	



document.getElementById("btnUndo").onclick = function() {

holeList.length = holeList.length-1;

updateHoles();


}

document.getElementById("btnUndoPattern").onclick = function() {

holeList.length = holeList.length-4;

updateHoles();


}


document.getElementById("md5").onclick = function() {

var md5text = document.getElementById("md5").value
copyToClipboard(md5text)
window.alert("MD5 hash copied to clipboard \n" + md5text)


}

function hideDivs() {
document.getElementById("flexDimensionsDiv").style.display = "none";
document.getElementById("materialDiv").style.display = "none";
document.getElementById("individualHoles").style.display = "none";
document.getElementById("holeParameters").style.display = "none";
}
hideDivs()

function copyToClipboard(text) {
var dummy = document.createElement("textarea");
// to avoid breaking orgain page when copying more words
// cant copy when adding below this code
// dummy.style.display = 'none'
document.body.appendChild(dummy);
//Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
dummy.value = text;
dummy.select();
document.execCommand("copy");
document.body.removeChild(dummy);
}


