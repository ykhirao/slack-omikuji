;(async () => {
  require('dotenv').config()

  const { App } = require('@slack/bolt')
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
  })

  async function getUsersInAGroup(groupId) {
    const result = await app.client.usergroups.users.list({
      token: process.env.SLACK_USER_TOKEN,
      usergroup: groupId
    })

    return result.users
  }

  async function getRandomUserName(users) {
    const user = users[Math.floor(Math.random() * users.length)]

    const result = await app.client.users.info({
      token: process.env.SLACK_USER_TOKEN,
      user
    })

    return result.user.name
  }

  async function getGroupId(payload) {
    return payload.text.replace('<!subteam^', '').split('|@')[0]
  }

  /*
   * payload { text: "<!subteam^SSCPK9SV8|@sample-test>"}
   */
  app.command('/omikuji', async ({ ack, payload, say }) => {
    ack()

    const groupId = await getGroupId(payload).catch(() => {
      say('グループメンションが読み取れない。Why?')
      return
    })

    const users = await getUsersInAGroup(groupId).catch(() => {
      say('GroupからUsers取れなかった。')
      return
    })

    const name = await getRandomUserName(users).catch(() => {
      say('User1名さま選べなかったよ。ごめんな。')
      return
    })

    say(name)

    console.log('Finish!!')
  })

  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
