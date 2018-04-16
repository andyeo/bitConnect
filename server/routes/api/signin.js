const User = require('.././models/User');
const UserSession = require('.././models/UserSession');


module.exports = (app) => {
 // app.get('/api/counters', (req, res, next) => {
 //   Counter.find()
 //     .exec()
 //     .then((counter) => res.json(counter))
 //     .catch((err) => next(err));
 // });

 // app.post('/api/counters', function (req, res, next) {
 //   const counter = new Counter();
//
//    counter.save()
//      .then(() => res.json(counter))
//      .catch((err) => next(err));
//  });

/*
* Sign up!
*/
	app.post('/api/account/signup', (req, res, next) => {
		const { body } = req;
		const {
			firstName,
			lastName,
			password
		} = body;
		let {
			email
		} = body;

	If (!firstName) {
		return res.send({
			success: false,
			message: 'Error: First name cannot be blank'
			});
		}
	If (!lastName) {
		return res.send({
			success: false,
			message: 'Error: Last name cannot be blank'
			});
		}
	If (!email) {
		return res.send({
			success: false,
			message: 'Error: Email cannot be blank'
			});
		}
	If (!password) {
		 return res.send({
			success: false,
			message: 'Error: password cannot be blank'
			});
		}		

		email = email.toLowerCase ();

		//Steps:
		//1. Verify Email doesn't exist
		//2. save
		User.find({
			email: email
		}, (err, previousUsers) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});

			} else if (previousUsers.length > 0) {
			  return res.send({
					success: false,
					message: 'Error: Account already exists'
				});			
			} 

			// Save new user

			const newUser = new User();

			newUser.email = email;
			newUser.firstName = firstName;
			newUser.lastName = lastName;
			newUser.steamId = steamId
			newUser.epicId = epicId
			newUser.password = newUser.generateHash(password);
			newUser.save((err, user) => {
				if (err) {
					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}
					return res.send({
						success: true,
						message: 'Signed up'
					});
				});				
			});


	});	

	app.post('/api/account/signin', (req, res, next) => {
		const { body } = req;
		const {
			password
		} = body;
		let {
			email
		} = body;

	If (!email) {
		return res.send({
			success: false,
			message: 'Error: Email cannot be blank'
			});
		}
	If (!password) {
		 return res.send({
			success: false,
			message: 'Error: password cannot be blank'
			});
		}

		email = email.toLowerCase ();

		User.find({
			email: email
		}, (err, users) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: server error'
				});
			}
			if (users.legnth != 1) {
				return res.send({
					success: false,
					message: 'Error: Invalid User'
				});
			}

			const user = users[0];
			if (!user.validPassword(password)) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			}

			// otherwise corect user
			new userSession = new UserSession();
			userSession.userId = user._id;
			userSession.save((err, doc) => {
			  if (err) {
				return res.send({
					success: false,
					message: 'Error: server error'
				});
			}

			return res.send({
				success: true,
				message: 'Valid sign in',
				token: doc._id
				});
			});
		});
	};	

	app.get('/api/account/verify', (req, res, next) => {
		//get the token
		const { query } = req;
		const { token } = query;
		// ?token=test

		//verify token is unique

		UserSession.find({
			_id: token,
			isDeleted: false
		}, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			}	

			if (sessions.length !=1) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			else {
			return res.send({
				success: true,
				message: 'Good'
			})	
			}
		}
	})
	});	

		app.get('/api/account/logout', (req, res, next) => {
		//get the token
		const { query } = req;
		const { token } = query;
		// ?token=test

		//verify token is unique

		UserSession.findOneAndUpdate({
			_id: token,
			isDeleted: false
		}, {	
			$set:{
				isDeleted:true
			}
		}, null, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			}	

			
			return res.send({
				success: true,
				message: 'Good'
			})	
			}
		}
	})
	});	

	};	
