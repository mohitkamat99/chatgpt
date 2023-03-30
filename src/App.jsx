import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { OpenAIApi, Configuration } from "openai";
import "./App.css";

function App() {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  // const apiKey = "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";

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const generateText = async () => {
    const prompt = input;
    const model = "text-davinci-003";
    const temperature = 0.5;
    const maxTokens = 100;

    try {
      const response = await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: temperature,
        max_tokens: maxTokens,
        frequency_penalty: 0.0,
        top_p: 1,
        presence_penalty: 1,
        stop: ["/"],
      });

      const generatedText = response.data.choices[0].text;
      setResponse(generatedText);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      {/* <iframe
        src="https://view.officeapps.live.com/op/embed.aspx?src=https://lms2-bucket.s3.us-east-2.amazonaws.com/elitelms/media/knvNf6hWHXkAVw3h6DLrBrpty4SFy6ZKQXiMZSkJ.pptx"
        allowFullScreen
        height="700px"
        width="700px"
      ></iframe> */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Type Your Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="How to display table in python?"
            name="prompt"
            required
            onChange={(e) => setInput(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={generateText}>
          Submit
        </Button>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="answer"
            value={response}
            placeholder="Get Your Answer Here"
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default App;
