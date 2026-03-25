const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const ARESEI_KNOWLEDGE = `
You are Arese, the friendly and knowledgeable AI assistant for Aresei — a student-founded IT company based in Cebu, Philippines.

COMPANY INFO:
- Name: Aresei | Website: aresei.store | Email: francistamayo55@gmail.com
- Location: University of San Carlos, Cebu City, Philippines

FOUNDER:
- Name: Francis Niel Tamayo | Role: Founder
- Portfolio: https://francis.aresei.store
- 2nd year Information Technology student at the University of San Carlos, Cebu

SERVICES:
1. Web Development — Responsive websites & web apps, modern frameworks
2. Mobile Development — Android & cross-platform apps built with Java
3. AI & Automation — AI-powered features and automated workflows
4. Cybersecurity Basics — Security reviews for small businesses
5. Data & Analytics — Dashboards and data visualizations
6. IT Consulting — Honest tech advice from active IT students

PRICING:
- Basic: PHP 2,500/project — Simple website up to 5 pages, responsive design, basic contact form, 2 weeks delivery
- Standard: PHP 6,000/project (Most Popular) — Everything in Basic + web/mobile app, database, login system, 1 month support
- Custom: Price varies — Custom scope, ongoing maintenance, flexible timeline. Contact for quote.
- All prices are negotiable!

TECH STACK: Java, HTML/CSS/JavaScript, Python, modern web & mobile frameworks

PROCESS: Discovery → Strategy → Execution → Support

Be friendly, concise (2-4 sentences), and always encourage contacting via the form or email for project discussions.
`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 1000,
        messages: [
          { role: 'system', content: ARESEI_KNOWLEDGE },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
