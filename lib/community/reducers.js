import { GET_POPULAR_LIST_REQUEST, GET_POPULAR_LIST_SUCCESS, GET_POPULAR_LIST_FAILURE, GET_USER_COMMUNITIES_REQUEST, GET_USER_COMMUNITIES_SUCCESS, GET_USER_COMMUNITIES_FAILURE, GET_ALL_COMMUNITY_REQUEST, GET_ALL_COMMUNITY_SUCCESS, GET_ALL_COMMUNITY_FAILURE, CREATE_COMMUNITY_REQUEST, CREATE_COMMUNITY_SUCCESS, CREATE_COMMUNITY_FAILURE } from './actions';

const initialState = {
  data: null,
  error: null,
  createResponse: { status: true, message: "" }
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_POPULAR_LIST_REQUEST:
      return { ...state, error: '' };
    case GET_POPULAR_LIST_SUCCESS:
      return { ...state, data: payload };
    case GET_POPULAR_LIST_FAILURE:
      return { ...state, error: payload };
    case GET_ALL_COMMUNITY_REQUEST:
      return { ...state, error: '' };
    case GET_ALL_COMMUNITY_SUCCESS:
      return { ...state, data: payload };
    case GET_ALL_COMMUNITY_FAILURE:
      return { ...state, error: payload };
    case CREATE_COMMUNITY_SUCCESS:
      return { ...state, createResponse: payload, };
    case CREATE_COMMUNITY_FAILURE:
      return { ...state, createResponse: payload };
    default:
      return state;
  }
}
