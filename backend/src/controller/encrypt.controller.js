const encrypt = require('../models/encrypted.model');

async function encrypted(req, res) {

    const encryptQuestions = await encrypt.aggregate([
        { $sample: { size: 3 } },
    { $project: { answer: 0 } }
    ]);

    res.json(encryptQuestions)
}

async function submitDecoded(req, res) {
    const { messageId, submittedAnswer } = req.body;
    if (!messageId || !submittedAnswer) {

    return res.status(400).json({
        error:"Message ID and answer required"
    });

}

    const msg = await encrypt.findById(messageId);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    const isCorrect = msg.answer.trim().toLowerCase() === submittedAnswer.trim().toLowerCase();
    res.json({ correct: isCorrect });
}

async function addMessage(req, res) {

    const message = await encrypt.create(req.body);

    res.status(201).json({
        message: "Encrypted message added successfully",
        data: message
    });

}

module.exports = { encrypted, submitDecoded, addMessage };