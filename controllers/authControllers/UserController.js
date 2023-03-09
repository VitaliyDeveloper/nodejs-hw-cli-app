class UserController {
  static async current(req, res, next) {
    const { email, subscription } = req.user;

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  }
}

module.exports = UserController;
