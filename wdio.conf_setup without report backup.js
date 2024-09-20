import allure from "allure-commandline";
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
let allureDir ="./reports/allure"

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: "local",

  specs: ["./test/specs/**/*.js"],

  suites: {
    smoke: ["./test/specs/smoke/*.js"],
    smokeSeq: [
      [
        "./test/specs/smoke/c_patient.invalidLogin.smoke.spec.js",
        "./test/specs/smoke/b_patient.validLogin.smoke.spec.js",
        "./test/specs/smoke/a_patient.login.smoke.spec.js",
      ],
    ],
    regression: ["./test/specs/regression/*.js"],
    e2e: ["./test/specs/endToEnd/*.js"],
  },

  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
 
  maxInstances: 5,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["headless", "disable-gpu"],
      },
    },
  ],


  // ===================
  // Test Configurations
  // ===================
  
  logLevel: "error",
  bail: 0,
  // baseUrl: 'http://localhost:8080',
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  // Default request retries count
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: allureDir + "/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },


  // =====
  // Hooks
  // =====
  
  onPrepare: async function (config, capabilities) {
    const dir = path.join(allureDir, 'allure-results');
  try {
    // Empty the directory without deleting it
    await fse.emptyDir(dir);
    console.log("allure-results directory emptied successfully.");

    // Uncomment below if you need to remove and recreate the directory
    // await fse.remove(dir);
    // console.log("Directory removed successfully.");
    // await fse.ensureDir(dir);
    // console.log("Directory created.");

  } catch (error) {
    console.error("Error handling the allure-results directory:", error);
  }
  },

  // before: function (capabilities, specs) {  
  // },

  // 4. beforeSuite - Runs before each suite starts
  beforeSuite: async function (suite) {
 

  },
 
  // 6. beforeTest - Runs before each test (it block)
  beforeTest: function (test, context) {
    console.log(`beforeTest: Running setup for test: ${test.title}`);
  },


  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      await browser.takeScreenshot();
    }

    console.log(
      `afterTest: Test ${test.title} finished. Duration: ${duration}ms`
    );
  },

  // after: function (result, capabilities, specs) {
  // },

  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const allureDir = "D:/WebDriverIO_Projects/wdio-automation-framework/reports/allure";
    const allureResultsDir = path.join(allureDir, "allure-results");
    const allureReportDir = path.join(allureDir, "allure-report");
    const singleFileReport = path.join(allureReportDir, "index.html");

    return new Promise((resolve, reject) => {
      const generation = allure([
        "generate",
        allureResultsDir,
        "--single-file",
        "--clean",
        "-o",
        allureReportDir
      ]);

      const generationTimeout = setTimeout(() => reject(reportError), 10000);
      generation.on("exit", function(exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");
// Rename the file
const originalFile = path.join(allureReportDir, "index.html");
const newFileName = `allure-report_suiteName_${new Date().toISOString().replace(/:/g, '-')}.html`;
const newFile = path.join(allureReportDir, newFileName);

fs.renameSync(originalFile, newFile);

console.log(`Single file report generated at: ${newFile}`);

        // Optionally, open the report
        const openReport = allure(["open", newFile]);
        openReport.on("exit", function(openExitCode) {
          if (openExitCode !== 0) {
            console.error("Failed to open Allure report");
            return reject(reportError);
          }
          console.log("Allure report opened successfully");
          resolve();
        });
      });
    });

}
}
