import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')

export function deletePrefab(id) {
  return request({
    url: path.join('v1', 'metas', id.toString()),
    method: 'delete'
  })
}
export function postPrefab(data) {
  return request({
    url: path.join('v1', 'metas'),
    method: 'post',
    data
  })
}
/*
export function getMeta(id, expand = '') {
  return request({
    url: path.join(
      'v1',
      'metas',
      id.toString() + qs.stringify({ expand: expand }, true)
    ),
    method: 'get'
  })
}*/
export function getPrefabs(
  sort = '-created_at',
  search = '',
  page = 0,
  expand = 'image,author'
) {
  let query = []
  if (sort === 'name') {
    sort = 'title'
  } else if (sort === '-name') {
    sort = '-title'
  }
  query['expand'] = expand
  query['sort'] = sort

  if (search !== '') {
    query['MetaSearch[title]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }

  return request({
    url: path.join('v1', 'prefabs' + qs.stringify(query, true)),
    method: 'get'
  })
}
/*
export function putMeta(id, data) {
  return request({
    url: path.join('v1', 'metas', id.toString()),
    method: 'put',
    data
  })
}

*/