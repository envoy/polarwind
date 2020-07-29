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

const links = [
  { url: "https://dashboard.envoy.com/entries", title: "Dashboard route" },
  {
    url: "https://dashboard.envoy.com/invites?date=2020-04-20",
    title: "Dashboard route with query params",
  },
  {
    url: "https://dashboard.envoy.com/cybertruck",
    title: "Dashboard route that doesn't exist",
  },
  {
    url: "https://plugin-home.ngrok.io/about",
    title: "Internal link absolute URL",
  },
  {
    url: "/about",
    title: "Internal link relative URL",
  },
  {
    url: "https://www.google.com",
    title: "External link",
  },
];

function App() {
  return (
    <AppProvider>
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
              <Button brand>Invite</Button>
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
                    {links.map(({ url, title }) => (
                      <li key={url}>
                        <Link url={url}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                </Stack>
                <Stack>
                  <ul>
                    {links.map(({ url, title }) => (
                      <li key={url}>
                        <TextStyle variation="subdued">{url}</TextStyle>
                      </li>
                    ))}
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
