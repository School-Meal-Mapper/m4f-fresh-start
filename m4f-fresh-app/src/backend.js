import sponsorData from "@/sponsorIndex.js";
import {supported_languages} from "@/constants.js";

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
    const res = await fetch(spreadsheetUrl);
    const raw = await res.json();
    const missing = { $t: "N/A" };
    const processed = raw.feed.entry
      .filter((site) => site.gsx$mealsitename.$t)
      .map((site) => {
        return {
          name: site.gsx$mealsitename.$t,
          school_district: site.gsx$schooldistrict.$t,
          open_status: site.gsx$mealsitestatus.$t.toLowerCase() == "open",
          location: {
            address: site.gsx$mealsiteaddress1.$t,
            address_2: site.gsx$mealsiteaddress2.$t,
            city: site.gsx$city.$t,
            state: site.gsx$state.$t,
            zip: site.gsx$zip.$t, // will be a string
            county: site.gsx$county.$t,
            lat: site.gsx$lat.$t, // will be a string
            lng: site.gsx$lon.$t, // will be a string
          },
          additional_directions: (site.gsx$additionaldirections ?? missing).$t,
          contact: {
            name: (site.gsx$contactname ?? missing).$t,
            phone: (site.gsx$contactphone ?? missing).$t,
          },
          notes: site.gsx$notes.$t,
          web_link: site.gsx$weblink.$t,
          redirect_link: site.gsx$redirectlink.$t,
          hours: {
            sun: site.gsx$sun.$t,
            mon: site.gsx$mon.$t,
            tue: site.gsx$tues.$t,
            wed: site.gsx$wed.$t,
            thu: site.gsx$thr.$t,
            fri: site.gsx$fri.$t,
            sat: site.gsx$sat.$t,
          },
          dates: {
            start: site.gsx$startdate.$t,
            end: site.gsx$enddate.$t,
          },
          update_info: {
            person: site.gsx$updatedby.$t,
            date: site.gsx$lastupdate.$t,
          },
          tags: {
            transitfriendly: (site.gsx$transitfriendly ?? missing).$t == "TRUE",
            foodpantry: (site.gsx$foodpantry ?? missing).$t == "TRUE",
            prepackagedmealsavailable:
              (site.gsx$prepackagedmealsavailable ?? missing).$t == "TRUE",
            dietaryoptionsoffered: (
              site.gsx$dietaryoptionsoffered ?? missing
            ).$t
              .toLowerCase()
              .split(", "),
            hotmealsavailable:
              (site.gsx$hotmealsavailable ?? missing).$t == "TRUE",
          },
        };
      });
    return processed;
  }

  static async getFaq(abbr) { // currently only works with chapel hill, please change spreadsheet headers to "full-language-name_question/answer"
    const faqUrl = sponsorData(abbr).data.faqUrl;
    const res = await fetch(faqUrl);
    const raw = await res.json();
    console.log(raw, "gs json")

    const langsInSheet = supported_languages.filter(lang => raw.feed.entry[0][`gsx$${lang.english_name.toLowerCase()}question`]); // filters what language headers are in the sheet, but only if it is supported in constants.js
    const processed = raw.feed.entry
    .filter(question => question.gsx$englishquestion.$t)// check to make sure rows must have english question text
    .map(row => {
      const qna = {}
      langsInSheet.forEach(lang => {
        qna[`${lang.iso}_question`] = row[`gsx$${lang.english_name.toLowerCase()}question`].$t;
        qna[`${lang.iso}_answer`] = row[`gsx$${lang.english_name.toLowerCase()}answer`].$t;
      })
      return qna;
    });
    return processed;
  }

  static async getProviderInfo(abbr) {
    const metaUrl = sponsorData(abbr).data.providerinfoUrl;
    const res = await fetch(metaUrl);
    const raw = await res.json();
    const row = raw.feed.entry[0];
    return {
      state: row.gsx$state.$t,
      county: row.gsx$county.$t,
      provider_name: row.gsx$providername.$t,
      sponsor_site: row.gsx$weblink.$t,
      sponsor_redirect: row.gsx$redirectlink.$t,
      menu_site: row.gsx$menulink.$t,
      twitter: row.gsx$twitter.$t,
      instagram: row.gsx$instagram.$t,
      facebook: row.gsx$facebook.$t,
      phone: row.gsx$contactphone.$t,
      person: row.gsx$contactname.$t
    };
  }
}

