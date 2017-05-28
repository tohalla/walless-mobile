import Home from '../views/Home.component';
import Authentication from '../account/Authentication.component';

export default {
	home: {screen: Home},
	authentication: {screen: Authentication, display: account => !account}
};
