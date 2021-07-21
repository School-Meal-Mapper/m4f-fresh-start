// we could make this async in the future, but that means we should create a "loading" object
// with blank properties that components can import and use before assets are loaded in.

/**
 * @param {String} abbr Unique abbreviation for the meal sponsorer.
 * @returns {Object} Object with many theming properties of each of the meal sponsors.
 *
 * Possible Improvement: define the return object as a class so we would not need a
 *  validaton of objects would be built-in.
 *
 * Performance Improvement: define the sponsors object in the function as a script in `index.html`,
 *   hence it acts like a global constant and would not need to be read in every import.
 *
 * From sponsorIndex.js,
 *
 * Similar to districtData.js, this is still not the best way to do theming specific to a sponsor.
 * The best way would be to include this information along with the meal site data as all that
 * information is specific to a meal site, and if we ever move away from Google Sheets, it would be
 * best to have an "index" page that'll lookup where a sponsor is located.
 *
 * However, organized like this, you can easily put this on a backend and have this function
 * this async-ly, return a pointer to the sponsor-specific theming.
 *
 * Fig 1:
 * ```plain
 * [client m4f.org] --to backend--> [index lookup of valid sponsors] ----> [sponsor meal site data]
 *         ^                                                                        |
 *         |________________________________________________________________________|
 * ```
 */

export default function sponsorData(abbr) {
  abbr = abbr ?? "mff";
  const sponsors = {
    chccs: {
      sponsorAbbr: "chccs",
      sponsorName: "Chapel Hill-Carrboro City Schools",
      primaryColor: "#0063b1",
      bannerColor: "#0051BA",
      bannerColorDark: "#00224f",
      accentColor: "#7cba3e",
      navLink: "#f8f8f8",
      navLinkDark: "#f8f8f8",
      logoFormat: "svg",
      // map settings for district-specific page
      initialMapCenterLat: 35.943068,
      initialMapCenterLng: -79.097216,
      initialMapZoom: 12,
      clusterZoom: 12,
      maxZoom: 17,
      minZoom: 12,
      // data source urls and attributions
      spreadsheetUrl:
        "https://spreadsheets.google.com/feeds/list/1suJY9SWEYxrQIBfb9VYl33cKNbWwBcxMaJc-hOCKVyY/1/public/values?alt=json",
      faqUrl:
        "https://spreadsheets.google.com/feeds/list/1suJY9SWEYxrQIBfb9VYl33cKNbWwBcxMaJc-hOCKVyY/2/public/values?alt=json",
      providerinfoUrl:
        "https://spreadsheets.google.com/feeds/list/1suJY9SWEYxrQIBfb9VYl33cKNbWwBcxMaJc-hOCKVyY/3/public/values?alt=json",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      lightAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      darkAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    ecps: {
      sponsorAbbr: "ecps",
      sponsorName: "Edgecombe County Public Schools",
      primaryColor: "#008385",
      bannerColor: "#ffffff",
      bannerColorDark: "#001134",
      accentColor: "#fcaf17",
      navLink: "#000000",
      navLinkDark: "#FFFFFF",
      logoFormat: "svg",
      // map settings for district-specific page
      initialMapCenterLat: 35.9382,
      initialMapCenterLng: -77.7905,
      initialMapZoom: 8,
      clusterZoom: 13,
      maxZoom: 17,
      minZoom: 11,
      // data source urls and attributions
      spreadsheetUrl:
        "https://spreadsheets.google.com/feeds/list/1QT5OhxEA3gkvvppm6RO7Ekg9rWH6NH7l0pXk2_ar774/1/public/values?alt=json",
      faqUrl:
        "https://spreadsheets.google.com/feeds/list/1QT5OhxEA3gkvvppm6RO7Ekg9rWH6NH7l0pXk2_ar774/2/public/values?alt=json",
      providerinfoUrl:
        "https://spreadsheets.google.com/feeds/list/1QT5OhxEA3gkvvppm6RO7Ekg9rWH6NH7l0pXk2_ar774/3/public/values?alt=json",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png", //KEPTSAME
      lightAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png", //KEPTSAME
      darkAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', //KEPTSAME
    },
    dps: {
      sponsorAbbr: "dps",
      sponsorName: "Durham Public Schools",
      primaryColor: "#024379",
      bannerColor: "#024379",
      bannerColorDark: "#113858",
      accentColor: "#fcaf17",
      logoFormat: "png",
      // map settings for district-specific page
      initialMapCenterLat: 35.994,
      initialMapCenterLng: -78.8986,
      initialMapZoom: 12,
      clusterZoom: 13,
      maxZoom: 17,
      minZoom: 11,
      // data source urls and attributions
      spreadsheetUrl:
        "https://spreadsheets.google.com/feeds/list/1kclyQ5Q-sOOSLARn_qaLxXUnq5f6Q8XWGNvAM5po6E0/1/public/values?alt=json",
      faqUrl:
        "https://spreadsheets.google.com/feeds/list/1kclyQ5Q-sOOSLARn_qaLxXUnq5f6Q8XWGNvAM5po6E0/2/public/values?alt=json",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      lightAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      darkAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    dublinusd: {
      sponsorAbbr: "dublinusd",
      sponsorName: "Dublin Unified School District",
      primaryColor: "#005cba",
      bannerColor: "#005cba",
      bannerColorDark: "#005cba", // how do you get to dark mode?
      accentColor: "#5dba00",
      navLink: "#fdfdfd",
      navLinkDark: "#fdfdfd",
      logoFormat: "png",
      // map settings for district-specific page
      initialMapCenterLat: 37.713974,
      initialMapCenterLng: -121.920405,
      initialMapZoom: 12,
      clusterZoom: 13,
      maxZoom: 17,
      minZoom: 11,
      // data source urls and attributions
      spreadsheetUrl:
        "https://spreadsheets.google.com/feeds/list/1ZQFr4W9LDPUHL81bRuh-nGgjJwpDBF4mN979zkVMdME/1/public/values?alt=json",
      faqUrl:
        "https://spreadsheets.google.com/feeds/list/1ZQFr4W9LDPUHL81bRuh-nGgjJwpDBF4mN979zkVMdME/2/public/values?alt=json",
      providerinfoUrl:
        "https://spreadsheets.google.com/feeds/list/1ZQFr4W9LDPUHL81bRuh-nGgjJwpDBF4mN979zkVMdME/3/public/values?alt=json",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      lightAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      darkAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    wcs: {
      sponsorAbbr: "wcs",
      sponsorName: "Wilson County Schools",
      primaryColor: "#000142",
      bannerColor: "#000142",
      accentColor: "#5cae53",
      bannerColorDark: "#000142",
      logoFormat: "svg",
      // map settings for district-specific page
      initialMapCenterLat: 35.73597,
      initialMapCenterLng: -77.90853,
      initialMapZoom: 12,
      clusterZoom: 12,
      maxZoom: 17,
      minZoom: 10,
      // data source urls and attributions
      spreadsheetUrl:
        "https://spreadsheets.google.com/feeds/list/1J9Ac8MNpugt12cAWHDU8SmEjnYT6RlRBwya26Co6Lyo/1/public/values?alt=json",
      faqUrl:
        "https://spreadsheets.google.com/feeds/list/1J9Ac8MNpugt12cAWHDU8SmEjnYT6RlRBwya26Co6Lyo/2/public/values?alt=json",
      providerinfoUrl:
        "https://spreadsheets.google.com/feeds/list/1J9Ac8MNpugt12cAWHDU8SmEjnYT6RlRBwya26Co6Lyo/3/public/values?alt=json",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      lightAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      darkAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    sfusd: {
      sponsorAbbr: "sfusd",
      sponsorName: "San Francisco Unifed School District",
      primaryColor: "#7794a7",
      bannerColor: "#7794a7",
      accentColor: "#89cbe1",
      bannerColorDark: "#7794a7",
      logoFormat: "png",
      // map settings for district-specific page
      initialMapCenterLat: 37.75515,
      initialMapCenterLng: -122.49179,
      initialMapZoom: 12,
      clusterZoom: 12,
      maxZoom: 17,
      minZoom: 10,
      // data source urls and attributions
      spreadsheetUrl:
        "https://spreadsheets.google.com/feeds/list/1c3zSPGpa01KueGhRauuo4cmIkD69E1wlapSHOSsuPCY/1/public/values?alt=json",
      faqUrl:
        "https://spreadsheets.google.com/feeds/list/1c3zSPGpa01KueGhRauuo4cmIkD69E1wlapSHOSsuPCY/2/public/values?alt=json",
      providerinfoUrl:
        "https://spreadsheets.google.com/feeds/list/1c3zSPGpa01KueGhRauuo4cmIkD69E1wlapSHOSsuPCY/3/public/values?alt=json",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      lightAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      darkAttribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    mff: {
      sponsorAbbr: "mff",
      sponsorName: "Meals 4 Families",
      primaryColor: "#1D6363",
      bannerColor: "#1D6363",
      bannerColorDark: "#1B3C65",
      accentColor: "#ffec60",
      navLink: "#f8f8ff",
      navLinkDark: "#f8f8ff",
      logoFormat: "png",
      // map settings for district-specific page
      initialMapCenterLat: 35.943068,
      initialMapCenterLng: -79.097216,
      initialMapZoom: 12,
      clusterZoom: 12,
      maxZoom: 17,
      minZoom: 12,
      // data source urls and attributions
      spreadsheetUrl: "",
      lightUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      lightAttribution:
        '&copy; <a href: "https://carto.com/">Carto</a>, &copy; <a href: "http://openstreetmap.org">OpenStreetMap</a> contributors',
      darkUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      darkAttribution:
        '&copy; <a href: "https://carto.com/">Carto</a>, &copy; <a href: "https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href: "http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
  };

  const sp = sponsors[abbr];

  if (sp === undefined) {
    return sponsors["mff"];
  }

  // organize the list, could insert validation here using ternary operators
  return {
    sponsorAbbr: sp.sponsorAbbr,
    sponsorName: sp.sponsorName,
    logoFormat: sp.logoFormat,
    colors: {
      primaryColor: sp.primaryColor,
      bannerColor: sp.bannerColor,
      bannerColorDark: sp.bannerColorDark,
      accentColor: sp.accentColor,
      navLink: sp.navLink,
      navLinkDark: sp.navLinkDark,
    },
    settings: {
      initialMapCenter: {
        lat: sp.initialMapCenterLat,
        lng: sp.initialMapCenterLng,
      },
      initialMapZoom: sp.initialMapZoom,
      clusterZoom: sp.clusterZoom,
      maxZoom: sp.maxZoom,
      minZoom: sp.minZoom,
    },
    data: {
      spreadsheetUrl: sp.spreadsheetUrl,
      faqUrl: sp.faqUrl,
      providerinfoUrl: sp.providerinfoUrl,
    },
    maps: {
      normal: {
        url: sp.lightUrl,
        attribution: sp.lightAttribution,
      },
      dark: {
        url: sp.darkUrl,
        attribution: sp.darkAttribution,
      },
    },
  };
}
