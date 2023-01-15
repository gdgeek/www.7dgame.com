import request from '@/utils/request'
var qs = require('querystringify')
var path = require('path')
export function postCyberScript(data) {
  return request({
    url: 'v1/cyber-scripts',
    method: 'post',
    data
  })
}

export function getCyberScript(id) {
  return request({
    url: 'v1/cyber-scripts/' + id,
    method: 'get'
  })
}

export function putCyberScript(id, data) {
  //alert(id)
  return request({
    url: 'v1/cyber-scripts/' + id,
    method: 'put',
    data
  })
}
export function deleteCyberScript(id) {
  return request({
    url: 'v1/cyber-scripts/' + id,
    method: 'delete'
  })
}
export function findCyberScript(cyber_id, language = 'lua') {
  return request({
    url: path.join(
      'v1/cyber-scripts',
      'find' + qs.stringify({ cyber_id, language }, true)
    ),
    method: 'get'
  })
}
