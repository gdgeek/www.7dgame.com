import request from '@/utils/request'

export function postFile(data) {
  // const file = { filename, md5, type, url }
  return request({
    url: '/files',
    method: 'post',
    data
  })
}

