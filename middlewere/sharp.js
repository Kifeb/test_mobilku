import path from "path";
import sharp from "sharp"

const resizePhoto = (req, res, next) => {
    const input = req.file.path;
    const output500px = path.join(process.cwd(), 'public', 'images/500', '500px-'+req.file.filename);
    const output1000px = path.join(process.cwd(), 'public', 'images/1000', '1000px-'+req.file.filename);

    sharp(input)
        .resize(500)
        .toFile(output500px)
        .then(() => {
            sharp(input)
                .resize(1000)
                .toFile(output1000px)
                .then(() => {
                    next();
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Error while resizing image', error: err });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Error while resizing image', error: err });
        });
}

export default resizePhoto