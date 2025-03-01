import { QuestionAnswerType } from "./ApiCalls";

interface AIMultipleChoiceQuestions {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    status: string;
}

async function requestJsonQuestions(
    theme: string,
    difficulty: number,
    language: string
) {
    const ollamaPort = 11434;
    const model = "llama3.1:latest";
    const data = {
        model: model,
        prompt: `Genera una pregunta de tipo examen sobre el tema: "${theme}".
    Idioma: "${language}".
    Dificultad: ${difficulty}/5.
    
    ### Formato de salida:
    - Cada pregunta debe tener un ID único de 6 dígitos (evita combinaciones simples como "123456" o "000001").
    - La pregunta debe ser clara, concisa y directa (por ejemplo, "¿Cuál es la capital de Francia?").
    - Proporciona cuatro opciones (A, B, C, D) donde solo una sea correcta.
    - Especifica la opción correcta en el campo "answer" con el formato "<letra>)<respuesta>".
    - Devuelve todas las preguntas en un arreglo de objetos.
    
    ### Ejemplo de salida:
    
      {
        "id": "482913",
        "question": "¿Cuál es la capital de Francia?",
        "optionA": "A) CDMX",
        "optionB": "B) Washington DC",
        "optionC": "C) Tokyo",
        "optionD": "D) París",
        "answer": "D) París",
      }
    
    ### Reglas:
    1. Genera una pregunta relevante y adecuada al nivel de dificultad proporcionado.
    2. No utilices opciones ambiguas o confusas.
    3. Asegúrate de que solo una opción sea correcta.
    4. Mantén siempre el campo "status" como "unanswered".
    5. Devuelve la respuesta en el idioma especificado: ${language}.
    
    Genera la pregunta ahora.
    `,
        stream: false,
        format: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    description:
                        "Un identificador único de 6 dígitos como cadena.",
                },
                question: {
                    type: "string",
                    description:
                        "Una pregunta clara y concisa con una única respuesta correcta.",
                },
                optionA: {
                    type: "string",
                    description:
                        "Opción de respuesta A en formato 'A) <texto>'.",
                },
                optionB: {
                    type: "string",
                    description:
                        "Opción de respuesta B en formato 'B) <texto>'.",
                },
                optionC: {
                    type: "string",
                    description:
                        "Opción de respuesta C en formato 'C) <texto>'.",
                },
                optionD: {
                    type: "string",
                    description:
                        "Opción de respuesta D en formato 'D) <texto>'.",
                },
                answer: {
                    type: "string",
                    description:
                        "La opción correcta en formato '<letra>)<respuesta>'.",
                },
            },
            required: [
                "id",
                "question",
                "optionA",
                "optionB",
                "optionC",
                "optionD",
                "answer",
            ],
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
        const parsedResponse: AIMultipleChoiceQuestions = JSON.parse(
            AIResponse.trim()
        );

        questionsList.push(convertIntoQuestionAnswerFormat(parsedResponse));
    }

    return questionsList;
}

//This function formats all the answer options properties into the question propterty to mantain API structure. ##AI was having a hard time generating the json in the required API format
function convertIntoQuestionAnswerFormat(
    AIQuestion: AIMultipleChoiceQuestions
): QuestionAnswerType {
    const answerProperties: string[] = [
        AIQuestion.optionA,
        AIQuestion.optionB,
        AIQuestion.optionC,
        AIQuestion.optionD,
    ];

    let answerString: string = "";

    for (let i = 0; i < answerProperties.length; i++) {
        answerString += `\n${answerProperties[i]}`;
    }

    const formattedQuestionAnswer: QuestionAnswerType = {
        id: parseInt(AIQuestion.id, 10),
        question: `${AIQuestion.question}\n${answerString}`,
        answer: AIQuestion.answer,
        status: "unanswered",
    };

    return formattedQuestionAnswer;
}

export { generateQuestions };
