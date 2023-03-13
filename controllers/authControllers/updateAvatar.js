const { User } = require("../../models/user");
const path = require("path");

const tmpFolderPath = path.join(__dirname, "tmp");
const avatarPath = path.join(tmpFolderPath, req.file.filename);
const avatarsFolderPath = path.join(__dirname, "public", "avatars");
const avatarName = `${Date.now()}-${req.file.originalname}`;
const avatarPathResized = path.join(avatarsFolderPath, avatarName);
Jimp.read(avatarPath)
  .then((image) => {
    return image.cover(250, 250).writeAsync(avatarPathResized);
  })
  .then(() => {
    // Обновляем поле avatarURL в базе данных пользователя
    const user = req.user; // предполагается, что есть объект пользователя в запросе
    user.avatarURL = `/avatars/${avatarName}`;
    user.save();
    // Отправляем ответ с успешным результатом
    res.json({ success: true });
  })
  .catch((err) => {
    // Обрабатываем ошибку
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

module.exports = updateAvatar;
