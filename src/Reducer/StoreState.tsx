import { reducerType } from "./ReducerType";

const initialState: any = {
  eventList: [],
  favouriteEvents: [],
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case reducerType.eventList:
      return {
        ...state,
        eventList: action.data,
      };

    case reducerType.addToFavourite:
      const alreadyExists = state.favouriteEvents.some(
        (event: any) => event.event_date_id === action.data.event_date_id
      );
      if (alreadyExists) return state;

      return {
        ...state,
        favouriteEvents: [...state.favouriteEvents, { ...action.data, isFavorite: 1 }],
      };

    case reducerType.removeFromFavourite:
      return {
        ...state,
        favouriteEvents: state.favouriteEvents.filter(
          (event: any) => event.event_date_id !== action.data.event_date_id
        ),
      };

    default:
      return state;
  }
}

