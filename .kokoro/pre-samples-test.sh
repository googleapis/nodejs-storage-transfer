#!/bin/bash

# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Import secrets for AWS integration testing.
export STS_AWS_SECRET=`gcloud secrets versions access latest --project cloud-devrel-kokoro-resources --secret=nodejs-storagetransfer-aws`
export AWS_ACCESS_KEY_ID=`S="$STS_AWS_SECRET" node -p "JSON.parse(process.env.S).AccessKeyId"`
export AWS_SECRET_ACCESS_KEY=`S="$STS_AWS_SECRET" node -p "JSON.parse(process.env.S).SecretAccessKey"`

# Import secrets for Azure integration testing.
export STS_AZURE_SECRET=`gcloud secrets versions access latest --project cloud-devrel-kokoro-resources --secret=nodejs-storagetransfer-azure`
export AZURE_STORAGE_ACCOUNT=`S="$STS_AZURE_SECRET" node -p "JSON.parse(process.env.S).StorageAccount"`
export AZURE_CONNECTION_STRING=`S="$STS_AZURE_SECRET" node -p "JSON.parse(process.env.S).ConnectionString"`
export AZURE_SAS_TOKEN=`S="$STS_AZURE_SECRET" node -p "JSON.parse(process.env.S).SAS"`
