/* For now - only NC Schools */

export default class allSchoolsBackend {
  static async parseAllSchoolsSheet() {
    /* json endpoint for Copy of All_NC_Schools_July_2021 page 2 */
    var allSchoolsDataSpreadsheetURL =
      'https://spreadsheets.google.com/feeds/list/1T_hnJz75hGVfVLq8GlkZ20yNe5znKYQJdvEr3OLFhtw/2/public/values?alt=json';
    const res = await fetch(allSchoolsDataSpreadsheetURL);
    console.log(res);

    const raw = await res.json();
    const processed = raw.feed.entry.filter((school) => school.gsx$schoolname.$t).map((school) => school.gsx$schoolname.$t);
    return Array.from(processed);
  }

  static async getSchoolObject() {
    var allSchoolsDataSpreadsheetURL =
      'https://spreadsheets.google.com/feeds/list/1T_hnJz75hGVfVLq8GlkZ20yNe5znKYQJdvEr3OLFhtw/2/public/values?alt=json';
    const res = await fetch(allSchoolsDataSpreadsheetURL);
    console.log(res);

    const raw = await res.json();
    const processedObj = raw.feed.entry
      .filter((school) => school.gsx$schoolname.$t)
      .map((school) => {
        return {
          schoolName: school.gsx$schoolname.$t,
          sponsorName: school.gsx$leaname.$t,
          isOurSponsor: school.gsx$isoursponsor.$t
        };
      });
    return processedObj;
  }
}

export const ourSponsors = ['Chapel Hill-Carrboro City Schools'];
