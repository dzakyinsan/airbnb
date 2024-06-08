import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import GlobalContext from "@/app/context/globalContext";

const ExploreHeader = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { setCategory } = useContext(GlobalContext);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  function onSelectItem(id: number) {
    setSelectedItem(id);
    scrollRef.current?.scrollTo({ x: id * 50, animated: true });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCategory(categories[id].name);
  }

  const categories = [
    {
      name: "Tiny homes",
      icon: "home",
    },
    {
      name: "Cabins",
      icon: "house-siding",
    },
    {
      name: "Trending",
      icon: "local-fire-department",
    },
    {
      name: "Play",
      icon: "videogame-asset",
    },
    {
      name: "City",
      icon: "apartment",
    },
    {
      name: "BeachFront",
      icon: "beach-access",
    },
    {
      name: "Countryside",
      icon: "nature-people",
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={20} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Whete to ?</Text>
                <Text style={{ fontFamily: "mon", color: Colors.gray }}>
                  Anywhere, Any Week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          {categories.map((val, index) => (
            <TouchableOpacity
              onPress={() => onSelectItem(index)}
              key={index}
              style={[
                styles.categoriesBtn,
                selectedItem === index && styles.categoriesBtnActive,
              ]}
            >
              <MaterialIcons
                name={val.icon as any}
                size={24}
                style={
                  selectedItem === index
                    ? styles.iconItemActive
                    : styles.iconItem
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedItem === index && styles.categoryTextActive,
                ]}
              >
                {val.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    height: 150,
    backgroundColor: "#fff",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.gray,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: "row",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
    gap: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 12,
    fontFamily: "mon-sb",
    color: Colors.gray,
  },
  categoryTextActive: {
    color: "#000",
  },
  iconItem: {
    color: Colors.gray,
  },
  iconItemActive: {
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    gap: 3,
    minWidth: 50,
  },
  categoriesBtnActive: {
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});

export default ExploreHeader;
