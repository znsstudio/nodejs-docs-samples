#!/bin/bash
# Shell script to emulate/deploy all Cloud Functions in the file

${FUNCTIONS_CMD} deploy set --trigger-http -p ${GCLOUD_PROJECT}
echo '-----------------------------'
${FUNCTIONS_CMD} deploy get --trigger-http -p ${GCLOUD_PROJECT}
echo '-----------------------------'
${FUNCTIONS_CMD} deploy del --trigger-http -p ${GCLOUD_PROJECT}
