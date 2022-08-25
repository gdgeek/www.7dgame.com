import request from '@/utils/request'
export function postVerseShare(data) {
  return request({
    url: 'v1/verse-shares',
    method: 'post',
    data
  })
}

export function getVerseShare(verseId) {
  return request({
    url: 'v1/verse-shares?verse_id=' + verseId,
    method: 'get'
  })
}

export function delVerseShare(userId, verseId) {
  return request({
    url: 'v1/verse-shares/0?user_id=' + userId + '&verse_id=' + verseId,
    method: 'delete'
  })
}
