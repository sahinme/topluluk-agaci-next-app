import { Get, Post, GetServer } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_FAILURE, GET_HOME_POSTS_SUCCESS,
  GET_UNAUTHORIZED_POSTS_FAILURE, GET_UNAUTHORIZED_POSTS_REQUEST, GET_UNAUTHORIZED_POSTS_SUCCESS,
  SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS, GET_DAILY_TRENDS_REQUEST, GET_DAILY_TRENDS_SUCCESS, GET_DAILY_TRENDS_FAILURE
} from './actions';
import { LOADER_START, LOADER_END } from "../loader/actions";

function* getHomePostsSaga({ payload }) {
  try {
    if (payload.loaderStart) {
      yield put({ type: LOADER_START });

    }
    const response = yield call(payload.isServer ? GetServer : Get, `post/paged-home-posts?PageNumber=${payload.pageNumber}&PageSize=${payload.pageSize}`, {}, payload.token, false);
    if (response && !response.error) {
      yield put({ type: GET_HOME_POSTS_SUCCESS, payload: { ...response, isVoted: payload.isVoted } });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_HOME_POSTS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_HOME_POSTS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getDailyTrendsSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `post/paged-home-posts?PageNumber=${payload.pageNumber}&PageSize=${payload.pageSize}`, {}, payload.token, false);
    if (response && !response.error) {
      yield put({ type: GET_DAILY_TRENDS_SUCCESS, payload: { ...response, isVoted: payload.isVoted } });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_DAILY_TRENDS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_DAILY_TRENDS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getUnauthorizedPostsSaga({ payload }) {
	console.log('saga')
  try {
		console.log('start')
    yield put({ type: payload.loderStart ? LOADER_START : LOADER_END });
		const response = yield call(GetServer, `post/paged-unauthorized-home-post?PageNumber=${payload.pageNumber}&PageSize=${payload.pageSize}`, {}, null, false);
		console.log('requested')
    if (response && !response.error) {
      yield put({ type: GET_UNAUTHORIZED_POSTS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_UNAUTHORIZED_POSTS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
		console.log(error)
    yield put({ type: GET_UNAUTHORIZED_POSTS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* searchSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `community/search?text=${payload.text}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: SEARCH_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: SEARCH_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE, payload: error });
    yield put({ type: LOADER_END });

  }
}


export default function* Saga() {
  yield takeLatest(GET_HOME_POSTS_REQUEST, getHomePostsSaga);
  yield takeLatest(GET_UNAUTHORIZED_POSTS_REQUEST, getUnauthorizedPostsSaga);
  yield takeLatest(SEARCH_REQUEST, searchSaga);
  yield takeLatest(GET_DAILY_TRENDS_REQUEST, getDailyTrendsSaga);
}
