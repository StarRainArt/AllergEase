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
    sectionGreen: {
      backgroundColor: "#C9CBA3",
      color: "#472D30",
      borderRadius: 15,
      padding: 5
    },
    sectionYellow: {
      backgroundColor: "#FFE1A8",
      color: "#472D30",
      borderRadius: 15,
      padding: 5
    },
    buttonRed: {
      backgroundColor: "#E26D5C",
      width: "60%",
      borderRadius: 15,
      paddingVertical: 5
    },
    buttonGreen: {
      backgroundColor: "#C9CBA3",
      width: "60%",
      borderRadius: 15,
      paddingVertical: 5
    },
    greenButtonText: {
      color: "#472D30",
      fontSize: 25,
      fontFamily: "DynaPuff",
      textAlign: "center",
    },
    redButtonText: {
      color: "#FFF5E1",
      fontSize: 25,
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
    }
});

export default styles;