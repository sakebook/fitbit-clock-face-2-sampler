function settingsComponent() {
  return (
    <Page>
      <Section
        title={<Text bold align="center">App Settings</Text>}
        description={"sample"}
      >
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
