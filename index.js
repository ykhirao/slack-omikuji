require('dotenv').config()

const { App } = require('@slack/bolt')
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me'
          },
          action_id: 'button_click'
        }
      }
    ]
  })
})

app.action('button_click', ({ body, ack, say }) => {
  // Acknowledge the action
  ack()
  say(`<@${body.user.id}> clicked the button`)
})

app.message('wake me up', async ({ message, context }) => {
  try {
    // トークンを用いて chat.scheduleMessage 関数を呼び出す
    const result = await app.client.chat.scheduleMessage({
      // アプリの初期化に用いたトークンを `context` オブジェクトに保存
      token: context.botToken,
      channel: message.channel.id,
      post_at: whenSeptemberEnds,
      text: 'Summer has come and passed'
    })
  } catch (error) {
    console.error(error)
  }
})
;(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
})()
