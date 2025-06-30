import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleOauthEnum} from "../../../enums/googleOauth.enum";
import {signIn} from "./signIn";

GoogleSignin.configure({
    webClientId: GoogleOauthEnum.WEB_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: false,
});

export const GoogleSignInComponent = () => {
    return (
        <View style={styles.wrapper}>
            <Text>GoogleSignIn</Text>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
});
