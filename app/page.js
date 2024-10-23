"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [ messageInput, setMessageInput ] = useState('');

  const [messages, setMessages] = useState([
		{
			role: 'assistant',
			content: 'How can I help you learn more about Faizan and his Resume?'

		}
  ]);

  const submitForm = async (e) => {
    e.preventDefault();
  
    // Add the user's message to the messages array
    let newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
  
    // Clear the input field
    setMessageInput('');
  
    try {
      // Make the POST request to the API endpoint
      const apiMessage = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }), // Send all messages including user's input
      }).then(res => res.json());
  
      // Add the assistant's reply to the messages array
      setMessages([...newMessages, { role: 'assistant', content: apiMessage.message }]);
  
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Optionally, you can handle the error in the UI as well
    }
  };
  
  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  }


  return (
    <>
      <header>
        <a href="#" className="logo-holder">
          <div className="logo"><img src="./imgs/coding.png" height="50px" width="auto"/></div>
          <div className="logo-text">KHAZI18</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? "active" : ""}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="mailto:faizankhazi8@gmail.com.com" className="button">Contact Me</a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
            </svg>
          </a>
        </nav>
      </header>
      <main>
        <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1><small>Hi I'm</small>
              FAIZAN KHAZI
              </h1>
              <p>
              Passionate web developer based in Bengaluru, specializing in React.js. Dedicated to crafting elegant, user-centric websites that make an impact.
              </p>
              <div className="call-to-action">
                <a href="./MyResume.pdf" className="button black">
                  View Resume
                </a>
                <a href="mailto:faizankhazi8@gmail.com" className="button white">
                  Contact Me
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/KHAZI18">
                  <img src="./imgs/github.png" alt="GitHub" width="48" />
                </a>
                <a href="https://www.linkedin.com/in/faizan-khazi-3879ab20a/">
                  <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/picofmeaipngcrop.png" alt="Faizan Khazi" width="100%" />
          </div>
        </section>
        <section className="logos container">
          <div className="marquee">
            <div className="track">
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/azure.png" width="128" alt="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
              <img src="./imgs/github-logo.png" width="128" alt="github" />
              <img src="./imgs/respberry.png" width="128" alt="Respberry" />
              <img src="./imgs/TailwindCSS.png" width="128" alt="tailwind" />
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/azure.png" width="128" alt="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
              <img src="./imgs/github-logo.png" width="128" alt="github" />
              <img src="./imgs/respberry.png" width="128" alt="Respberry" />
              <img src="./imgs/TailwindCSS.png" width="128" alt="Tailwind" />
            </div>
          </div>
        </section>
        <section id="skills" className="skills container">
          <h2>
            <small>About Me</small>
            Skills
          </h2>
          <div className="holder-blue">
            <div className="left-column">
              <h3>Frontend</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Tailwind</li>
                <li>Bootstrap</li>
              </ul>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>Python</li>
                <li>Java</li>
                <li>MongoDB</li>
                <li>MySQL</li>
              </ul>
            </div>
            <div className="right-column">
              <h3>A bit about me</h3>
              <p>
                Hi, I'm Faizan Khazi, a passionate full-stack developer with a strong foundation in web development. I love creating innovative projects, whether it's building React web apps or developing IoT solutions using Raspberry Pi.
              </p>
              <p>
              My interests extend into cutting-edge technologies like AI and open-source LLMs, which I’ve integrated into various projects to improve accessibility and enhance user experiences.
              </p>
            </div>
          </div>
        </section>
        <section className="work-experience container">
          <h2>
            <small>Recent</small>
            Work Experience
          </h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <img src="./imgs/Workplace1.jpeg" alt="Workplace 1 - IoT Developer" width="100%" />
                  <figcaption>
                    Workplace - IoT Developer
                  </figcaption>
                </div>
              </figure>
              <h3>IoT Developer</h3>
              <div>06/2024-present</div>
              <p>As an Intern at Ada Lovelace Pvt. Ltd., I design IoT solutions that enhance accessibility for disabled individuals, using innovative hardware and software integrations.</p>
            </article>
            <article>
              <figure>
                <div>
                  <img src="./imgs/workplace2.png" alt="Google's Gssoc" width="100%" />
                  <figcaption>
                  GSSoC 2024 Contributor
                  </figcaption>
                </div>
              </figure>
              <h3>GSSoC 2024 Contributor</h3>
              <div>10/2024 - present</div>
              <p>Contributing to open-source projects as part of the GirlScript Summer of Code Extended 2024, collaborating with developers to improve code and add new features. </p>
            </article>
            {/* <article>
              <figure>
                <div>
                  <img src="./imgs/workplace-3.jpg" alt="Workplace 3 - Chamber of Commerce" width="100%" />
                  <figcaption>
                    Workplace - Chamber of Commerce
                  </figcaption>
                </div>
              </figure>
              <h3>Chamber of Commerce</h3>
              <div>2013-2018</div>
              <p>A small to large business organisation that helps facilitate advice and support.</p>
            </article> */}
            
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>
            <small>
              Previous
            </small>
            Projects & Certificates
          </h2>
          <div className="bento-grid">
            <a href="#" className="bento-item">
              <img src="./imgs/Ramaiah.png" alt="Ramaiah web" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/tailwind.jpg" alt="Tailwind" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/calc.png" alt="js calculator" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/pythonc.png" alt="python" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/textutilx.png" alt="textutilx" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/machine.jpg" alt="ML img" width="100%" />
            </a>
          </div>
        </section>
        <section className="chatbot container">
          <h2>
            <small>
              Talk to me
            </small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>Faizi - AI Skillbot</h3>
              <p>I've put together a chatbot here which knows all my skills, work experience and has a copy of my CV/Resume. You can use it to ask questions about me to get a better idea of who I am and what I've done.</p>
              <p>You can also download my resume here if you want to take a look at it.  I'm currently looking for new opportunities so if you have a project you think I'd be a good fit for, please get in touch!</p>
              <a href="./MyResume.pdf" className="button black">Download Resume</a>
            </div>
            <div className="chat-box">
              <div className="scroll-area">
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={`avatar`}>{message.role === 'user' ? 'You' : 'AI'}</span>
                      <div className="message">{message.content}</div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* onSubmit={submitForm} */}
              <form onSubmit={submitForm} className="chat-message">
                <input type="text" placeholder="Hey Faizi, what skills are you best at?" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
                <button className="button black">Send</button>
              </form>
            </div>
          </div>
        </section>
        <footer className="footer">
          <p>&copy; 2024 Faizan Khazi. All rights reserved.</p>
        </footer>

      </main>
    </>
  );
}
