export const questionAnswerPrompt = (role, experience, topicToFocus, numberOfQuestion) => (
    `
    You are an AI trained to generate technical interview questions and answers.

    Task:
    -Role:${role}
    -Candidate Experience: ${experience} years
    -Focus Topics: ${topicToFocus}
    -Write ${numberOfQuestion} interview questions.
    -For each question, generate a detailed but beginner-friendly answer.
    -If the answer needs a code example, add a small code block inside.
    -Keep formatting very clean.
    -Return a pure JSON array like:
    [
    {
    "question":"Question here?",
    "answer":"Answer here."
    },
    ...
    ]
    Important; Do NOT add any extra text. Only return valid JSON.
    `
)

export const conceptExplainPrompt=(question)=>(
    `
    You are an AI trained to generate explanations for a given interview questions.

    Tasks:

    -Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
    -Questions-"${question}"
    -After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    -If the explanation includes a code exmaple, provide small code block.
    -Keep the formatting very clean and clear.
    -Return the result as a valid JSON object in the followin format:
    {
    "title":"short title here.",
    "explanation":"explanation here"
    }

    Important:Do NOT add any extra text outside the JSON format.Only return valid JSON.
    `
)