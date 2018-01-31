/**
 * Copyright 2017, Google, Inc.
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

'use strict';

const test = require(`ava`);

// [START storage_quickstart]
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS; //'/workspace/functions/autodeploy/key.json';

// Creates a client
const storage = new Storage({
  projectId: `nodejs-docs-samples`,
  keyFile: GOOGLE_APPLICATION_CREDENTIALS
});

// Print keyfile
const fs = require(`fs`);
//console.log(fs.readFileSync(GOOGLE_APPLICATION_CREDENTIALS).toString());

// The name for the new bucket
const bucketName = 'please-delete-this';

// Creates the new bucket
test.only(`can access GCP`, async (t) => {
  await storage
    .createBucket(bucketName)
    .then(() => {
      console.log(`Bucket ${bucketName} created.`);
      t.pass();
    })
    .catch(err => {
      console.log(`GCP ERR`, err);
      t.fail();
    });
// [END storage_quickstart]
});

// REQUEST TESTS
const request = require(`request`);
test.cb(`request 1a`, t => {
  request(`http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token`, (e, r, b) => {
    console.log(`R1A Error`, e);
    console.log(`R1A Body:`, b);
    t.pass();
    t.end();
  });
});

test.cb(`request 1b`, t => {
  request(`http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/`, (e, r, b) => {
    console.log(`R1B Error`, e);
    console.log(`R1B Body:`, b);
    t.pass();
    t.end();
  });
});

test.cb(`request 1c`, t => {
  request(`http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/`, (e, r, b) => {
    console.log(`R1C Error`, e);
    console.log(`R1C Body:`, b);
    t.pass();
    t.end();
  });
});

test.cb(`request 2`, t => {
  request({
    url: `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/?recursive=true`,
    headers: {
      'Metadata-Flavor': 'Google'
    }
  }, (e, r, b) => {
    console.log(`R2 Error`, e);
    console.log(`R2 Body:`, b);
    t.pass();
    t.end();
  });
});
