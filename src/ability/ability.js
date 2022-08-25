import { AbilityBuilder, Ability } from '@casl/ability'

import environment from '@/environment.js'
export class AbilityRouter {
  constructor(path) {
    this.path = path
  }
}
export class AbilityShare {
  constructor(share) {
    this.share = share != null
  }
}
export class AbilityWorks {
  constructor(id) {
    this.id = id
  }
}

export class AbilityMessage {
  constructor(id, managed) {
    this.id = id
    this.managed = managed
  }
}
export function UpdateAbility($ability, roles, userId) {
  const { can, rules } = new AbilityBuilder(Ability)
  if (roles === null) {
    roles = []
  }

  let router = []
  let menu = []

  router = router.concat([
    '/site',
    '/site/logout',
    '/site/index',
    '/site/wechat-signup',
    '/site/binded-email',
    '/404',
    '/test',
    /^\/test[\/]/
  ])

  if (!environment.local) {
    router.push(/^\/web[\/]/)
  } else {
    router.push(/^\/setup[\/]/)
  }

  if (
    roles.find(role => role === 'root' || role === 'manager' || role === 'user')
  ) {
    can(['share'], AbilityShare.name, { share: true })
    can(['update', 'delete'], AbilityWorks.name, { id: userId })
    can(['delete'], AbilityMessage.name, { id: userId, managed: 0 })
    can(['update'], AbilityMessage.name, { id: userId })

    router = router.concat([
      '/verse/editor',
      '/verse/meta/editor',
      '/verse/code'
    ])
    menu = menu.concat([
      '/site/logout',
      '/resource/',
      /^\/polygen[\/]/,
      /^\/picture[\/]/,
      /^\/video[\/]/,
      /^\/home[\/]/,
      /^\/verse[\/]/,
      /^\/settings[\/]/,
      /^\/discovery[\/]/,
      /^\/community[\/]/
    ])

    if (roles.find(role => role === 'root' || role === 'manager')) {
      can(['manager'])
      can(['share'], AbilityShare.name)
      can(['update', 'delete'], AbilityWorks.name)
      can(['delete'], AbilityMessage.name, { managed: 0 })
      can(['update'], AbilityMessage.name)

      menu = menu.concat(['/verse-share/open', /^\/trades[\/]/])

      if (roles.find(role => role === 'root')) {
        can(['root'])
        menu = menu.concat([/^\/manager[\/]/])
      }
    }
  }

  menu.forEach(item => {
    if (typeof item === 'string') {
      can(['open', 'goto'], AbilityRouter.name, { path: item })
    } else {
      can(['open', 'goto'], AbilityRouter.name, { path: { $regex: item } })
    }
  })
  router.forEach(item => {
    if (typeof item === 'string') {
      can('goto', AbilityRouter.name, { path: item })
    } else {
      can('goto', AbilityRouter.name, { path: { $regex: item } })
    }
  })

  /*
  if (roles.find(role => role === 'root')) {
    // 根用户
    can(['root'])
    const menu = [/^\/manager[\/]/]

    menu.forEach(item => {
      if (typeof item === 'string') {
        can(['open', 'goto'], AbilityRouter.name, { path: item })
      } else {
        can(['open', 'goto'], AbilityRouter.name, { path: { $regex: item } })
      }
    })
  }

  if (roles.find(role => role === 'root' || role === 'manager')) {
    // 管理员
    can(['manager'])
    const manager = ['/verse-share/open', /^\/trades[\/]/]
    manager.forEach(item => {
      if (typeof item === 'string') {
        can(['open', 'goto'], AbilityRouter.name, { path: item })
      } else {
        can(['open', 'goto'], AbilityRouter.name, { path: { $regex: item } })
      }
    })

    can(['share'], AbilityShare.name)
    can(['update', 'delete'], AbilityWorks.name)

    can(['delete'], AbilityMessage.name, { managed: 0 })
    can(['update'], AbilityMessage.name)
  }

  if (
    roles.find(role => role === 'root' || role === 'manager' || role === 'user')
  ) {
    can(['share'], AbilityShare.name, { share: true })
    can(['update', 'delete'], AbilityWorks.name, { id: userId })
    //share
    can(['delete'], AbilityMessage.name, { id: userId, managed: 0 })
    can(['update'], AbilityMessage.name, { id: userId })

    const menu = [
      '/site/logout',
      '/resource/',
      /^\/polygen[\/]/,
      /^\/picture[\/]/,
      /^\/video[\/]/,
      /^\/home[\/]/,
      /^\/verse[\/]/,
      /^\/settings[\/]/,
      /^\/discovery[\/]/,
      /^\/community[\/]/
    ]

    menu.forEach(item => {
      if (typeof item === 'string') {
        can(['open', 'goto'], AbilityRouter.name, { path: item })
      } else {
        can(['open', 'goto'], AbilityRouter.name, { path: { $regex: item } })
      }
    })

    const router = ['/verse/editor', '/verse/meta/editor', '/verse/code']

    router.forEach(item => {
      if (typeof item === 'string') {
        can(['goto'], AbilityRouter.name, { path: item })
      } else {
        can(['goto'], AbilityRouter.name, { path: { $regex: item } })
      }
    })
  }
*/
  $ability.update(rules)
}
