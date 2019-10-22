// /* eslint-disable no-shadow */
// import {
//     createSelector,
// } from 'reselect';
//
// import {
//     KEY,
// } from './reducer';
//
// export const searchState = state => state[KEY];
//
// // Video 검색
// export const getSearchVideoData = state => searchState(state).searchVideoData;
// export const getSearchVideoStatus = state => searchState(state).searchVideoStatus;
//
// // Shot 검색
// export const getSearchShotData = state => searchState(state).searchShotData;
// export const getSearchShotStatus = state => searchState(state).searchShotStatus;
// export const getCurrentSearchShotDataList = state => searchState(state).currentSearchShotDataList;
//
// export const searchVideoData = createSelector(
//     getSearchVideoData,
//     searchVideoData => searchVideoData,
// );
//
// export const searchVideoStatus = createSelector(
//     getSearchVideoStatus,
//     searchVideoStatus => searchVideoStatus,
// );
//
// export const searchShotData = createSelector(
//     getSearchShotData,
//     searchShotData => searchShotData,
// );
//
// export const searchShotStatus = createSelector(
//     getSearchShotStatus,
//     searchShotStatus => searchShotStatus,
// );
//
// export const currentSearchShotDataList = createSelector(
//     getCurrentSearchShotDataList,
//     currentSearchShotDataList => currentSearchShotDataList,
// );
//
