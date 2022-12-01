import request from '@/utils/request'
import { v4 as uuidv4 } from 'uuid'
var qs = require('querystringify')
var path = require('path')
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

export function postAudio(data) {
  data.type = 'audio'
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
export function deleteAudio(id) {
  return deleteResources(id)
}

function putResources(id, resource) {
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
export function putAudio(id, audio) {
  return putResources(id, audio)
}

function getResources(
  type,
  sort = '-created_at',
  search = '',
  page = 0,
  expand = 'image,author'
) {
  let query = []
  query['type'] = type
  query['expand'] = expand
  query['sort'] = sort

  if (search !== '') {
    query['ResourceSearch[name]'] = search
  }
  if (page > 1) {
    query['page'] = page
  }

  return request({
    url: path.join('resources' + qs.stringify(query, true)),
    method: 'get'
  })
}
/*
export function getResourceList() {
  return request({
    url: '/resources',
    method: 'get'
  })
}*/
export function postPolygens(sort = '-created_at', search = '', page = 0) {
  return getResources('polygen', sort, search, page)
}
export function getPictures(sort = '-created_at', search = '', page = 0) {
  return getResources('picture', sort, search, page)
}
export function getVideos(sort = '-created_at', search = '', page = 0) {
  return getResources('video', sort, search, page)
}
export function getAudio(sort = '-created_at', search = '', page = 0) {
  return getResources('audio', sort, search, page)
}

function getResource(type, id) {
  return request({
    url: '/resources/' + id + '?expand=image,file,author&type=' + type,
    method: 'get'
  })
}
export function getPolygen(id) {
  return getResource('polygen', id)
}
export function getPicture(id) {
  return getResource('picture', id)
}
export function getVideoOne(id) {
  return getResource('video', id)
}
export function getAudioOne(id) {
  return getResource('audio', id)
}
