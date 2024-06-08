import { View } from "react-native";
import React, { useMemo } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from '@/assets/data/airbnb-listings.json'

const Explore = () => {
const items = useMemo(()=> listingsData as any, [])

  return (
    <View style={{flex: 1}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Listings items={items}/>
    </View>
  );
};

export default Explore;
