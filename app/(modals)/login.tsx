import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Tiktok = "oauth_tiktok",
}

type TLoginOptions = {
  title: string;
  icon: any;
  action?: () => void;
};

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: tiktokAuth } = useOAuth({ strategy: "oauth_tiktok" });

  const onSelectOAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Tiktok]: tiktokAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive, authSessionResult } =
        await selectedAuth();

        console.log({createdSessionId});
        

      if (createdSessionId) {
        console.log({ createdSessionId });
        setActive!({ session: createdSessionId });
        router.back();
      } else if (authSessionResult!.type === "success") {
        //temporary
        // set to local storage to make it like already login
        router.back();
        console.log({ authSessionResult: authSessionResult!.type });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LoginOptions: TLoginOptions[] = [
    {
      title: "Continue with Phone",
      icon: "call-outline",
    },
    {
      title: "Continue with Google",
      icon: "logo-google",
      action: () => onSelectOAuth(Strategy.Google),
    },
    {
      title: "Continue with Apple",
      icon: "logo-apple",
      action: () => onSelectOAuth(Strategy.Apple),
    },
    {
      title: "Continue with Tiktok",
      icon: "logo-tiktok",
      action: () => onSelectOAuth(Strategy.Tiktok),
    },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text>or</Text>
        <View style={styles.separatorLine} />
      </View>
      <View style={{ gap: 20 }}>
        {LoginOptions.map((val: TLoginOptions) => (
          <TouchableOpacity
            style={styles.btnOutline}
            key={val.icon}
            onPress={val.action ? val.action : undefined}
          >
            <Ionicons name={val.icon} size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>{val.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 30,
    alignItems: "center",
  },
  separatorLine: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
  },
  btnOutline: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: Colors.gray,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Page;
