/* For now - only NC Schools */

export default class allSchoolsBackend {
  static async parseStateColumn() {
    const res = await fetch(
      'https://docs.google.com/spreadsheets/d/1T_hnJz75hGVfVLq8GlkZ20yNe5znKYQJdvEr3OLFhtw/edit#gid=2129513394&range=CH:CH'
    );
    const raw = await res.json();
    console.log(raw, 'testing states column in console');
    const processed = raw.feed.entry.map((column) => {
      const statesArray = [];
      processed.array.forEach((element) => {
        statesArray[element] = column[element];
      });
      return statesArray;
    });
    return processed.array;
  }
  static async parseAllSchoolsSheet() {
    /* json endpoint for Copy of All_NC_Schools_July_2021 page 2 */
    var allSchoolsDataSpreadsheetURL =
      'https://spreadsheets.google.com/feeds/cells/1T_hnJz75hGVfVLq8GlkZ20yNe5znKYQJdvEr3OLFht/2/public/full?alt=json';
    const res = await fetch(allSchoolsDataSpreadsheetURL);
    const raw = await res.json();

    const processed = raw.feed.entry.filter((school) => school.gsx$schoolname.$t);
    return processed;
  }
}

export const testSchoolsArray = [
  'ABSS Early College at ACC',
  'Alexander Wilson Elementary',
  'Altamahaw-Ossipee Elementary',
  'Broadview Middle'
];
