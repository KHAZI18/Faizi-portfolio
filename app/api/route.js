import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { NextResponse } from 'next/server';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

// export async function POST(req) {
// 	const { messages } = await req.json(); // Extract the messages from the request body
  
// 	const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
  
// 	const response = await client.getChatCompletions(model, messages, {
// 	  maxTokens: 128,
// 	});
  
// 	return NextResponse.json({
// 	  message: response.choices[0].message.content,
// 	});
//   }
  

export async function POST(req){
	
	const { messages } = await req.json();

	const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

	messages.unshift({
		role: 'system',
		content: `You are Faizi, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Faizan from his resume.`
	})

	const response = await client.getChatCompletions(model, messages, {
		maxTokens: 128,
	})

	return NextResponse.json({ 
		message: response.choices[0].message.content
	 })
}

const DATA_RESUME = `Faizan Khazi
Address: MSRIT POST GRADUATE Boys Hostel, Mathikere, Bengaluru, 560054, India
Phone: +918431054174
Email: faizankhazi8@gmail.com
Education
Current Education:
Pursuing Bachelor of Engineering in Information Science and Engineering at M S Ramaiah Institute of Technology, Bengaluru (started in October 2023).
Current CGPA: 8.0.
Previous Education:
Completed a Diploma in Computer Science and Engineering from Bapuji Polytechnic Shabanur, Davangere (May 2021 - July 2023).
CGPA: 9.8.
Ranked 99th in Karnataka CET.
Name of the High School is Bapuji High school [2017-2020]

Skills and Competences
Mern Stack Website Developer 
Front End:  HTML, CSS, JavaScript, Bootstrap, Tailwind, Figma, Canva,  SEO React,jQuery , REST, AJAX/API, Responsive Design
Back End:  NodeJS, MySQL, MongoDB, MySQL, noSQL, Express, Java
Platforms: Amazon AWS, Linux, Windows, Cloud, Automation, Custom 
Frameworks: WordPress, Github 

Projects:
Optical Character Recognition (OCR) Software (June 2023): Converts images to text and provides options to read the output in different voices.
TextUtilx - React Web App (May 2024): Provides various text utilities like capitalization, word/character count, and reading time estimation.
Wi-Fi Jammers (June 2024): Designed for exam security using ESP8266.
Hostel Management Software (July 2024): Developed to track student attendance in the hostel.
Pi 5 Offline Translator (September 2024): IoT device that translates into 10 different languages without internet access.

Certifications:
Machine Learning (September 2021) from Sololearn.
TailwindCSS (June 2024).
Open-source LLMs (September 2024).
Platforms:  Web Development, Android Development
Front End:  React Native, JavaScript 
Back End:  Integrated platforms, IE, Custom, WordPress, etc 
UX and UI Designer 
Platforms:  Adobe Photoshop, Gimp, Figma 
UI:  Website Mock-ups, App Mock-ups, Infographics, Stylesheets, Logos 
UX:  Wireframing, Workflow Diagrams, Technical Specifications  
Employment History
Professional Work Experience:
IoT Developer at Ada Lovelace Software Pvt. Ltd. (August 2024 - Present).
Focuses on creating IoT solutions for assisting disabled individuals.
Worked on devices enhancing accessibility using Raspberry Pi and ESP8266. 

Additional Skills and Interests
Language: Fluent in English,Hindi,Kannada,Urdu
Hobbies: Cricket, Web Design, Calligraphy
Online: Youtube,Leetcode,Instagram`

