import React from "react";
import "@envoy/polarwind/polarwind.css";
import {
  AppProvider,
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Heading,
  Link,
  Page,
  Select,
  Stack,
  TextField,
  TextStyle,
} from "@envoy/polarwind";

function App() {
  return (
    <AppProvider origin="http://localhost:4200">
      <Page>
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
            <Stack vertical>
              <Heading>Link test</Heading>
              <Stack distribution="fillEvenly">
                <Stack>
                  <ul>
                    <li>
                      <Link url="http://localhost:4200/entries">
                        Dashboard route
                      </Link>
                    </li>
                    <li>
                      <Link url="http://localhost:4200/invites?date=2020-04-20">
                        Dashboard route with query params
                      </Link>
                    </li>
                    <li>
                      <Link url="http://localhost:4200/cybertruck">
                        Dashboard route that doesn't exist
                      </Link>
                    </li>
                    <li>
                      <Link url="http://localhost:4300/about">
                        Internal link absolute URL
                      </Link>
                    </li>
                    <li>
                      <Link url="/about">Internal link relative URL</Link>
                    </li>
                    <li>
                      <Link url="https://www.google.com">External link</Link>
                    </li>
                  </ul>
                </Stack>
                <Stack>
                  <ul>
                    <li>
                      <TextStyle variation="subdued">
                        http://localhost:4200/entries
                      </TextStyle>
                    </li>
                    <li>
                      <TextStyle variation="subdued">
                        http://localhost:4200/invites?date=2020-04-20
                      </TextStyle>
                    </li>
                    <li>
                      <TextStyle variation="subdued">
                        http://localhost:4200/cybertruck
                      </TextStyle>
                    </li>
                    <li>
                      <TextStyle variation="subdued">
                        http://localhost:4300/about
                      </TextStyle>
                    </li>
                    <li>
                      <TextStyle variation="subdued">/about</TextStyle>
                    </li>
                    <li>
                      <TextStyle variation="subdued">
                        https://www.google.com
                      </TextStyle>
                    </li>
                  </ul>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </FormLayout>
      </Page>
    </AppProvider>
  );
}

export default App;
