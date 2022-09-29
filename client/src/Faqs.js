import React, { useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import Accordion from 'react-bootstrap/Accordion';

function Faqs() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("/faqs")
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
            setFaqs(data)
          })
        } else {
          console.log("Error getting FAQs")
        }
      })
  }, []);

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Accordion>
        {faqs.map( (faq) => {
          return (
            <>
              <Accordion.Item eventKey={faq.id}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            </>
          )
        })}
      </Accordion>
    </Stack>
  );
}

export default Faqs;
