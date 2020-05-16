import React from "react";
import "@envoy/polarwind/polarwind.css";
import {
  Heading,
  Page,
  FormLayout,
  Select,
  TextField,
  Stack,
  ButtonGroup,
  Button,
  AppProvider,
  Link,
  Card,
} from "@envoy/polarwind";

function App() {
  return (
    <AppProvider origin="http://localhost:4200">
      <Page title="Density">
        <FormLayout>
          <Select
            label="Visitor type"
            options={["Visitor", "Interview", "Meeting"]}
            required
          />
          <FormLayout.Group>
            <TextField label="Arrival date" required />
            <TextField label="Arrival time" required />
          </FormLayout.Group>
          <TextField label="Full name" />
          <TextField label="Email" />
          <TextField label="Private notes" multiline={3} />
          <Stack distribution="equalSpacing">
            <ButtonGroup>
              <Button>Invite</Button>
              <Button outline>Invite and add another</Button>
            </ButtonGroup>
            <Button plain>Cancel</Button>
          </Stack>
          <Card>
            <Stack vertical spacing="loose">
              <Heading>Link test</Heading>
              <Stack distribution="equalSpacing">
                <Link url="http://localhost:4200/entries">Dashboard route</Link>
                <Link url="http://localhost:4200/entries?visitor_type=Interview">
                  Dashboard route with query params
                </Link>
                <Link url="/about">Internal link</Link>
                <Link url="https://www.google.com">External link</Link>
              </Stack>
            </Stack>
          </Card>
        </FormLayout>
      </Page>
    </AppProvider>
  );
}

export default App;
