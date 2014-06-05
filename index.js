var fs = require('fs');
var _ = require('lodash');
var countriesFile = fs.readFileSync('countries.json');
var countries;

try {
  countries = JSON.parse(countriesFile);
} catch (e) {
  countries = null;
}

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

function calcAverageValues(information) {
  var average = [];
  /*
    [{
      country: 'AS',
      value: 123
    }]
  */
  var n = information.length;

  information.forEach(function(info) {
    info.countries.forEach(function(country) {
      var exists = _.find(average, function(avg) {
        return avg.country == country[0];
      });
      if (exists) {
        exists.value += country[1];
      } else {
        average.push({
          country: country[0],
          value: country[1]
        });
      }
    });
  });
  average.forEach(function(avg) {
    avg.value /= n;
  });
  return average;
}

function getCountryForCode(code) {
  var country = null;
  if (countries) {
    country = _.find(countries, function(country) {
      return country.cca2 == code;
    });
  }
  return country;
}

var lines = fs.readFileSync('CountryTrendAnalyzer.txt')
.toString()
.split('\n');

var information = processData(lines);

var average = calcAverageValues(information);
average.forEach(function(avg) {
  var country = getCountryForCode(avg.country);
  if (country) {
    // avg.code = avg.country;
    avg.country = country.name;
  }
});
console.log(average);