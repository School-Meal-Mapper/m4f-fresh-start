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

  return finalDistance;
}
