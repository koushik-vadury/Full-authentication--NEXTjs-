import { connectDatabase, insertDocument } from "../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const signUp = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Method must be POST" });
  }
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const { name, email, password, cPassword } = req.body;
  const client = await connectDatabase();
  const db = client.db();
  const existingEmail = await db
    .collection(process.env.COLLECTION_NAME)
    .findOne({ email });

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    cPassword.trim() === ""
  ) {
    client.close();
    return res.status(401).json({ message: "Please provide all informations" });
  } else if (!(name.trim().length > 3 && name.trim().length < 21)) {
    client.close();
    return res
      .status(401)
      .json({ message: "Name must be min 4 char. & max 20 char." });
  } else if (!emailPattern.test(email)) {
    client.close();
    return res
      .status(401)
      .json({ message: "Invalid email! Please provide a valid email" });
  } else if (
    !(
      password.trim().length > 6 &&
      password.trim().length < 15 &&
      cPassword.trim().length > 6 &&
      cPassword.trim().length < 15
    )
  ) {
    client.close();
    return res.status(401).json({
      message:
        "Password and confirm password must be min 7 char. & max 14 char.",
    });
  }

  if (!(password === cPassword)) {
    client.close();
    return res.status(401).json({
      message: "Password and confirm password are not same!",
    });
  }
  if (existingEmail) {
    client.close();
    return res.status(401).json({
      message: "Email already exists!",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await insertDocument(client, process.env.COLLECTION_NAME, {
    name,
    email,
    password: hashedPassword,
  });
  let token;
  token = jwt.sign(
    { userId: result.id, email: result.email },
    "koushikvaduryronok",
    {
      expiresIn: "1h",
    }
  );
  client.close();
  return res
    .status(201)
    .json({ message: "Signup success", result, token: token });
};

export default signUp;
