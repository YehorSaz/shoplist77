export const baseURL = 'http://192.168.0.121:3005/api';

export const urls = {
    auth: {
        signIn: `/auth/sign-in`,
        signUp: `/auth/Rename…`,
        refresh: `/auth/refresh`,
        verify: `/auth/verify`,
        setPassword: `/auth/set-password`,
        changePassword: `/auth/change-password`,
        forgotPassword: `/auth/forgot-password`,
        forgotPasswordSet: `/auth/forgot-password-set?token=`,
        googleLogin: `/auth/google`,
        logout: `/auth/logout`,
    },
    users: {
        getAllUsers: `/users`,
        me: `/users/me`,
        getById: (id: string) => `/users/${id}`,
        addFriends: (friendId: string) => `/users/friends/add/${friendId}`,
        deleteFriends: (friendId: string) => `/users/friends/delete/${friendId}`,
    },
    purchaseList: {
        getAllList: `/purchase-list/`,
        createList: `/purchase-list/`,
        updateList: (purchaseListId: string) => `/purchase-list/${purchaseListId}`,
        addItemToList: (purchaseListId: string, itemId: string) => `/purchase-list/${purchaseListId}/items/${itemId}`,
        delItemFromList: (purchaseListId: string, itemId: string) => `/purchase-list/${purchaseListId}/items/${itemId}`,
        shareList: (purchaseListId: string) => `/purchase-list/${purchaseListId}/share`,
        unsShareList: (purchaseListId: string) => `/purchase-list/${purchaseListId}/unShare`,
    },
};
