const express = require("express");
const UserController = require("../../controllers/authControllers/UserController");
const Jimp = require("jimp");
const User = require("../../models/user");
const fs = require("fs");

// const updateAvatar = require("../../controllers/authControllers/updateAvatar");
const path = require("path");

const auth = require("../../middlewaries/auth");
const upload = require("../../middlewaries/upload");

const router = express.Router();

router.get("/current", UserController.current);
router.post("/upload", auth, upload.single("avatar"), (req, res) => {
  // Получаем путь к загруженному файлу
  const tmpFolderPath = path.join(__dirname, "../", "tmp");
  const avatarPath = path.join(tmpFolderPath, req.file.filename);

  // Обрабатываем аватарку пакетом Jimp и сохраняем в папку public/avatars
  const avatarsFolderPath = path.join(__dirname, "public", "avatars");
  const avatarName = `${Date.now()}-${req.file.originalname}`;
  const avatarPathResized = path.join(avatarsFolderPath, avatarName);
  Jimp.read(avatarPath)
    .then((image) => {
      return image.cover(250, 250).writeAsync(avatarPathResized);
    })
    .then(() => {
      const { _id: id } = req.user;

      // Обновляем поле avatarURL в базе данных пользователя
      const user = User.findById(id); // предполагается, что есть объект пользователя в запросе
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
});
router.patch("/avatars", upload.single("avatar"), async (req, res) => {
  try {
    const { _id: id } = req.user; // Получаем ID пользователя из тела запроса
    const user = await User.findById(id); // Находим пользователя в базе данных

    // Если пользователь не найден, возвращаем ошибку 404
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Если аватарка была загружена, сохраняем ее и обновляем URL-адрес аватарки пользователя
    if (req.file) {
      const avatarName = `${Date.now()}-${req.file.originalname}`; // Генерируем уникальное имя файла
      const avatarPath = path.join(__dirname, "../public/avatars", avatarName); // Формируем путь к файлу
      await Jimp.read(req.file.path).then((img) =>
        img.cover(250, 250).write(avatarPath)
      ); // Обрабатываем и сохраняем аватарку
      fs.unlinkSync(req.file.path); // Удаляем временный файл
      const avatarURL = `/avatars/${avatarName}`; // Формируем URL-адрес аватарки
      user.avatarURL = avatarURL; // Обновляем URL-адрес аватарки пользователя
    }

    await user.save(); // Сохраняем изменения в базе данных

    res.status(200).json({
      message: "Avatar updated successfully",
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
