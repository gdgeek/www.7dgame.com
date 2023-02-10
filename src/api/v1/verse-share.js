import request from '@/utils/request'

var qs = require('querystringify')
var path = require('path')
export function postVerseShare(data) {
  const url = path.join('v1', 'verse-shares')

  return request({
    url,
    method: 'post',
    data
  })
}

export function getVerseShares(
  sort = '-created_at',
  search = '',
  page = 0,
  expand = 'image,author,share'
) {
  let query = []
  query['expand'] = expand
  query['sort'] = sort

  if (search !== '') {
    query['VerseSearch[name]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }

  return request({
    url: path.join('v1', 'verse-shares' + qs.stringify(query, true)),
    method: 'get'
  })
}

export function getVerseShareList(verseId) {
  return request({
    url: 'v1/verse-shares/list?verse_id=' + verseId,
    method: 'get'
  })
}
export function deleteVerseShare(id) {
  return request({
    url: 'v1/verse-shares/' + id,
    method: 'delete'
  })
}
