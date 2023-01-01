const { db } = require('../config/configProject');
const { ref, child, get, update, push, remove } = require('firebase/database');

class Transaction {
    async getAllWork(req, res) {
        try {
            // db
            const dbRef = ref(db);
            get(child(dbRef, 'works'))
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const dataW = snapshot.val();
                        return res.status(200).json(dataW);
                    } else {
                        console.log('No data available');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            res.status(404).json({ message: `Work not found`, response: null });
        }
    }

    async addNewWork(req, res) {
        try {
            const newWorkKey = push(child(ref(db), 'works')).key;
            const updates = {};
            updates['/works/' + newWorkKey] = { ...req.body, id: newWorkKey };
            const dataW = update(ref(db), updates);
            return res.status(200).json(dataW);
        } catch (error) {
            res.status(404).json({ message: `Work not add`, response: null });
        }
    }

    async updateWork(req, res) {
        try {
            const updates = {};
            updates['/works/' + req.params.workId] = {
                ...req.body,
                id: req.params.workId,
            };
            const dataW = update(ref(db), updates);
            if (!dataW) {
                return res.status(400).json({
                    message: `Work not update, becose id not found`,
                    response: null,
                });
            }
            return res.status(200).json(dataW);
        } catch (error) {
            res.status(404).json({
                message: `Work not update`,
                response: null,
            });
        }
    }

    async deleteWork(req, res) {
        try {
            const dbRef = ref(db, '/works/' + req.params.workId);
            remove(dbRef);
        } catch (error) {
            res.status(404).json({
                message: `Work not delete`,
                response: null,
            });
        }
    }
}

module.exports = new Transaction();
