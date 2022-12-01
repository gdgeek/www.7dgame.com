import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')
export function postMeta(data) {
  return request({
    url: path.join('v1', 'metas'),
    method: 'post',
    data
  })
}

export function getMeta(id, expand = 'verse,share') {
  return request({
    url: path.join(
      'v1',
      'metas',
      id.toString() + qs.stringify({ expand: expand }, true)
    ),
    method: 'get'
  })
}
export function getMetas(
  sort = '-created_at',
  search = '',
  page = 0,

  expand = 'image,author'
) {
  let query = []
  query['expand'] = expand
  query['sort'] = sort

  if (search !== '') {
    query['MetaSearch[name]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }

  return request({
    url: path.join('v1', 'metas' + qs.stringify(query, true)),
    method: 'get'
  })
}

export function putMeta(id, data) {
  return request({
    url: path.join('v1', 'metas', id.toString()),
    method: 'put',
    data
  })
}
export function deleteMeta(id) {
  return request({
    url: path.join('v1', 'metas', id.toString()),
    method: 'delete'
  })
}
