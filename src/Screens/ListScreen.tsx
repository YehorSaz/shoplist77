import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HomeStackParamList } from "../navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { theme } from "../theme";

type ListScreenRouteProp = RouteProp<HomeStackParamList, 'ListDetail'>;
type ListScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

interface ListScreenProps {
    route: ListScreenRouteProp;
}

const ListScreen: FC<ListScreenProps> = ({route}) => {
    const { listId } = route.params;
    const navigation = useNavigation<ListScreenNavigationProp>();
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>List Screen</Text>
      <Text>{listId}</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Go Back</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: theme.colors.primary,
  },
});

export default ListScreen;