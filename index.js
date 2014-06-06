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
      dhtValue: 123
    }]
  */
  var n = information.length;

  information.forEach(function(info) {
    info.countries.forEach(function(country) {
      var exists = _.find(average, function(avg) {
        return avg.country == country[0];
      });
      if (exists) {
        exists.dhtValue += country[1];
      } else {
        average.push({
          country: country[0],
          dhtValue: country[1]
        });
      }
    });
  });
  average.forEach(function(avg) {
    avg.dhtValue /= n;
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

function getPearsonsCorrelation(x, y) {
  var shortestArrayLength = 0;
  if (x.length == y.length) {
    shortestArrayLength = x.length;
  } else if (x.length > y.length) {
    shortestArrayLength = y.length;
    console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  } else {
    shortestArrayLength = x.length;
    console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for (var i = 0; i < shortestArrayLength; i++) {
    xy.push(x[i] * y[i]);
    x2.push(x[i] * x[i]);
    y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for (var i = 0; i < shortestArrayLength; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += xy[i];
    sum_x2 += x2[i];
    sum_y2 += y2[i];
  }

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}

// var lines = fs.readFileSync('CountryTrendAnalyzer.txt')
//   .toString()
//   .split('\n');

// var information = processData(lines);

// var average = calcAverageValues(information);
// average.forEach(function(avg) {
//   var country = getCountryForCode(avg.country);
//   if (country) {
//     // avg.code = avg.country;
//     avg.country = country.name;
//   }
// });
// average = average.sort(function(a, b) {
//   return b.dhtValue - a.dhtValue;
// });
// var averageString = JSON.stringify(average);
// fs.writeFileSync('average-dht-peers.json', averageString);
// console.log(average);

var editedData = fs.readFileSync('average-dht-peers-edited.json');
try {
  editedData = JSON.parse(editedData);
} catch (e) {
  editedData = null;
}

if (editedData) {
  var dhtValues = []
    , barcelonaValues = []
    , barcelona1stDayValues = []
    , bitcoinStatusValues = [];

  editedData.forEach(function(date) {
    dhtValues.push(date.dhtValue);
    barcelonaValues.push(date.bitcoinBarcelonaValue);
    barcelona1stDayValues.push(date.bitcoinBarcelona1stDayValue);
    bitcoinStatusValues.push(date.bitcoinStatusValue);
  });

  var barcelonaCorrelation = getPearsonsCorrelation(dhtValues, barcelonaValues);
  var barcelona1stDayCorrelation = getPearsonsCorrelation(dhtValues, barcelona1stDayValues);
  var bitcoinStatusCorrelation = getPearsonsCorrelation(dhtValues, bitcoinStatusValues);

  var firstDayBitcoinStatusCorrlation = getPearsonsCorrelation(barcelona1stDayValues, bitcoinStatusValues);
  var bitcoinStatusCorrlation = getPearsonsCorrelation(barcelonaValues, bitcoinStatusValues);

  console.log('Barcelona 1st day correlation: ', barcelona1stDayCorrelation);
  console.log('Barcelona 37 day correlation: ', barcelonaCorrelation);
  console.log('Bitcoin Status correlation: ', bitcoinStatusCorrelation);
  console.log('1st day and bitcoin status correlation', firstDayBitcoinStatusCorrlation);
  console.log('37 days and bitcoin status correlation', bitcoinStatusCorrlation);
}