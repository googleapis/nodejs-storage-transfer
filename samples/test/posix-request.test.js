/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs').promises;
const os = require('os');
const path = require('path');

const {assert} = require('chai');
const {after, before, describe, it} = require('mocha');

const {BucketManager, TransferJobManager, runSample} = require('./utils');

describe('posix-request', () => {
  const testBucketManager = new BucketManager();
  const testTransferJobManager = new TransferJobManager();

  let projectId;
  let gcsSinkBucket;
  let tempDirectory;
  let tempFile;

  before(async () => {
    tempDirectory = await fs.mkdtemp(
      path.join(os.tmpdir(), 'sts-posix-request-test-')
    );
    tempFile = path.join(tempDirectory, 'text.txt');

    await fs.writeFile(tempFile, 'test data');

    projectId = await testBucketManager.getProjectId();
    gcsSinkBucket = (await testBucketManager.generateGCSBucket()).name;
  });

  after(async () => {
    await testBucketManager.deleteBuckets();
    await testTransferJobManager.cleanUp();
    await fs.rm(tempFile);
    await fs.rmdir(tempDirectory);
  });

  it('should create a transfer job from POSIX to GCS', async () => {
    const output = await runSample('posix-request', [
      projectId,
      tempDirectory,
      gcsSinkBucket,
    ]);

    // Find at least 1 transfer operation from the transfer job in the output
    assert.include(output, 'Created and ran a transfer job');
  });
});
