import request from '@/utils/request'
export function postVerse(data) {
  return request({
    url: 'v1/verses',
    method: 'post',
    data: data
  })
}

export function getVerse(id, expand = 'metas,share') {
  return request({
    url: 'v1/verses/' + id + '?expand=' + expand,
    method: 'get'
  })
}

export function getVersesWithShare(
  sort = '-created_at',
  search = '',
  page = 0,
  expand = 'image,author'
) {
  let url = 'v1/verses/share?expand=' + expand + '&sort=' + sort

  if (search !== '') {
    url += '&VerseSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function getVersesWithOpen(
  sort = '-created_at',
  search = '',
  page = 0,
  expand = 'image,author'
) {
  let url = 'v1/verses/open?expand=' + expand + '&sort=' + sort

  if (search !== '') {
    url += '&VerseSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function getVerses(
  sort = '-created_at',
  search = '',
  page = 0,
  expand = 'image,author'
) {
  let url = 'v1/verses/publish?expand=' + expand + '&sort=' + sort

  if (search !== '') {
    url += '&VerseSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function putVerse(id, data) {
  return request({
    url: 'v1/verses/' + id,
    method: 'put',
    data
  })
}
export function deleteVerse(id) {
  return request({
    url: 'v1/verses/' + id,
    method: 'delete'
  })
}
