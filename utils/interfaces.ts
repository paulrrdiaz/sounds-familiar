export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthType = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number;
};

export type UserType = {
  displayName?: string;
  email: string | null;
  id: string | null;
  avatar?: string;
};

export type ModalType = {
  isOpen: boolean;
  track?: TrackType;
};

export type TrackType = {
  artist: string;
  title: string;
  uri: string;
  picture: string;
};

export type PlaylistType = {
  uid: string;
  name: string;
  tracks: TrackType[];
  followers: string[];
};

export type InitialContextStateType = {
  auth: AuthType;
  user: UserType;
  currentTrack: string | null;
  modals: {
    playlists: ModalType;
  };
  playlists: PlaylistType[];
};

export enum ContextActionsTypes {
  setAuth = 'SET_AUTH',
  initFromCookies = 'INIT_FROM_COOKIES',
  setUser = 'SET_USER',
  setCurrentTrack = 'SET_CURRENT_TRACK',
  changeModal = 'CHANGE_MODAL',
  updatePlaylists = 'UPDATE_PLAYLISTS'
}

export type ModalsName = 'playlists';

export type Payload = {
  [ContextActionsTypes.setAuth]: {
    auth: AuthType;
  };
  [ContextActionsTypes.initFromCookies]: {
    context: InitialContextStateType;
  };
  [ContextActionsTypes.setUser]: {
    user: UserType;
  };
  [ContextActionsTypes.setCurrentTrack]: {
    currentTrack: string;
  };
  [ContextActionsTypes.changeModal]: {
    modal: ModalsName;
    data: ModalType;
  };
  [ContextActionsTypes.updatePlaylists]: {
    playlists: PlaylistType[];
  };
};

export type ContextActions = ActionMap<Payload>[keyof ActionMap<Payload>];

export type ContextMethodsType = {
  onLogOut: () => void;
  onSelectTrack: (uri: string) => void;
  changeModal: (modal: ModalsName, data: ModalType) => void;
  onFetchPlaylists: (owner: string) => void;
  onDeletePlaylist: (uid: string) => void;
  onUpdateTrackFromPlaylist: (
    uid: string,
    track: TrackType,
    remove: boolean
  ) => void;
};
