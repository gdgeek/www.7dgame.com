import request from '@/utils/request'
export function postLike(user_id, message_id) {
  const data = { user_id, message_id }
  return request({
    url: 'v1/likes',
    method: 'post',
    data: data
  })
}

export function removeLike(user_id, message_id) {
  return request({
    url: 'v1/likes/0?message_id=' + message_id + '&user_id=' + user_id,
    method: 'delete'
  })
}

export function isLike(user_id, message_id) { // 我是否like
  return request({
    url:
      'v1/likes?LikeSearch[message_id]=' +
      message_id +
      '&LikeSearch[user_id]=' +
      user_id,
    method: 'get'
  })
}

export function getMessagesWithLiker(
  liker,
  sorted = '-created_at',
  search = null,
  page = 0
) {
  let url = 'v1/messages?expand=author,messageTags&sort=' + sorted
  if (!isNaN(liker)) {
    url += '&liker=' + liker
  }
  if (search) {
    url += '&MessageSearch[title]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}
