// import statusCodes along with GoogleSignin
import {
    GoogleSignin, isErrorWithCode, isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';

// Somewhere in your code
export const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        if (isSuccessResponse(response)) {
            // setState({ userInfo: response.data });
            const id_token = response.data.idToken;
            console.log('ID_TOKEN: ', id_token);
            const res = await fetch('http://192.168.0.108:3005/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id_token}),
            });
            const data = await res.json();
            console.log('----data----', data);
        } else {
            console.log('problem!')
        }
    } catch (error) {
        if (isErrorWithCode(error)) {
            switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    // operation (eg. sign in) already in progress
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    // Android only, play services not available or outdated
                    break;
                default:
                // some other error happened
            }
        } else {
            // an error that's not related to google sign in occurred
        }
    }
};



