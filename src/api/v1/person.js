import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')
export function postPerson(data) {
  return request({
    url: 'v1/people',
    method: 'post',
    data: data
  })
}

export function deletePerson(id) {
  return request({
    url: 'v1/people/' + id,
    method: 'delete'
  })
}

export function putPerson(id, data) {
  return request({
    url: 'v1/people/' + id,
    method: 'put',
    data
  })
}

export function getPerson(
  sort = '-created_at',
  search = null,
  page = 0,
  expand = 'data,roles'
) {
  let query = []
  query['expand'] = expand
  query['sort'] = sort

  if (search !== '') {
    query['PersonSearch[username]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }
  return request({
    url: path.join('v1', 'people' + qs.stringify(query, true)),
    method: 'get'
  })
}
