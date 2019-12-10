import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'; // 보안을 위한 단방향 해싱 함수 지원

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true / false
};

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

// hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환 후, delete를 통해 삭제
UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

const User = mongoose.model('User', UserSchema);
export default User;