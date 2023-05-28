import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')

export function postEventLink(data) {
  const url = path.join('v1', 'event-links')
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteEventLink(id) {
  const url = path.join('v1', 'event-links', id.toString())
  return request({
    url,
    method: 'delete'
  })
}
