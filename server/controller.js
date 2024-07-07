const User = require('./schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, 'Hellojwt', { expiresIn: '1h' });

    res.status(200).json({ token,user, message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers= async(req,res) =>{
  try{
      const users= await User.find( { role: { $ne: 'admin' }});
      res.status(200)
      .json({
        success:true,
        data:users,
        message:"Entire user data is fetched",
      })
  }
  catch (err) {
    console.error(err);
    res.status(500)
    .json({
      success:false,
      error:err.message,
      message:"Server Error",
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    console.log(id);

    const updatedData = { firstName, lastName, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 12);
    }

    const response = await User.findByIdAndUpdate(id, updatedData, { new: true });
    console.log(response);

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser
};
