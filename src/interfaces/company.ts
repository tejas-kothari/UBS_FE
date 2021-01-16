export default interface Company {
  uuid: string;
  name: string;
  rank: number;
  created_at: string;
  homepage_url: string;
  country: string;
  status: string;
  short_description: string;
  category_groups_list: string;
  num_funding_rounds: number;
  total_funding_usd: number;
  founded_on: string;
  last_funding_on: string;
  closed_on: string;
  employee_count: string;
  email: string;
  phone: string;
  facebook_url: string;
  linkedin_url: string;
  twitter_url: string;
  logo_url: string;
  num_exits: number;
  angel_raised_amount_usd_sum: number;
  series_a_raised_amount_usd_sum: number;
  series_b_raised_amount_usd_sum: number;
  seed_raised_amount_usd_sum: number;
  series_c_raised_amount_usd_sum: number;
  series_d_raised_amount_usd_sum: number;
  series_unknown_raised_amount_usd_sum: number;
  debt_financing_raised_amount_usd_sum: number;
  series_e_raised_amount_usd_sum: number;
  private_equity_raised_amount_usd_sum: number;
  series_f_raised_amount_usd_sum: number;
  pre_seed_raised_amount_usd_sum: number;
  undisclosed_raised_amount_usd_sum: number;
  grant_raised_amount_usd_sum: number;
  post_ipo_equity_raised_amount_usd_sum: number;
  convertible_note_raised_amount_usd_sum: number;
  post_ipo_debt_raised_amount_usd_sum: number;
  non_equity_assistance_raised_amount_usd_sum: number;
  corporate_round_raised_amount_usd_sum: number;
  series_i_raised_amount_usd_sum: number;
  series_g_raised_amount_usd_sum: number;
  secondary_market_raised_amount_usd_sum: number;
  initial_coin_offering_raised_amount_usd_sum: number;
  series_h_raised_amount_usd_sum: number;
  product_crowdfunding_raised_amount_usd_sum: number;
  equity_crowdfunding_raised_amount_usd_sum: number;
  post_ipo_secondary_raised_amount_usd_sum: number;
  series_j_raised_amount_usd_sum: number;
  event_appearance_total_count: number;
  acquisition_total_count: number;
}

const phases = [
  'angel',
  'series a',
  'series b',
  'seed',
  'series c',
  'series d',
  'series unknown',
  'debt financing',
  'series e',
  'private equity',
  'series f',
  'pre seed',
  'undisclosed',
  'grant',
  'post ipo equity',
  'convertible note',
  'post ipo debt',
  'non equity assistance',
  'corporate round',
  'series i',
  'series g',
  'secondary market',
  'initial coin offering',
  'series h',
  'product crowdfunding',
  'equity crowdfunding',
  'post ipo secondary',
  'series j'
].sort();

const categories = [
  'Financial Services',
  'Lending and Investments',
  'Payments',
  'Artificial Intelligence',
  'Data and Analytics',
  'Platforms',
  'Privacy and Security'
].sort();

const countries = [
  'United States',
  'Hong Kong',
  'Ireland',
  'Luxembourg',
  'Switzerland',
  'United Kingdom',
  'Spain',
  'Israel',
  'Canada',
  'Russian Federation',
  'Germany',
  'Australia',
  'France',
  'Finland',
  'Sweden',
  'India',
  'Korea, Republic of',
  'Netherlands',
  'Belgium',
  'Singapore',
  'Japan',
  'United Arab Emirates',
  'Denmark',
  'Venezuela, Bolivarian Republic of',
  'China',
  'Philippines',
  'Indonesia',
  'South Africa',
  'Brazil',
  'Czechia',
  'New Zealand',
  'Poland',
  'Thailand',
  'Argentina',
  'Estonia',
  'Austria',
  'Turkey',
  'Mauritius',
  'Malta',
  'Kuwait',
  'Viet Nam',
  'Italy',
  'Romania',
  'Egypt',
  'Qatar',
  'Cyprus',
  'Greenland',
  'Trinidad and Tobago',
  'Malaysia',
  'Norway',
  'Portugal',
  'Taiwan, Province of China',
  'Bulgaria',
  'Pakistan',
  'Lebanon',
  'Chile',
  'Ukraine',
  'Slovenia',
  'Armenia',
  'Mexico',
  'Hungary',
  'Nicaragua',
  'Isle of Man',
  'Gibraltar',
  'Tunisia',
  'Bahrain',
  'Barbados',
  'Costa Rica',
  'Greece',
  'Iceland',
  'Bermuda',
  'Peru',
  'Nigeria',
  'Latvia',
  'Kenya',
  'Saudi Arabia',
  'Bangladesh',
  'Uruguay',
  'Ethiopia',
  'Dominican Republic',
  'Jordan',
  'Cayman Islands',
  'Lithuania',
  'Croatia',
  'North Macedonia',
  'Sri Lanka',
  'Bosnia and Herzegovina',
  "C\xc3\xb4te d'Ivoire",
  'Morocco',
  'Liechtenstein',
  'Afghanistan',
  'Bolivia, Plurinational State of',
  'Serbia',
  'Azerbaijan',
  'Colombia',
  'Belarus',
  'Kyrgyzstan',
  'Iran, Islamic Republic of',
  'Ecuador',
  'Antigua and Barbuda',
  'Kazakhstan',
  'Albania',
  'Uzbekistan',
  'Guernsey',
  'Ghana',
  'Jersey',
  'Iraq',
  'Uganda',
  'Cameroon',
  'Panama',
  'El Salvador',
  'Algeria',
  'Slovakia',
  'Georgia',
  'Cuba',
  'Moldova, Republic of',
  'Nepal',
  'Jamaica',
  'Sierra Leone',
  'Puerto Rico',
  'Norfolk Island',
  'Martinique',
  'Saint Martin (French part)',
  'Andorra',
  'Senegal',
  'Bahamas',
  'Maldives',
  'Paraguay',
  'Yemen',
  'Belize',
  'Haiti',
  'Dominica',
  'Montenegro',
  'Brunei Darussalam',
  "Lao People's Democratic Republic",
  'Seychelles',
  'Angola',
  'Gambia',
  'Guyana',
  'Syrian Arab Republic',
  'Somalia',
  'Tanzania, United Republic of',
  'Zimbabwe',
  'Rwanda',
  'Mongolia',
  'Benin',
  'Saint Kitts and Nevis',
  'Macao',
  'Palestine, State of',
  'Guatemala',
  'Botswana',
  'Honduras',
  'Oman',
  'Namibia',
  'Cambodia',
  'Zambia',
  'Myanmar',
  'Madagascar',
  'Togo',
  'Saint Lucia',
  'Sudan',
  'Faroe Islands',
  'Mozambique',
  'Aruba',
  'Tajikistan',
  'Guam',
  'Comoros',
  'Libya',
  'Burkina Faso',
  'Malawi',
  'Suriname',
  'French Polynesia',
  'Turkmenistan',
  'Fiji',
  'American Samoa',
  'Northern Mariana Islands',
  'Grenada',
  'Lesotho',
  'Liberia',
  "Korea, Democratic People's Republic of",
  'Congo, The Democratic Republic of the',
  'Bhutan',
  'Congo',
  'Central African Republic',
  'Montserrat',
  'New Caledonia',
  'Mali',
  'Saint Barth\xc3\xa9lemy',
  'Marshall Islands',
  'French Guiana',
  'Guinea',
  'Eswatini',
  'Papua New Guinea',
  'Djibouti',
  '\xc3\x85land Islands',
  'Chad',
  'Turks and Caicos Islands',
  'R\xc3\xa9union',
  'Gabon',
  'Mauritania',
  'Niger',
  'Cabo Verde',
  'Anguilla',
  'Falkland Islands (Malvinas)',
  'Guadeloupe',
  'Burundi',
  'British Indian Ocean Territory',
  'Timor-Leste',
  'Equatorial Guinea',
  'San Marino',
  'Solomon Islands',
  'Cook Islands',
  'unknown'
].sort();

const sizes = [
  '1-10',
  '11-50',
  '51-100',
  '101-250',
  '251-500',
  '501-1000',
  '1001-5000',
  '5001-10000',
  '10000+',
  'unknown'
];

export { phases, categories, sizes, countries };
