const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "images", "icon.icns"),
    executableName: "MajhongSoul",
    name: "Majhong Soul",
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Majhong Soul",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
