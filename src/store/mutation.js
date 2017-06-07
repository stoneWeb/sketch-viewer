import {
    DROP_OVER,
    DROP_END,
    ADD_FILE,
    DEL_FILE,
    FILE_INFO,
    INIT_STATE,
    UPDATE_PROPERTY
} from './mutation-types';
import util from '../util';

export default state => {
    const initState = util.copyObject(state)
    return {
        [DROP_OVER](state) {
            state.dropState = 'over'
        },
        [DROP_END](state) {
            state.dropState = ''
        },
        [INIT_STATE](state) {
            Object.assign(state, util.copyObject(initState))
        },
        [ADD_FILE](state, file) {
            state.file = file
        },
        [DEL_FILE](state) {
            Object.assign(state, util.copyObject(initState))
        },
        [FILE_INFO](state, sketchData) {
            state.sketchData = sketchData
        },
        [UPDATE_PROPERTY](state, property) {
            state.property = property
        }
    }
}