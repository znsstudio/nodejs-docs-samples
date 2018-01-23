# Extend a generic Node image that uses GCF's Node version
FROM node:6.12.3-wheezy

# Install gcloud (from https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu)
RUN apt-get install lsb_release
RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update && apt-get install google-cloud-sdk

# Install user dependencies
RUN npm install

# TODO(developer)
# Optional: add your own custom Docker commands here

# Run your tests
CMD npm run test

# Deploy to Cloud Functions, if your tests pass
CMD gcloud beta functions deploy [YOUR_FUNCTION_NAME] [YOUR_FUNCTION_TRIGGER]