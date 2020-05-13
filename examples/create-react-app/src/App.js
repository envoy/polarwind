import React from "react";
import "@envoy/polarwind/polarwind.css";
import {
  Page,
  FormLayout,
  Select,
  TextField,
  Stack,
  ButtonGroup,
  Button,
  AppProvider,
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
        </FormLayout>
      </Page>
    </AppProvider>
  );
}

export default App;
