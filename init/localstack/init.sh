#!/bin/bash

awslocal configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile=localstack
awslocal configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile=localstack
awslocal configure set region $DEFAULT_REGION --profile=localstack

export AWS_DEFAULT_PROFILE=localstack
export QUEUE_NAME=transactions
export QUEUE_ARN='arn:aws:sqs:'$DEFAULT_REGION':000000000000:'$QUEUE_NAME
export DLQ_NAME=transactions-dlq
export DLQ_ARN='arn:aws:sqs:'$DEFAULT_REGION':000000000000:'$DLQ_NAME

awslocal sqs create-queue --queue-name $DLQ_NAME

awslocal sqs create-queue --queue-name $QUEUE_NAME --attributes '{"RedrivePolicy":"{\"deadLetterTargetArn\":\"'$DLQ_ARN'\",\"maxReceiveCount\":\"3\"}"}'

awslocal events put-rule --name transaction --event-pattern '{"source": ["olympus-banking.plutus"], "detail-type": ["transaction"]}'

awslocal events put-targets --rule transaction --event-bus-name default --targets '[{"Id":"hermes","Arn":"'$QUEUE_ARN'"}]'

# awslocal events put-events --entries '[{"Source": "olympus-banking.plutus", "DetailType": "transaction", "Detail": "{\"accountId\": \"12345\", \"amount\": 100.0}"}]'
# awslocal sqs receive-message --queue-url http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/transactions