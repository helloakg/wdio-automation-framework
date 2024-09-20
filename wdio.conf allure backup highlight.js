import allure from "allure-commandline";
import fse from "fs-extra";
import fs from "fs";
import path from "path";
let allureDir = "./reports/allure";
let lastElement = null;

export const config = {
  // ====================
  // Runner Configuration
  // ====================
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
  exclude: [],

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
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
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
    const dir = path.join(allureDir, "allure-results");
    try {
      await fse.emptyDir(dir);
      console.log("allure-results directory emptied successfully.");
    } catch (error) {
      console.error("Error handling the allure-results directory:", error);
    }
  },

  beforeSuite: async function (suite) {},

  beforeCommand: async function (commandName, args) {
    if (commandName === "$" || commandName === "$$") {
      try {
        // args[0] holds the selector being passed
        lastElement = args[0];
        console.log(`lastElement updated to: ${lastElement}`);
      } catch (error) {
        console.log("Error capturing last element: ", error);
        lastElement = null;
      }
    }
  },

  beforeTest: function (test, context) {
    console.log(`beforeTest: Running setup for test: ${test.title}`);
  },

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed && lastElement) {
      try {
        const element = await $(lastElement);
        
        // Ensure element exists before interacting
        await element.waitForExist({ timeout: 5000 });
        await element.waitForDisplayed({ timeout: 5000 });

        // Highlight the element
        await browser.execute((el) => {
          el.style.border = "3px solid red";
        }, element);

        // Take a screenshot of the page (with highlighted element)
        await browser.takeScreenshot();
        console.log("Full page screenshot with highlighted element saved.");
      } catch (err) {
        console.log("Error highlighting element or taking screenshot:", err);
      }
    } else if (!passed) {
      // Full-page screenshot if no lastElement is found
      await browser.takeScreenshot();
      console.log("Full page screenshot saved.");
    }

    console.log(`afterTest: Test ${test.title} finished. Duration: ${duration}ms`);
  },


 

  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const allureResultsDir = path.join(allureDir, "allure-results");
    const allureReportDir = path.join(allureDir, "allure-report");
    const allureBackupDir = path.join(allureDir, "allure-backup");

    return new Promise((resolve, reject) => {
      const generation = allure([
        "generate",
        allureResultsDir,
        "--single-file",
        "--clean",
        "-o",
        allureReportDir,
      ]);

      const generationTimeout = setTimeout(() => reject(reportError), 10000);
      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");

        if (!fs.existsSync(allureBackupDir)) {
          fs.mkdirSync(allureBackupDir, { recursive: true });
        }

        const newFileName = `allure-report_${new Date()
          .toLocaleString("en-GB")
          .replace(" ", "_")
          .replace(/:/g, "-")
          .replace(/\//g, "-")}.html`;
        const sourceFile = path.join(allureReportDir, "index.html");
        const backupFile = path.join(allureBackupDir, newFileName);

        fs.renameSync(sourceFile, backupFile);

        console.log(`Report backed up to: ${backupFile}`);

        const openReport = allure(["open", backupFile]);
        openReport.on("exit", function (openExitCode) {
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