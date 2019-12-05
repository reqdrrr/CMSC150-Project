// FOR FILE READING -----------
function getAsText(fileToRead) {
  var reader = new FileReader();
  // Read file into memory as UTF-8      
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    // var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=0; i<allTextLines.length-1; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(parseFloat(data[j]));
            }
            lines.push(tarr);
    }
    // alert(lines);
    console.log(lines)
    PolynomialRegression(lines)
}


function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert("Canno't read file !");
  }
}
// ----------------------------

// FOR POLYNOMIAL REGRESSION --
function GaussJordan(m,row) {
  var a = m;
  var n = row+1;
  var j,k,l;

  for(i=0;i<n;i++) {
    // find pivot row
    var col = new Array(n);
    for(j=i;j<=n;j++) {
    	col[j] = a[i][j];
    }
    var pivot_row_val = Math.max.apply(null, col.map(Math.abs));
    function findRow(arr,val) {
    	for(j=i;j<arr.length;j++) {
    		if(arr[j]==val) return j;
    	}
    }
    var pivot_row = findRow(col,pivot_row_val)

    // swap
    if(pivot_row>=0 && n!=3){
    	var temp = a[pivot_row];
			for(k=0;k<temp.length;k++) {
				[a[pivot_row][k],a[i][k]]=[a[i][k],a[pivot_row][k]]
			}
      if(a[pivot_row][i] == 0) {break;}
    }

    var div = a[i][i] 
    for(k=0;k<n+1;k++) {
    	a[i][k] = a[i][k]/div;
    }
    
    var normalized_row;
    for(j=0;j<n;j++){
      if(i!=j) {
      	var mult = a[j][i]
      	for(var k=0;k<=n;k++) {
			   	normalized_row = mult*a[i][k];
			   	a[j][k] = a[j][k] - normalized_row;
			  }
      }
    }

  }
  return a;
}

function mat(x,exp) {
	var sum=0;
	for(var i=0;i<x.length;i++) {
		sum += Math.pow(x[i],exp);
	}
	return sum;
}

function rhs(x,y,i) {
	var sum=0;
	for(var j=0;j<x.length;j++) {
		sum+=y[j]*Math.pow(x[j],i);
	}
	return sum;
}

function test() {
  getAsText(document.getElementById('inputFile').files[0])
}

function PolynomialRegression(lines) {
	//get params
  var x = lines.map(function(value,index) { return value[0]; })
  var y = lines.map(function(value,index) { return value[1]; })
	var deg = Number(document.getElementById('inputDegree').value);

  if(deg+1>x.length) {
    console.log("Error")
    var doc = document.getElementById("outputRegression")
    //clear child
    for(var j=doc.children.length-1;j>=0;j--) {
      doc.removeChild(doc.children[j]);
    }
    var node = document.createElement("H6");
    var textNode = document.createTextNode("NOPE");
    node.appendChild(textNode);
    document.getElementById("outputRegression").appendChild(node);
  } 
  else{
    // initialize matrix
    var m = Array.from(Array(deg+1), () => new Array(deg+2));
    
    // update values of matrix
    var exp;
    for(var i=0;i<=deg;i++) {
    	for(var j=0;j<=deg;j++) {
    		exp = i+j;
    		m[i][j] = mat(x,exp);
    	}
    	//update rhs
    	m[i][deg+1] = rhs(x,y,i);
    }
    
    // perform gauss-jordan
    m = GaussJordan(m,deg);

    //get RHS
    var col = "f(x) =";
    for(var j=0;j<deg+1;j++) {
      if(j<deg) col = col + " " + m[j][deg+1].toFixed(4) + "x^" + (deg-j) + " + ";
      else col = col + " " + m[j][deg+1].toFixed(4) + "x^" + (deg-j);
    }

    //solve for f(x)
    var x = Number(document.getElementById('inputEstimate').value);
    var sum = 0;
    for(var j=0;j<deg+1;j++) {
      sum += m[j][deg+1]*(x**(deg-j));
    }
    
    //clear child
    var doc = document.getElementById("outputRegression")
    for(var j=doc.children.length-1;j>=0;j--) {
      doc.removeChild(doc.children[j]);
    }

    //add function
    var node = document.createElement("H6");
    var textNode = document.createTextNode(col);
    node.appendChild(textNode);
    document.getElementById("outputRegression").appendChild(node);
    //add estimated value
    node = document.createElement("H6");
    textNode = document.createTextNode("f(" + x + ") = " + sum.toFixed(4));
    node.appendChild(textNode);
    document.getElementById("outputRegression").appendChild(node);
  }
}
// ----------------------------
