require('dotenv').config()
template = require('./template').template

const { App } = require('@slack/bolt')
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

async function getGroups() {
  const result = await app.client.users
    .info({
      token: process.env.SLACK_USER_TOKEN,
      include_users: true
    })
    .catch(error => console.log(error))
  if (!result.ok) {
    console.log(`OK FALSE: ${result.error}`)
    return []
  }

  const groups = result.usergroups.map(group => {
    return {
      id: group.id,
      name: group.handle,
      users: group.users,
      count: group.user_count
    }
  })

  return groups
}

async function getUsers(users) {
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

app.command('/omikuji', async ({ command, ack, say }) => {
  ack()

  // const groups = await getGroups()
  // console.log(groups)
  // const i = getUsers().then(data => console.log(data))

  // say('test')
  console.log('finish!!!')
})
;(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
})()
