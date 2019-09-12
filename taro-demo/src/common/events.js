/**
 * @file 事件中心
 */

import Taro, { Events } from '@tarojs/taro'

const events = new Events()

let uid = 0

const eventsCenter = {
  global: Taro.eventCenter
}

export const setEvents = value => {
  const key = `events-key${uid++}`
  events[key] = value
  return value
}

export const getEvents = key => {
  return eventsCenter[key] || new Events()
}

export const globalEventsName = {
  EVENT_CHANGE_COM_DATA: 'EVENT_CHANGE_COM_DATA',
  EVENT_LISTEN_TOUCH_MOVE: 'EVENT_LISTEN_TOUCH_MOVE',
  EVENT_LISTEN_TOUCH_END: 'EVENT_LISTEN_TOUCH_END',
  EVENT_LISTEN_SCROLL: 'EVENT_LISTEN_SCROLL'
}