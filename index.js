;(async () => {
  require('dotenv').config()

  let groups
  const { App } = require('@slack/bolt')
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
  })

  async function getGroups() {
    const result = await app.client.usergroups
      .list({
        token: process.env.SLACK_USER_TOKEN,
        include_users: true
      })
      .catch(error => console.log(error))
    if (!result.ok) {
      console.log(`OK FALSE: ${result.error}`)
      return []
    }

    const groups = await result.usergroups.map(group => {
      return {
        id: group.id,
        name: group.handle,
        users: group.users,
        count: group.user_count
      }
    })

    return groups
  }

  async function getUser(user) {
    const names = await Promise.all(
      users.map(async user => {
        const result = await app.client.users
          .info({
            token: process.env.SLACK_USER_TOKEN,
            user: user
          })
          .catch(error => console.log(error))
        if (!result || !result.ok) {
          console.log(`OK FALSE`)
          return undefined
        }

        return result.user.name
      })
    )

    return names.filter(i => !!i)
  }

  /*
   * payload { text: "<!subteam^SSCPK9SV8|@sample-test>"}
   */
  app.command('/omikuji', async ({ ack, payload, say }) => {
    ack()
    console.log('/omikuji is 🔥')

    groups = await getGroups()
    console.log('⚡️ Get groups!')

    console.log(payload)
    // <!subteam^SSCPK9SV8|@sample-test>
    let groupId
    try {
      groupId = payload.text.replace('<!subteam^', '').split('|@')[0]
    } catch (e) {
      // say('グループメンションが読み取れない。')
      return
    }

    users = groups.find(g => {
      return g.id === groupId
    })

    console.log(users)

    console.log('finish!!!')
  })

  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
