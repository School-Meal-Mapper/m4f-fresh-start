/* For now - only NC Schools */
/* Backend for data from all schools. Currently uses only Copy of All_NC_Schools_July_2021 sheet 2 data */

import { fetchCSV } from './utilities';

export default class allSchoolsBackend {
  /* returns array of all NC schools */
  static async parseAllSchoolsSheet() {
    /* json endpoint for Copy of All_NC_Schools_July_2021 page 2 */
    var allSchoolsDataSpreadsheetURL =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6RT925-6ht0fHKPbFCDZNpoUlwxaEM26GuOYJGUp7Qz97hafPgsNNqsz6SwHqnChETa_nMfMSdjWw/pub?gid=2129513394&single=true&output=csv';
    const res = await fetchCSV(allSchoolsDataSpreadsheetURL);
    const processed = raw.feed.entry.filter((school) => school.gsx$school_name).map((school) => school.gsx$schoolname.$t);
    return Array.from(processed);
  }

  /* returns object including each element's schoolName, sponsorName, and isOurSponsor (whether or not sponsor is on M4F (T/F) automatically filled out in sheet w data validation)) */
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

/* Array with full names of all of our sponsors. Used in typeahead searchbar on MFFLandingPage w .includes to determine if a sponsor is on M4F */
export const ourSponsors = ['Chapel Hill-Carrboro City Schools'];
