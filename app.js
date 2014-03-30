'use strict';

// this function creates an M+1xN+1 matrix where M is the length of the first string
// and N is the length of the second string and computes the number of changes it would
// require to convert string s to string t. The value at point (i,j) is the cost to
// compute s from [0..i] to t from [0..j]
function levenshtein(s, t) {
  var m = s.length + 1;
  var n = t.length + 1;

  var d = Array.apply(null, {length: m}).map(function(x){ return Array.apply(null, {length:n}).map(function(y){return 0;});});

  for(var i = 1; i < m; i++) {
    d[i][0] = i;
  }
  for(var j = 1; j < n; j++) {
    d[0][j] = j;
  }

  for(var j = 1; j < n; j++) {
    for(var i = 1; i < m; i++) {
      if (s[i-1] === t[j-1]) {
        //these characters are the same, pass down the cost.
        d[i][j] = d[i-1][j-1];
      } else {
        //these characters aren't the same, find the minimum cost to convert to here.
        d[i][j] = Math.min(
          (d[i-1][j] + 1),
          (d[i][j-1] + 1),
          (d[i-1][j-1] + 1)
        );
      }
    }
  }
  return d[m-1][n-1];
};

var languages = ['javascript', 'java', 'c++', 'c', 'go', 'haskell', 'python', 'ruby', 'c#', 'php'];
var fruits = ['strawberry', 'cherry', 'plum', 'apple', 'peach', 'orange', 'banana', 'tomato'];

var DidYouMean = function(term, words) {
  var choice = '';
  words.reduce(function(a,b) {
    var score = levenshtein(b, term);
    if (score < a) {
      choice = b;
      return score;
    }
    return a;
  }, Infinity);

  return choice;
};

var test_language = 'javascrript';
console.log('you typed',test_language,'but I believe you meant',DidYouMean(test_language, languages));

var test_fruits = ['berry', 'strawbery'];
test_fruits.forEach(function(test_fruit) {
  console.log('you typed',test_fruit,'but I believe you meant',DidYouMean(test_fruit, fruits));
});
