const User = require("../../models/user");
const path = require("path");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const tmpFolderPath = path.join(__dirname, "../", "tmp");
  const avatarPath = path.join(tmpFolderPath, req.file.filename);

  const avatarsFolderPath = path.join(__dirname, "public", "avatars");
  const avatarName = `${Date.now()}-${req.file.originalname}`;
  const avatarPathResized = path.join(avatarsFolderPath, avatarName);
  Jimp.read(avatarPath)
    .then((image) => {
      return image.cover(250, 250).writeAsync(avatarPathResized);
    })
    .then(() => {
      const { _id: id } = req.user;
      const user = User.findById(id);
      user.avatarURL = `/avatars/${avatarName}`;
      user.save();
      res.json({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ code: 500, error: "Internal server error" });
    });
};

module.exports = updateAvatar;
