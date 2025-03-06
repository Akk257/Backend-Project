import User from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  try {
      const user = await User.findById(userId).select("-password");
      if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Fehler beim Abrufen des Profils", error });
  }
};

export const deleteUserProfile = async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Fehler beim Abrufen des Profils", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      if (!users) return res.status(404).json({ message: "Benutzer nicht gefunden" });
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Fehler beim Abrufen der Benutzer", error });
  }
};
