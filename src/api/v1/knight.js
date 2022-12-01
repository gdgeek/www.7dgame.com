import request from '@/utils/request'
import path from 'path'
import url from 'url'

export function postKnight(data) {
  return request({
    url: '/v1/knights',
    method: 'post',
    data
  })
}
export async function getKnights(
  sort = '-created_at',
  search = null,
  page = 0,
  expand = 'image, author'
) {
  return new Promise(async function (resolve, reject) {
    try {
      let query = {
        expand,
        sort
      }
      if (search !== null) {
        query['KnightSearch[title]'] = search
      }
      if (page > 1) {
        query['page'] = page
      }

      const response = await request({
        url: url.format({
          pathname: '/v1/knights',
          query
        }),
        method: 'get'
      })

      resolve(response)
    } catch (err) {
      reject(err)
    }
  })
}
export function getKnight(id, query = {}) {
  return request({
    url: url.format({
      pathname: path.join('/v1/knights', id.toString()),
      query
    }),
    method: 'get'
  })
}

export function deleteKnight(id) {
  return request({
    url: path.join('/v1/knights', id.toString()),
    method: 'delete'
  })
}
export function putKnight(id, data) {
  return request({
    url: path.join('/v1/knights', id.toString()),
    method: 'put',
    data
  })
}
