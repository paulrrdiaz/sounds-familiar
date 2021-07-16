import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
  Dispatch
} from 'react';
import { useRouter } from 'next/router';
import { get, set, remove } from 'local-storage';
import { useToast, Box } from '@chakra-ui/react';

import spotifyApi from '@/utils/spotify';
import http from '@/utils/http';
import {
  InitialContextStateType,
  ContextMethodsType,
  ContextActionsTypes,
  ModalType,
  ModalsName,
  TrackType
} from '@/utils/interfaces';
import contextReducer from './reducer';

const initialState = {
  auth: {
    accessToken: null,
    refreshToken: null,
    expiresIn: 0
  },
  user: {
    email: null,
    id: null
  },
  playlists: [],
  currentTrack: null,
  modals: {
    playlists: {
      isOpen: false
    }
  }
};

const AppContext = createContext<{
  state: InitialContextStateType;
  dispatch: Dispatch<any>;
  // FIXME
  methods: any;
}>({ state: initialState, dispatch: () => null, methods: {} });

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const router = useRouter();
  const toast = useToast();
  const { code } = router.query;
  const [state, dispatch] = useReducer(contextReducer, initialState);

  // Populate context if exists on cookies
  useEffect(() => {
    const context: string = get('context');

    if (context) {
      const parsedContext = JSON.parse(context);

      dispatch({
        type: ContextActionsTypes.initFromCookies,
        payload: { context: parsedContext }
      });
    }
  }, []);

  // get auth info so we can play with Spotify API
  const onLogin = async (code: string | string[]) => {
    try {
      const { data } = await http.post('login', { code });

      spotifyApi.setAccessToken(data.accessToken);
      dispatch({ type: ContextActionsTypes.setAuth, payload: { auth: data } });

      const { body } = await spotifyApi.getMe();
      const { email, display_name, id, images } = body;

      dispatch({
        type: ContextActionsTypes.setUser,
        payload: {
          user: {
            displayName: display_name,
            email,
            id,
            avatar: images && images[0].url
          }
        }
      });

      await onFetchPlaylists(id);

      router.push('/');
    } catch (error) {}
  };

  // Call onLogin if a code is present in URL
  useEffect(() => {
    if (code) {
      onLogin(code);
    }
  }, [code]);

  // Save any state' change on cookies
  useEffect(() => {
    set('context', JSON.stringify(state));
  }, [state]);

  // Refresh accessToken based on refreshToken
  const onRefresh = async (refreshToken: string) => {
    try {
      const { data } = await http.post('refresh', { refreshToken });

      spotifyApi.setAccessToken(data.accessToken);
      dispatch({
        type: ContextActionsTypes.setAuth,
        payload: { auth: { ...data, refreshToken } }
      });
    } catch (error) {}
  };

  // Set interval for calling onRefresh based on expiresIn
  useEffect(() => {
    const refreshToken = state.auth.refreshToken;
    const expiresIn = state.auth.expiresIn;

    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      onRefresh(refreshToken);
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [state.auth.refreshToken, state.auth.expiresIn]);

  // Clean all data after log out
  const onLogOut = () => {
    remove('context');
    router.push('/login');
  };

  const onSelectTrack = (uri: string) => {
    dispatch({
      type: ContextActionsTypes.setCurrentTrack,
      payload: { currentTrack: uri }
    });
  };

  const onRemoveTrack = (uri: string) => {
    dispatch({
      type: ContextActionsTypes.setCurrentTrack,
      payload: { currentTrack: uri }
    });
  };

  const onUpdateTrackFromPlaylist = async (
    uid: string,
    track: TrackType,
    remove: boolean
  ) => {
    try {
      const {
        data: { playlists }
      } = await http.put(`playlists/${uid}`, { track, remove });

      dispatch({
        type: ContextActionsTypes.updatePlaylists,
        payload: {
          playlists
        }
      });

      const action = remove ? 'removed' : 'added';

      toast({
        title: `Track ${action}`,
        description: (
          <>
            <Box as="span" fontWeight="bold">
              {track.title}
            </Box>{' '}
            was {action} to the playlist
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {}
  };

  const changeModal = (modal: ModalsName, data: ModalType) => {
    dispatch({
      type: ContextActionsTypes.changeModal,
      payload: {
        modal,
        data
      }
    });
  };

  const onFetchPlaylists = async (owner: string) => {
    try {
      const response = await http.get('playlists', { params: { owner } });
      const { playlists } = response.data;

      dispatch({
        type: ContextActionsTypes.updatePlaylists,
        payload: {
          playlists
        }
      });
    } catch (error) {}
  };

  const onDeletePlaylist = async (uid: string) => {
    try {
      const response = await http.delete(`playlists/${uid}`);
      const { playlists } = response.data;

      dispatch({
        type: ContextActionsTypes.updatePlaylists,
        payload: {
          playlists
        }
      });
    } catch (error) {}
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        methods: {
          onLogOut,
          onSelectTrack,
          changeModal,
          onFetchPlaylists,
          onDeletePlaylist,
          onUpdateTrackFromPlaylist
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Looks like you need a Provider...');
  }

  return context;
};
