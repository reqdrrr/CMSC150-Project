simplex()
//add event listeners
document.getElementById('x1').addEventListener("input",function() {
    console.log(document.getElementById('x1').innerHTML)
    simplex()
},false)
document.getElementById('x2').addEventListener("input",function() {
    console.log(document.getElementById('x2').innerHTML)
    simplex()
},false)
document.getElementById('x3').addEventListener("input",function() {
    console.log(document.getElementById('x3').innerHTML)
    simplex()
},false)
document.getElementById('x4').addEventListener("input",function() {
    console.log(document.getElementById('x4').innerHTML)
    simplex()
},false)
document.getElementById('x5').addEventListener("input",function() {
    console.log(document.getElementById('x5').innerHTML)
    simplex()
},false)
document.getElementById('y1').addEventListener("input",function() {
    console.log(document.getElementById('y1').innerHTML) 
    simplex() 
},false)
document.getElementById('y2').addEventListener("input",function() {
    console.log(document.getElementById('y2').innerHTML)
    simplex()
},false)
document.getElementById('y3').addEventListener("input",function() {
    console.log(document.getElementById('y3').innerHTML)
    simplex()
},false)
document.getElementById('y4').addEventListener("input",function() {
    console.log(document.getElementById('y4').innerHTML)
    simplex()
},false)
document.getElementById('y5').addEventListener("input",function() {
    console.log(document.getElementById('y5').innerHTML)
    simplex()
},false)
document.getElementById('z1').addEventListener("input",function() {
    console.log(document.getElementById('z1').innerHTML)
    simplex()
},false)
document.getElementById('z2').addEventListener("input",function() {
    console.log(document.getElementById('z2').innerHTML)
    simplex()
},false)
document.getElementById('z3').addEventListener("input",function() {
    console.log(document.getElementById('z3').innerHTML)
    simplex()
},false)
document.getElementById('z4').addEventListener("input",function() {
    console.log(document.getElementById('z4').innerHTML)
    simplex()
},false)
document.getElementById('z5').addEventListener("input",function() {
    console.log(document.getElementById('z5').innerHTML)
    simplex()
},false)
document.getElementById('d1').addEventListener("input",function() {
    console.log(document.getElementById('d1').innerHTML)
    simplex()
},false)
document.getElementById('d2').addEventListener("input",function() {
    console.log(document.getElementById('d2').innerHTML)
    simplex()
},false)
document.getElementById('d3').addEventListener("input",function() {
    console.log(document.getElementById('d3').innerHTML)
    simplex()
},false)
document.getElementById('d4').addEventListener("input",function() {
    console.log(document.getElementById('d4').innerHTML)
    simplex()
},false)
document.getElementById('d5').addEventListener("input",function() {
    console.log(document.getElementById('d5').innerHTML)
    simplex()
},false)
document.getElementById('s1').addEventListener("input",function() {
    console.log(document.getElementById('s1').innerHTML)
    simplex()
},false)
document.getElementById('s2').addEventListener("input",function() {
    console.log(document.getElementById('s2').innerHTML)
    simplex()
},false)
document.getElementById('s3').addEventListener("input",function() {
    console.log(document.getElementById('s3').innerHTML)
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

function printTable(m, it) {
  var div1 = document.createElement('div')
  div1.classList.add('accordion-group')
  var div2 = document.createElement('div')
  div2.classList.add('accordion-heading')
  var a = document.createElement('a')
  a.classList.add('accordion-toggle')
  a.setAttribute('data-toggle','collapse')
  a.setAttribute('data-parent', '#accordion2')
  a.setAttribute('href', '#collapse' + it)
  var i = document.createElement('i')
  i.classList.add('icon-caret-right')
  i.textContent = 'Iteration ' + it
  a.appendChild(i)
  div2.appendChild(a)


  var div3 = document.createElement('div')
  div3.setAttribute('id', 'collapse'+it)
  if(it==0) div3.classList.add('accordion-body', 'collapse', 'in')
  else div3.classList.add('accordion-body', 'collapse')
  var div4 = document.createElement('div')
  div4.classList.add('accordion-inner')

  var table = document.createElement('table')
  table.className = 'table'
  var row = document.createElement('tr')
  var cell = document.createElement('th')
  //add header
  cell.textContent = 'x1'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'x2'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'x3'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'x4'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'x5'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'y1'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'y2'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'y3'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'y4'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'y5'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'z1'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'z2'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'z3'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'z4'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'z5'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's1'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's2'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's3'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's4'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's5'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's6'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's7'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 's8'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'a1'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'a2'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'a3'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'a4'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'a5'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'Z'
  row.appendChild(cell)
  var cell = document.createElement('th')
  cell.textContent = 'RHS'
  row.appendChild(cell)

  table.appendChild(row)

  for(var i=0;i<m.length;i++) {
    var row = document.createElement('tr')
    for(var j=0;j<m[i].length;j++) {
      var cell = document.createElement('td')
      cell.textContent = m[i][j]
      row.appendChild(cell)
    }
    table.appendChild(row)
  }
  
  div4.appendChild(table)
  div3.appendChild(div4)
  div1.appendChild(div2)
  div1.appendChild(div3)
  document.getElementById('accordion2').appendChild(div1)
}

function simplex() {
  //read input from document
  x1 = Number(document.getElementById('x1').innerHTML)
  x2 = Number(document.getElementById('x2').innerHTML)
  x3 = Number(document.getElementById('x3').innerHTML)
  x4 = Number(document.getElementById('x4').innerHTML)
  x5 = Number(document.getElementById('x5').innerHTML)

  y1 = Number(document.getElementById('y1').innerHTML)
  y2 = Number(document.getElementById('y2').innerHTML)
  y3 = Number(document.getElementById('y3').innerHTML)
  y4 = Number(document.getElementById('y4').innerHTML)
  y5 = Number(document.getElementById('y5').innerHTML)

  z1 = Number(document.getElementById('z1').innerHTML)
  z2 = Number(document.getElementById('z2').innerHTML)
  z3 = Number(document.getElementById('z3').innerHTML)
  z4 = Number(document.getElementById('z4').innerHTML)
  z5 = Number(document.getElementById('z5').innerHTML)

  s1 = Number(document.getElementById('s1').innerHTML)
  s2 = Number(document.getElementById('s2').innerHTML)
  s3 = Number(document.getElementById('s3').innerHTML)

  d1 = Number(document.getElementById('d1').innerHTML)
  d2 = Number(document.getElementById('d2').innerHTML)
  d3 = Number(document.getElementById('d3').innerHTML)
  d4 = Number(document.getElementById('d4').innerHTML)
  d5 = Number(document.getElementById('d5').innerHTML)
 
  var max = 20
  var i = 1
  var TR;
  //test1
  // var Z = [c11,c21,c31,c12,c22,c32,c13,c23,c33,c14,c24,c34,c15,c25,c35,0,0,0,0,0,0,0,0,1,0]
  // var m = [[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,c16],
  //          [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,c26],
  //          [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,c36],
  //          [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,c41],
  //          [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,c42],
  //          [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,c43],
  //          [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,-1,0,0,c44],
  //          [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,c45],
  //          Z]
  // var nrow = 9
  // var ncol = 25

  //test2
  // var Z = [c11-c31,c12-c32,c13-c33,c14-c34,c15-c35,c21-c31,c22-c32,c23-c33,c24-c34,c25-c35,0,0,0,0,0,0,0,0,1,-(c31*c41+c32*c42+c33*c43+c34*c44+c35*c45)]
  // var m = [[1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,c16],
  //          [0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,c26],
  //          [1,1,1,1,1,1,1,1,1,1,,0,0,-1,0,0,0,0,0,0,c36],
  //          [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,c41],
  //          [0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,c42],
  //          [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,c43],
  //          [0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,c44],
  //          [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,c45],
  //          Z]
  // var nrow = 9
  // var ncol = 20

  //test3
  // var m = [[1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,x1],
  //          [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,x2],
  //          [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,x3],
  //          [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,x4],
  //          [1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,x5],
  //          [0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,y1],
  //          [0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,y2],
  //          [0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,y3],
  //          [0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,y4],
  //          [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,y5],
  //          [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,z1],
  //          [0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,z2],
  //          [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,z3],
  //          [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,z4],
  //          [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,z5],
  //          [-s1,-s2,-s3,-d1,-d2,-d3,-d4,-d5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]
  // var nrow = 16
  // var ncol = 25

  //test4
  var x = 9999
  var m = [[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,s1],
           [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,s2],
           [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,s3],
           [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,-1,0,0,0,0,1,0,0,0,0,0,d1],
           [0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,-1,0,0,0,0,1,0,0,0,0,d2],
           [0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,-1,0,0,0,0,1,0,0,0,d3],
           [0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,-1,0,0,0,0,1,0,0,d4],
           [0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,-1,0,0,0,0,1,0,d5],
           [-x1,-x2,-x3,-x4,-x5,-y1,-y2,-y3,-y4,-y5,-z1,-z2,-z3,-z4,-z5,0,0,0,0,0,0,0,0,x,x,x,x,x,1,0]]
  var nrow = 9
  var ncol = 30

  console.log(m)

  //clear child
  var doc = document.getElementById("accordion2")
  for(var j=doc.children.length-1;j>=0;j--) {
    doc.removeChild(doc.children[j]);
  }

  printTable(m,0)
  while(checkZ(m,nrow-1,ncol)==1 && i<max) {
    Z = m[nrow-1]
    pc = findPivotColumn(Z)
    TR=solveTR(m,nrow,ncol-1,pc)
    pr = findPivotRow(TR)
    m = GaussJordan(m,nrow,ncol,pr,pc)
    printTable(m,i)
    i++
  }
  console.log(m)
  cost = m[nrow-1][ncol-1]

  //print output to document
  document.getElementById('output').innerHTML = cost
}