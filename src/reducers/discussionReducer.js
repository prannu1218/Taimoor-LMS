import discussionService from '../services/discussion'
import {
  GET_ALL_DISCUSSIONS,
  ADD_DISCUSSION,
  REMOVE_DISCUSSION,
  ADD_DCOMMENT,
  REMOVE_DCOMMENT
} from '../actions/discussion'
import { notification } from 'antd'

const discussionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_DISCUSSIONS:
      return action.data
    case ADD_DISCUSSION:
      return state.concat({ ...action.data })
    case REMOVE_DISCUSSION:
      return state.filter(val=>val._id!==action.data )
    case ADD_DCOMMENT || REMOVE_DCOMMENT:
      return state.map(val=>{
        if(val===action.data){return action.data}else{return val}
      })
    default:
      return state
  }
}

export const getAllDiscussions = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.getAllDiscussions(courseId)
      dispatch({ type: GET_ALL_DISCUSSIONS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load discussions check your connection"
      })
    }
  }
}

export const addDiscussion = (courseId, data) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.addDiscussion(courseId, data)
      dispatch({ type: ADD_DISCUSSION, data: response })
      notification.success({
        message: 'Posted successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't post check your connection"
      })
    }
  }
}

export const removeDiscussion = (id) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.removeDiscussion(id)
      if (response.status === 201) {
        dispatch({ type: REMOVE_DCOMMENT, data: id })
        notification.success({
          message: 'Posted successfully'
        })
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't remove check your connection"
      })
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.addComment(id, comment)
      dispatch({ type: ADD_DCOMMENT, data: response })
      notification.success({
        message: 'Comment Posted successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't post comment check your connection"
      })
    }
  }
}

export const removeComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.removeComment(id, comment)
      dispatch({ type: REMOVE_DCOMMENT, data: response })
      notification.success({
        message: 'Comment removed successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't remove comment check your connection"
      })
    }
  }
}


export default discussionReducer
