# A Helpful (Hopefully) Note About Slack API Token

## Authorization with Slack API
Slack uses OAuth2.0 to verify user details and install apps onto their workspace. More details about OAuth2 are available here: https://api.slack.com/docs/oauth. 

## Tokens and Permission Scopes
After a painful process of getting our lovely bot (please note I have selected to have our bot available the `dev-cohort9-slackbot` channel) registered, we received two tokens. Each token comes with its own permission scopes (read more about them here https://api.slack.com/docs/oauth-scopes). The O_AUTH_ACCESS_TOKEN is used to read history from any channel/groups, and the BOT_USER_ACCESS_TOKEN is used to write to them. As painful as it sounds, we will have to switch between them depends on our interactions with Slack API. The issue is outlined in this Stack Overflow article (https://stackoverflow.com/questions/44048855/slack-bot-scope-missing-while-making-api-request).

## IMPORTANT: .env File
Both tokens are stored in the .env file. Please note, .env needs to strictly follow the following format: 
1. The filename should be .env. 
2. `dotenv` has been added to load environment variables into `process.env`. Please make sure to require it as early as possible in the file with `require('dotenv').config()` and with the file path passed in e.g. `dotenv.config({ path: '../../.env' });` when you are outside the root folder.  
3. Follow the "file writing rules" like PORT=8001, no need to wrap values in double/single quotes.