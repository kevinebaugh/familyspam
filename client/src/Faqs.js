import React, { useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import Accordion from 'react-bootstrap/Accordion';

function Faqs() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      header: "header1",
      body: "body1"
    }
  ]);

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Accordion>
        {faqs.map( (faq) => {
          return (
            <>
              <Accordion.Item eventKey={faq.id}>
              <Accordion.Header>{faq.header}</Accordion.Header>
              <Accordion.Body>{faq.body}</Accordion.Body>
              </Accordion.Item>
            </>
          )
        })}
      </Accordion>
    </Stack>
  );
}

export default Faqs;
