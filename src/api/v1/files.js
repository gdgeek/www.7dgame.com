import request from '@/utils/request'
var qs = require('querystringify')
var path = require('path')

export function postFile(data) {
  const url = path.join('v1', 'files')

  data.url = convertToHttps(data.url)

  return request({
    url,
    method: 'post',
    data
  })
}
