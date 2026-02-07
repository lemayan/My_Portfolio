// Vercel Serverless Function
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Get Groq API key from environment
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(500).json({ 
        error: 'Groq API key not configured. Please add GROQ_API_KEY to your environment variables.' 
      });
    }

    // System prompt with portfolio context
    const systemPrompt = `You are an AI assistant for Dennis Lemayan Leleina's portfolio website. You help visitors learn about Dennis's skills, projects, and experience.

ABOUT DENNIS:
- Full-stack developer specializing in React, TypeScript, Node.js, Python, Django, Solidity, and blockchain
- Built multiple production applications including drone delivery platforms, healthcare systems, and blockchain dApps
- Passionate about Web3, fintech, and innovative tech solutions

KEY PROJECTS:
1. Duma Drones - Drone delivery platform with real-time tracking
2. Assessly - Comprehensive exam and testing application
3. Hospital Management System - Digital healthcare solution
4. Genesis - Blockchain-based crowdfunding platform with smart contracts
5. Banking Application - Secure fintech solution

SKILLS:
- Frontend: React, TypeScript, JavaScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Django, Python, Express
- Blockchain: Solidity, Web3, Smart Contracts, Ethereum
- Databases: MongoDB, PostgreSQL, MySQL
- Tools: Git, Docker, REST APIs

CONTACT:
- WhatsApp: +254715197671
- LinkedIn: linkedin.com/in/dennis-leleina-500a01201
- Instagram: @__lemayan__

Be helpful, professional, and enthusiastic about Dennis's work. Answer questions about his skills, projects, and experience.

IMPORTANT FORMATTING RULES:
- NEVER use markdown formatting in your responses. No **, no ##, no *, no bullet points with dashes.
- Write in plain, clean text only.
- Use natural sentence structure instead of lists when possible.
- Keep responses conversational and friendly.`;

    // Combine system prompt with user messages
    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    // Use Groq API - Super fast inference!
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 800,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
    }

    const completion = await response.json();
    const responseMessage = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ 
      message: responseMessage,
      model: completion.model
    });

  } catch (error) {
    console.error('Groq API Error:', error);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ 
      error: 'Failed to generate response. Please try again.',
      details: error.message
    });
  }
}
