import request from '@/utils/request'
export function postMeta(data) {
  return request({
    url: 'v1/metas',
    method: 'post',
    data: data
  })
}

export function getMeta(id) {
  return request({
    url: 'v1/metas/' + id + '?expand=verse,share',
    method: 'get'
  })
}
export function getMetas(sort = '-created_at', search = '', page = 0) {
  let url = 'v1/metas?expand=image,author&sort=' + sort

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

export function putMeta(id, data) {
  return request({
    url: 'v1/metas/' + id,
    method: 'put',
    data: data
  })
}
export function deleteMeta(id) {
  return request({
    url: 'v1/metas/' + id,
    method: 'delete'
  })
}
