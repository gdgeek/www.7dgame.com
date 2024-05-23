import request from '@/utils/request'
export function postVpGuide(data) {
  return request({
    url: 'v1/vp-guides',
    method: 'post',
    data: data
  })
}


export function getVpGuide(id) {
  return request({
    url: 'v1/vp-guides/' + id,
    method: 'get'
  })

}
export function getVpGuides() {
  return request({
    url: 'v1/vp-guides',
    method: 'get'
  })
}

export function putVpGuide(id, data) {
  return request({
    url: 'v1/vp-guides/' + id,
    method: 'put',
    data
  })
}
export function deleteVpGuide(id) {
  return request({
    url: 'v1/vp-guides/' + id,
    method: 'delete'
  })
}
