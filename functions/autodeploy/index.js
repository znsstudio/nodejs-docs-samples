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
const google = require('googleapis');

// TODO(developer) configure these settings
const PROJECT_ID = process.env.GCLOUD_PROJECT;
const GCF_REGION = '[YOUR_GCF_REGION]';
const REPO_NAME = `[YOUR_REPO_NAME]`;
const SOURCE_PATH = `functions/directory/`; // Must be a directory, not a file
const FUNCTION_NAME = `[YOUR_FUNCTION_NAME]`;
const BRANCH_NAME = `master`; // Change this to deploy from a different branch

// Create Cloud Source Repository URL to the directory to deploy from
const folderUrl = `https://source.developers.google.com/projects/${PROJECT_ID}/repos/${REPO_NAME}/moveable-aliases/${BRANCH_NAME}/paths/${SOURCE_PATH}`;

// Helper function to create/get an OAuth 2.0 client instance
let _client = null;
function getOAuthClient () {
  return new Promise((resolve, reject) => {
    if (!_client) {
      google.auth.getApplicationDefault((err, authClient) => {
        if (err) {
          reject(err);
          return;
        }
        if (authClient.createScopedRequired && authClient.createScopedRequired()) {
          authClient = authClient.createScoped(['https://www.googleapis.com/auth/cloud-platform']);
        }
        _client = google.cloudfunctions({
          version: 'v1beta2',
          auth: authClient
        });
        resolve(_client);
      });
    } else {
      // Use existing client instance
      resolve(_client);
    }
  });
}

/**
 * HTTP Cloud Function that, when triggered, deploys functions from a Cloud
 * Source Repository to Google Cloud Functions.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.deployToGCF = (req, res) => {
  // Create configuration objects
  const location = `projects/${PROJECT_ID}/locations/${GCF_REGION}`;
  const resource = {
    sourceRepositoryUrl: folderUrl,
    name: `${location}/functions/${FUNCTION_NAME}`,
    httpsTrigger: {}
  };

  return getOAuthClient()
    .then((oauthClient) => {
      return oauthClient.projects.locations.functions;
    })
    .then((functionsClient) => {
      // Create the Cloud Function if it doesn't exist
      return new Promise((resolve, reject) => {
        functionsClient.create({ resource, location }, (err) => {
          if (err &&
              err.errors &&
              err.errors[0] &&
              err.errors[0].reason === 'alreadyExists') {
            return resolve(functionsClient);
          } else {
            return reject(err);
          }
        });
      });
    }).then((functionsClient) => {
      // Update the Cloud Function if it does exist
      return new Promise((resolve, reject) => {
        functionsClient.update({ resource, name: resource.name }, (err) => {
          // Report status of update operation
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      });
    }).then(() => {
      // Report success
      res.send(`Function ${FUNCTION_NAME} redeployed successfully!`);
    })
    .catch((err) => {
      // Handle deployment error
      console.error(err);
      res.status(500).send(`Function ${FUNCTION_NAME} deployment failed.`);
    });
};
// [END functions_autodeploy]
