const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userModel");
const propertySchema = require("../schemas/propertyModel");
const bookingSchema = require("../schemas/bookingModel");

//////////for registering/////////////////////////////
const registerController = async (req, res) => {
  console.log("📥 Registering control:", req.body);
  try {
    const existsUser = await userSchema.findOne({ email: req.body.email });
    if (existsUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Handle granted for Owner type
    if (req.body.type?.toLowerCase() === "owner") {
      console.log("📥 Registering OWNER:", req.body);
      const newUser = new userSchema({ ...req.body, granted: false });
      await newUser.save();
    } else {
      console.log("👤 Registering NON-OWNER user:", req.body);
      const newUser = new userSchema(req.body);
      await newUser.save();
    }
    ///////////aur you can do this////////
    //     if (req.body.type === "Owner") {
    //       newUser.set("granted", "pending", { strict: false });
    //     }
    //////////////////// for this, then you need to remove strict keyword from schema//////////////////////

    return res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////for the login
const loginController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });

    // ✅ Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // ✅ Optional: Check owner approval
    if (user.type === 'owner' && !user.granted) {
      return res.status(403).json({ message: "Waiting for admin approval", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    user.password = undefined;
    return res.status(200).send({
      message: "Login successful",
      success: true,
      token,
      user: user,
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).send({ success: false, message: `${error.message}` });
  }
};


/////forgotting password
const forgotPasswordController = async (req, res) => {
  console.log("📥 forget OWNER:", req.body);
  try {
    const { email, password } = req.body;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    await updatedUser.save();
    return res.status(200).send({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////auth controller
const authController = async (req, res) => {
  console.log("📥 auth OWNER:", req.body);
  console.log("🧠 userId from middleware:", req.userId);

  try {
    const user = await userSchema.findById(req.userId);
    console.log("👤 Found user in DB:", user);

    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    return res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("❌ authController error:", error);
    return res
      .status(500)
      .send({ message: "auth error", success: false, error });
  }
};
/////////get all properties in home
const getAllPropertiesController = async (req, res) => {
  console.log("📥 allproperty OWNER:", req.body);
  try {
    const allProperties = await propertySchema.find({});
    if (!allProperties) {
      throw new Error("No properties available");
    } else {
      res.status(200).send({ success: true, data: allProperties });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "auth error", success: false, error });
  }
};

///////////booking handle///////////////
const bookingHandleController = async (req, res) => {
  console.log("📥 booking OWNER:", req.body);
  const { propertyid } = req.params;
  const { userDetails, status, userId, ownerId } = req.body;

  try {
    const booking = new bookingSchema({
      propertyId: propertyid,
      userID: userId,
      ownerID: ownerId,
      userName: userDetails.fullName,
      phone: userDetails.phone,
      bookingStatus: status,
    });

    await booking.save();

    return res
      .status(200)
      .send({ success: true, message: "Booking status updated" });
  } catch (error) {
    console.error("Error handling booking:", error);
    return res
      .status(500)
      .send({ success: false, message: "Error handling booking" });
  }
};

/////get all bookings for sing tenents//////
const getAllBookingsController = async (req, res) => {
  console.log("📥 getall OWNER:", req.body);
  const { userId } = req.body;
  try {
    const getAllBookings = await bookingSchema.find();
    const updatedBookings = getAllBookings.filter(
      (booking) => booking.userID.toString() === userId
    );
    return res.status(200).send({
      success: true,
      data: updatedBookings,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
  }
};
module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  getAllPropertiesController,
  bookingHandleController,
  getAllBookingsController,
};
