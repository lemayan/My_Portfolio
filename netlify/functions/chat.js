// Direct fetch API - no SDK needed
exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid request: messages array required' })
      };
    }

    // Get Groq API key from environment
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Groq API key not configured. Please add GROQ_API_KEY to your .env file.' 
        })
      };
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        message: responseMessage,
        model: completion.model
      })
    };

  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to generate response. Please try again.',
        details: error.message,
        stack: error.stack
      })
    };
  }
};
