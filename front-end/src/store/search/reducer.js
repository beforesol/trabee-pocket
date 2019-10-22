// import {
//     START_SEARCH_VIDEO,
//     RESET_SEARCH_VIDEO_RESULT,
//     AXIOS_GET_SEARCH_VIDEO_RESULT,
//     AXIOS_GET_SEARCH_VIDEO_RESULT_SUCCESS,
//     AXIOS_GET_SEARCH_VIDEO_RESULT_FAIL,
//
//     START_SEARCH_SHOT,
//     RESET_SEARCH_SHOT_RESULT,
//     AXIOS_GET_SEARCH_SHOT_RESULT,
//     AXIOS_GET_SEARCH_SHOT_RESULT_SUCCESS,
//     AXIOS_GET_SEARCH_SHOT_RESULT_FAIL,
// } from './action';
//
// import SearchVideoData from '../../model/search/search-data';
// // import SearchShotData from '../../model/search/search-shot-data';
//
// export const KEY = 'search';
// export const SEARCH_STATUS = {
//     DEFAULT: 'DEFAULT',
//     RESET: 'RESET',
//     LOADING: 'LOADING',
//     DONE: 'DONE',
//     FAIL: 'FAIL',
// };
//
// const { DEFAULT, RESET, LOADING, DONE, FAIL } = SEARCH_STATUS;
//
// export const initialState = {
//     searchVideoStatus: DEFAULT,
//     searchVideoData: new SearchVideoData(),
//     searchShotStatus: DEFAULT,
//     // searchShotData: new SearchShotData(),
//     // currentSearchShotDataList: [],
// };
//
// // const sortByTime = (a, b) => (a.startTime - b.startTime);
//
// export default function searchReducer(state = initialState, action) {
//     switch (action.type) {
//     /**
//      * search 페이지 VIDEO 검색
//      */
//     case START_SEARCH_VIDEO: {
//         return {
//             ...state,
//             searchVideoStatus: LOADING,
//         };
//     }
//
//     case RESET_SEARCH_VIDEO_RESULT: {
//         return {
//             ...state,
//             searchVideoData: {},
//             searchVideoStatus: RESET,
//         };
//     }
//
//     case AXIOS_GET_SEARCH_VIDEO_RESULT: {
//         return {
//             ...state,
//             searchVideoData: {},
//         };
//     }
//
//     case AXIOS_GET_SEARCH_VIDEO_RESULT_SUCCESS: {
//         const { data } = action;
//         const searchVideoData = new SearchVideoData(data);
//
//         return {
//             ...state,
//             searchVideoData,
//             searchVideoStatus: DONE,
//         };
//     }
//
//     case AXIOS_GET_SEARCH_VIDEO_RESULT_FAIL: {
//         return {
//             ...state,
//             searchVideoStatus: FAIL,
//         };
//     }
//
//     /*
//         타임라인 내 SHOT 검색
//      */
//     case START_SEARCH_SHOT: {
//         return {
//             ...state,
//             searchShotStatus: LOADING,
//         };
//     }
//
//     case RESET_SEARCH_SHOT_RESULT: {
//         return {
//             ...state,
//             // searchShotData: {},
//             // currentSearchShotDataList: [],
//             searchShotStatus: RESET,
//         };
//     }
//
//     case AXIOS_GET_SEARCH_SHOT_RESULT: {
//         return {
//             ...state,
//             searchShotData: {},
//         };
//     }
//
//     /**
//      * 이후에 Timeline Shot 검색 api 연동해야함.
//      * 현재는 단순 Filter 기능..
//      */
//     case AXIOS_GET_SEARCH_SHOT_RESULT_SUCCESS: {
//         // const { videoID, data } = action.data;
//         // const searchShotData = new SearchShotData(data);
//         // let currentSearchShotDataList = [];
//
//         // console.log('reducer', state);
//
//         // if (data) {
//         //     searchShotData.setData(data);
//         //     currentSearchShotDataList = searchShotData._results ? searchShotData._results.filter(shot => shot.videoID === videoID) : [];
//         //     currentSearchShotDataList.sort(sortByTime).map((shot, index) => shot.setIndex(index));
//         // }
//
//         // return {
//         //     ...state,
//         //     searchShotData,
//         //     currentSearchShotDataList,
//         //     searchShotStatus: DONE,
//         // };
//
//         return {
//             ...state,
//             searchShotStatus: DONE,
//         };
//     }
//     case AXIOS_GET_SEARCH_SHOT_RESULT_FAIL: {
//         return {
//             ...state,
//             searchShotStatus: FAIL,
//         };
//     }
//
//     default: {
//         return state;
//     }
//     }
// }
