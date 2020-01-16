# slack-omikuji

SlackAPI を使ってメンバーのおみくじを引く

```
export SLACK_SIGNING_SECRET=<your-signing-secret>
export SLACK_BOT_TOKEN=xoxb-<your-bot-token>
```

## API methods

Need follow auth

```
usergroups.list (usergroups:read)
users.info (users:read)
```

search https://api.slack.com/methods

## set post url

like https://414f5daf.ngrok.io/slack/events
