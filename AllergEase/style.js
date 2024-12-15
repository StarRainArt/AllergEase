import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
      padding: 30,
      flex: 1,
      alignItems: 'center',
      backgroundColor: "#FFF5E1",
    },
    title: {
      textAlign: "center",
      fontSize: 40,
      fontFamily: "DynaPuffMedium",
      color: "#472D30",
      paddingVertical: 20
    },
    kopje: {
      fontSize: 25,
      fontFamily: "DynaPuff",
      color: "#472D30",
    },
    sectionGreen: {
      backgroundColor: "#C9CBA3",
      color: "#472D30",
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 20
    },
    sectionYellow: {
      backgroundColor: "#FFE1A8",
      color: "#472D30",
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 20
    },
    buttonRed: {
      backgroundColor: "#E26D5C",
      borderRadius: 15,
      paddingVertical: 5
    },
    buttonGreen: {
      backgroundColor: "#C9CBA3",
      borderRadius: 15,
      paddingVertical: 5
    },
    greenButtonText: {
      color: "#472D30",
      fontFamily: "DynaPuff",
      textAlign: "center",
    },
    redButtonText: {
      color: "#FFF5E1",
      fontFamily: "DynaPuff",
      textAlign: "center",
    },
    input: {
      backgroundColor: "#FFE1A8",
      color: "#472D30",
      paddingLeft: 15,
      paddingTop: 5,
      paddingBottom: 0,
      width: "95%",
      borderRadius: 15,
      marginBottom: 20,
      fontSize: 25,
      fontFamily: "BalooPaaji2",
      textAlignVertical: "bottom"
    },
});

export default styles;