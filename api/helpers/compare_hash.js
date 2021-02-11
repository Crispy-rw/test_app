import bcryptjs from "bcryptjs";

const comparePassword = async ({ value, user }) => {
    console.log(value.password)
    console.log(user.password)
    const hashed = await bcryptjs.compare(value.password, user.password);
    return hashed;
};

export default comparePassword;