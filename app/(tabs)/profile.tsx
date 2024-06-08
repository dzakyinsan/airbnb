import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const Profile = () => {
  const { isSignedIn, signOut } = useAuth();
  return (
    <View>
      <Button title="Log Out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
          {/* <Button title="Log in" /> */}
        </Link>
      )}
    </View>
  );
};

export default Profile;
