import { connectDatabase } from "../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Method must be POST" });
  }
  const { email, password } = req.body;
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const client = await connectDatabase();
  const db = client.db();
  const existingEmail = await db
    .collection(process.env.COLLECTION_NAME)
    .findOne({ email });

  if (email.trim() === "" || password.trim() === "") {
    client.close();
    return res.status(401).json({ message: "Please provide all informations" });
  } else if (!emailPattern.test(email)) {
    client.close();
    return res
      .status(401)
      .json({ message: "Invalid email! Please provide a valid email" });
  }
  if (!existingEmail) {
    client.close();
    return res.status(401).json({ message: "Invalid credentials!" });
  }
  if (!(password.trim().length > 6 && password.trim().length < 15)) {
    client.close();
    return res.status(401).json({
      message:
        "Password and confirm password must be min 7 char. & max 14 char.",
    });
  }
  const isValidPassord = await bcrypt.compare(password, existingEmail.password);

  if (!isValidPassord) {
    client.close();
    return res.status(401).json({ message: "Invalid credentials!" });
  }
  let token;
  token = jwt.sign(
    { userId: existingEmail.id, email: existingEmail.email },
    "koushikvaduryronok",
    {
      expiresIn: "1h",
    }
  );
  client.close();
  return res.status(201).json({ message: "LOGIN SUCCESS", token: token });
};

export default login;
