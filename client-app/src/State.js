let State = {
    accountData: {
        isLoggedIn: true,
        accountCreated: "2019-08-22 14:35:24",
        accountDiscount: ".20",
        accountEmail: "matthew@test.com",
        accountId: "33",
        accountType: "admin",
        apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzMiLCJleHAiOjE1NjcxNzM5MTAsImlzcyI6ImZsYXRyYXRlbWV0YWwiLCJpYXQiOjE1NjY1NjkxMTB9._pnY9C3jqsuqlueiaFX17FTlqyCT_atM2Nmr7IWLJDA"
    },
    products: [],
    materials: [],
    categories: [],
    toggle: { notification:{ open: false }},
    account: [],
    currentAccount: {
        currentAccountEditing: false
    },
    currentProduct: {}
};

export default State;