import yup from "yup";

const userSchema = yup.object().shape({
    name: yup.string().required(),
    birthdate: yup.string().required(),
    age: yup.number().required(),
    phone: yup.string().required(),
    city: yup.string().required(),
    education: yup.string().required(),
})

const validate = (schema) => async (req, res, next) => {
    const {name, birthdate, age, phone, city, education} = req.body;
    try {
        await userSchema.validate({
            name,
            birthdate,
            age,
            phone,
            city,
            education
        })
        return next();
    } catch (error) {
        return res.status(400).json({type: error.name, message: error.message})
    }
}

export default validate;