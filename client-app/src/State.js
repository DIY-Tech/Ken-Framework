let State = {
    accountData: {
        isLoggedIn: true,
        accountCreated: "2019-08-20 14:29:31",
        accountDiscount: ".25",
        accountEmail: "matthew@test.com",
        accountId: "1",
        accountType: "admin",
        apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTU2Njk0Mjc3MCwiaXNzIjoiZmxhdHJhdGVtZXRhbCIsImlhdCI6MTU2NjMzNzk3MH0.urmA3TsteF273zgwEDbiBnQvU12sh9q73eqBiVnR3o8"
    },
    products: [],
    materials: [],
    categories: [],
    toggle: { notification: false },
    account: [],
    currentAccount: {
        currentAccountEditing: false
    },
    currentProduct: {}
};

export default State;