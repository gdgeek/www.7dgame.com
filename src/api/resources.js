import request from '@/utils/request'
import { v4 as uuidv4 } from 'uuid'
function postResources(data) {
  data.uuid = uuidv4()
  console.error(data)
  return request({
    url: '/resources',
    method: 'post',
    data
  })
}
export function postPolygen(data) {
  data.type = 'polygen'
  return postResources(data)
}

export function postPicture(data) {
  data.type = 'picture'
  return postResources(data)
}

export function postVideo(data) {
  data.type = 'video'
  return postResources(data)
}
function deleteResources(id) {
  return request({
    url: '/resources/' + id,
    method: 'delete'
  })
}
export function deletePolygen(id) {
  return deleteResources(id)
}

export function deletePicture(id) {
  return deleteResources(id)
}
export function deleteVideo(id) {
  return deleteResources(id)
}
function putResources(id, resource) {
  console.log('resource')
  return request({
    url: '/resources/' + id,
    method: 'put',
    data: resource
  })
}

export function putPolygen(id, polygen) {
  return putResources(id, polygen)
}
export function putPicture(id, picture) {
  return putResources(id, picture)
}
export function putVideo(id, video) {
  return putResources(id, video)
}

function getResources(type, sort = '-created_at', search = '', page = 0) {
  let url = '/resources?expand=image,author&type=' + type + '&sort=' + sort

  if (search !== '') {
    url += '&ResourceSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}
export function getResourceList() {
  return request({
    url: '/resources',
    method: 'get'
  })
}
export function getPolygen(sort = '-created_at', search = '', page = 0) {
  return getResources('polygen', sort, search, page)
}
export function getPicture(sort = '-created_at', search = '', page = 0) {
  return getResources('picture', sort, search, page)
}
export function getVideo(sort = '-created_at', search = '', page = 0) {
  return getResources('video', sort, search, page)
}

function getResourcesOne(type, id) {
  return request({
    url: '/resources/' + id + '?expand=image,file,author&type=' + type,
    method: 'get'
  })
}
export function getPolygenOne(id) {
  return getResourcesOne('polygen', id)
}
export function getPictureOne(id) {
  return getResourcesOne('picture', id)
}
export function getVideoOne(id) {
  return getResourcesOne('video', id)
}
