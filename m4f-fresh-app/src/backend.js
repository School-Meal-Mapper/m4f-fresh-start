import sponsorData from "@/sponsorIndex.js";

/**
 * Backend class - an object containing a whole bunch of functions
 * for getting meal site data from a backend.
 *
 * Currently our sponsor's data lives on Google Sheets. If we were to move away
 * from this model, we should keep a similar data structure while simply just
 * rewriting the API calls from these functions.
 */

export default class Backend {
  /**
   * @param {String} abbr Abbreviation of the meal sponsor.
   * @returns {Array<MealSites>} A list of meal site objects.
   */
  static async getMealSites(abbr) {
    const spreadsheetUrl = sponsorData(abbr).data.spreadsheetUrl;
    console.log(spreadsheetUrl);
    const res = await fetch(spreadsheetUrl);
    const data = await res.json();
    return data;
  }
}
