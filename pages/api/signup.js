const signUp = async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  
  if (!(name.trim().length > 3 && name.trim().length < 21)) {
    return res.status(401).json({ message: "" });
  }

};

export default signUp;
