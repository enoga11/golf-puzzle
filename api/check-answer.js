function normalizeAnswer(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ correct: false, error: "Method not allowed" });
    }

    const submitted = normalizeAnswer(req.body?.answer);
    const correct = normalizeAnswer(process.env.PUZZLE_ANSWER);

    if (!submitted) {
        return res.status(200).json({ correct: false });
    }

    return res.status(200).json({ correct: submitted === correct });
}