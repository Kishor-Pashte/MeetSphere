import { User } from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Please provide both username and password" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "No account found with this username." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "incorrect password, Please try again." });
    }

    //generate token
    let token = crypto.randomBytes(16).toString("hex");
    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({
      token: token,
      username: user.username,
      message: "Login successful",
    });
  } catch (e) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json("Oops! Something went wrong. Please try again later.");
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    if (!name || !username || !password) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({
        message: "This username is already taken. Try a different one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "Account created successfully." });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Oops! Something went wrong on our end. Please try again later.`,
    });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    }
    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    console.log(e);
    res.json({ message: `Something went wrong ${e}` });
  }
};

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    }
    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({ message: "Added code to history" });
  } catch (e) {
    console.log(e);
    res.json({ message: `Something went wrong ${e}` });
  }
};

const deleteHistory = async (req, res) => {
  const { token } = req.query;
  const { id } = req.params;

  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    }

    const deletedMeeting = await Meeting.findOneAndDelete({
      _id: id,
      user_id: user.username,
    });

    if (!deletedMeeting) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Meeting not found" });
    }

    res.status(httpStatus.OK).json({ message: "Meeting deleted successfully" });
  } catch (e) {
    console.log(e);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Error deleting meeting ${e}` });
  }
};

export { login, register, getUserHistory, addToHistory, deleteHistory };
