// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const BASE_URL = 'https://trustai.co.in/';
export const API_VERSION = '/api/v1';
export const USER_ID = 1;
export const REGISTRATION_URL = `${BASE_URL}/register`;
export const REFERRAL_URL = (referralCode) => `${BASE_URL}/register?ref=${referralCode}`;

export const CURRENCY_UNIT = "USDT";
export const CURRENCY_UNIT_DEFAULT = "INR";
export const CURRENCY_SYMBOL = "$"; // "₹"
export const CURRENCY_SYMBOL_DEFAULT = "₹";

export const DEPOSIT_ADDRESS = "0x5987d451a2d9f7db04d8e539e4d3d6f8aede71bb";

export const SCHEDULE_OPTIONS = [
  { label: "Hourly", value: 1, disabled: true,},
  { label: "Daily", value: 2, disabled: false, },
  { label: "Weekly", value: 3, disabled: true, },
  { label: "2 Week", value: 4, disabled: true, },
  { label: "Monthly", value: 5, disabled: true, },
  { label: "No Schedule", value: 6, disabled: true, }
];

export const RANK_LABEL_MAP = {
  RANK_0: "LV1",
  RANK_1: "LV2",
  RANK_2: "LV3",
  RANK_3: "LV4",
  RANK_4: "LV5",
  RANK_5: "LV6",
  RANK_6: "LV7",
  RANK_7: "LV8", // optional, handle extra rank
  RANK_8: "LV9",
  RANK_9: "LV10",
};

export const RANK_TO_NUMBER_MAP = {
  RANK_0: "0",
  RANK_1: "1",
  RANK_2: "2",
  RANK_3: "3",
  RANK_4: "4",
  RANK_5: "5",
  RANK_6: "6",
  RANK_7: "7",
  RANK_8: "8",
  RANK_9: "9",
  RANK_10: "10",
};

const imageFileTypes = "image/png, image/jpeg, image/gif";
const allFileTypes = "";
export const ACCEPTED_FILE_TYPES = imageFileTypes;
