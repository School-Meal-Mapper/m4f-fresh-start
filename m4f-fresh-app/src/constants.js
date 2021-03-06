export const supported_languages = [
  { iso: 'en', name: 'English', english_name: 'English' },
  { iso: 'es', name: 'Español', english_name: 'Spanish' },
  { iso: 'fr', name: 'Français', english_name: 'French' },
  { iso: 'ko', name: '한국어', english_name: 'Korean' },
  { iso: 'ar', name: 'عربى', english_name: 'Arabic' },
  { iso: 'ja', name: '日本語', english_name: 'Japanese' },
  { iso: 'zh', name: '中文', english_name: 'Chinese' },
  { iso: 'ms', name: 'Melayu', english_name: 'Malay' },
  { iso: 'hi', name: 'हिंदी', english_name: 'Hindi' },
  { iso: 'vi', name: 'tiếng việt', english_name: 'Vietnamese' },
  { iso: 'bn', name: 'বাংলা', english_name: 'Bengali' },
  { iso: 'hmn', name: 'Hmong', english_name: 'Hmong' },
  { iso: 'am', name: 'አማርኛ', english_name: 'Amharic' },
  { iso: 'my', name: 'ဗမာ', english_name: 'Burmese' },
  { iso: 'ne', name: 'नेपाली', english_name: 'Nepali' },
  { iso: 'pl', name: 'Polskie', english_name: 'Polish' },
  { iso: 'pt', name: 'português', english_name: 'Portuguese' },
  { iso: 'ru', name: 'русский', english_name: 'Russian' },
  { iso: 'so', name: 'Soomaali', english_name: 'Somali' },
  { iso: 'ur', name: 'اردو', english_name: 'Urdu' }
];

export const daysOfWeek = [
  { short: 'sun', long: 'Sunday' },
  { short: 'mon', long: 'Monday' },
  { short: 'tue', long: 'Tuesday' },
  { short: 'wed', long: 'Wednesday' },
  { short: 'thu', long: 'Thursday' },
  { short: 'fri', long: 'Friday' },
  { short: 'sat', long: 'Saturday' }
];

// Below constant allows NC to be the only state shown on the landing page
export const nc = [{ value: 'nc', text: 'North Carolina' }];

export const states = [
  { value: 'al', text: 'Alabama' },
  { value: 'ak', text: 'Alaska' },
  { value: 'az', text: 'Arizona' },
  { value: 'ar', text: 'Arkansas' },
  { value: 'ca', text: 'California' },
  { value: 'co', text: 'Colorado' },
  { value: 'ct', text: 'Connecticut' },
  { value: 'de', text: 'Delaware' },
  { value: 'fl', text: 'Florida' },
  { value: 'ga', text: 'Georgia' },
  { value: 'hi', text: 'Hawaii' },
  { value: 'id', text: 'Idaho' },
  { value: 'il', text: 'Illinois' },
  { value: 'in', text: 'Indiana' },
  { value: 'ia', text: 'Iowa' },
  { value: 'ks', text: 'Kansas' },
  { value: 'ky', text: 'Kentucky' },
  { value: 'la', text: 'Louisiana' },
  { value: 'me', text: 'Maine' },
  { value: 'md', text: 'Maryland' },
  { value: 'ma', text: 'Massachusetts' },
  { value: 'mi', text: 'Michigan' },
  { value: 'mn', text: 'Minnesota' },
  { value: 'ms', text: 'Mississippi' },
  { value: 'mo', text: 'Missouri' },
  { value: 'mt', text: 'Montana' },
  { value: 'ne', text: 'Nebraska' },
  { value: 'nv', text: 'Nevada' },
  { value: 'nh', text: 'New Hampshire' },
  { value: 'nj', text: 'New Jersey' },
  { value: 'nm', text: 'New Mexico' },
  { value: 'ny', text: 'New York' },
  { value: 'nc', text: 'North Carolina' },
  { value: 'nd', text: 'North Dakota' },
  { value: 'oh', text: 'Ohio' },
  { value: 'ok', text: 'Oklahoma' },
  { value: 'or', text: 'Oregon' },
  { value: 'pa', text: 'Pennsylvania' },
  { value: 'ri', text: 'Rhode Island' },
  { value: 'sc', text: 'South Carolina' },
  { value: 'sd', text: 'South Dakota' },
  { value: 'tn', text: 'Tennessee' },
  { value: 'tx', text: 'Texas' },
  { value: 'ut', text: 'Utah' },
  { value: 'vt', text: 'Vermont' },
  { value: 'va', text: 'Virginia' },
  { value: 'wa', text: 'Washington' },
  { value: 'wv', text: 'West Virginia' },
  { value: 'wi', text: 'Wisconsin' },
  { value: 'wy', text: 'Wyoming' }
];

export const districts = {
  nc: [
    { value: null, text: 'Please select a school district.' },
    { value: 'chccs', text: 'Chapel Hill-Carrboro City Schools' },
    { value: 'dps', text: 'Durham Public Schools' }
    // { value: 'cms', text: 'Charlotte-Mecklenburg Schools' },
    /* { value: 'chatham', text: 'Chatham County Schools' },
      { value: 'jcps', text: 'Johnston County Public Schools' }  */ //,
    // { value: 'rss', text: 'Roanoke Rapids Graded School District' },
    // { value: 'wake', text: 'Wake County Public Schools' }
  ]
};

export const allSchools = [
  { school: 'Northside Elementary' },
  { school: 'McDougle Elementary' },
  { school: 'Rashkis Elementary' },
  { school: 'Smith Middle' }
];

export const allSchoolsByDistrict = {
  chccs: [
    { school: 'Northside Elementary' },
    { school: 'McDougle Elementary' },
    { school: 'Rashkis Elementary' },
    { school: 'Smith Middle' }
  ]
};
