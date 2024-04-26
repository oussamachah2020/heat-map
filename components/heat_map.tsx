import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Mapbox from "@rnmapbox/maps";
import { Coords } from "@/constants/coords";

Mapbox.setAccessToken(
  "sk.eyJ1Ijoib3Vzc2FtYTIwMjMiLCJhIjoiY2x2Z2w3cXpsMHNtZjJzbnpyc2V0dWdxYSJ9.tsKcTxDtg9SDLmyEf2CVcw"
);

type Props = {
  coordinates: number[][];
};

const HeatMap = ({ coordinates }: Props) => {
  const [heatPositions, setHeatPositions] = useState<any | null>(null);

  function showHeatPoints(): any {
    let routerFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [...coordinates],
          },
        },
      ],
    };
    return routerFeature;
  }

  return (
    <Mapbox.MapView
      style={{
        flex: 1,
      }}
      styleURL="mapbox://styles/mapbox/streets-v12"
      onDidFinishLoadingMap={async () => {
        if (Coords.length) {
          const routerFeature = showHeatPoints();
          setHeatPositions(routerFeature);
        }
      }}
    >
      <Mapbox.Camera
        defaultSettings={{
          zoomLevel: 10,
          centerCoordinate: [-7.6695662, 33.5724031],
        }}
      />

      <Mapbox.ShapeSource
        id="earthquakes"
        url="https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        shape={heatPositions}
      >
        <Mapbox.HeatmapLayer
          id="earthquakes"
          sourceID="earthquakes"
          style={{
            heatmapColor: [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(252,141,89)",
              1,
              "rgb(227,26,28)", // Bright red
            ],
          }}
        />
      </Mapbox.ShapeSource>
    </Mapbox.MapView>
  );
};

export default HeatMap;

const styles = StyleSheet.create({});
