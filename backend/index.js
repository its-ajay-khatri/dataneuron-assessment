const express = require('express');
const dotenv = require("dotenv")
const connectDatabase = require("./database/connection")
var cors = require('cors')
const User = require("./models/userModel");
const Count = require('./models/countModel')

//Config
dotenv.config()


//run the function to check if db is connected or not
connectDatabase();

const app = express();
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

let addCount = 0;
let updateCount = 0;

//API to fetch user
app.get('/api/users/getuser', async (req, res) => {
    try{
        const fetchUser = await User.find();
        const count = await Count.find();
        res.status(200).json({
            success: true,
            message: 'user data found',
            userData: fetchUser,
            count:count
        })
    }

    catch(err){
        console.error('Error fetching the user:', err);
        res.status(500).send('Error fetching the user');
    }
})

// Route to add a user
app.post('/api/users/add', async (req, res) => {
    try {
    addCount++;
    //fetching data from the body
     const { firstName, lastName, age, phoneNumber, email } = req?.body;

     //deleting existing user's data
     const deleteAll = await User.deleteMany({});
      
     // Create a new user instance from the request body
      const newUser = new User({
        firstName,
        lastName,
        age,
        phoneNumber,
        email
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();

      const count = await Count.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { upsert: true, new: true });
  
      res.status(200).json({
        success: true,
        userData: savedUser,
        count: count,
        message:`user ${req.body.firstName} have been added`
      }); // Return the saved user object
      
    } catch (error) {
      //console error if any
      console.error('Error adding user:', error);
      res.status(500).send('Internal server error');
    }
  });


// Route to update a user by ID
app.put('/api/users/update/:userId', async (req, res) => {
    try {
      updateCount++;
      const userId = req.params.userId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user fields if provided in request body
      if (req.body.firstName) user.firstName = req.body.firstName;
      if (req.body.lastName) user.lastName = req.body.lastName;
      if (req.body.age) user.age = req.body.age;
      if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
      if (req.body.email) user.email = req.body.email;
  
      // Save the updated user
      const updatedUser = await user.save();

      const count = await Count.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { upsert: true, new: true });
  
      res.status(200).json({updatedUser, count});
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal server error');
    }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
