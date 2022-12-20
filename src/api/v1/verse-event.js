import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')
export function postVerseEvent(data) {
  const url = path.join('v1', 'verse-events')
  alert(url)
  return request({
    url,
    method: 'post',
    data: data
  })
}

export function getVerseEvent(id) {
  return request({
    url: 'v1/verse-events/' + id,
    method: 'get'
  })
}
export function getVerseEventByVerseId(verseId) {
  return request({
    url: path.join('v1', 'verse-events' + qs.stringify({ verseId }, true)),
    method: 'get'
  })
}
export function getVerseEvents(sort = '-created_at', search = '', page = 0) {
  let query = []
  query['sort'] = sort

  if (search !== '') {
    query['VerseEventSearch[name]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }

  return request({
    url: path.join('v1', 'erse-events' + qs.stringify(query, true)),
    method: 'get'
  })
}

export function putVerseEvent(id, data) {
  return request({
    url: 'v1/verse-events/' + id,
    method: 'put',
    data: data
  })
}
export function deleteVerseEvent(id) {
  return request({
    url: 'v1/verse-events/' + id,
    method: 'delete'
  })
}
