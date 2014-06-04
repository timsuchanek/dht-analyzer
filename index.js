var fs = require('fs');

var lines = fs.readFileSync('CountryTrendAnalyzer.txt')
.toString()
.split('\n');

function processData(lines) {
  var commentRegex = /#+(.*)/;
  // only use lines, which are no comments
  lines = lines.filter(function(line) {
    return !commentRegex.test(line);
  });

  var muchEasierLineRegex = /(\d+)\s|\s[(.*)]/;

  var information = [];
  lines.forEach(function(line) {
    var splitted = line.split(muchEasierLineRegex);
    var timestamp = parseInt(splitted[1], 10);
    var rest = splitted[2];
    if (rest) {
      rest = rest.slice(3, rest.length - 1);
      var countries = rest.split(', ');
      countries = countries.map(function(country) {
        var country = country.split(' | ');
        country[1] = parseFloat(country[1], 10);
        return country;
      });
      information.push({
        timestamp: timestamp,
        countries: countries
      });
    }
  });
  return information
}

var information = processData(lines);

var lengthts = information.map(function(info) {
  return info.countries.length;
});

console.log(lengthts, lengthts.length);
// console.log(information[0]);