import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ListRenderItem,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "@/app/context/globalContext";
import { Link } from "expo-router";
import { TItems } from "@/types/item";
import { Ionicons } from "@expo/vector-icons";
import Animated, { BounceIn, BounceOut, FadeIn, FadeInLeft, FadeInRight, FlipInXUp, LightSpeedInRight }  from "react-native-reanimated";

type TListings = {
  items: TItems[];
};

const Listings = ({ items }: TListings) => {
  const { category } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const renderItem = ({ item }: { item: TItems }) => (
    <Link href={`/listing/${item?.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons
              name="heart-outline"
              size={24}
              style={{ color: "#000" }}
            />
          </TouchableOpacity>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "mon-sb", fontSize: 14, maxWidth: 300 }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={14} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontFamily: "mon", fontSize: 12 }}>
              {item.room_type}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={{ fontFamily: "mon-sb", fontSize: 12 }}>
              € {item.price}
            </Text>
            <Text>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [category]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 130,
      }}
    >
      <FlatList
        data={loading ? [] : items}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 8,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Listings;
