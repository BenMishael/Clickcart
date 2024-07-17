import 'dart:io';

const MAIN_URL_PC = 'http://localhost:3000';
const MAIN_URL_PHONE = 'http://172.20.10.2:3000';

final String MAIN_URL = Platform.isAndroid || Platform.isIOS ? MAIN_URL_PHONE : MAIN_URL_PC;

const FAVORITE_PRODUCT_BOX = 'FAVORITE_PRODUCT_BOX';
const USER_INFO_BOX = 'USER_INFO_BOX';

const PHONE_KEY = 'PHONE_KEY';
const STREET_KEY = 'STREET_KEY';
const CITY_KEY = 'CITY_KEY';
const STATE_KEY = 'STATE_KEY';
const POSTAL_CODE_KEY = 'POSTAL_CODE_KEY';
const COUNTRY_KEY = 'COUNTRY_KEY';

// Web3 Constants
const COINBASE_API_KEY = "29499e49-a9f0-4d7e-86c3-500918acafed";