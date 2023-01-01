const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { db } = require('../config/configProject');
const { ref, child, get, update } = require('firebase/database');

const avatarDir = path.join(__dirname, '..', 'photo');

class MainInfo {
    async getAllInfo(req, res) {
        try {
            const dbRef = ref(db);
            get(child(dbRef, 'main'))
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const mainInfo = snapshot.val();
                        return res.status(200).json(mainInfo);
                    } else {
                        console.log('No data available');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            res.status(404).json({
                message: `Main info not found`,
                response: null,
            });
        }
    }

    async addNewAvatar(req, res) {
        const { path: tempDir, originalname } = req.file;
        const resultPath = path.join(avatarDir, originalname);
        try {
            const findeImage = await Jimp.read(tempDir);
            findeImage.quality(60).resize(512, 512).write(resultPath);
            await fs.unlink(tempDir);
            // await mainInfoDB.updateAva(originalname);
            return res
                .status(200)
                .json({ message: 'status 200', response: originalname });
        } catch (error) {
            res.status(404).json({ message: `Awatar not add`, response: null });
        }
    }

    async updateInfo(req, res) {
        try {
            const dbRef = ref(db);
            get(child(dbRef, 'main'))
                .then(snapshot => {
                    const mainInfo = snapshot.val();
                    const updates = {};
                    updates['/main/'] = {
                        ...mainInfo,
                        ...req.body,
                    };
                    const dataInfo = update(dbRef, updates);
                    if (!dataInfo) {
                        return res.status(400).json({
                            message: `Info not update`,
                            response: null,
                        });
                    }
                    return res
                        .status(200)
                        .json({ message: 'status 200', response: dataInfo });
                })
                .catch(error => {
                    res.status(404).json({
                        message: `Main Info not update`,
                        response: error,
                    });
                });
        } catch (error) {
            res.status(404).json({
                message: `Main Info not update`,
                response: null,
            });
        }
    }
}

module.exports = new MainInfo();
