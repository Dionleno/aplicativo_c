const React = require("react-native");

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  sidebar: {
    flex: 1,
    backgroundColor: "#fff"
  },
  drawerCover: {
    alignSelf: "stretch",
    // resizeMode: 'cover',
    height: deviceHeight / 3.8,
    position: "relative",
    marginBottom: 10,
    // backgroundColor: '#FFFFFF'
  },
  drawerImage: {
    position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: Platform.OS === "android" ? 7 : 5
  },
  sidebarIcon: {
    fontSize: 21,
    color: "#fff",
    lineHeight: Platform.OS === "android" ? 21 : 25,
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  avatarView: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15
  },
  avatarName: {
    color: '#FFFFFF',
    fontSize: 17,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  avatarAlfa: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};
