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
/*
export function getMetaEvent(id) {
  return request({
    url: 'v1/meta-events/' + id,
    method: 'get'
  })

export function getEventNodeByMetaId(metaId) {
  return request({
    url: path.join(
      'v1',
      'event-nodes' + qs.stringify({ meta_id: metaId }, true)
    ),
    method: 'get'
  })
}

export function getMetaEvents(sort = '-created_at', search = '', page = 0) {
  let url = 'v1/meta-events?sort=' + sort

  if (search !== '') {
    url += '&MetaEventSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function putMetaEvent(id, data) {
  return request({
    url: 'v1/meta-events/' + id,
    method: 'put',
    data: data
  })
}
export function deleteMetaEvent(id) {
  return request({
    url: 'v1/meta-events/' + id,
    method: 'delete'
  })
}
*/
