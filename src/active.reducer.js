const SET_ACTIVE_RESTAURANT = 'SET_ACTIVE_RESTAURANT';

export default (state = {}, action) =>
	action.type === SET_ACTIVE_RESTAURANT ?
		Object.assign({}, state, {restaurant: action.payload})
	: state;

export const setActiveRestaurant = payload => ({
	type: SET_ACTIVE_RESTAURANT,
	payload
});
