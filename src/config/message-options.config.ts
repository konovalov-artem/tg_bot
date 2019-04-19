import { CallbackQueryType } from '../modules/bot/enums'

export default {
  newSubscribe: {
    reply_markup: {
      inline_keyboard: [
        [{
          url: 'https://auto.ria.com/advanced-search/',
          text: 'Auto.ria.com'
        }],
        [{
          url: 'https://www.olx.ua/',
          text: 'Olx.ua'
        }],
        [{
          url: 'https://rabota.ua/jobsearch/vacancy_list',
          text: 'Rabota.ua'
        }]
      ]
    },
    disable_web_page_preview: true
  },
  menu: {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Новая подписка',
          callback_data: CallbackQueryType.NEW_SUBSCRIBE
        }, {
          text: 'Мои подписки',
          callback_data: CallbackQueryType.MY_SUBSCRIBES
        }]
      ]
    }
  },
  deleteSubscribe: {
    reply_markup: {
      inline_keyboard: [
        [{
          text: '⬆️ Удалить',
          callback_data: CallbackQueryType.DELETE_SUBSCRIBE
        }]
      ]
    },
    disable_web_page_preview: true,
    parse_mode: 'HTML',
    disable_notification: true
  },
  disableWebPagePreview: {
    disable_web_page_preview: true
  },
  doNotHaveSubscribes: {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Новая подписка',
          callback_data: CallbackQueryType.NEW_SUBSCRIBE
        }]
      ]
    }
  }
}
