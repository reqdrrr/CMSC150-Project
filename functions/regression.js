function add(a,b) {
	var x = [0,1,2,3,4,5];
	var y = [2.1,7.7,13.6,27.2,40.9,61.1];
	PolynomialRegression();
}

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
    if(pivot_row>=0 && n!=2){
    	var temp = a[pivot_row]
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

function PolynomialRegression() {
	//get params
	var x = [0,1,2,3,4,5];
	var y = [2.1,7.7,13.6,27.2,40.9,61.1];
	var deg = Number(document.getElementById('inputDegree').value);
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
  var col = new Array(deg+1);
  for(var j=0;j<deg+1;j++) {
  	col[j] = m[j][deg+1];
  }
  // document.getElementById("output").innerHTML = col;
  console.log(col);
}