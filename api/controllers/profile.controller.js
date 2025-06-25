import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = { ...req.body };

    delete updateData.password;
    delete updateData.email;
    delete updateData._id;
    delete updateData.createdAt;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};
