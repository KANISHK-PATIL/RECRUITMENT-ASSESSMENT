const aptitude = require('../models/aptitude.model');

async function question(req, res) {

    const questions = await aptitude.aggregate([

        { $sample: { size: 3 } },
    { $project: { correctAnswer: 0 } } 
    ]);

    res.json(questions);
}

async function submitAnswer(req, res) {
    const { questionId, selectedAnswer } = req.body;
    if (!questionId || !selectedAnswer) {
    return res.status(400).json({
        error: "Question ID and answer are required"
    });
}

    const q = await aptitude.findById(questionId);
    if (!q) return res.status(404).json({ error: "Question not found" });

    const isCorrect = q.correctAnswer === selectedAnswer;

    res.json({ correct: isCorrect });
}

async function addQuestion(req, res) {

    const newQuestion = await aptitude.create(req.body);

    res.status(201).json({
        message: "Question added successfully",
        data: newQuestion
    });

}

module.exports = { question, submitAnswer, addQuestion };