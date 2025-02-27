async function requestJsonQuestions(
    theme: string,
    difficulty: number,
    language: string
) {
    const ollamaPort = 11434;
    const model = "llama3.1:latest";
    const data = {
        model: model,
        prompt: `Genera una pregunta estilo examen con el tema: "${theme}".
Idioma: "${language}".
Dificultad: ${difficulty}/5.

### Formato de salida:
- Cada pregunta debe tener un ID único de 6 dígitos evita combinaciones tontas y simples.
- La pregunta debe ser clara y concisa (por ejemplo, "¿Cuál es la capital de Francia?").
- Debe proporcionar una respuesta correcta para cada pregunta (por ejemplo, "París").
- Devuelve todas las preguntas en un arreglo de objetos.

### Ejemplo de salida:

  {
    "id": "482913",
    "question": "¿Cuál es la capital de Francia?",
    "answer": "París"
    "status": "unanswered"
  }


### Reglas:
- NO incluyas opciones múltiples.
- Asegúrate de que la pregunta sea clara y la respuesta sea precisa.
- Simpre deja el "status" como "unanswered".

Genera la pregunta ahora.`,
        stream: false,
        format: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    description: "Un número único de 6 dígitos como cadena.",
                },
                question: {
                    type: "string",
                    description:
                        "Una pregunta clara con una única respuesta precisa.",
                },
                answer: {
                    type: "string",
                    description: "La respuesta correcta a la pregunta.",
                },
                status: {
                    type: "string",
                    description: "unanswered",
                },
            },
            required: ["id", "question", "answer", "status"],
        },
    };

    try {
        const res = await fetch(`http://localhost:${ollamaPort}/api/generate`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const resData = await res.json();
        return resData.response;
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function generateQuestions(
    theme: string,
    difficulty: number,
    questionCount: number,
    language: string
) {
    const maxDifficulty = 5;
    const maxquestionCount = 25;

    //ensure valid difficulty range and valid question questionCount
    difficulty = difficulty > maxDifficulty ? maxDifficulty : difficulty;
    questionCount =
        questionCount > maxquestionCount ? maxquestionCount : questionCount;

    let AIResponse;
    let questionsList = [];
    for (let i = 0; i < questionCount; i++) {
        //generate AI interaction
        AIResponse = await requestJsonQuestions(theme, difficulty, language);
        questionsList.push(JSON.parse(AIResponse.trim()));
        //if we need to, we can validate the json here!!
    }

    return questionsList;
}

export { generateQuestions };
