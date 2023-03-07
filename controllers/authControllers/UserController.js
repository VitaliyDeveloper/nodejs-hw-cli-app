class UserController {
  static async list(req, res, next) {
    const { username } = req.user;

    res.json({
      status: "success",
      code: 200,
      data: {
        message: `Authorization was successful: ${username}`,
      },
    });
  }
}

module.exports = UserController;
