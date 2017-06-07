import {
    DROP_OVER,
    DROP_END,
    ADD_FILE,
    DEL_FILE,
    FILE_INFO,
    INIT_STATE
} from './mutation-types';

const makeAction = type => ({ dispatch }, ...args) => dispatch(type, ...args);

const initState = {
    file: null,
    sketchUri: null,
    imageUri: null,
    scale: 1,
    dropState: '',
    sketchData: null
}

import util from '../util';

export default state => {
    const initState = util.copyObject(state)
    return {
        initStore({ dispatch }) {
            dispatch(INIT_STATE, initState)
        },
        dropOver: makeAction(DROP_OVER),
        dropEnd: makeAction(DROP_END),
        addFile: makeAction(ADD_FILE),
        fileInfo: makeAction(FILE_INFO),
        delFile: makeAction(DEL_FILE)
    }
}
