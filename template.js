const template = {
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'My App',
    emoji: true
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true
  },
  close: {
    type: 'plain_text',
    text: 'Cancel',
    emoji: true
  },
  blocks: [
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'input',
      element: {
        type: 'multi_static_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select options',
          emoji: true
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: '*this is plain_text text*',
              emoji: true
            },
            value: 'value-0'
          },
          {
            text: {
              type: 'plain_text',
              text: '*this is plain_text text*',
              emoji: true
            },
            value: 'value-1'
          },
          {
            text: {
              type: 'plain_text',
              text: '*this is plain_text text*',
              emoji: true
            },
            value: 'value-2'
          }
        ]
      },
      label: {
        type: 'plain_text',
        text: 'Label',
        emoji: true
      }
    },
    {
      type: 'input',
      element: {
        type: 'users_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select a user',
          emoji: true
        }
      },
      label: {
        type: 'plain_text',
        text: 'Label',
        emoji: true
      }
    },
    {
      type: 'input',
      element: {
        type: 'plain_text_input'
      },
      label: {
        type: 'plain_text',
        text: 'Label',
        emoji: true
      }
    }
  ]
}

module.exports.template = template
