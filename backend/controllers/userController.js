const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, identifier, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      identifier,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ where: { identifier } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "d1748063fb4032af92d1e3637a858fc79a44e7db7c9171defc4b61e853601ca18e276601671369d13998d05900f2ca4e4628cd6f621cf0d7f073f2d7fe43ae060f9157989fae80311ce86f6ebfc63776464bfc9bf08739beefc9ac16b0e779e1775a5ce0ab906ebea4babf0fce023ab01ef406d27461a1de4876bd81ac2f303c486fd7819ca71d9978ad5a3ec71cd091fa9fa6c7a4f2f9ab439612cfe08f5825ead5e49de88b40d4c945bbf489517eaaca92d9a606758fe052e67ce03cefdd71eca9e2b077cdf77162f5ccce2ff04c7967baa9e79f7855e6a2e0bce0649b83c8d8f580da0cb09a552b8d004d220f8e60796c5c253f51c538a849df9455c45697",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
