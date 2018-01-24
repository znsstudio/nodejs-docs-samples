# Extend a generic Node image that uses GCF's Node version
FROM gcr.io/google-appengine/nodejs

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