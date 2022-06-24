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

function main(projectId) {
  // [START storagetransfer_v1_generated_StorageTransferService_ListAgentPools_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The ID of the Google Cloud project that owns the job.
   */
  // const projectId = 'abc123'
  /**
   *  An optional list of query parameters specified as JSON text in the
   *  form of:
   *  `{"agentPoolNames":"agentpool1","agentpool2",... }`
   *  Since `agentPoolNames` support multiple values, its values must be
   *  specified with array notation. When the filter is either empty or not
   *  provided, the list returns all agent pools for the project.
   */
  // const filter = 'abc123'
  /**
   *  The list page size. The max allowed value is `256`.
   */
  // const pageSize = 1234
  /**
   *  The list page token.
   */
  // const pageToken = 'abc123'

  // Imports the Storagetransfer library
  const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer').v1;

  // Instantiates a client
  const storagetransferClient = new StorageTransferServiceClient();

  async function callListAgentPools() {
    // Construct request
    const request = {
      projectId,
    };

    // Run request
    const iterable = await storagetransferClient.listAgentPoolsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListAgentPools();
  // [END storagetransfer_v1_generated_StorageTransferService_ListAgentPools_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
