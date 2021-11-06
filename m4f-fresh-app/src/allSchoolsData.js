/* For now - only NC Schools */
/* Backend for data from all schools. Currently uses only Copy of All_NC_Schools_July_2021 sheet 2 data */

import { fetchCSV } from './utilities';

export default class allSchoolsBackend {
  /* returns array of all NC schools */
  static async parseAllSchoolsSheet() {
    /* json endpoint for Copy of All_NC_Schools_July_2021 page 2 */
    var allSchoolsDataSpreadsheetURL =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6RT925-6ht0fHKPbFCDZNpoUlwxaEM26GuOYJGUp7Qz97hafPgsNNqsz6SwHqnChETa_nMfMSdjWw/pub?gid=2129513394&single=true&output=csv';
    const raw = await fetchCSV(allSchoolsDataSpreadsheetURL);
    const processed = raw.filter((school) => school.school_name).map((school) => school.school_name);
    return Array.from(processed);
  }

  /* returns object including each element's schoolName, sponsorName, and isOurSponsor (whether or not sponsor is on M4F (T/F) automatically filled out in sheet w data validation)) */
  static async getSchoolObject() {
    var allSchoolsDataSpreadsheetURL =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6RT925-6ht0fHKPbFCDZNpoUlwxaEM26GuOYJGUp7Qz97hafPgsNNqsz6SwHqnChETa_nMfMSdjWw/pub?gid=2129513394&single=true&output=csv';
    const raw = await fetchCSV(allSchoolsDataSpreadsheetURL);
    const processedObj = raw
      .filter((school) => school.school_name)
      .map((school) => {
        return {
          schoolName: school.school_name,
          sponsorName: school.lea_name, // school district name
          isOurSponsor: school.is_our_sponsor
        };
      });
    return processedObj;
  }
}

/* Array with full names of all of our sponsors. Used in typeahead searchbar on MFFLandingPage w .includes to determine if a sponsor is on M4F */
export const ourSponsors = ['Chapel Hill-Carrboro City Schools'];
