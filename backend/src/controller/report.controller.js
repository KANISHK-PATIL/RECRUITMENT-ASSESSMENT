const candidate = require("../models/candidate.model");

function classify(score) {
    if (score >= 95) return "Outstanding Candidate";
    if (score >= 85) return "Highly Qualified";
    if (score >= 70) return "Qualified Candidate";
    if (score >= 50) return "Developing Candidate";
    return "Skill Development Required";
}

async function Report(req, res) {
    const { name, aptitude, memory, encrypted } = req.body;

    if (
        !name ||
        !aptitude || aptitude.score == null ||
        !memory || memory.score == null ||
        !encrypted || encrypted.score == null
    ) {
        return res.status(400).json({
            error: "Missing fields"
        });
    }

    const totalScore = aptitude.score + memory.score + encrypted.score;
    const totalTime =
        (aptitude.time || 0) + (memory.time || 0) + (encrypted.time || 0);
    const classification = classify(totalScore);

    const report = await candidate.create({
        name,
        aptitude,
        memory,
        encrypted,
        totalScore,
        totalTime,
        classification
    });

    res.status(201).json(report);
}

module.exports = Report;