// import {
//     getSearchVideoResult,
//     getSearchShotResult,
// } from '../../api/videoApi';
//
// export const START_SEARCH_VIDEO = 'START_SEARCH_VIDEO';
// export const RESET_SEARCH_VIDEO_RESULT = 'RESET_SEARCH_VIDEO_RESULT';
// export const AXIOS_GET_SEARCH_VIDEO_RESULT = 'AXIOS_GET_SEARCH_VIDEO_RESULT';
// export const AXIOS_GET_SEARCH_VIDEO_RESULT_SUCCESS = 'AXIOS_GET_SEARCH_VIDEO_RESULT_SUCCESS';
// export const AXIOS_GET_SEARCH_VIDEO_RESULT_FAIL = 'AXIOS_GET_SEARCH_VIDEO_RESULT_FAIL';
//
// export const START_SEARCH_SHOT = 'START_SEARCH_SHOT';
// export const RESET_SEARCH_SHOT_RESULT = 'RESET_SEARCH_SHOT_RESULT';
// export const AXIOS_GET_SEARCH_SHOT_RESULT = 'AXIOS_GET_SEARCH_SHOT_RESULT';
// export const AXIOS_GET_SEARCH_SHOT_RESULT_SUCCESS = 'AXIOS_GET_SEARCH_SHOT_RESULT_SUCCESS';
// export const AXIOS_GET_SEARCH_SHOT_RESULT_FAIL = 'AXIOS_GET_SEARCH_SHOT_RESULT_FAIL';
//
// /**
//  * 비디오 검색을 시작 action
//  */
// export function startSearchVideo() {
//     return {
//         type: START_SEARCH_VIDEO,
//     };
// }
//
// /**
//  * 스토어의 검색된 비디오 데이터 초기화 action
//  */
// export function resetSearchVideoResult() {
//     return {
//         type: RESET_SEARCH_VIDEO_RESULT,
//     };
// }
//
// /**
//  * 검색된 비디오 데이터 요청 성공 action
//  */
// function axiosGetSearchVideoResultSuccess(data) {
//     return {
//         type: AXIOS_GET_SEARCH_VIDEO_RESULT_SUCCESS,
//         data,
//     };
// }
//
// /**
//  * 검색된 비디오 데이터 요청 실패 action
//  */
//
// function axiosGetSearchVideoResultFail(error) {
//     return {
//         type: AXIOS_GET_SEARCH_VIDEO_RESULT_FAIL,
//         error,
//     };
// }
//
// /**
//  * 검색된 비디오 데이터 요청 action
//  */
// export function axiosGetSearchVideoResult(data, callback) {
//     return {
//         type: AXIOS_GET_SEARCH_VIDEO_RESULT,
//         payload: {
//             api: getSearchVideoResult(data, callback),
//             onSuccess: axiosGetSearchVideoResultSuccess,
//             onFail: axiosGetSearchVideoResultFail,
//         },
//     };
// }
//
// /**
//  * Shot 검색을 시작 action
//  */
// export function startShotSearch() {
//     return {
//         type: START_SEARCH_SHOT,
//     };
// }
//
// /**
//  * 스토어의 검색된 Shot 데이터 객체 초기화 action
//  */
// export function resetSearchShotResult() {
//     return {
//         type: RESET_SEARCH_SHOT_RESULT,
//     };
// }
//
// /**
//  * Shot 결과에대한 검색된 비디오 데이터 요청 성공 action
//  */
// function axiosGetSearchShotResultSuccess(data) {
//     return {
//         type: AXIOS_GET_SEARCH_SHOT_RESULT_SUCCESS,
//         data,
//     };
// }
//
// /**
//  * Shot 결과에대한 검색된 비디오 데이터 요청 실패 action
//  */
// function axiosGetSearchShotResultFail(error) {
//     return {
//         type: AXIOS_GET_SEARCH_SHOT_RESULT_FAIL,
//         error,
//     };
// }
//
// /**
//  * 검색된 Shot 데이터 요청 action
//  */
// export function axiosGetSearchShotResult(data, callback) {
//     return {
//         type: AXIOS_GET_SEARCH_SHOT_RESULT,
//         payload: {
//             api: getSearchShotResult(data, callback),
//             onSuccess: axiosGetSearchShotResultSuccess,
//             onFail: axiosGetSearchShotResultFail,
//         },
//     };
// }
//
