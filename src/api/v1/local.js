import request from '@/utils/request'

export function information() {
  return request({
    url: 'v1/locals/information',
    method: 'get'
  })
}

export function ready() {
  return request({
    url: 'v1/locals/ready',
    method: 'get'
  })
}

export function signup(data) {
  return request({
    url: 'v1/locals/signup',
    method: 'post',
    data
  })
}
