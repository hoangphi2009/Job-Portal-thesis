const express = require("express");
const { LanguageServiceClient } = require("@google-cloud/language");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;  // You can change this port if needed

// Initialize Google Cloud Language API client
const client = new LanguageServiceClient();

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to generate summary using Google Cloud AI
app.post("/generate-summary", async (req, res) => {
    try {
        // Get the summary text from the frontend
        const text = req.body.text;

        // Create a Google Cloud document
        const document = {
            content: text,
            type: "PLAIN_TEXT",
        };

        // Call the Google Cloud Natural Language API to analyze entities in the text
        const [result] = await client.analyzeEntities({ document });

        // Generate a summary based on the entities detected (for example)
        const aiGeneratedSummary = `AI Summary: This text contains the following entities: ${result.entities
            .map((entity) => entity.name)
            .join(", ")}`;

        // Send the AI-generated summary back to the frontend
        res.json({ summary: aiGeneratedSummary });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ error: "Error generating summary" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
