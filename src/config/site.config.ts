export default {
  maxAdvCount: 100,
  removableUrlParams: ['page', 'search[order]', 'pg', 'search'],
  autoria: {
    selectors: {
      adverts: 'section.ticket-item',
      link: '.content-bar .m-link-ticket',
      title: '.content-bar .head-ticket .ticket-title > a > span'
    },
    attributes: {
      pageAttr: 'page',
      startPage: 0,
      startParams: {
        'sort[0].order': 'dates.created.desc',
        top: '1',
        size: '100'
      }
    }
  },
  olx: {
    selectors: {
      adverts: '#offers_table > tbody > tr.wrap > td.offer:not(.promoted)',
      link: '.marginright5.link.linkWithHash.detailsLink',
      title: 'h3.x-large.lheight20.margintop5 > a > strong'
    },
    attributes: {
      pageAttr: 'page',
      startPage: 1,
      startAttr: {
        view: 'list',
        'search[order]': 'created_at:desc'
      }
    }
  },
  rabota: {
    selectors: {
      adverts: '#content_vacancyList_gridList > tbody > tr[id]',
      link: 'h3 > a',
      title: 'h3 > a'
    },
    attributes: {
      pageAttr: 'pg',
      startPage: 1,
      startAttr: {
        period: '2'
      }
    }
  }
}
