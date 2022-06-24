// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(jobName, projectId) {
  // [START storagetransfer_v1_generated_StorageTransferService_GetTransferJob_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The job to get.
   */
  // const jobName = 'abc123'
  /**
   *  Required. The ID of the Google Cloud project that owns the
   *  job.
   */
  // const projectId = 'abc123'

  // Imports the Storagetransfer library
  const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer').v1;

  // Instantiates a client
  const storagetransferClient = new StorageTransferServiceClient();

  async function callGetTransferJob() {
    // Construct request
    const request = {
      jobName,
      projectId,
    };

    // Run request
    const response = await storagetransferClient.getTransferJob(request);
    console.log(response);
  }

  callGetTransferJob();
  // [END storagetransfer_v1_generated_StorageTransferService_GetTransferJob_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
