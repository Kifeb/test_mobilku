import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.user.findMany();
        return res.status(200).json({msg: "success", data: response});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {

    if(!req.file) return res.status(422).json({msg: "image must be uploaded"})

    const {name, birthdate, age, phone, city, education} = req.body;
    const photo = req.file.path

    const date = new Date(birthdate)
    
    try {
        const user = await prisma.user.create({
            data: {
                name,
                birthdate: date,
                age: parseInt(age),
                phone,
                city,
                education,
                photo
            }
        })
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
}

export const updateUser = async (req, res) => {

    if(!req.file) return res.status(422).json({msg: "image must be uploaded"})

    const {name, birthdate, age, phone, city, education} = req.body;
    const photo = req.file.path;

    try {
        const user = await prisma.user.update({
            where : {
                id: Number(req.params.id)
            },
            data: {
                name,
                birthdate,
                age: parseInt(age),
                phone,
                city,
                education,
                photo,
            }
        })
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }

}