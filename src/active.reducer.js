const SET_ACTIVE_RESTAURANT = 'SET_ACTIVE_RESTAURANT';
const SET_ACTIVE_SERVING_LOCATION = 'SET_ACTIVE_SERVING_LOCATION';

export default (state = {}, action) =>
	action.type === SET_ACTIVE_RESTAURANT ?
		Object.assign({}, state, {restaurant: action.payload})
	: action.type === SET_ACTIVE_SERVING_LOCATION ?
		Object.assign({}, state, {
      servingLocation: action.payload,
      restaurant: action.payload ? state.restaurant : null
    })
	: state;

export const setActiveRestaurant = payload => ({
	type: SET_ACTIVE_RESTAURANT,
	payload
});

export const setActiveServingLocation = payload => ({
	type: SET_ACTIVE_SERVING_LOCATION,
	payload
});
