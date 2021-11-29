require("dotenv").config();
const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: process.env.HOST_SONAR_URL || "http://127.0.0.1:80",
    token: "043b7f4179dcfe16a45a6484774a0a1e7861f3ca",
    options: {
      "sonar.projectName": "onesport-shop",
      "sonar.projectDescription": 'Description for "My App" project...',
      "sonar.sources": "app",
      "sonar.tests": "test",
    },
  },
  () => {}
);
