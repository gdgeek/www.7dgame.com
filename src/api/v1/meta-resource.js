import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')

export function postMetaResource(data) {
  const url = path.join('v1', 'meta-resources')
  return request({
    url,
    method: 'post',
    data: data
  })
}

export function getMetaResource(id) {
  const url = path.join('v1', 'meta-resources', id.toString())
  return request({
    url,
    method: 'get'
  })
}
export function getMetaResource(
  sort = '-created_at',
  search = '',
  page = 0,
  expand = ''
) {
  let query = []
  query['expand'] = expand
  query['sort'] = sort

  if (search !== '') {
    query['MetaResourceSearch[name]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }

  const url = path.join('v1', 'meta-resources' + qs.stringify(query, true))

  return request({
    url,
    method: 'get'
  })
}

export function putMetaResource(id, data) {
  const url = path.join('v1', 'meta-resources', id.toString())
  return request({
    url,
    method: 'put',
    data: data
  })
}
export function deleteMetaResource(id) {
  const url = path.join('v1', 'meta-resources', id.toString())
  return request({
    url,
    method: 'delete'
  })
}
