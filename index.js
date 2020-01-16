require('dotenv').config()

const { App } = require('@slack/bolt')
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.command('/omikuji', async ({ message, context, ack, say }) => {
  ack()

  const result = await app.client.usergroups
    .list({
      token: process.env.SLACK_USER_TOKEN,
      include_users: true
    })
    .catch(error => console.log(error))
  if (!result.ok) {
    console.log(`OK FALSE: ${result.error}`)
  }
  console.log(result.usergroups)
  say('finish')
})
;(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
})()
