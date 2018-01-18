# Extend a generic Node image
FROM gcr.io/cloud-docs-samples/base

# Install user dependencies
RUN npm install

# TODO(developer)
# Optional: add your own Docker commands here

# Run your tests
CMD npm run test

# Deploy to Cloud Functions, if your tests pass
CMD gcloud beta functions deploy [YOUR_FUNCTION_NAME] [YOUR_FUNCTION_TRIGGER]