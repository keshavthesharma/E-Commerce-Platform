const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Hash the password before saving to the database
// Remove 'next' from the parameters
UserSchema.pre('save', async function() {
    // Return early if password isn't modified
    if (!this.isModified('password')) return;
    
    // Hash the password (Mongoose automatically catches errors in async functions)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);