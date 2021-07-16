import mergeAll from 'ramda/src/mergeAll';

import {
  InitialContextStateType,
  ContextActions,
  ContextActionsTypes
} from '@/utils/interfaces';

const contextReducer = (
  state: InitialContextStateType,
  action: ContextActions
) => {
  switch (action.type) {
    case ContextActionsTypes.setAuth: {
      return { ...state, auth: action.payload.auth };
    }

    case ContextActionsTypes.initFromCookies: {
      return { ...state, auth: action.payload.auth };
    }

    case ContextActionsTypes.setUser: {
      return { ...state, user: action.payload.user };
    }

    case ContextActionsTypes.setCurrentTrack: {
      return { ...state, currentTrack: action.payload.currentTrack };
    }

    case ContextActionsTypes.changeModal: {
      const { modal, data } = action.payload;
      const currentModal = state.modals[modal];
      const newModal = mergeAll([currentModal, data]);

      return {
        ...state,
        modals: {
          ...state.modals,
          [modal]: newModal
        }
      };
    }

    case ContextActionsTypes.updatePlaylists: {
      return { ...state, playlists: action.payload.playlists };
    }

    default:
      return state;
  }
};

export default contextReducer;
