export const API_ROUTES = {

  AUTH_API : {
    ACCESS_TOKEN: "/api/auth/accessToken",
    REFRESH_TOKEN: "/api/auth/refresh",
    REGISTRATION: "/api/v1/register",
    VERIFY_REGISTRATION_OTP: "/api/v1/register/verify",
    RESEND_REGISTRATION_OTP: "/api/v1/register/verify",
  },

  EXPLORE: {
    STAKE_LIST: "/api/v1/investment-schemas?type=STAKE",
    STAKE_DETAILS: (id) => `/api/v1/investment-schemas/${id}`,
    MY_STAKE: `/api/v1/investments`,
    SUBSCRIBE_STAKE: `/api/v1/investments/subscribe`,
  },

  
  INVESTMENTS_API : {
    ELIGIBLE_SUMMARY: "/api/v1/reservations/eligibility"
  },
};

export const WEB_ROUTES = {
  EXPLORE: '/explore',
  STAKE_DETAILS: '/exploreDetails',
}

