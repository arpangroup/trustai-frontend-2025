// config.js
import { getConfigValue } from '../utils/configHelper';

// BASE_URL from localStorage or fallback
// export const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// Common:
export const BASE_URL                 = getConfigValue("app.config.url.base", "http://trustai.co.in");
export const API_VERSION              = getConfigValue("app.config.api.version", '/api/v1');
export const CURRENCY_UNIT            = getConfigValue("app.config.currency.unit", "USDT");
export const CURRENCY_SYMBOL          = getConfigValue("app.config.currency.symbol", "$");
export const REGISTRATION_URL         = `${BASE_URL}/register`
export const REFERRAL_URL             = (referralCode) => `${BASE_URL}/register?ref=${referralCode}`;
export const CURRENCY_UNIT_DEFAULT    = "INR";
export const CURRENCY_SYMBOL_DEFAULT  = "₹";
// Deposit:
export const DEPOSIT_ADDRESS          = getConfigValue("app.config.deposit.address", "0x5987d451a2d9f7db04d8e539e4d3d6f8aede71bb");
export const MINIMUM_DEPOSIT          = getConfigValue("app.config.deposit.amount.min", 50);
export const DEPOSIT_WARNING          = getConfigValue("app.config.deposit.warning", "*Only USDT-BEP-20 deposits accepted. Others will be lost.");
// Withdraw:
export const WITHDRAW_WARNING         = getConfigValue("app.config.withdraw.warning", "warning");
export const MINIMUM_WITHDRAW         = getConfigValue("app.config.withdraw.amount.min", "50");
export const SERVICE_CHARGE           = getConfigValue("app.config.withdraw.service.charge", "5");
// UI
export const ACCEPTED_FILE_TYPES      = getConfigValue("app.config.accepted.file.types", "image/png, image/jpeg, image/gif");
export const MAIN_HEADER_TITLE        = getConfigValue("app.config.header.main.title", "Welcome to TrustAI");
export const OLP_DALAY_SECONDS        = getConfigValue("app.config.otp.delay.seconds", 30);
export const TELEGRAM_LINK            = getConfigValue("app.config.support.telegram.link", "https://t.me/your_username");
export const WHATSAPP_LINK            = getConfigValue("app.config.support.whatsapp.link", "https://wa.me/919876543210");


export const USER_ID            = getConfigValue("USER_ID", 1);


export const SCHEDULE_OPTIONS = [
  { label: "Hourly", value: 1, disabled: true,},
  { label: "Daily", value: 2, disabled: false, },
  { label: "Weekly", value: 3, disabled: true, },
  { label: "2 Week", value: 4, disabled: true, },
  { label: "Monthly", value: 5, disabled: true, },
  { label: "No Schedule", value: 6, disabled: true, }
];

export const RANK_LABEL_MAP = {
  RANK_0: "LV0",
  RANK_1: "LV1",
  RANK_2: "LV2",
  RANK_3: "LV3",
  RANK_4: "LV4",
  RANK_5: "LV5",
  RANK_6: "LV6",
  RANK_7: "LV7",
  RANK_8: "LV8",
  RANK_9: "LV9",
  RANK_10: "LV10",
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

