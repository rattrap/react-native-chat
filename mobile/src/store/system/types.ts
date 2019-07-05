export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface SystemState {
  loggedIn: boolean;
  user: User;
}

export const UPDATE_SESSION = 'UPDATE_SESSION';

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;
