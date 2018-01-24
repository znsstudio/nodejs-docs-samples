# Extend a generic Node image that uses GCF's Node version
FROM launcher.gcr.io/google/ubuntu16_04

# Install gcloud
RUN apt-get -y update && \
    apt-get -y install gcc python2.7 python-dev python-setuptools wget ca-certificates \
       # These are necessary for add-apt-respository
       software-properties-common python-software-properties && \

    # Install Git >2.0.1
    add-apt-repository ppa:git-core/ppa && \
    apt-get -y update && \
    apt-get -y install git && \

    # Setup Google Cloud SDK (latest)
    mkdir -p /builder && \
    wget -qO- https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz | tar zxv -C /builder && \
    CLOUDSDK_PYTHON="python2.7" /builder/google-cloud-sdk/install.sh --usage-reporting=false \
        --bash-completion=false \
        --disable-installation-options && \

    # Install additional components
    /builder/google-cloud-sdk/bin/gcloud -q components install \
        beta &&
    /builder/google-cloud-sdk/bin/gcloud -q components update

ENV PATH=/builder/google-cloud-sdk/bin/:$PATH

# Copy user files
ADD . /gcf/
WORKDIR /gcf

# Install user dependencies
# RUN npm install

# TODO(developer)
# Optional: add your own custom Docker commands here

# Run your tests
# RUN npm run test

# Deploy to Cloud Functions, if your tests pass
RUN gcloud beta functions deploy helloGET --trigger-http