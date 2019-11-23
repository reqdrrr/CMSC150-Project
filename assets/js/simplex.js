simplex()
//add event listeners
document.getElementById('c11').addEventListener("input",function() {
    console.log(document.getElementById('c11').innerHTML)
    simplex()
},false)
document.getElementById('c12').addEventListener("input",function() {
    console.log(document.getElementById('c12').innerHTML)
    simplex()
},false)
document.getElementById('c13').addEventListener("input",function() {
    console.log(document.getElementById('c13').innerHTML)
    simplex()
},false)
document.getElementById('c14').addEventListener("input",function() {
    console.log(document.getElementById('c14').innerHTML)
    simplex()
},false)
document.getElementById('c15').addEventListener("input",function() {
    console.log(document.getElementById('c15').innerHTML)
    simplex()
},false)
document.getElementById('c16').addEventListener("input",function() {
    console.log(document.getElementById('c16').innerHTML)
    simplex()
},false)
document.getElementById('c21').addEventListener("input",function() {
    console.log(document.getElementById('c21').innerHTML) 
    simplex() 
},false)
document.getElementById('c22').addEventListener("input",function() {
    console.log(document.getElementById('c22').innerHTML)
    simplex()
},false)
document.getElementById('c23').addEventListener("input",function() {
    console.log(document.getElementById('c23').innerHTML)
    simplex()
},false)
document.getElementById('c24').addEventListener("input",function() {
    console.log(document.getElementById('c24').innerHTML)
    simplex()
},false)
document.getElementById('c25').addEventListener("input",function() {
    console.log(document.getElementById('c25').innerHTML)
    simplex()
},false)
document.getElementById('c26').addEventListener("input",function() {
    console.log(document.getElementById('c26').innerHTML)
    simplex()
},false)
document.getElementById('c31').addEventListener("input",function() {
    console.log(document.getElementById('c31').innerHTML)
    simplex()
},false)
document.getElementById('c32').addEventListener("input",function() {
    console.log(document.getElementById('c32').innerHTML)
    simplex()
},false)
document.getElementById('c33').addEventListener("input",function() {
    console.log(document.getElementById('c33').innerHTML)
    simplex()
},false)
document.getElementById('c34').addEventListener("input",function() {
    console.log(document.getElementById('c34').innerHTML)
    simplex()
},false)
document.getElementById('c35').addEventListener("input",function() {
    console.log(document.getElementById('c35').innerHTML)
    simplex()
},false)
document.getElementById('c36').addEventListener("input",function() {
    console.log(document.getElementById('c36').innerHTML)
    simplex()
},false)


function findPivotColumn(Z) {
  var location = 0
  var min = Z[0]

  for(var i=1;i<Z.length-1;i++) {
    if(Z[i]<min) {
      min = Z[i]
      location = i
    }
  }
  return location
}

function solveTR(m,nrow,RHS,pivot_column) {
  var TR = [0,0,0,0,0,0,0,0]
  for(var i=0;i<nrow-1;i++) {
    if(m[i][pivot_column]!=0) {
      TR[i] = m[i][RHS]/m[i][pivot_column]
    }
  }
  return TR
}

function findPivotRow(TR) {
  var location
  var min = -1

  for(var i=0;i<TR.length;i++) {
    //set initial min
    if(TR[i]>0 && min==-1) {
      min = TR[i]
      location = i
    }
    //update min
    if(TR[i]<min && TR[i]>0) {
      min = TR[i]
      location = i
    }
  }
  return location
}

function GaussJordan(a,nrow,ncol,pr,pc) {
  var i,j,normalized_row;

  div = a[pr][pc]
  for(j=0;j<ncol;j++) {
    a[pr][j] = a[pr][j]/div
  }

  for(i=0;i<nrow;i++) {
    if(i!=pr) {
      var mult = a[i][pc]/a[pr][pc]
      for(j=0;j<ncol;j++){
        normalized_row = mult*a[pr][j]
        a[i][j] = a[i][j] - normalized_row
      }
    }
  }

  return a;
}

function checkZ(m,nrow,ncol) {
  var neg = 0;
  for(var i=0;i<ncol;i++) {
    if(m[nrow][i]<0) {
      neg=1
      break; 
    }
  }
  return neg
}

function simplex() {
  //read input from document
  c11 = Number(document.getElementById('c11').innerHTML)
  c12 = Number(document.getElementById('c12').innerHTML)
  c13 = Number(document.getElementById('c13').innerHTML)
  c14 = Number(document.getElementById('c14').innerHTML)
  c15 = Number(document.getElementById('c15').innerHTML)
  c16 = Number(document.getElementById('c16').innerHTML)

  c21 = Number(document.getElementById('c21').innerHTML)
  c22 = Number(document.getElementById('c22').innerHTML)
  c23 = Number(document.getElementById('c23').innerHTML)
  c24 = Number(document.getElementById('c24').innerHTML)
  c25 = Number(document.getElementById('c25').innerHTML)
  c26 = Number(document.getElementById('c26').innerHTML)

  c31 = Number(document.getElementById('c31').innerHTML)
  c32 = Number(document.getElementById('c32').innerHTML)
  c33 = Number(document.getElementById('c33').innerHTML)
  c34 = Number(document.getElementById('c34').innerHTML)
  c35 = Number(document.getElementById('c35').innerHTML)
  c36 = Number(document.getElementById('c36').innerHTML)

  c41 = Number(document.getElementById('c41').innerHTML)
  c42 = Number(document.getElementById('c42').innerHTML)
  c43 = Number(document.getElementById('c43').innerHTML)
  c44 = Number(document.getElementById('c44').innerHTML)
  c45 = Number(document.getElementById('c45').innerHTML)

  //initialize max, # of iterations 
  var max = 5
  var i = 2
  //initialize array: Z[], TR[], m[][], m size: nrow ncol
  var TR;
  //x1,y1,z1,x2,y2,z2...
  var Z = [c11,c21,c31,c12,c22,c32,c13,c23,c33,c14,c24,c34,c15,c25,c35,0,0,0,0,0,0,0,0,1,0]
  var m = [[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,c16],
           [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,c26],
           [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,c36],
           [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,c41],
           [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,c42],
           [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,c43],
           [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,-1,0,0,c44],
           [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,c45],
           Z]
  var nrow = 9
  var ncol = 25

  m = GaussJordan(m,nrow,ncol,0,0)
  while(checkZ(m,nrow-1,ncol)==1 && i<max) {
    Z = m[8]
    pc = findPivotColumn(Z)
    TR=solveTR(m,nrow,ncol-1,pc)
    pr = findPivotRow(TR)
    m = GaussJordan(m,nrow,ncol,pr,pc)
    i++
  }
  console.log(m)
  cost = m[nrow-1][ncol-1]

  //print output to document
  document.getElementById('output').innerHTML = -cost
}