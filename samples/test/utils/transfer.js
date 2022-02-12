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

const {
  StorageTransferServiceClient,
} = require('@google-cloud/storage-transfer');

const {BucketManager} = require('./bucket');

class TransferJobManager {
  bucketManager = new BucketManager();
  client = new StorageTransferServiceClient();

  /**
   * List of transferJobs to delete
   *
   * @type {string[]}
   */
  transferJobsToCleanup = [];

  /**
   * Clean up transfer jobs used for testing.
   */
  async cleanUp() {
    for (const jobName of this.transferJobsToCleanup) {
      await this.deleteTransferJob(jobName);
    }

    await this.bucketManager.deleteBuckets();
  }

  /**
   * Creates a transfer job for testing, including test buckets.
   * The job generated is not ran automatically.
   * The source bucket and destination buckets do not contain objects.
   *
   * The job is automatically added for queue for easy clean-up via {#cleanUp}.
   */
  async createTestTransferJob() {
    const sourceBucket = await this.bucketManager.generateGCSBucket();
    const destBucket = await this.bucketManager.generateGCSBucket();

    const [transferJob] = await this.client.createTransferJob({
      transferJob: {
        projectId: await this.client.getProjectId(),
        transferSpec: {
          gcsDataSource: {
            bucketName: sourceBucket.name,
          },
          gcsDataSink: {
            bucketName: destBucket.name,
          },
        },
        status: 'ENABLED',
      },
    });

    this.transferJobToCleanUp(transferJob.name);

    return {
      sourceBucket,
      destBucket,
      transferJob,
    };
  }

  /**
   * Deletes a STS transfer job.
   *
   * @param {string} transferJobName the name of the STS Job to delete
   */
  async deleteTransferJob(transferJobName) {
    await this.client.updateTransferJob({
      projectId: await this.client.getProjectId(),
      jobName: transferJobName,
      transferJob: {
        name: transferJobName,
        status: 'DELETED',
      },
    });
  }

  /**
   * Adds Transfer Job to queue for easy clean-up via {#cleanUp}.
   *
   * @param {string} jobName
   */
  transferJobToCleanUp(jobName) {
    this.transferJobsToCleanup.push(jobName);
  }
}

module.exports = {TransferJobManager};
