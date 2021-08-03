/* For now - only NC Schools */

export default class allSchoolsBackend {
  static async parseAllSchoolsSheet() {
    /* json endpoint for Copy of All_NC_Schools_July_2021 page 2 */
    var allSchoolsDataSpreadsheetURL =
      'https://spreadsheets.google.com/feeds/cells/1T_hnJz75hGVfVLq8GlkZ20yNe5znKYQJdvEr3OLFht/2/public/full?alt=json';
    const res = await fetch(allSchoolsDataSpreadsheetURL);
    const raw = await res.json();
    const processed = raw.feed.entry
      .filter((school) => school.gsx$schoolname.$t)
      .map((site) => {
        return {
          name: site.gsx$schoolname.$t,
          school_district: site.gsx$leaname.$t
        };
      });
    return processed;
  }
}

export const testSchoolsArray = [
  'ABSS Early College at ACC',
  'Alexander Wilson Elementary',
  'Altamahaw-Ossipee Elementary',
  'Broadview Middle'
];

export function testSchoolsArraySearch(text) {
  if (testSchoolsArray.includes(text)) {
    return true;
  } else {
    return false;
  }
  /*
  if (allSchoolsArray.includes('Broadview Middle')) {
    return true;
  } else {
    return false;
  }
  */
}
