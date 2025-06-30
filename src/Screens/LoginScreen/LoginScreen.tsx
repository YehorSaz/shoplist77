import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {GoogleSignInComponent} from "../../components/GoogleSignIn/GoogleSignInComponent";

export const LoginScreen = () => {
    return (
        <View style={styles.wrapper}>
            <GoogleSignInComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
});
