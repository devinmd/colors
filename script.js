
var list = document.getElementById('list');

var incr = 10;

var pasthex = []

var shadess = 5

document.getElementById('incrslide').oninput = function() {
	incr = this.value;
    document.getElementById('incrdisplay').innerHTML = 'Contrast: ' + incr
	regenColor()
}

document.getElementById('shadeslide').oninput = function() {

    if(this.value == 1){
        shadess = 1
    }else if(this.value == 2){
        shadess = 3;
    }else if(this.value == 3){
        shadess = 5
    }else if(this.value == 4){
        shadess = 7
    }else if(this.value == 5){
        shadess = 9;
    }else if(this.value == 6){
        shadess = 11
    }else if(this.value == 7){
        shadess = 13;
    }else if(this.value == 8){
        shadess = 15;
    }    

    document.getElementById('shadedisplay').innerHTML = 'Shades: ' + shadess
	regenColor()
}

// generating brand new colors
function genColor(){
	pasthex = []
	list.innerHTML = ''
	for(var i = 0; i < 5; i++){
		createLI(shadess, getColor())
	}
}

// regenerating shades with same colors (changing shade incr or shade amount)
function regenColor(){
	list.innerHTML = ''
	for(var i = 0; i < 5; i++){
		createLI(shadess, pasthex[i])
	}
}

function createLI(shades, hex){

	pasthex.push(hex) // saving past hex values

	var element = document.createElement('li');

    var colors = []

    // generating shades
        
    ld = Math.round(shades/2) - 1

    for(var i = ld; i > 0; i-=1){
        //colors.push(tinycolor(tinycolor(hex).brighten(incr * i).toString()).desaturate(incr * i).toString())
        colors.push(tinycolor(hex).brighten(incr * i).toString())
    }

    colors.push(hex)

    for(var i = 1; i < ld+1; i++){
        //colors.push(tinycolor(tinycolor(hex).darken(incr * i).toString()).saturate(incr * i).toString())
        colors.push(tinycolor(hex).darken(incr * i).toString())
    }

    // creating a div for each shade and changing attributes of it
	for(var i = 0; i < shades; i++){

		var shadeBox = document.createElement("div");

        console.log(Math.round(shades/2-1))

        if(tinycolor(colors[i]).isLight() && i != Math.round(shades/2-1)){
            shadeBox.id = 'shadeL'
        }else if(i != Math.round(shades/2-1)){
            shadeBox.id = 'shadeD'
        }else if(tinycolor(colors[i]).isLight()){
            shadeBox.id = 'mainShadeL'
        }else{
            shadeBox.id = 'mainShadeD'
        }

		shadeBox.style.backgroundColor = colors[i]


        var shadeText = document.createElement('h3')
		shadeText.append(document.createTextNode(colors[i].replace('#', '').toUpperCase()));

		shadeBox.append(shadeText)
		element.append(shadeBox)
		
	}

    // buttons below colors

    var options = document.createElement('div')
    options.id = 'colorOptions'

    var lockBtn = document.createElement('button');
    lockBtn.id = 'lockBtn'
    lockBtn.className = 'colorLockBtn'
    lockBtn.innerHTML = 'Lock'
    lockBtn.onclick = 'this.innerHTML = "none"'

    var regenBtn = document.createElement('button');
    regenBtn.id = 'regenBtn'
    regenBtn.innerHTML = 'Re-Roll'

    var saveBtn = document.createElement('button')
    saveBtn.id = 'saveBtn'
    saveBtn.innerHTML = 'Save'

    options.append(lockBtn)
    options.append(regenBtn)
    options.append(saveBtn)

    element.append(options);
    
    list.append(element);

}


// generate new colors on spacebar
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        genColor()
    }
}














function getColor(){

    var hexA = []

    var rgb = [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]

    for(var i = 0; i < 3; i++){

        hexA[i] = rgb[i].toString(16)

        if(rgb[i] < 16){
            hexA[i] = '0' + hexA[i].toString()
        }
    }

    var hex = '#' + hexA.toString().replaceAll(' ','').replaceAll(',', '')

    return(hex);
}