export const API_ROUTES = {

  AUTH_API : {
    ACCESS_TOKEN: "/api/auth/accessToken",
    REFRESH_TOKEN: "/api/auth/refresh",
    REGISTRATION: "/api/register",
    VERIFY_REGISTRATION_OTP: "/api/register/verify",
    RESEND_REGISTRATION_OTP: "/api/register/resendOTP",
  },

  EXPLORE: {
    STAKE_LIST: "/api/v1/investment-schemas?type=STAKE",
    STAKE_DETAILS: (id) => `/api/v1/investment-schemas/${id}`,
    MY_STAKE: `/api/v1/investments`,
    SUBSCRIBE_STAKE: `/api/v1/investments/subscribe`,
  },

  RESERVATION_API : {
    ALL_ORDERS: `/api/v1/orders`,
    ACTIVE_ORDERS: "/api/v1/orders?activeOnly=true",
    RESERVE_NOW: '/api/v1/orders/reserve',
    SELL_RESERVED_STAKE: (orderId) => `/api/v1/orders/${orderId}/sell`,
    ORDER_SUMMARY: "/api/v1/orders/summary",
  },

  
  INVESTMENTS_API : {
    ELIGIBLE_SUMMARY: "/api/v1/reservations/eligibility"
  },


  USER_INFO: "/api/v1/users/info",
  INCOME_SUMMARY: "/api/v1/incomes/summary",
  MEMBER_SUMMARY: "/api/v1/users/metrics/member-summary",

  NOTIFICATION_API : {
    NOTIFICATIONS: `/api/v1/notifications`,
    MARK_VIEWED: (id) => `/api/v1/notifications/${id}/view`,
    DELETE: (id) => `/api/v1/notifications/${id}`,
  },

  TRANSACTIONS: {
    TRANSACTION_HISTORY: '/api/v1/transactions',
  },

  DEPOSIT: {
    DEPOSIT_REQUEST: `/api/v1/deposits/manual`,
    DEPOSIT_HISTORY: `/api/v1/deposits`,
  },

  WALLET: {
    WALLET_BALANCE: '/api/v1/wallet/balance'
  }


};

export const WEB_ROUTES = {
  EXPLORE: '/explore',
  STAKE_DETAILS: '/exploreDetails',
}

