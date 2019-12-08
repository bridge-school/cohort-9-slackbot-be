# How to Use Ngrok to Expose our LocalHost to the Wild West

## Why Ngrok? 
During development, we need to expose our localhost to the Internet in exchange for an URL that Slack can make POST requests to. 

## Download and SetUp Ngrok
Please follow the steps here: https://api.slack.com/tutorials/tunneling-with-ngrok

## Step 1: 
After downloading, please start Ngrok with ```./ngrok http 8001``` (this port number should match the one we are listening to in the backend, in our case, e.g. 8001).

## Step 2: 
Update Slack with the URL here: https://api.slack.com/apps/AQ9UKE13M/interactive-messages. The request URL should be the ```NgrokURL + /responses```. 

## Alternatives to Ngrok
Localtunnel (https://github.com/localtunnel/localtunnel) has been added as a package. Just run ```lt --port 8001 --subdomain slackbot```
