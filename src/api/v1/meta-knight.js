import request from '@/utils/request'
export function postMetaKnight(data) {
  return request({
    url: 'v1/meta-knights',
    method: 'post',
    data: data
  })
}

export function getMetaKnight(id) {
  return request({
    url: 'v1/meta-knights/' + id,
    method: 'get'
  })
}
export function getMetaKnights(sort = '-created_at', search = '', page = 0) {
  let url = 'v1/meta-knights?sort=' + sort

  if (search !== '') {
    url += '&MetaKnightSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function putMetaKnight(id, data) {
  return request({
    url: 'v1/meta-knights/' + id,
    method: 'put',
    data: data
  })
}
export function deleteMetaKnight(id) {
  return request({
    url: 'v1/meta-knights/' + id,
    method: 'delete'
  })
}
