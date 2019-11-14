function add(a,b) {
	var x = [0,1,2,3,4,5];
	var y = [2.1,7.7,13.6,27.2,40.9,61.1];
	PolynomialRegression();
}

function GaussJordan(m,row) {
  var a = m;
  var n = row;

  for(var i=0;i<n;i++) {
    // find pivot row
    var col = a.map(function(value,index) { return value[0]; });
    var pivot_row_val = Math.max.apply(null, col.map(Math.abs));
    function findRow(arr,val) {
    	for(var j=0;j<arr.length;j++) {
    		if(arr[j]==val) return j;
    	}
    }
    var pivot_row = findRow(col,pivot_row_val)

    // swap
    if(pivot_row>0){
      var temp = a[pivot_row];
      console.log(temp)
      console.log(m)
      a[pivot_row] = a[i];
      a[i] = temp;
      if(a[pivot_row][i] == 0) {break;}
    }
    

    for(var k=0;k=n+1;k++) {
    	a[i][k] = a[i][k]/a[i][i]
    }
    // a[i] = a[i]/a[i][i];
    
    // for(var j=0;j<n;j++){
    //   if(i!=j) {
    //   	normalized_row = a[j][i]*a[i];
    //   	a[j] = a[j] - normalized_row;
    //   }
    // }
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
  var m = Array.from(Array(deg), () => new Array(deg+1));
  
  // update values of matrix
  var exp;
  for(var i=0;i<deg;i++) {
  	for(var j=0;j<deg;j++) {
  		exp = i+j;
  		m[i][j] = mat(x,exp);
  	}
  	//update rhs
  	m[i][deg] = rhs(x,y,i);
  }
  
  console.log(m);
  // perform gauss-jordan
  m = GaussJordan(m,deg);
  console.log(m);
}