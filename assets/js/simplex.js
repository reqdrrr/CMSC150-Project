//add event listeners
document.getElementById('c11').addEventListener("input",function() {
    console.log(document.getElementById('c11').innerHTML) 
},false)
document.getElementById('c12').addEventListener("input",function() {
    console.log(document.getElementById('c12').innerHTML)
},false)
document.getElementById('c13').addEventListener("input",function() {
    console.log(document.getElementById('c13').innerHTML)
},false)
document.getElementById('c14').addEventListener("input",function() {
    console.log(document.getElementById('c14').innerHTML)
},false)
document.getElementById('c15').addEventListener("input",function() {
    console.log(document.getElementById('c15').innerHTML)
},false)
document.getElementById('c16').addEventListener("input",function() {
    console.log(document.getElementById('c16').innerHTML)
},false)
document.getElementById('c21').addEventListener("input",function() {
    console.log(document.getElementById('c21').innerHTML)  
},false)
document.getElementById('c22').addEventListener("input",function() {
    console.log(document.getElementById('c22').innerHTML)
},false)
document.getElementById('c23').addEventListener("input",function() {
    console.log(document.getElementById('c23').innerHTML)
},false)
document.getElementById('c24').addEventListener("input",function() {
    console.log(document.getElementById('c24').innerHTML)
},false)
document.getElementById('c25').addEventListener("input",function() {
    console.log(document.getElementById('c25').innerHTML)
},false)
document.getElementById('c26').addEventListener("input",function() {
    console.log(document.getElementById('c26').innerHTML)
},false)
document.getElementById('c31').addEventListener("input",function() {
    console.log(document.getElementById('c31').innerHTML)
},false)
document.getElementById('c32').addEventListener("input",function() {
    console.log(document.getElementById('c32').innerHTML)
},false)
document.getElementById('c33').addEventListener("input",function() {
    console.log(document.getElementById('c33').innerHTML)
},false)
document.getElementById('c34').addEventListener("input",function() {
    console.log(document.getElementById('c34').innerHTML)
},false)
document.getElementById('c35').addEventListener("input",function() {
    console.log(document.getElementById('c35').innerHTML)
},false)
document.getElementById('c36').addEventListener("input",function() {
    console.log(document.getElementById('c36').innerHTML)
},false)


function findPivotColumn(Z) {
  var location = 0
  var min = Z[0]

  for(var i=1;i<Z.length;i++) {
    if(Z[i]<min) {
      min = Z[i]
      location = i
    }
  }
  return location
}

function solveTR(m,nrow,RHS,pivot_column) {
  for(var i=0;i<nrow;i++) {
    if(m[i][pivot_column]!=0) {
      TR[i] = m[i][RHS]/m[i][pivot_column]
    }
  }
  return TR
}

function findPivotRow(TR) {
  var location = 0
  var min = TR[0]

  for(var i=1;i<TR.length;i++) {
    if(TR[i]) {
      if(TR[i]<min) {
        min = TR[i]
        location = i
      }
    }
  }
  return location
}

function GaussJordan(a,n,pivot_row) {
  var i,j,k,l;

  for(i=0;i<n;i++) {
    // swap
    var temp = a[pivot_row]
		for(k=0;k<temp.length;k++) {
			[a[pivot_row][k],a[i][k]]=[a[i][k],a[pivot_row][k]]
		}
    if(a[pivot_row][i] == 0) {break;}

    var div = a[i][i] 
    for(k=0;k<n+1;k++) {
    	a[i][k] = a[i][k]/div;
    }
    
    var normalized_row;
    for(j=0;j<=n;j++){
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

function checkZ(m,nrow,ncol) {
  var neg = 0;
  for(var i=0;i<ncol;i++) {
    if(m[i][nrow-1]<0) neg=1
  }
  return neg
}

function simplex() {
  //read input from document
  c11 = document.getElementById('c11').innerHTML
  c12 = document.getElementById('c12').innerHTML
  c13 = document.getElementById('c13').innerHTML
  c14 = document.getElementById('c14').innerHTML
  c15 = document.getElementById('c15').innerHTML
  c16 = document.getElementById('c16').innerHTML

  c21 = document.getElementById('c21').innerHTML
  c22 = document.getElementById('c22').innerHTML
  c23 = document.getElementById('c23').innerHTML
  c24 = document.getElementById('c24').innerHTML
  c25 = document.getElementById('c25').innerHTML
  c26 = document.getElementById('c26').innerHTML

  c31 = document.getElementById('c31').innerHTML
  c32 = document.getElementById('c32').innerHTML
  c33 = document.getElementById('c33').innerHTML
  c34 = document.getElementById('c34').innerHTML
  c35 = document.getElementById('c35').innerHTML
  c36 = document.getElementById('c36').innerHTML

  c41 = document.getElementById('c41').innerHTML
  c42 = document.getElementById('c42').innerHTML
  c43 = document.getElementById('c43').innerHTML
  c44 = document.getElementById('c44').innerHTML
  c45 = document.getElementById('c45').innerHTML

  //initialize array: Z[], TR[], m[][]
  //initialize m size: nrow, ncol
  //initialize max # of iterations 

  var i = 0
  var TR;
  while(checkZ(m,nrow,ncol) && i<max) {
    pc = findPivotColumn(Z)
    TR=solveTR(m,nrow,ncol-1,pc)
    pr = findPivotRow(TR)
    m = GaussJordan(m,nrow-1,pr)
  }


  //print output to document
  //document.getElementById('output').innerHTML = cost
}