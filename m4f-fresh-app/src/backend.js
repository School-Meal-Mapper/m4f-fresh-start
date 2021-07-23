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
    console.log(spreadsheetUrl);
    const res = await fetch(spreadsheetUrl);
    const raw = await res.json();
    const processed = raw.feed.entry.filter(site => site.gsx$mealsitename.$t).map((site) => {
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
          lng: site.gsx$lon.$t // will be a string
        },
        additional_directions: site.gsx$additionaldirections.$t,
        contact: {
          name: site.gsx$contactname.$t,
          phone: site.gsx$contactphone.$t
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
          sat: site.gsx$sat.$t
        },
        dates: {
          start: site.gsx$startdate.$t,
          end: site.gsx$enddate.$t
        },
        update_info: {
          person: site.gsx$updatedby.$t,
          date: site.gsx$lastupdate.$t
        },
        tags: {
          transitfriendly: site.gsx$transitfriendly.$t == "TRUE",
          foodpantry: site.gsx$foodpantry.$t == "TRUE",
          prepackagedmealsavailable: site.gsx$prepackagedmealsavailable.$t == "TRUE",
          dietaryoptionsoffered: site.gsx$dietaryoptionsoffered.$t.toLowerCase().split(', '),
          hotmealsavailable: false
        }
      }
    });
    return processed;
  }
}
