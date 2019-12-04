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
    spline(lines)
}


function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert("Canno't read file !");
  }
}
// ----------------------------

function test() {
  getAsText(document.getElementById('inputFile').files[0])
}

function findRow(arr,val) {
  for(j=i;j<arr.length;j++) {
    if(arr[j]==val) return j;
  }
}

function GaussJordan(a,n) {
  var j,k,l;

  for(i=0;i<n;i++) {
    // find pivot row
    var col = new Array(n);
    for(j=i;j<=n;j++) {
      col[j] = a[i][j];
    }
    var pivot_row_val = Math.max.apply(null, col.map(Math.abs));
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

function spline(lines) {
  var i,j
  //get params
  var x = lines.map(function(value,index) { return value[0]; })
  var y = lines.map(function(value,index) { return value[1]; })
  var n = x.length - 1
  var f = Number(document.getElementById('inputEstimate').value);

  //init matrix
  var m = Array.from(Array(3*n), () => new Array(3*n+1));
  for(i=0;i<3*n;i++) {
    for(j=0;j<=3*n;j++) {
      m[i][j] = 0
    }
  }
  //build matrix
  for(i=0;i<2*n;i+=2) {
    for(j=0;j<3;j++) {
      if(j==0) {
        m[i][i + i/2] = Math.pow(x[i/2],2)
        m[i+1][i + i/2] = Math.pow(x[i/2+1],2) 
      }
      else if(j==1) {
        m[i][i + i/2 + 1] = x[i/2]
        m[i+1][i + i/2 + 1] = x[i/2+1] 
      }
      else {
        m[i][i + i/2 + 2] = 1
        m[i+1][i + i/2 + 2] = 1 
      }
    }
  }
  for(i=0;i<2*n;i+=2) {
    m[i][3*n] = y[i/2]
    m[i+1][3*n] = y[i/2]
  }
  for(i=1;i<n;i++) {
    m[i+2*n-1][3*(i-1)] = 2*x[i]
    m[i+2*n-1][3*(i-1)+1] = 1
    m[i+2*n-1][3*i] = -2*x[i]
    m[i+2*n-1][3*i+1] = -1
  }
  m[3*n-1][0] = 1

  // m = GaussJordan(m,n)
  console.log(m)

  for (i=0;i<3*n;i++) { 
    for (j=0;j<3*n;j++)    { 
        document.getElementById('outputInterpolation').innerHTML += m[i][j] + " "; 
    }
    document.getElementById('outputInterpolation').innerHTML += "<br>";
  } 
}