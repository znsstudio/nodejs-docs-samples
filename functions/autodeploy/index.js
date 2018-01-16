/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START functions_autodeploy]
const childProcess = require(`child_process`);

// TODO(developer) configure these settings
const PROJECT_ID = process.env.GCLOUD_PROJECT;
const REPO_NAME = `[YOUR_REPO_NAME]`;
const SOURCE_PATH = `function/directory`; // Must be a directory, not a file
const FUNCTION_NAME = `[YOUR_FUNCTION_NAME]`;

// Create Cloud Source Repository URL to the directory to deploy from
const fileUrl = `https://source.developers.google.com/projects/${PROJECT_ID}/repos/${REPO_NAME}/moveable-aliases/master/paths/${SOURCE_PATH}`;

/**
 * HTTP Cloud Function that, when triggered, deploys functions from a Cloud
 * Source Repository to Google Cloud Functions.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.deployToGCF = (req, res) => {
  try {
    // Deploy the function
    childProcess.execSync(`gcloud beta functions deploy ${FUNCTION_NAME} --source ${fileUrl} --trigger-http`);

    // Deployment successful
    res.send(`Function ${FUNCTION_NAME} was deployed!`);
  } catch (err) {
    // Handle deployment error
    console.error(err);
    res.status(500).send(`Function ${FUNCTION_NAME} deployment failed.`);
  }
};
// [END functions_autodeploy]
