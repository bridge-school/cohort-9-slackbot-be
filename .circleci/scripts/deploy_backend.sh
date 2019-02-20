#!/bin/sh -ex

set -ex

BUCKET=$1
FIREBASE_BUCKET=$2
TEAM_NAME=$3
aws s3 cp s3://"${FIREBASE_BUCKET}/${TEAM_NAME}-firebase.json" "firebase-credentials.json"

git archive -v -o artifact.zip --format=zip HEAD
zip -rv artifact.zip firebase-credentials.json

aws s3 sync artifact.zip s3://"${BUCKET}"