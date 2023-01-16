import request from '@/utils/request'
export function postPerson(data) {
  return request({
    url: 'v1/person',
    method: 'post',
    data: data
  })
}

export function deletePerson(id) {
  return request({
    url: 'v1/person/' + id,
    method: 'delete'
  })
}

export function putPerson(id, data) {
  return request({
    url: 'v1/person/' + id,
    method: 'put',
    data
  })
}

export function getPerson(sort = '-created_at', search = null, page = 0) {
  let url = 'v1/person?expand=data,roles&sort=' + sort

  if (search) {
    url += '&PersonSearch[username]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }
  return request({
    url,
    method: 'get'
  })
}
