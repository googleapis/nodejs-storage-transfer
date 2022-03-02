#!/bin/bash

# Copyright 2018 Google LLC
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
export AWS_ACCESS_KEY_ID=`gcloud secrets versions access latest --project cloud-devrel-kokoro-resources --secret=nodejs-cloud-integration-aws-access-key-id`
export AWS_SECRET_ACCESS_KEY=`gcloud secrets versions access latest --project cloud-devrel-kokoro-resources --secret=nodejs-cloud-integration-aws-secret-access-key`
