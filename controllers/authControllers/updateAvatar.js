const User = require("../../models/user");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");

const updateAvatar = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      const avatarName = `${Date.now()}-${req.file.originalname}`;
      const avatarPath = path.join(__dirname, "../public/avatars", avatarName);
      await Jimp.read(req.file.path).then((img) =>
        img.cover(250, 250).write(avatarPath)
      );
      fs.unlinkSync(req.file.path);
      const avatarURL = `/avatars/${avatarName}`;
      user.avatarURL = avatarURL;
    }

    await user.save();

    res.status(200).json({
      message: "Avatar updated successfully",
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = updateAvatar;
