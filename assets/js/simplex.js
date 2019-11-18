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
}