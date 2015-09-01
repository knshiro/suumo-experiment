function transform(data) {
  // filter functions are passed the whole API response object
  // you may manipulate or add to this data as you want

  // query parameters exist in the global scope, for example:
  // http://www.kimonolabs.com/apis/<API_ID>/?apikey=<API_KEY>&myparam=test
  // query.myparam == 'test'; // true
  

  var process = function(row) {
    var rawPrice = row.price.replace('万','0000').replace('円','');
    row.price = parseInt(rawPrice);
    var rawStationTime = row.time_to_station.replace(/(徒歩|分)/g,'');
    row.time_to_station = parseInt(rawStationTime);
    row.surface = parseFloat(row.surface);
    row.balcony = parseFloat(row.balcony);
    var yearMonth = row.date.match(/(\d*)年(\d*)月/);
    if(yearMonth && yearMonth.constructor === Array) {
      if(yearMonth.length >= 2 && yearMonth[1]) {
        row.year = parseInt(yearMonth[1]);
      }
      else { 
        row.year = -1
      }
      if(yearMonth.length >= 3 && yearMonth[2]){
        row.month = parseInt(yearMonth[2]);
      }
      else { 
        row.month = -1
      }
    } else {
      row.year = -1
      row.month = -1
    }
    row.type = row.type.replace(/[ 　（].*/,'');
    var toKuMachi = row.address.match(/(.*都)(.*[区市])([^０-９0-9]*)([０-９0-9])?.*/);
    if(toKuMachi && toKuMachi.constructor === Array) {
        row.to = toKuMachi[1];
        row.ku = toKuMachi[2];
        row.machi = toKuMachi[3];
        if(toKuMachi.length >= 5 && toKuMachi[4]) {
          var japaneseZero = "０".charCodeAt(0);
          row.cho = toKuMachi[4].charCodeAt(0) - japaneseZero;
        }
        else {
          row.cho = -1;
        }
    }
    else {
      row.to = 'unknown';
      row.ku = 'unknown';
      row.machi = 'unknown';
      row.cho = -1;
    }
    
  };

  for(var collection in data.results) {
    data.results[collection].forEach(process);
  }


  return data;
}
