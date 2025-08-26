// import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
// import { NextResponse } from 'next/server';

// const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
// const apiKey = process.env.AZURE_OPENAI_API_KEY;
// const model = process.env.AZURE_OPENAI_MODEL;
  

// export async function POST(req){
	
// 	const { messages } = await req.json();

// 	const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

// 	messages.unshift({
// 		role: 'system',
// 		content: `You are Faizi, answering only questions based on the resume provided.
// Resume:
// ${DATA_RESUME}

// Help users learn more about Faizan from his resume.`
// 	})

// 	const response = await client.getChatCompletions(model, messages, {
// 		maxTokens: 128,
// 	})

// 	return NextResponse.json({ 
// 		message: response.choices[0].message.content
// 	 })
// }
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

// const apiKey = process.env.GROQ_API_KEY;
// const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const apiKey = process.env.GROQ_API_KEY;
const model  = process.env.GROQ_MODEL || 'llama-3.1-70b-versatile';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Ensure API key is provided
    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY. Set GROQ_API_KEY in your environment.");
    }

    // Dynamically import groq SDK to avoid compile-time failure if not installed
    let Groq;
    try {
      Groq = (await import('groq-sdk')).default;
    } catch (err) {
      // If the SDK isn't installed, try a REST fallback using GROQ_REST_URL
      console.warn('groq-sdk not installed, attempting REST fallback:', err.message || err);

      const restUrl = process.env.GROQ_REST_URL; // full URL to POST to (e.g. https://api.groq.example/v1/chat/completions)
      if (!restUrl) {
        console.error('No GROQ_REST_URL set for REST fallback');
        return NextResponse.json({ error: 'groq-sdk not installed and GROQ_REST_URL not set. Install the SDK or set GROQ_REST_URL to your Groq API endpoint.' }, { status: 500 });
      }

      // Prepend system prompt
      messages.unshift({
        role: 'system',
        content: `You are Faizi, answering only questions based on the resume provided.\nResume:\n${DATA_RESUME}\nHelp users learn more about Faizan from his resume.`
      });

      // Call the REST endpoint directly
      // const res = await fetch(restUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      //   },
      //   body: JSON.stringify({ messages, model }),
      // });

		// ... inside REST fallback fetch():
		const res = await fetch(process.env.GROQ_REST_URL || 'https://api.groq.com/openai/v1/chat/completions', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    Authorization: `Bearer ${apiKey}`,
		  },
		  body: JSON.stringify({ messages, model }),
		});

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Groq REST fallback failed:', res.status, text);
        throw new Error('Groq REST fallback request failed');
      }

      const json = await res.json().catch(() => null);
      const content = json?.choices?.[0]?.message?.content ?? json?.message ?? null;
      if (!content) throw new Error('No completion returned from Groq REST endpoint');

      return NextResponse.json({ message: content });
    }

    // If SDK imported, use it
    const groq = new Groq({ apiKey });

    // Prepend a system prompt with the resume context
    messages.unshift({
      role: 'system',
      content: `You are Faizi, answering only questions based on the resume provided.\nResume:\n${DATA_RESUME}\nHelp users learn more about Faizan from his resume.`
    });

    // Call Groq chat completions
    const response = await groq.chat.completions.create({
      messages,
      model,
      // Optionally tune other params here (max_tokens, temperature, etc.)
    });

    const content = response?.choices?.[0]?.message?.content ?? null;
    if (!content) {
      throw new Error('No completion returned from LLM');
    }

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("Error in AI API route:", error?.message ?? error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}

const DATA_RESUME = `Mohammed Faizan K
Phone: +91-8431054174
Email: faizankhazi8@gmail.com
Portfolio: https://khazi18.vercel.app/
LinkedIn: https://linkedin.com/in/yourprofile
GitHub: https://github.com/khazi18

Education
M S Ramaiah Institute of Technology (2022 – 2026)
Bachelor of Engineering in Information Science and Engineering
Current CGPA: 8.02
Relevant Coursework: DSA, OOPS, Operating Systems, DBMS, Discrete Mathematical Structures, Microcontrollers, Advanced Java

Bapuji Polytechnic Shabanuru (2020 – 2023)
Diploma in Computer Science and Engineering
CGPA: 9.6
Ranked 99th in Karnataka CET

Experience
NFThing (Dec 2024 – Present)
Full-Stack Developer Intern, Bengaluru
• Contributed to a React-based movie rating web app.
• Built an infinite carousel for top-rated movies by genre using React.js and TailwindCSS.
• Developed a dynamic Contributors page fetching images from backend.
• Collaborated with frontend team using Git and coordinated via pull requests.

Ada Lovelace Software Pvt. Ltd. (Aug 2024 – Aug 2025)
Software Engineer Intern, Bengaluru
• Developed a full-stack Gmail-integrated web app with Google OAuth & Gmail API.
• Added text-to-speech for email reading to enhance accessibility.
• Integrated Groq API for AI-assisted email summarization & reply generation.
• Added multilingual support with Kannada translation feature.
• Designed secure AI-assisted Compose feature; deployed responsive React.js/Tailwind UI on Render.

Projects
DeFakeIt: Deepfake Detection Web App
• Built with React.js, TailwindCSS, TensorFlow.js, MobileNetV2.
• Detects deepfakes & verifies liveness via real-time face analysis.
• Features: webcam-based detection, image upload, AI-generated analysis with confidence scores.

Pi 5 Offline Translator
• IoT-based offline translator on Raspberry Pi 5 with TinyLlama LLM & Flask.
• Supports 10 languages, speech-to-text, text-to-speech.
• Responsive TailwindCSS web UI for real-time feedback.

Hostel Management Software
• MERN stack + Chart.js project to manage hostel students.
• Features: USN-based search, update, deletion, automated mess fee refunds.
• Visualized 7-day attendance trends to optimize mess planning.

Technical Skills
Languages: Python, Java, HTML/CSS, JavaScript, SQL
Tools/Technologies: React.js, Node.js (MERN), Firebase, TailwindCSS, Postman, Git, Unix, VS Code, Linux, REST APIs, GitHub, DevOps, Jenkins, Docker, CI/CD, Eclipse, Google Cloud Platform
Databases: MySQL, MongoDB, Oracle
Soft Skills: Time Management, Writing, Public Speaking, Leadership, Logical Thinking & Problem-Solving

Achievements / Certifications
• Supervised Machine Learning: Regression and Classification
• TailwindCSS from A to Z
• Open-source LLMs: Secure AI with RAG
• CET Rank: 99 (Karnataka)
• Solved 150+ coding problems on LeetCode, GeeksforGeeks, Coding Ninjas

Additional
Languages: Fluent in English, Hindi, Kannada, Urdu
Hobbies: Cricket, Web Design, Calligraphy
Online Presence: YouTube, LeetCode, Instagram
`


