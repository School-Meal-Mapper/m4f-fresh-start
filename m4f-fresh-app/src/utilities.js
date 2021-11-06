/* takes user's name as param and creates a pre-filled email. Currently addressed to the placeholder sponsor@email.com until we collect all sponsor emails (and likely include them in Copy of All_NC_Schools_July_2021 spreadsheet) */
export function emailLink(name) {
  /* Create var to link to pre-filled email. subject is intentionally static - does not change by district. */
  const mailto = 'mailto:sponsor@email.com?subject=';
  var subject = 'Another Family Wants You to Join Meals4Families.org to Help Them Find Free Meals';
  subject = encodeURI(subject);
  subject += '&body=';
  /* assign body text to var (will be dynamic based on Sponsor, Sponsor email, Your Name input, and whether user is student/parent/guardian) */
  /* body text should be made to include personalized input, such as name, from SNF page form */
  var sponsorName = this.$route.params.sponsorname;
  var userName = name;
  var body =
    'Dear ' +
    sponsorName +
    ' Nutrition Team, \n \n I am a parent in your area who is interested in finding meal sites near me. I ask that you consider contacting Meals 4 Families to join their site to make it easier for families in your area to find free meal sites. \n \n Best, \n \n' +
    userName;
  body = encodeURI(body);
  return mailto + subject + body;
}

/**
 *
 * @param {Array<Number>} coordinatesA - latitude and longitude of first formatted in decimal coordinates in a [lat, lng] array
 * @param {Array<Number>} coordinatesB - same as above but for second point
 * @param {Boolean} isMiles - true: get distance in miles, false (default): get distance in km
 * @returns - distance between the two points on Earth
 */
export function haversineDistance([lat1, lon1], [lat2, lon2], isMiles = false) {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  if (isMiles) {
    finalDistance /= 1.60934;
  }
  console.log(finalDistance);
  return finalDistance;
}
/**
 *
 * @param {Number} degree- takes in degree, input is the difference between two latitudes or two longitudes
 * @returns - equivalent radian value
 */
export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * can be converted from km to miles in the future
 * @param {Number} lat1- latitude for point A
 * @param {Number} lon1- longitude for point A
 * @param {Number} lat2- latitude for point B
 * @param {Number} lon2- longitude for point B
 * @returns - distance between those 2 points in km
 */
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  // R is the radius of the earth in km
  var R = 6371;
  var dLat = this.deg2rad(lat2 - lat1);
  var dLon = this.deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //d is distance in km
  var d = R * c;
  return d;
}

const csv = require('csvtojson');
/**
 * Downloads a CSV from a link and converts it to JSON, assuming that the first row of the table are the column headers.
 * @param {String} link to the URL of the CSV file
 * @returns JSON of the CSV with keys being the headers of the CSV
 *
 * example table: Student Grades
 * ```csv
 *  first row:     name    |     id_num  |    grade   |   <-- column headers
 * second row:  Robert J.  |    83912    |     B      |   <-- row values
 *  third row:  Samantha S.|    78241    |     A      |
 * ```
 * will produce:
 * ```js
 * [
 *   {
 *     name: "Robert J.",
 *     id_num: "83912",
 *     grade: "B"
 *   },
 *   {
 *     name: "Samantha S.",
 *     id_num: "78241",
 *     grade: "A"
 *   }
 * ]
 * ```
 *
 *
 */
export async function fetchCSV(link) {
  const csvAsString = await (await fetch(link, { method: 'get', headers: { 'content-type': 'text/csv;charset=UTF-8' } })).text();
  return await csv().fromString(csvAsString);
}
