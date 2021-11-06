import sponsorData from '@/sponsorIndex.js';
import { supported_languages } from '@/constants.js';
import { fetchCSV } from '@/utilities';
/**
 * Backend class - an object containing a whole bunch of functions
 * for getting meal site data from a backend.
 *
 * Currently our sponsor's data lives on Google Sheets. If we were to move away
 * from this model, we should keep a similar data structure while simply just
 * rewriting the API calls from these functions.
 */

export default class Backend {
  /*
MealSite Example Structure: {
  name: "Main St. Elementary School",
  school_district: "Chapel Hill-Carrboro Schools",
  open_status: true/false,                                              (true if meal site is enabled, false if it isn't)
  location: {
    address: "110 Main St.",
    address_2: "Room 110",
    city: "Chapel Hill",
    state: "NC",
    zip: "27514",
    county: "Orange",
    lat: 35.91400,
    lng: -79.09477
  },
  additional_directions: "Please go to the front office located next to the buses.",
  contact: {
    name: "Sarah Wong",
    phone: "919-301-1234"                                              (note this is a string)
  },
  notes: "All students are welcome. Please bring your student id."     (also acts as a description),
  web_link: "http://chccs.edu/main_elementary/",
  redirect_link: "some other link??",
  hours: {
    sun: "0" | "11:00 AM - 12:30 PM",
    mon: ...,
    ...
    sat: "0"                                                           (0 = closed)
  },
  dates: {
    start: "mm/dd/yyyy",
    end: "mm/dd/yyyy"
  }
  update_info: {
    person: "Kate Hanson",
    date: "11/12/2020"
  },
  tags: {
    transitfriendly: true,
    foodpantry: false,
    prepackagedmealsavailable: true,
    dietaryoptionsoffered: [
      "vegetarian",                                                    (all strings will be lower-cased)
      "kosher",
      ...
    ],
    hotmealsavailable: false
  }

}
*/

  /**
   * @param {String} abbr Abbreviation of the meal sponsor.
   * @returns {Array<MealSite>} A list of meal site objects.
   *
   */
  static async getMealSites(abbr) {
    const spreadsheetUrl = sponsorData(abbr).data.spreadsheetUrl;
    const raw = await fetchCSV(spreadsheetUrl);
    const missing = 'N/A'; // this should really be replaced with optional chaining ( .? operator, see https://www.youtube.com/watch?v=v2tJ3nzXh8I)
    const processed = raw
      .filter((site) => site.meal_site_name)
      .map((site) => {
        return {
          name: site.meal_site_name,
          school_district: site.school_district,
          open_status: site.meal_site_status.toLowerCase() == 'open',
          location: {
            address: site.meal_site_address_1,
            address_2: site.meal_site_address_2,
            city: site.city,
            state: site.state,
            zip: site.zip, // will be a string
            county: site.county,
            lat: parseFloat(site.lat),
            lng: parseFloat(site.lon)
          },
          additional_directions: site.additional_directions ?? missing,
          contact: {
            name: site.contact_name ?? missing,
            phone: site.contact_phone ?? missing
          },
          notes: site.notes,
          web_link: site.web_link,
          redirect_link: site.redirect_link,
          hours: {
            sun: site.sun,
            mon: site.mon,
            tue: site.tues,
            wed: site.wed,
            thu: site.thr,
            fri: site.fri,
            sat: site.sat
          },
          dates: {
            start: site.start_date,
            end: site.end_date
          },
          update_info: {
            person: site.updated_by,
            date: site.last_update
          },
          tags: {
            transitfriendly: site.transit_friendly ?? missing == 'TRUE',
            foodpantry: site.food_pantry ?? missing == 'TRUE',
            prepackagedmealsavailable: site.prepackaged_meals_available ?? missing == 'TRUE',
            dietaryoptionsoffered: (site.dietary_options_offered ?? missing).toLowerCase().split(', '),
            hotmealsavailable: site.hot_meals_available ?? missing == 'TRUE'
          }
        };
      });
    return processed;
  }

  static async getFaq(abbr) {
    // currently only works with chapel hill, please change spreadsheet headers to "full-language-name_question/answer"
    const faqUrl = sponsorData(abbr).data.faqUrl;
    const raw = await fetchCSV(faqUrl);
    const langsInSheet = supported_languages.filter((lang) => raw[0][`${lang.english_name.toLowerCase()}_question`]); // filters what language headers are in the sheet, but only if it is supported in constants.js
    const processed = raw
      .filter((question) => question.english_question) // check to make sure rows must have english question text
      .map((row) => {
        const qna = {};
        langsInSheet.forEach((lang) => {
          qna[`${lang.iso}_question`] = row[`${lang.english_name.toLowerCase()}_question`];
          qna[`${lang.iso}_answer`] = row[`${lang.english_name.toLowerCase()}_answer`];
        });
        return qna;
      });
    return processed;
  }

  static async getProviderInfo(abbr) {
    const metaUrl = sponsorData(abbr).data.providerinfoUrl;
    const raw = await fetchCSV(metaUrl);
    const row = raw[0];
    return {
      state: row.state,
      county: row.county,
      provider_name: row.provider_name,
      sponsor_site: row.web_link,
      sponsor_redirect: row.redirect_link,
      menu_site: row.menu_link,
      twitter: row.twitter,
      instagram: row.instagram,
      facebook: row.facebook,
      phone: row.contact_phone,
      person: row.contact_name
    };
  }
}
