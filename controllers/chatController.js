const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getChatPage = (req, res) => {
    res.render('chat', { title: 'Chat with AI' });
};

exports.sendMessage = async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const { message } = req.body;
        
        // Add prompt to format response with Markdown
        const prompt = `Please format your response using Markdown when appropriate. 
                       Use code blocks with language specification for code snippets,
                       bullet points for lists, and proper headings where relevant.
                       
                       User Question: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
};