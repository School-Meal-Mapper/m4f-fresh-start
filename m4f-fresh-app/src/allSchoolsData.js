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
    // var result = Object.keys(processed).map((key) => [processed[key].school_name][0]);
    return Array.from(processed);
  }
}

export const resultArray = allSchoolsBackend.parseAllSchoolsSheet();

export const testSchoolsArray = [
  'ABSS Early College at ACC',
  'Alexander Wilson Elementary',
  'Altamahaw-Ossipee Elementary',
  'Broadview Middle',
  'Carrboro Elementary',
  'Carrboro High',
  'Chapel Hill High',
  'McDougle Middle',
  'Seawell Elementary',
  'Ephesus Elementary',
  'Estes Hills Elementary',
  'East Chapel Hill High',
  'FPG Elementary',
  'Glenwood Elementary',
  'Culbreth Middle',
  'Phillips Middle',
  'McDougle Elementary',
  'UNC Hospital School',
  'Scroggs Elementary',
  'Morris Grove Elementary',
  'Rashkis Elementary',
  'Smith Middle',
  'Phoenix Academy High',
  'Virtual Academy School'
];

export const CHCCSschools = [
  'Carrboro Elementary',
  'Carrboro High',
  'Chapel Hill High',
  'McDougle Middle',
  'Seawell Elementary',
  'Ephesus Elementary',
  'Estes Hills Elementary',
  'East Chapel Hill High',
  'FPG Elementary',
  'Glenwood Elementary',
  'Culbreth Middle',
  'Phillips Middle',
  'McDougle Elementary',
  'UNC Hospital School',
  'Scroggs Elementary',
  'Morris Grove Elementary',
  'Rashkis Elementary',
  'Smith Middle',
  'Phoenix Academy High',
  'Virtual Academy School'
];
