# Extend a generic Node image that uses GCF's Node version
FROM node:6.12.3-wheezy

# Install gcloud (from https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu)
RUN apt-get update && apt-get install lsb-release
RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update && apt-get install google-cloud-sdk

# Set variables required by gcloud
ENV CLOUDSDK_CORE_PROJECT nodejs-docs-samples
RUN gcloud config set account $CLOUDSDK_CORE_PROJECT@cloudbuild.gserviceaccount.com

# Copy user files
ADD . /gcf/
WORKDIR /gcf

# Install user dependencies
RUN npm install

# TODO(developer)
# Optional: add your own custom Docker commands here

# Run your tests
RUN npm run test

# Deploy to Cloud Functions, if your tests pass
RUN gcloud beta functions deploy helloGET --trigger-http